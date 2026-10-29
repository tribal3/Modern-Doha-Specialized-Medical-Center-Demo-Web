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
const failed = []
page.on('requestfailed', (request) => {
  if (!request.url().includes('google')) {
    failed.push(`${request.url()} :: ${request.failure()?.errorText}`)
  }
})
await page.setViewport({ width: 1440, height: 900 })
await page.goto(BASE, { waitUntil: 'networkidle2', timeout: 60000 })

await page.evaluate(() => document.getElementById('contact').scrollIntoView())
await sleep(4000)

const map = await page.evaluate(() => {
  const iframe = document.querySelector('iframe')
  return {
    src: iframe?.getAttribute('src'),
    rect: iframe
      ? {
          width: Math.round(iframe.getBoundingClientRect().width),
          height: Math.round(iframe.getBoundingClientRect().height),
        }
      : null,
  }
})

const frameInfo = []
for (const frame of page.frames()) {
  if (!frame.url().includes('maps/embed')) continue
  const content = await frame
    .evaluate(() => ({
      title: document.title,
      text: document.body?.innerText.replace(/\s+/g, ' ').slice(0, 250),
      hasCanvas: Boolean(document.querySelector('canvas')),
      hasMap: Boolean(
        document.querySelector('[aria-label*="Map" i]') ||
          document.querySelector('.map'),
      ),
    }))
    .catch((error) => ({ error: String(error) }))
  frameInfo.push({ url: frame.url().slice(0, 120), ...content })
}

const header = await browser.newPage()
await header.setViewport({ width: 360, height: 800 })
await header.goto(BASE, { waitUntil: 'networkidle2' })
await header.click('button[aria-label="Arabic"]')
await sleep(600)
const headerInfo = await header.evaluate(() => {
  const pick = (selector) => {
    const el = document.querySelector(selector)
    if (!el) return null
    const r = el.getBoundingClientRect()
    return {
      left: Math.round(r.left),
      right: Math.round(r.right),
      width: Math.round(r.width),
      height: Math.round(r.height),
    }
  }
  const headerRow = document.querySelector('header > div')
  return {
    logo: pick('header a[aria-label]'),
    toggle: pick('[role="group"]'),
    menu: pick('button[aria-controls="mobile-menu"]'),
    headerRow: pick('header > div'),
    overflow: headerRow ? headerRow.scrollWidth > headerRow.clientWidth : null,
    rtlActive: getComputedStyle(document.documentElement).direction,
  }
})

const rtlCss = await header.evaluate(() => {
  const findRule = (needle) =>
    [...document.styleSheets]
      .flatMap((sheet) => {
        try {
          return [...sheet.cssRules]
        } catch {
          return []
        }
      })
      .some((rule) => rule.cssText?.includes(needle))
  return {
    rtlVariant: findRule('dir="rtl"') || findRule("dir='rtl'"),
  }
})

// Confirm arrow flipping classes applied
const arrows = await header.evaluate(() =>
  [...document.querySelectorAll('svg.rtl\\:-scale-x-100')].length,
)

console.log(
  JSON.stringify(
    { map, frameInfo, headerInfo, rtlCss, arrows, failed },
    null,
    2,
  ),
)
await browser.close()
