import { expect, test } from '@playwright/test'

test.use({ locale: 'en-US' })

test('chooses English from the browser and preserves a manual language choice', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('I connect systems and build products.')
  await expect(page.getByRole('heading', { name: 'Full Stack Developer' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'This portfolio' })).toBeVisible()
  await expect(page.getByRole('group', { name: 'Portfolio language' }).getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Portfolio of Jorge Guijarro Fuentes/)

  await page.getByRole('button', { name: 'Español' }).click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'es')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Conecto sistemas y construyo productos.')
  await expect(page.getByRole('heading', { name: 'Desarrollador Full Stack' })).toBeVisible()
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('lang', 'es')
  await expect(page.getByRole('button', { name: 'Español' })).toHaveAttribute('aria-pressed', 'true')
})

test('translates the prepared contact email', async ({ page }) => {
  await page.goto('/#contacto')
  await page.getByLabel('Name', { exact: true }).fill('Ana')
  await page.getByLabel('Email address').fill('ana@example.com')
  await page.getByLabel('Subject').fill('Work')
  await page.getByLabel('Message', { exact: true }).fill('I would like to talk about a job opportunity.')
  await page.getByRole('button', { name: 'Prepare email' }).click()
  await expect(page.getByRole('status')).toContainText('Your draft is ready')
  await expect(page.getByRole('status')).toContainText('has not been sent yet')
  await page.getByRole('button', { name: 'Español' }).click()
  await expect(page.getByRole('status')).toContainText('El borrador está listo')
  await expect(page.getByRole('link', { name: 'Abrir correo para enviar' })).toBeVisible()
})
