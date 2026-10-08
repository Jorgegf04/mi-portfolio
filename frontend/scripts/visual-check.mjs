import { createServer } from 'vite'
import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'

const server = await createServer({ server: { host: '127.0.0.1', port: 4174 } })
await server.listen()
const browser = await chromium.launch({ channel: process.env.CI ? undefined : 'chrome' })
const output = resolve('test-results/visual')
await mkdir(output, { recursive: true })

try {
  for (const [name, width, height, locale] of [
    ['desktop', 1440, 900, 'es-ES'], ['mobile', 390, 844, 'es-ES'],
    ['desktop-en', 1440, 900, 'en-US'], ['mobile-en', 390, 844, 'en-US'],
  ]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1, locale })
    await page.goto('http://127.0.0.1:4174/', { waitUntil: 'networkidle' })
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded()
      await image.evaluate(element => element.decode())
    }
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.screenshot({ path: resolve(output, `${name}.png`), fullPage: true })
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    console.log(`${name}: horizontal overflow ${overflow}px`)
    await page.close()
  }
} finally {
  await browser.close()
  await server.close()
}
