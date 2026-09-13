import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface WordRevealProps {
  text: string
  className?: string
  /** Words to tint gold, matched case-insensitively without punctuation. */
  highlight?: readonly string[]
  delay?: number
  as?: 'h1' | 'h2'
}

const clean = (word: string) => word.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase()

/**
 * Headline that rises word by word. Used for page mastheads only, so it
 * stays an accent rather than a tic.
 */
export function WordReveal({
  text,
  className,
  highlight = [],
  delay = 0,
  as: Tag = 'h1',
}: WordRevealProps) {
  const words = text.split(' ')
  const lit = new Set(highlight.map(clean))

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={i}>
            {/* padding keeps descenders from being clipped by the mask */}
            <span className="mb-[-0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span
                className={cn('inline-block', lit.has(clean(word)) && 'text-gold')}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.8, delay: delay + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 && ' '}
          </Fragment>
        ))}
      </span>
    </Tag>
  )
}
