import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-sans font-medium outline-none',
    'transition-[background-color,color,border-color,filter,transform] duration-200 active:scale-[0.98]',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    /* a trailing arrow nudges forward on hover */
    '[&>svg:last-child]:transition-transform hover:[&>svg:last-child]:translate-x-0.5',
  ],
  {
    variants: {
      variant: {
        green: 'bg-green text-primary-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.25)] hover:brightness-110',
        outline: 'border border-line bg-card text-foreground hover:border-foreground/25 hover:bg-secondary',
        'outline-dark':
          'border border-white/20 bg-white/5 text-on-forest hover:border-white/35 hover:bg-white/10',
      },
      size: {
        sm: 'h-9 px-4 text-[13.5px]',
        md: 'h-11 px-5 text-[14.5px]',
        lg: 'h-12 px-6 text-[15px]',
      },
    },
    defaultVariants: { variant: 'green', size: 'md' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button }
