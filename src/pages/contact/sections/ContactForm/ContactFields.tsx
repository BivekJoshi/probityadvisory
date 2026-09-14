import { Input } from '@/components/ui/input'
import type { EnquiryErrors } from './enquiry'
import { Field } from './Field'
import { errorProps } from './fieldErrorProps'

/** Name, firm, email and phone; the two required fields show their errors. */
export function ContactFields({ errors }: { errors: EnquiryErrors }) {
  return (
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
  )
}
