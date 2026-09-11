import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-md font-sans font-medium transition-[background,color,border-color,filter,box-shadow] duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        gold: 'bg-gold text-primary-foreground border border-gold hover:brightness-110 shadow-[0_1px_0_rgba(255,255,255,0.25)_inset]',
        navy: 'bg-navy-deep text-on-navy border border-navy-deep hover:bg-navy',
        outline: 'border border-line bg-transparent text-foreground hover:border-gold hover:bg-gold-soft',
        'outline-dark':
          'border border-on-navy/30 bg-transparent text-on-navy hover:border-gold hover:bg-gold/15',
        ghost: 'bg-transparent hover:bg-secondary text-foreground',
        link: 'bg-transparent text-gold-ink underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        sm: 'h-9 px-4 text-[13.5px]',
        md: 'h-11 px-5 text-[14.5px]',
        lg: 'h-12 px-7 text-[15px]',
        icon: 'size-10',
      },
    },
    defaultVariants: { variant: 'gold', size: 'md' },
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

export { Button, buttonVariants }
