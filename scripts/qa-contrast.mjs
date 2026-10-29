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
const errors = []
page.on('pageerror', (error) => errors.push(error.message))
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text())
})
await page.setViewport({ width: 1440, height: 900 })
await page.goto(BASE, { waitUntil: 'networkidle2', timeout: 60000 })
await sleep(1000)

const report = await page.evaluate(() => {
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  const ctx = canvas.getContext('2d', { willReadFrequently: true })

  const toRgb = (color) => {
    ctx.clearRect(0, 0, 1, 1)
    ctx.fillStyle = 'rgba(0,0,0,0)'
    ctx.fillStyle = color
    ctx.fillRect(0, 0, 1, 1)
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
    return { r, g, b, a: a / 255 }
  }

  const over = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  })

  const bgOf = (el) => {
    const stack = []
    let node = el
    while (node && node.nodeType === 1) {
      const color = toRgb(getComputedStyle(node).backgroundColor)
      if (color.a > 0) stack.push(color)
      node = node.parentElement
    }
    let bg = { r: 255, g: 255, b: 255, a: 1 }
    for (let i = stack.length - 1; i >= 0; i -= 1) bg = over(stack[i], bg)
    return bg
  }

  const luminance = ({ r, g, b }) => {
    const channel = (value) => {
      const s = value / 255
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
    }
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
  }

  const ratio = (a, b) => {
    const l1 = luminance(a)
    const l2 = luminance(b)
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
  }

  const rows = []
  for (const el of document.querySelectorAll('body *')) {
    const ownText = [...el.childNodes]
      .filter((node) => node.nodeType === 3)
      .map((node) => node.textContent?.trim() ?? '')
      .join(' ')
      .trim()
    if (!ownText) continue
    if (el.closest('[aria-hidden="true"]')) continue
    if (el.closest('.sr-only')) continue
    const style = getComputedStyle(el)
    if (style.visibility === 'hidden' || style.display === 'none') continue
    if (Number(style.opacity) === 0) continue
    const rect = el.getBoundingClientRect()
    if (!rect.width || !rect.height) continue
    const bg = bgOf(el)
    const fg = over(toRgb(style.color), bg)
    const value = ratio(fg, bg)
    const size = parseFloat(style.fontSize)
    const bold = Number(style.fontWeight) >= 600
    const large = size >= 24 || (size >= 18.66 && bold)
    const required = large ? 3 : 4.5
    if (value < required) {
      rows.push({
        text: ownText.replace(/\s+/g, ' ').slice(0, 55),
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

const frames = page.frames()
let mapContent = null
for (const frame of frames) {
  if (!frame.url().includes('google.com/maps/embed')) continue
  mapContent = await frame
    .evaluate(() => ({
      title: document.title,
      body: document.body?.innerText.replace(/\s+/g, ' ').slice(0, 400),
    }))
    .catch((error) => ({ error: String(error) }))
}

console.log(JSON.stringify({ failures: report, mapContent, errors }, null, 2))
await browser.close()
