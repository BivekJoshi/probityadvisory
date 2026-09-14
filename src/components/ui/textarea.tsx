import * as React from 'react'
import { cn } from '@/lib/utils'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'flex min-h-33 w-full rounded-md border border-input bg-background px-3.5 py-3 text-[15px] text-foreground',
      'transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground/70 resize-y',
      'focus-visible:border-green focus-visible:ring-2 focus-visible:ring-green/25 focus-visible:outline-none',
      'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
))
Textarea.displayName = 'Textarea'

export { Textarea }
