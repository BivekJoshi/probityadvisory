import { Checkbox } from '@/components/ui/checkbox'
import { serviceOptions } from '@/content/enquiry'

interface ServicePickerProps {
  picked: string[]
  onToggle: (value: string, checked: boolean) => void
}

/** "What you need": a checkbox card per service, any number of them ticked. */
export function ServicePicker({ picked, onToggle }: ServicePickerProps) {
  return (
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
              onCheckedChange={(state) => onToggle(option, state === true)}
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
