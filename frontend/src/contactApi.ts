export type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
  website: string
}

export class ContactError extends Error {
  constructor(message: string, readonly status: number) {
    super(message)
  }
}

export async function sendContact(payload: ContactPayload): Promise<void> {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 15_000)
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    if (response.ok) return

    const messages: Record<number, string> = {
      400: 'Revisa los campos del formulario e inténtalo de nuevo.',
      413: 'El mensaje es demasiado largo. Redúcelo e inténtalo de nuevo.',
      429: 'Has enviado varios mensajes. Espera unos minutos antes de volver a intentarlo.',
      503: 'El formulario no está disponible ahora. Escríbeme directamente por correo.',
    }
    throw new ContactError(messages[response.status] ?? 'No se pudo enviar el mensaje. Inténtalo más tarde.', response.status)
  } catch (error) {
    if (error instanceof ContactError) throw error
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ContactError('La conexión ha tardado demasiado. Inténtalo de nuevo.', 0)
    }
    throw new ContactError('No se pudo conectar. Comprueba tu conexión e inténtalo de nuevo.', 0)
  } finally {
    window.clearTimeout(timeout)
  }
}
