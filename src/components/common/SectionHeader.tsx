import type { ReactNode } from 'react'
import { Reveal } from '@/components/motion'
import { cn } from '@/lib/utils'
import { Eyebrow, Lede, SectionTitle } from './Typography'

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
