import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import ContactForm from './ContactForm.vue'
import { setLocale } from './i18n'

async function completeForm(wrapper: ReturnType<typeof mount>) {
  await wrapper.get('#contact-name').setValue('Ana')
  await wrapper.get('#contact-email').setValue('ana@example.com')
  await wrapper.get('#contact-subject').setValue('Trabajo')
  await wrapper.get('#contact-message').setValue('Me gustaría hablar sobre una oportunidad de trabajo.')
}

describe('ContactForm', () => {
  beforeEach(() => setLocale('es'))

  it('prepares a draft without claiming it has been sent', async () => {
    const wrapper = mount(ContactForm)
    await completeForm(wrapper)
    await wrapper.get('form').trigger('submit')

    const status = wrapper.get('[role="status"]')
    expect(status.text()).toContain('El borrador está listo')
    expect(status.text()).toContain('aún no se ha enviado')

    const href = wrapper.get('a[href^="mailto:"]').attributes('href')!
    expect(href).toContain('mailto:jgfestudios@gmail.com')
    expect(decodeURIComponent(href)).toContain('Portfolio: Trabajo')
    expect(decodeURIComponent(href)).toContain('Nombre: Ana\nCorreo: ana@example.com')
    expect(decodeURIComponent(href)).toContain('Me gustaría hablar sobre una oportunidad de trabajo.')
    expect((wrapper.get('#contact-message').element as HTMLTextAreaElement).value).toContain('oportunidad')
  })
})
