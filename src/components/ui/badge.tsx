import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-2 rounded-md border font-mono text-[12.5px] tracking-[0.04em] transition-colors',
  {
    variants: {
      variant: {
        default: 'border-line bg-card text-foreground',
        gold: 'border-gold bg-gold-soft text-gold-ink',
        dark: 'border-on-navy/25 bg-white/5 text-on-navy',
        outline: 'border-line bg-transparent text-muted-foreground',
      },
      size: {
        sm: 'px-3 py-1 text-[11.5px]',
        md: 'px-4 py-2',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
}

export { Badge, badgeVariants }
