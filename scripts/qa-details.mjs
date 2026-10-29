import puppeteer from 'puppeteer-core'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = process.env.QA_URL ?? 'http://localhost:5180/'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--hide-scrollbars'],
})

const page = await browser.newPage()
const consoleErrors = []
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text())
})
page.on('pageerror', (error) => consoleErrors.push(`pageerror: ${error.message}`))
page.on('requestfailed', (request) =>
  consoleErrors.push(`requestfailed: ${request.url()} — ${request.failure()?.errorText}`),
)

await page.setViewport({ width: 1440, height: 900 })
await page.goto(BASE, { waitUntil: 'networkidle2', timeout: 60000 })
await sleep(800)

await page.evaluate(() => {
  document.getElementById('about').scrollIntoView({ block: 'center' })
})
await sleep(2000)

const images = await page.evaluate(() =>
  [...document.images].map((img) => ({
    src: img.getAttribute('src'),
    alt: img.alt,
    complete: img.complete,
    natural: `${img.naturalWidth}x${img.naturalHeight}`,
    rendered: `${Math.round(img.getBoundingClientRect().width)}x${Math.round(img.getBoundingClientRect().height)}`,
  })),
)

const frames = page.frames().map((frame) => frame.url())

const clipping = await page.evaluate(() => {
  const results = []
  for (const el of document.querySelectorAll('h1,h2,h3,p,a,span,li,dt,dd')) {
    const style = getComputedStyle(el)
    if (style.overflowX === 'visible') continue
    if (el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 0) {
      results.push({
        text: (el.textContent ?? '').trim().slice(0, 60),
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
        cls: String(el.className).slice(0, 60),
      })
    }
  }
  return results.slice(0, 10)
})

const geometry = await page.evaluate(() => {
  const rect = (selector) => {
    const el = document.querySelector(selector)
    if (!el) return null
    const r = el.getBoundingClientRect()
    return {
      top: Math.round(r.top + window.scrollY),
      left: Math.round(r.left),
      width: Math.round(r.width),
      height: Math.round(r.height),
    }
  }
  const cards = [...document.querySelectorAll('button[aria-haspopup="dialog"]')]
  const heights = cards.map((c) => Math.round(c.getBoundingClientRect().height))
  return {
    header: rect('header'),
    hero: rect('#home'),
    heroImage: rect('#home img'),
    about: rect('#about'),
    contact: rect('#contact'),
    footer: rect('footer'),
    cardHeights: [...new Set(heights)],
    totalHeight: document.body.scrollHeight,
  }
})

const contrast = await page.evaluate(() => {
  const parse = (color) => {
    const nums = color.match(/[\d.]+/g)?.map(Number) ?? []
    return { r: nums[0] ?? 0, g: nums[1] ?? 0, b: nums[2] ?? 0, a: nums[3] ?? 1 }
  }
  const composite = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  })
  const bgOf = (el) => {
    let node = el
    let bg = { r: 250, g: 249, b: 245, a: 1 }
    const stack = []
    while (node) {
      const color = parse(getComputedStyle(node).backgroundColor)
      if (color.a > 0) stack.push(color)
      node = node.parentElement
    }
    for (let i = stack.length - 1; i >= 0; i -= 1) bg = composite(stack[i], bg)
    return bg
  }
  const lum = ({ r, g, b }) => {
    const channel = (v) => {
      const s = v / 255
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
    }
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
  }
  const ratio = (a, b) => {
    const l1 = lum(a)
    const l2 = lum(b)
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
  }

  const rows = []
  for (const el of document.querySelectorAll('body *')) {
    if (!el.textContent?.trim()) continue
    if ([...el.children].some((child) => child.textContent?.trim())) continue
    if (el.closest('[aria-hidden="true"]')) continue
    const style = getComputedStyle(el)
    if (style.visibility === 'hidden' || style.display === 'none') continue
    const r = el.getBoundingClientRect()
    if (!r.width || !r.height) continue
    const fgRaw = parse(style.color)
    const bg = bgOf(el)
    const fg = composite(fgRaw, bg)
    const value = ratio(fg, bg)
    const size = parseFloat(style.fontSize)
    const bold = Number(style.fontWeight) >= 600
    const large = size >= 24 || (size >= 18.66 && bold)
    const required = large ? 3 : 4.5
    if (value < required) {
      rows.push({
        text: el.textContent.trim().replace(/\s+/g, ' ').slice(0, 55),
        color: style.color,
        size,
        bold,
        ratio: Number(value.toFixed(2)),
        required,
      })
    }
  }
  return rows
})

// Map frame content
let mapInfo = null
const mapFrame = page.frames().find((f) => f.url().includes('maps.google.com'))
if (mapFrame) {
  mapInfo = await mapFrame
    .evaluate(() => ({
      title: document.title,
      text: document.body?.innerText.slice(0, 300),
    }))
    .catch((error) => ({ error: String(error) }))
}

// Mobile focus/tap target audit
await page.setViewport({ width: 390, height: 844 })
await page.goto(BASE, { waitUntil: 'networkidle2' })
await sleep(800)
const mobile = await page.evaluate(() => {
  const small = []
  for (const el of document.querySelectorAll('a,button')) {
    const r = el.getBoundingClientRect()
    if (!r.width || !r.height) continue
    if (r.width < 24 || r.height < 24) {
      small.push({
        text: (el.textContent ?? el.getAttribute('aria-label') ?? '').trim().slice(0, 40),
        w: Math.round(r.width),
        h: Math.round(r.height),
        cls: String(el.className).slice(0, 50),
      })
    }
  }
  return small
})

console.log(
  JSON.stringify(
    {
      images,
      frames,
      mapInfo,
      clipping,
      geometry,
      contrast,
      mobileSmallTargets: mobile,
      consoleErrors,
    },
    null,
    2,
  ),
)

await browser.close()
