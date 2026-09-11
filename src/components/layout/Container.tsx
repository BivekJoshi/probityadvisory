import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mx-auto w-full max-w-[1180px] px-5 sm:px-7', className)} {...props} />
}

/** Standard vertical rhythm for a page band. */
export function Band({
  className,
  dark = false,
  ...props
}: HTMLAttributes<HTMLElement> & { dark?: boolean }) {
  return (
    <section
      className={cn(
        'border-t border-line-soft py-[clamp(52px,7.5vw,96px)]',
        dark && 'border-transparent bg-navy-deep text-on-navy',
        className,
      )}
      {...props}
    />
  )
}

/** The mono rule-and-label that opens nearly every block. */
export function Eyebrow({
  children,
  onDark = false,
  className,
}: {
  children: React.ReactNode
  onDark?: boolean
  className?: string
}) {
  return (
    <p
      className={cn(
        'mb-4 flex items-center gap-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.2em]',
        onDark ? 'text-gold' : 'text-gold-ink',
        className,
      )}
    >
      {children}
      <span
        className={cn('h-px max-w-[120px] flex-1', onDark ? 'bg-on-navy-line' : 'bg-line')}
        aria-hidden="true"
      />
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
        'max-w-[62ch] text-[17.5px] leading-[1.62]',
        onDark ? 'text-on-navy-muted' : 'text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

export function SectionTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn('text-[clamp(25px,3.4vw,36px)]', className)} {...props} />
}
