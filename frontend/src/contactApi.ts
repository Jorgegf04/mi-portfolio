export type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
  website: string
}

export class ContactError extends Error {
  constructor(readonly code: 'errorInvalid' | 'errorTooLong' | 'errorRateLimit' | 'errorUnavailable' | 'errorTimeout' | 'errorNetwork' | 'errorGeneric', readonly status: number) {
    super(code)
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

    const codes: Record<number, ContactError['code']> = {
      400: 'errorInvalid',
      413: 'errorTooLong',
      429: 'errorRateLimit',
      503: 'errorUnavailable',
    }
    throw new ContactError(codes[response.status] ?? 'errorGeneric', response.status)
  } catch (error) {
    if (error instanceof ContactError) throw error
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ContactError('errorTimeout', 0)
    }
    throw new ContactError('errorNetwork', 0)
  } finally {
    window.clearTimeout(timeout)
  }
}
