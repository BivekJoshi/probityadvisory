import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface WordRevealProps {
  text: string
  className?: string
  /** Words to tint gold, matched case-insensitively without punctuation. */
  highlight?: string[]
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p'
}

const clean = (w: string) => w.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase()

/**
 * Headline that rises word by word. Used sparingly — hero and one or two
 * section heads per page, so it stays an accent rather than a tic.
 */
export function WordReveal({
  text,
  className,
  highlight = [],
  delay = 0,
  as: Tag = 'h1',
}: WordRevealProps) {
  const reduced = useReducedMotion()
  const words = text.split(' ')
  const lit = new Set(highlight.map(clean))

  if (reduced) {
    return (
      <Tag className={className}>
        {words.map((w, i) => (
          <span key={i} className={lit.has(clean(w)) ? 'text-gold' : undefined}>
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </Tag>
    )
  }

  return (
    <Tag className={cn(className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className={cn('inline-block', lit.has(clean(word)) && 'text-gold')}
              initial={{ y: '105%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{
                duration: 0.85,
                delay: delay + i * 0.055,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  )
}
