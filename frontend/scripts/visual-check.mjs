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
  for (const [name, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 })
    await page.goto('http://127.0.0.1:4174/', { waitUntil: 'networkidle' })
    await page.screenshot({ path: resolve(output, `${name}.png`), fullPage: true })
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    console.log(`${name}: horizontal overflow ${overflow}px`)
    await page.close()
  }
} finally {
  await browser.close()
  await server.close()
}
