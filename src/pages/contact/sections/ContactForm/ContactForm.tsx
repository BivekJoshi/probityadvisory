import { Link } from 'react-router-dom'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { paths } from '@/config/routes'
import { ContactFields } from './ContactFields'
import { EnquirerTypeSelect } from './EnquirerTypeSelect'
import { Field } from './Field'
import { SentNotice } from './SentNotice'
import { ServicePicker } from './ServicePicker'
import { useEnquiryForm } from './useEnquiryForm'

export function ContactForm() {
  const { errors, status, enquirerType, setEnquirerType, picked, toggleService, handleSubmit } =
    useEnquiryForm()
  const sending = status === 'sending'

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={sending}
      className="relative flex flex-col gap-6 rounded-3xl border border-line bg-card p-[clamp(24px,4vw,40px)] shadow-card"
    >
      <ContactFields errors={errors} />

      {/* Honeypot: off-screen, out of the tab order and hidden from screen readers. Bots fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 size-px overflow-hidden">
        <label htmlFor="f-website">Leave this field empty</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field id="f-type" label="You are">
        <EnquirerTypeSelect id="f-type" value={enquirerType} onChange={setEnquirerType} />
      </Field>

      <ServicePicker picked={picked} onToggle={toggleService} />

      <Field id="f-msg" label="Anything we should know">
        <Textarea
          id="f-msg"
          name="message"
          placeholder="Volumes, software, when you would want to start — or just tell us what is going wrong."
        />
      </Field>

      <div className="flex flex-col-reverse gap-4 border-t border-line-soft pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] leading-normal text-muted-foreground">
          We will only use these details to reply to you. No lists, no forwarding.{' '}
          <Link
            to={paths.privacy}
            className="font-medium text-foreground/85 underline decoration-green/60 underline-offset-4 transition-colors hover:text-green-ink"
          >
            Privacy notice
          </Link>
        </p>
        <Button type="submit" size="lg" className="shrink-0" disabled={sending}>
          {sending ? 'Sending…' : 'Send enquiry'}
          <Send />
        </Button>
      </div>

      <SentNotice status={status} />
    </form>
  )
}
