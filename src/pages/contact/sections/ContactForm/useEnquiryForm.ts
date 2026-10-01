import { useState, type FormEvent } from 'react'
import { enquirerTypes } from '@/content/enquiry'
import { sendEnquiry, validateEnquiry, type EnquiryErrors } from './enquiry'

export type SendStatus = 'idle' | 'sending' | 'sent' | 'failed'

/** State and submission for the enquiry form, which posts to the host's mail script. */
export function useEnquiryForm() {
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [status, setStatus] = useState<SendStatus>('idle')
  const [enquirerType, setEnquirerType] = useState(enquirerTypes[0])
  const [picked, setPicked] = useState<string[]>([])

  const toggleService = (value: string, checked: boolean) =>
    setPicked((prev) => (checked ? [...prev, value] : prev.filter((v) => v !== value)))

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return
    // currentTarget is cleared once the handler awaits, so hold on to the form
    const form = event.currentTarget
    const data = new FormData(form)
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

    setStatus('sending')
    try {
      await sendEnquiry(enquiry, field('website'))
      form.reset()
      setPicked([])
      setEnquirerType(enquirerTypes[0])
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }

  return { errors, status, enquirerType, setEnquirerType, picked, toggleService, handleSubmit }
}
