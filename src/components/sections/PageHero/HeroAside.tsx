import type { ReactNode, RefObject } from 'react'
import { motion } from 'framer-motion'
import { brandEase } from '@/components/motion'
import { globeCaption } from '@/content/timeZones'

interface HeroAsideProps {
  /** The column's content — and, with the globe on, its fallback without WebGL. */
  aside: ReactNode
  globe: boolean
  anchor: RefObject<HTMLDivElement | null>
}

/** The right-hand hero column: the globe's slot and caption, or the page's own aside. */
export function HeroAside({ aside, globe, anchor }: HeroAsideProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.35, ease: brandEase }}
    >
      {globe ? (
        <figure className="mx-auto w-full max-w-140">
          {/* the globe scene centres and sizes itself on this empty square */}
          <div ref={anchor} className="aspect-square w-full" />
          <figcaption className="mx-auto -mt-4 max-w-[42ch] text-center text-[13px] leading-[1.6] text-on-navy-muted">
            {globeCaption}
          </figcaption>
        </figure>
      ) : (
        aside
      )}
    </motion.div>
  )
}
