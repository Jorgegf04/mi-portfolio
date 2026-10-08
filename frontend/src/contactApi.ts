export type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
}

const contactAddress = 'jgfestudios@gmail.com'

export function createContactMailto(payload: ContactPayload): string {
  const subject = `Portfolio: ${payload.subject}`
  const body = `Nombre: ${payload.name}\nCorreo: ${payload.email}\n\n${payload.message}`
  return `mailto:${contactAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
