import type { ReactNode } from 'react'
import { Label } from '@/components/ui/label'

interface FieldProps {
  id: string
  label: string
  error?: string
  children: ReactNode
}

/** Label, control and error message; the control points at the error by `${id}-error`. */
export function Field({ id, label, error, children }: FieldProps) {
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
