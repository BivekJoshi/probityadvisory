import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** The small pill label that opens a block. */
export function Eyebrow({
  children,
  onDark = false,
  className,
}: {
  children: ReactNode
  onDark?: boolean
  className?: string
}) {
  return (
    <p
      className={cn(
        'mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12.5px] font-medium',
        onDark ? 'border-on-forest-line bg-white/5 text-on-forest' : 'border-line bg-card text-foreground/80',
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-green" aria-hidden="true" />
      {children}
    </p>
  )
}

export function Lede({
  className,
  onDark = false,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { onDark?: boolean }) {
  return (
    <p
      className={cn(
        'max-w-[60ch] text-[17px] leading-[1.65] sm:text-[18px]',
        onDark ? 'text-on-forest-muted' : 'text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

export function SectionTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn('text-[clamp(28px,3.6vw,42px)] tracking-[-0.015em]', className)} {...props} />
}
