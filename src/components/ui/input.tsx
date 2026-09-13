import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'flex h-11 w-full rounded-md border border-input bg-background px-3.5 py-2 text-[15px] text-foreground',
        'transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground/70',
        'focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/25 focus-visible:outline-none',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  ),
)
Input.displayName = 'Input'

export { Input }
