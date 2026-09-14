import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const tones = {
  ground: '',
  card: 'border-y border-line-soft bg-card',
  dark: 'bg-forest-deep text-on-forest',
} as const

/** Standard vertical rhythm for a page section. */
export function Band({
  className,
  tone = 'ground',
  ...props
}: HTMLAttributes<HTMLElement> & { tone?: keyof typeof tones }) {
  return <section className={cn('py-[clamp(64px,8vw,112px)]', tones[tone], className)} {...props} />
}
