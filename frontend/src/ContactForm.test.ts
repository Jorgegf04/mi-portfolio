import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ContactForm from './ContactForm.vue'
import { sendContact } from './contactApi'

vi.mock('./contactApi', () => ({ sendContact: vi.fn() }))

async function completeForm(wrapper: ReturnType<typeof mount>) {
  await wrapper.get('#contact-name').setValue('Ana')
  await wrapper.get('#contact-email').setValue('ana@example.com')
  await wrapper.get('#contact-subject').setValue('Trabajo')
  await wrapper.get('#contact-message').setValue('Me gustaría hablar sobre una oportunidad de trabajo.')
}

describe('ContactForm', () => {
  beforeEach(() => vi.resetAllMocks())

  it('submits the visitor message and shows confirmation', async () => {
    vi.mocked(sendContact).mockResolvedValue()
    const wrapper = mount(ContactForm)
    await completeForm(wrapper)
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(sendContact).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Ana', email: 'ana@example.com', subject: 'Trabajo',
    }))
    expect(wrapper.get('[role="status"]').text()).toContain('Mensaje enviado')
    expect((wrapper.get('#contact-message').element as HTMLTextAreaElement).value).toBe('')
  })

  it('keeps the text and explains a delivery failure', async () => {
    vi.mocked(sendContact).mockRejectedValue(new Error('El formulario no está disponible ahora.'))
    const wrapper = mount(ContactForm)
    await completeForm(wrapper)
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(wrapper.get('[role="alert"]').text()).toContain('no está disponible')
    expect((wrapper.get('#contact-message').element as HTMLTextAreaElement).value).toContain('oportunidad')
  })
})
