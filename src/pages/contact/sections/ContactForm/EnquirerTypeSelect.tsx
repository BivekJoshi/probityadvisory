import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { enquirerTypes } from '@/content/enquiry'

interface EnquirerTypeSelectProps {
  /** Matches the surrounding `Field`, so its label points at the trigger. */
  id: string
  value: string
  onChange: (value: string) => void
}

export function EnquirerTypeSelect({ id, value, onChange }: EnquirerTypeSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id}>
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
  )
}
