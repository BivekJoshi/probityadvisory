import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Eyebrow, Lede } from '@/components/common'
import { WordReveal, brandEase } from '@/components/motion'

interface HeroCopyProps {
  eyebrow: string
  title: string
  highlight?: readonly string[]
  lede?: string
  children?: ReactNode
}

/** Eyebrow, headline, lede and whatever the page sets beneath them, animated in on load. */
export function HeroCopy({ eyebrow, title, highlight, lede, children }: HeroCopyProps) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: brandEase }}
      >
        <Eyebrow onDark>{eyebrow}</Eyebrow>
      </motion.div>

      <WordReveal
        text={title}
        highlight={highlight}
        delay={0.1}
        className="max-w-[20ch] text-[clamp(36px,5.2vw,60px)] leading-[1.08] tracking-[-0.02em] text-white"
      />

      {(lede || children) && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: brandEase }}
        >
          {lede && (
            <Lede onDark className="mt-6">
              {lede}
            </Lede>
          )}
          {children && <div className="mt-9">{children}</div>}
        </motion.div>
      )}
    </div>
  )
}
