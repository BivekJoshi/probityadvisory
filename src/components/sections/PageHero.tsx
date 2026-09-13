import { useRef, useState, type ReactNode, type Ref } from 'react'
import { motion } from 'framer-motion'
import { Container, Eyebrow, Lede } from '@/components/layout/Container'
import { WordReveal } from '@/components/motion/WordReveal'
import { SceneMount } from '@/components/three/SceneMount'
import { HeroScene, TerrainScene } from '@/components/three/scenes'
import { hasWebGL } from '@/components/three/support'
import { formatTime, useMinute } from '@/hooks/useClock'
import { globeCaption } from '@/data/site'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  eyebrow: string
  title: string
  lede?: string
  highlight?: readonly string[]
  /** Set in a right-hand column on wide screens. */
  aside?: ReactNode
  /** Leave room at the bottom for a card that overlaps the hero's edge. */
  overlap?: boolean
  /**
   * The WebGL backdrop. `globe` puts the live Earth in the aside column and
   * keeps `aside` as its fallback for browsers without WebGL.
   */
  scene?: 'terrain' | 'globe'
  /** Rendered under the lede — calls to action, jump links. */
  children?: ReactNode
}

const ease = [0.16, 1, 0.3, 1] as const

/** A city tag the globe scene pins over its marker every frame. */
function CityLabel({
  ref,
  city,
  note,
  time,
  gold = false,
}: {
  ref: Ref<HTMLDivElement>
  city: string
  note: string
  time: string
  gold?: boolean
}) {
  return (
    <div ref={ref} className="absolute left-0 top-0 opacity-0 will-change-transform">
      <div className="-translate-x-1/2 -translate-y-[calc(100%+26px)] whitespace-nowrap rounded-xl border border-white/12 bg-navy-deep/70 px-3 py-2 shadow-[0_12px_30px_-12px_rgb(0_0_0/0.6)] backdrop-blur-md">
        <p className="flex items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-[0.16em] text-on-navy-muted">
          <span className={cn('size-1.5 rounded-full', gold ? 'bg-gold' : 'bg-on-navy')} />
          {city} · {note}
        </p>
        <p className="tabular mt-1.5 font-mono text-[18px] leading-none text-white">{time}</p>
      </div>
    </div>
  )
}

/** The navy masthead at the top of every page. */
export function PageHero({
  eyebrow,
  title,
  lede,
  highlight,
  aside,
  overlap,
  scene = 'terrain',
  children,
}: PageHeroProps) {
  const [webgl] = useState(hasWebGL)
  const globe = scene === 'globe' && webgl
  const anchor = useRef<HTMLDivElement>(null)
  const london = useRef<HTMLDivElement>(null)
  const kathmandu = useRef<HTMLDivElement>(null)
  const now = useMinute()

  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-on-navy">
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 -z-20 size-130 rounded-full bg-gold/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 -left-32 -z-20 size-110 rounded-full bg-navy/70 blur-3xl"
      />
      <SceneMount className="absolute inset-0 -z-10" fallback={<div className="bg-dots absolute inset-0" />}>
        {(active) =>
          globe ? (
            <HeroScene active={active} anchor={anchor} londonLabel={london} kathmanduLabel={kathmandu} />
          ) : (
            <TerrainScene active={active} leftFade={aside ? 0.55 : 0.8} />
          )
        }
      </SceneMount>

      {globe && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
          <CityLabel ref={london} city="London" note="Your practice" time={formatTime('Europe/London', now)} />
          <CityLabel
            ref={kathmandu}
            city="Kathmandu"
            note="Our team"
            time={formatTime('Asia/Kathmandu', now)}
            gold
          />
        </div>
      )}

      <Container
        className={cn(
          'pt-[clamp(56px,8vw,112px)]',
          overlap ? 'pb-[clamp(120px,13vw,176px)]' : 'pb-[clamp(56px,8vw,112px)]',
        )}
      >
        <div
          className={cn(
            'grid items-center gap-12',
            aside && 'lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16',
          )}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
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
                transition={{ duration: 0.7, delay: 0.3, ease }}
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

          {aside && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease }}
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
          )}
        </div>
      </Container>
    </section>
  )
}
