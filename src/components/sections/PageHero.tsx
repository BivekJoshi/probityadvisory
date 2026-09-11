import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Container, Eyebrow, Lede } from '@/components/layout/Container'
import { WordReveal } from '@/components/motion/WordReveal'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  eyebrow: string
  title: string
  lede?: string
  highlight?: string[]
  aside?: ReactNode
  className?: string
}

/** The compact navy masthead used at the top of every interior page. */
export function PageHero({
  eyebrow,
  title,
  lede,
  highlight,
  aside,
  className,
}: PageHeroProps) {
  const reduced = useReducedMotion()

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-navy-deep py-[clamp(44px,5.5vw,72px)] text-on-navy',
        className,
      )}
    >
      {/* soft gold wash bleeding in from the right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-gold/[0.07] blur-3xl"
      />
      <Container className="relative">
        <div
          className={cn(
            'grid items-start gap-[clamp(28px,5vw,56px)]',
            aside && 'lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]',
          )}
        >
          <div>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Eyebrow onDark>{eyebrow}</Eyebrow>
            </motion.div>

            <WordReveal
              as="h1"
              text={title}
              highlight={highlight}
              delay={0.1}
              className="text-[clamp(29px,4.2vw,46px)] tracking-[-0.015em] text-white"
            />

            {lede && (
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <Lede onDark className="mt-5">
                  {lede}
                </Lede>
              </motion.div>
            )}
          </div>

          {aside && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {aside}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  )
}
