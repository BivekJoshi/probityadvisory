import { useState, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { site } from '@/data/site'

const enquirerTypes = [
  'A UK accountancy practice',
  'A UK business or contractor',
  'An introducer or agent',
  'Something else',
]

const serviceOptions = [
  'Bookkeeping, VAT & MTD',
  'Year-end & corporation tax',
  'Payroll, CIS & pensions',
  'Not sure yet',
]

type Errors = Partial<Record<'name' | 'email', string>>

/** Label, control and error message; the control points at the error by `${id}-error`. */
function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[13px] text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

const errorProps = (id: string, error?: string) => ({
  'aria-invalid': Boolean(error),
  'aria-describedby': error ? `${id}-error` : undefined,
})

/**
 * No back end is wired up yet, so a valid submission opens the visitor's
 * mail client with the enquiry pre-filled. Swap `handleSubmit` for a POST
 * when an endpoint exists.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const [enquirerType, setEnquirerType] = useState(enquirerTypes[0])
  const [picked, setPicked] = useState<string[]>([])

  const toggleService = (value: string, checked: boolean) =>
    setPicked((prev) => (checked ? [...prev, value] : prev.filter((v) => v !== value)))

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const field = (key: string) => String(data.get(key) ?? '').trim()
    const name = field('name')
    const email = field('email')

    const next: Errors = {}
    if (!name) next.name = 'Please tell us your name.'
    if (!email) next.email = 'We need an email address to reply to.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'That email does not look right.'

    setErrors(next)
    if (Object.keys(next).length) return

    const body = [
      `Name: ${name}`,
      `Firm or company: ${field('firm') || '—'}`,
      `Email: ${email}`,
      `Phone: ${field('phone') || '—'}`,
      `Enquirer type: ${enquirerType}`,
      `What they need: ${picked.length ? picked.join(', ') : '—'}`,
      '',
      field('message'),
    ].join('\n')

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Enquiry from ${name}`,
    )}&body=${encodeURIComponent(body)}`

    setSent(true)
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6 rounded-3xl border border-line bg-card p-[clamp(24px,4vw,40px)] shadow-card"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="f-name" label="Your name" error={errors.name}>
          <Input id="f-name" name="name" autoComplete="name" {...errorProps('f-name', errors.name)} />
        </Field>
        <Field id="f-firm" label="Firm or company">
          <Input id="f-firm" name="firm" autoComplete="organization" />
        </Field>
        <Field id="f-email" label="Email" error={errors.email}>
          <Input
            id="f-email"
            name="email"
            type="email"
            autoComplete="email"
            {...errorProps('f-email', errors.email)}
          />
        </Field>
        <Field id="f-phone" label="Phone (optional)">
          <Input id="f-phone" name="phone" type="tel" autoComplete="tel" />
        </Field>
      </div>

      <Field id="f-type" label="You are">
        <Select value={enquirerType} onValueChange={setEnquirerType}>
          <SelectTrigger id="f-type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {enquirerTypes.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <fieldset className="flex flex-col">
        <legend className="mb-2.5 text-[13.5px] font-medium text-foreground">What you need</legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {serviceOptions.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-line px-4 py-3 text-[14px] transition-colors duration-150 hover:bg-secondary/60 has-data-[state=checked]:border-gold/60 has-data-[state=checked]:bg-gold-soft"
            >
              <Checkbox
                checked={picked.includes(option)}
                onCheckedChange={(state) => toggleService(option, state === true)}
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

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

      <AnimatePresence>
        {sent && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            className="flex items-start gap-2.5 rounded-xl border border-gold/50 bg-gold-soft px-4 py-3 text-[14px] text-gold-ink"
          >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            Your mail client should have opened with the enquiry ready to send. If it did not, email
            us directly at {site.email}.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}
