import fs from 'node:fs'
import puppeteer from 'puppeteer-core'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = process.env.QA_URL ?? 'http://localhost:5180/'
const OUT = 'screenshots'
const widths = [1440, 1024, 768, 390, 360]

fs.mkdirSync(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--hide-scrollbars'],
})

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const results = []

async function settle(page) {
  await page.evaluate(() => document.fonts.ready)
  await sleep(400)
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.75)
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 90))
    }
    window.scrollTo(0, 0)
  })
  await sleep(700)
}

async function setLanguage(page, lang) {
  if (lang === 'ar') {
    await page.click('button[aria-label="Arabic"]')
    await sleep(500)
  }
}

for (const width of widths) {
  for (const lang of ['en', 'ar']) {
    const page = await browser.newPage()
    await page.setViewport({ width, height: 1000, deviceScaleFactor: 1 })
    await page.goto(BASE, { waitUntil: 'networkidle2', timeout: 60000 })
    await settle(page)
    await setLanguage(page, lang)
    await settle(page)

    const info = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth
      const clipped = (el) => {
        let parent = el.parentElement
        while (parent) {
          const overflowX = getComputedStyle(parent).overflowX
          if (overflowX === 'hidden' || overflowX === 'clip') return true
          parent = parent.parentElement
        }
        return false
      }
      const offenders = []
      for (const el of document.querySelectorAll('body *')) {
        if (el.getAttribute('aria-hidden') === 'true') continue
        const rect = el.getBoundingClientRect()
        if (!rect.width || !rect.height) continue
        if (rect.right > vw + 1 || rect.left < -1) {
          if (clipped(el) || getComputedStyle(el).position === 'fixed') continue
          offenders.push({
            tag: el.tagName,
            cls: String(el.className).slice(0, 70),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
          })
        }
      }

      const h1 = document.querySelector('h1')
      return {
        scrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        clientWidth: vw,
        offenders: offenders.slice(0, 8),
        brokenImages: [...document.images]
          .filter((img) => !img.complete || img.naturalWidth === 0)
          .map((img) => img.getAttribute('src')),
        dir: document.documentElement.dir,
        lang: document.documentElement.lang,
        h1Text: h1?.innerText.replace(/\n/g, ' '),
        h1Size: h1 ? getComputedStyle(h1).fontSize : null,
        h1Font: h1 ? getComputedStyle(h1).fontFamily.split(',')[0] : null,
        fonts: {
          newsreader: document.fonts.check("16px Newsreader"),
          work: document.fonts.check("16px 'Work Sans'"),
          plexArabic: document.fonts.check("16px 'IBM Plex Sans Arabic'"),
        },
        sections: [...document.querySelectorAll('main section')].map((s) => s.id),
        disclaimer: document.querySelector('footer')?.innerText.includes('TRIBAL'),
        phoneLinks: document.querySelectorAll('a[href^="tel:"]').length,
        whatsappLinks: document.querySelectorAll('a[href*="wa.me"]').length,
        mapFrames: document.querySelectorAll('iframe').length,
        headerPosition: getComputedStyle(
          document.querySelector('header'),
        ).position,
        serviceCards: document.querySelectorAll('button[aria-haspopup="dialog"]')
          .length,
      }
    })

    const shot = `${OUT}/home-${lang}-${width}.png`
    await page.screenshot({ path: shot, fullPage: true })

    results.push({ width, lang, ...info, shot })
    await page.close()
  }
}

// ---------- Interaction checks (desktop / mobile) ----------
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto(BASE, { waitUntil: 'networkidle2', timeout: 60000 })
await settle(page)

const interactions = {}
interactions.headerSticky = await page.evaluate(
  () => getComputedStyle(document.querySelector('header')).position,
)

await page.click('button[aria-haspopup="dialog"]')
await sleep(400)
interactions.dialogOpen = await page.evaluate(() => {
  const dialog = document.querySelector('[role="dialog"]')
  return {
    visible: Boolean(dialog),
    title: dialog?.querySelector('h3')?.textContent,
    modal: dialog?.getAttribute('aria-modal'),
  }
})
await page.keyboard.press('Escape')
await sleep(400)
interactions.dialogClosedOnEscape = await page.evaluate(
  () => !document.querySelector('[role="dialog"]'),
)

await page.click('button[aria-label="Arabic"]')
await sleep(500)
interactions.arabic = await page.evaluate(() => ({
  lang: document.documentElement.lang,
  dir: document.documentElement.dir,
  h1: document.querySelector('h1')?.innerText.replace(/\n/g, ' '),
  serviceTitle: document.querySelector('button[aria-haspopup="dialog"] h3')
    ?.textContent,
  font: getComputedStyle(document.querySelector('h1')).fontFamily.split(',')[0],
}))

await page.click('a[href="#services"]')
await sleep(1000)
interactions.anchorNavigation = await page.evaluate(() => ({
  hash: location.hash,
  scrollY: Math.round(window.scrollY),
}))

await page.setViewport({ width: 390, height: 844 })
await sleep(300)
await page.evaluate(() => window.scrollTo(0, 0))
await sleep(300)
await page.click('button[aria-controls="mobile-menu"]')
await sleep(450)
interactions.drawerOpen = await page.evaluate(() => {
  const drawer = document.querySelector('#mobile-menu')
  return {
    visible: Boolean(drawer),
    role: drawer?.getAttribute('role'),
    links: drawer?.querySelectorAll('nav a').length,
    bodyOverflow: document.body.style.overflow,
    activeElement: document.activeElement?.getAttribute('aria-label'),
  }
})
await page.click('#mobile-menu a[href="#about"]')
await sleep(700)
interactions.drawerClosedAfterNav = await page.evaluate(() => ({
  closed: !document.querySelector('#mobile-menu'),
  hash: location.hash,
  bodyOverflow: document.body.style.overflow,
}))

interactions.links = await page.evaluate(() => {
  const all = [...document.querySelectorAll('a')]
  return {
    emptyHref: all.filter((a) => !a.getAttribute('href') || a.getAttribute('href') === '#').length,
    externalWithoutRel: all.filter(
      (a) => a.target === '_blank' && !/noopener/.test(a.rel),
    ).length,
  }
})

await page.goto(BASE, { waitUntil: 'networkidle2' })
await sleep(800)
const reduced = await browser.newPage()
await reduced.emulateMediaFeatures([
  { name: 'prefers-reduced-motion', value: 'reduce' },
])
await reduced.setViewport({ width: 390, height: 844 })
await reduced.goto(BASE, { waitUntil: 'networkidle2' })
await sleep(600)
interactions.reducedMotion = await reduced.evaluate(() => {
  const reveals = [...document.querySelectorAll('.reveal')]
  return {
    allVisible: reveals.every((el) => getComputedStyle(el).opacity === '1'),
    smoothScroll: getComputedStyle(document.documentElement).scrollBehavior,
  }
})

await browser.close()

console.log(JSON.stringify({ results, interactions }, null, 2))
