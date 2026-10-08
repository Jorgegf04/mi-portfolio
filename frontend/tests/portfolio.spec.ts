import { expect, test } from '@playwright/test'

test('shows the professional story and working project links', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Jorge Guijarro')
  const mobileMenu = page.getByRole('button', { name: 'Abrir menú' })
  if (await mobileMenu.isVisible()) await mobileMenu.click()
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Experiencia' }).click()
  await expect(page.getByRole('heading', { name: 'Desarrollador Full Stack' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'BookSocial' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Ver código de BookSocial en GitHub' })).toHaveAttribute('href', 'https://github.com/Jorgegf04/booksocial')
  await expect(page.getByRole('link', { name: 'Ver código de Este portfolio en GitHub' })).toHaveAttribute('href', 'https://github.com/Jorgegf04/mi-portfolio')
})

test('contact form prepares an email draft without claiming it was sent', async ({ page }) => {
  await page.goto('/#contacto')
  await page.getByLabel('Nombre').fill('Ana')
  await page.getByLabel('Correo electrónico').fill('ana@example.com')
  await page.getByLabel('Asunto').fill('Trabajo')
  await page.getByLabel('Mensaje').fill('Me gustaría hablar sobre una oportunidad de trabajo.')
  await page.getByRole('button', { name: 'Preparar correo' }).click()
  await expect(page.getByRole('status')).toContainText('El borrador está listo')
  await expect(page.getByRole('status')).toContainText('aún no se ha enviado')
  const emailLink = page.getByRole('link', { name: 'Abrir correo para enviar' })
  await expect(emailLink).toHaveAttribute('href', /^mailto:jgfestudios@gmail\.com\?subject=/)
  const mailto = decodeURIComponent((await emailLink.getAttribute('href'))!)
  expect(mailto).toContain('Portfolio: Trabajo')
  expect(mailto).toContain('Nombre: Ana\nCorreo: ana@example.com')
  expect(mailto).toContain('Me gustaría hablar sobre una oportunidad de trabajo.')
})

test('supports keyboard navigation and serves the downloadable CV', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#contenido$/)

  const cv = await page.request.get('/Jorge-Guijarro-Fuentes-CV.pdf')
  expect(cv.status()).toBe(200)
  expect(cv.headers()['content-type']).toContain('application/pdf')
})
