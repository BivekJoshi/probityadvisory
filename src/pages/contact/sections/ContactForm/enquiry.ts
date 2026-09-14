import { site } from '@/config/site'

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

/** Name and email are required; the email must at least look like one. */
export function validateEnquiry({ name, email }: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {}
  if (!name) errors.name = 'Please tell us your name.'
  if (!email) errors.email = 'We need an email address to reply to.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'That email does not look right.'
  return errors
}

/** The enquiry as a `mailto:` link to the practice, subject and body filled in. */
export function enquiryMailto(enquiry: Enquiry) {
  const body = [
    `Name: ${enquiry.name}`,
    `Firm or company: ${enquiry.firm || '—'}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone || '—'}`,
    `Enquirer type: ${enquiry.enquirerType}`,
    `What they need: ${enquiry.services.length ? enquiry.services.join(', ') : '—'}`,
    '',
    enquiry.message,
  ].join('\n')

  return `mailto:${site.email}?subject=${encodeURIComponent(
    `Enquiry from ${enquiry.name}`,
  )}&body=${encodeURIComponent(body)}`
}
