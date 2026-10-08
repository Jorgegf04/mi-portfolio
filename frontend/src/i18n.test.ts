import { beforeEach, describe, expect, it } from 'vitest'
import { locale, resolveLocale, setLocale, t } from './i18n'

describe('portfolio language', () => {
  beforeEach(() => localStorage.clear())

  it('uses the first supported browser language and falls back to English', () => {
    expect(resolveLocale(['es-MX', 'en-US'])).toBe('es')
    expect(resolveLocale(['fr-FR', 'en-GB'])).toBe('en')
    expect(resolveLocale(['de-DE'])).toBe('en')
    expect(resolveLocale(['es-ES'], 'en')).toBe('en')
  })

  it('saves a manual selection and updates document language and metadata', () => {
    setLocale('en')
    expect(locale.value).toBe('en')
    expect(t('formSubmit')).toBe('Send message')
    expect(document.documentElement.lang).toBe('en')
    expect(document.title).toContain('Full Stack Developer')
    expect(localStorage.getItem('portfolio-locale')).toBe('en')
    setLocale('es')
    expect(document.documentElement.lang).toBe('es')
  })
})
