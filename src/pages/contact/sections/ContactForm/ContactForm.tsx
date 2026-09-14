import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ContactFields } from './ContactFields'
import { EnquirerTypeSelect } from './EnquirerTypeSelect'
import { Field } from './Field'
import { SentNotice } from './SentNotice'
import { ServicePicker } from './ServicePicker'
import { useEnquiryForm } from './useEnquiryForm'

export function ContactForm() {
  const { errors, sent, enquirerType, setEnquirerType, picked, toggleService, handleSubmit } =
    useEnquiryForm()

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6 rounded-3xl border border-line bg-card p-[clamp(24px,4vw,40px)] shadow-card"
    >
      <ContactFields errors={errors} />

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
          We will only use these details to reply to you. No lists, no forwarding.
        </p>
        <Button type="submit" size="lg" className="shrink-0">
          Send enquiry
          <Send />
        </Button>
      </div>

      <SentNotice sent={sent} />
    </form>
  )
}
