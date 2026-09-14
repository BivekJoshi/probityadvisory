import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { brandEase } from './easing'

interface WordRevealProps {
  text: string
  className?: string
  /** Words to tint green, matched case-insensitively without punctuation. */
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
  // "\n" in the text starts a new line; word indices run across lines so the stagger is continuous
  let index = 0
  const lines = text.split('\n').map((line) =>
    line.split(' ').map((word) => ({ word, i: index++ })),
  )
  const lit = new Set(highlight.map(clean))

  return (
    <Tag className={className}>
      <span className="sr-only">{text.replace(/\n/g, ' ')}</span>
      <span aria-hidden="true">
        {lines.map((words, l) => (
          <span key={l} className={cn(lines.length > 1 && 'block')}>
            {words.map(({ word, i }, w) => (
              <Fragment key={i}>
                {/* padding keeps descenders from being clipped by the mask */}
                <span className="mb-[-0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <motion.span
                    className={cn('inline-block', lit.has(clean(word)) && 'text-green')}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 0.8, delay: delay + i * 0.05, ease: brandEase }}
                  >
                    {word}
                  </motion.span>
                </span>
                {w < words.length - 1 && ' '}
              </Fragment>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  )
}
