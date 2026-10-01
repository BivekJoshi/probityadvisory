export type EnquiryErrors = Partial<Record<'name' | 'email', string>>

export interface Enquiry {
  name: string
  firm: string
  email: string
  phone: string
  enquirerType: string
  services: string[]
  message: string
}

/** The script on the web host that emails each enquiry to the practice: public/api/enquiry.php. */
const endpoint = '/api/enquiry.php'

/** Name and email are required; the email must at least look like one. */
export function validateEnquiry({ name, email }: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {}
  if (!name) errors.name = 'Please tell us your name.'
  if (!email) errors.email = 'We need an email address to reply to.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'That email does not look right.'
  return errors
}

/**
 * Posts the enquiry to the host, which emails it to the practice. `website` is the
 * honeypot: people never see that field, so anything in it marks a bot, and the
 * script drops the message while still answering as if it had been sent.
 */
export async function sendEnquiry(enquiry: Enquiry, website: string) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...enquiry, website }),
  })
  const result = (await response.json().catch(() => null)) as { ok?: boolean } | null
  if (!response.ok || !result?.ok) throw new Error(`Enquiry not sent (HTTP ${response.status})`)
}
