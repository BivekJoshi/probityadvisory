import type { HTMLAttributes, ReactNode } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mx-auto w-full max-w-300 px-5 sm:px-8', className)} {...props} />
}

const tones = {
  ground: '',
  card: 'border-y border-line-soft bg-card',
  dark: 'bg-navy-deep text-on-navy',
} as const

/** Standard vertical rhythm for a page section. */
export function Band({
  className,
  tone = 'ground',
  ...props
}: HTMLAttributes<HTMLElement> & { tone?: keyof typeof tones }) {
  return <section className={cn('py-[clamp(64px,8vw,112px)]', tones[tone], className)} {...props} />
}

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
        onDark ? 'border-on-navy-line bg-white/5 text-on-navy' : 'border-line bg-card text-foreground/80',
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
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
        onDark ? 'text-on-navy-muted' : 'text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

export function SectionTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn('text-[clamp(28px,3.6vw,42px)] tracking-[-0.015em]', className)} {...props} />
}

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  lede?: ReactNode
  /** A button or link set to the right of the heading on wide screens. */
  action?: ReactNode
  align?: 'start' | 'center'
  onDark?: boolean
  className?: string
}

/** Eyebrow, title and lede in the arrangement every section opens with. */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  action,
  align = 'start',
  onDark = false,
  className,
}: SectionHeaderProps) {
  const centred = align === 'center'
  return (
    <div
      className={cn(
        'mb-10 flex flex-col gap-6 md:mb-14',
        action && 'md:flex-row md:items-end md:justify-between',
        centred && 'items-center text-center',
        className,
      )}
    >
      <Reveal className={cn(centred && 'flex flex-col items-center')}>
        {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
        <SectionTitle className={cn(onDark && 'text-white')}>{title}</SectionTitle>
        {lede && (
          <Lede onDark={onDark} className="mt-4">
            {lede}
          </Lede>
        )}
      </Reveal>
      {action && (
        <Reveal delay={0.1} className="shrink-0">
          {action}
        </Reveal>
      )}
    </div>
  )
}
