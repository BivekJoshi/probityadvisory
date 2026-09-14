import { useState, type FormEvent } from 'react'
import { enquirerTypes } from '@/content/enquiry'
import { enquiryMailto, validateEnquiry, type EnquiryErrors } from './enquiry'

/**
 * State and submission for the enquiry form. No back end is wired up yet, so a
 * valid submission opens the visitor's mail client with the enquiry pre-filled.
 * Swap the `mailto:` hand-off in `handleSubmit` for a POST when an endpoint exists.
 */
export function useEnquiryForm() {
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [sent, setSent] = useState(false)
  const [enquirerType, setEnquirerType] = useState(enquirerTypes[0])
  const [picked, setPicked] = useState<string[]>([])

  const toggleService = (value: string, checked: boolean) =>
    setPicked((prev) => (checked ? [...prev, value] : prev.filter((v) => v !== value)))

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const field = (key: string) => String(data.get(key) ?? '').trim()
    const enquiry = {
      name: field('name'),
      firm: field('firm'),
      email: field('email'),
      phone: field('phone'),
      enquirerType,
      services: picked,
      message: field('message'),
    }

    const next = validateEnquiry(enquiry)
    setErrors(next)
    if (Object.keys(next).length) return

    window.location.href = enquiryMailto(enquiry)
    setSent(true)
  }

  return { errors, sent, enquirerType, setEnquirerType, picked, toggleService, handleSubmit }
}
