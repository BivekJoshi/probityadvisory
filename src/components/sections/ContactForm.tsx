import { useState, type FormEvent } from 'react'
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
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()

    const next: Errors = {}
    if (!name) next.name = 'Please tell us your name.'
    if (!email) next.email = 'We need an email address to reply to.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'That email does not look right.'

    setErrors(next)
    if (Object.keys(next).length) return

    const body = [
      `Name: ${name}`,
      `Firm or company: ${String(data.get('firm') ?? '') || '—'}`,
      `Email: ${email}`,
      `Phone: ${String(data.get('phone') ?? '') || '—'}`,
      `Enquirer type: ${enquirerType}`,
      `What they need: ${picked.length ? picked.join(', ') : '—'}`,
      '',
      String(data.get('message') ?? ''),
    ].join('\n')

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Enquiry from ${name}`,
    )}&body=${encodeURIComponent(body)}`

    setSent(true)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="f-name">Your name</Label>
          <Input
            id="f-name"
            name="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'err-name' : undefined}
          />
          {errors.name && (
            <p id="err-name" className="text-[12.5px] text-destructive">
              {errors.name}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="f-firm">Firm or company</Label>
          <Input id="f-firm" name="firm" autoComplete="organization" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="f-email">Email</Label>
          <Input
            id="f-email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'err-email' : undefined}
          />
          {errors.email && (
            <p id="err-email" className="text-[12.5px] text-destructive">
              {errors.email}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="f-phone">Phone (optional)</Label>
          <Input id="f-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="f-type">You are</Label>
        <Select value={enquirerType} onValueChange={setEnquirerType}>
          <SelectTrigger id="f-type" aria-label="You are">
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
      </div>

      <fieldset className="flex flex-col gap-3 border-0 p-0">
        <legend className="mb-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          What you need
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {serviceOptions.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-2.5 text-[14px] text-foreground"
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

      <div className="flex flex-col gap-2">
        <Label htmlFor="f-msg">Anything we should know</Label>
        <Textarea
          id="f-msg"
          name="message"
          placeholder="Volumes, software, when you would want to start — or just tell us what is going wrong."
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="gold" size="lg">
          Send enquiry
          <Send />
        </Button>
        <p className="text-[12.5px] text-muted-foreground">
          We will only use these details to reply to you. No lists, no forwarding.
        </p>
      </div>

      <AnimatePresence>
        {sent && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            className="flex items-center gap-2.5 rounded-md border border-gold bg-gold-soft px-4 py-3 text-[14px] text-gold-ink"
          >
            <CheckCircle2 className="size-4 shrink-0" />
            Your mail client should have opened with the enquiry ready to send. If it did not, email
            us directly at {site.email}.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}
