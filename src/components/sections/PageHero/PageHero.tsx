import { useRef, useState, type ReactNode } from 'react'
import { Container } from '@/components/common'
import { hasWebGL } from '@/features/three'
import { cn } from '@/lib/utils'
import { GlobeLabels } from './GlobeLabels'
import { HeroAside } from './HeroAside'
import { HeroBackdrop } from './HeroBackdrop'
import { HeroCopy } from './HeroCopy'

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

  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-on-navy">
      <HeroBackdrop
        globe={globe}
        anchor={anchor}
        london={london}
        kathmandu={kathmandu}
        leftFade={aside ? 0.55 : 0.8}
      />
      {globe && <GlobeLabels london={london} kathmandu={kathmandu} />}

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
          <HeroCopy eyebrow={eyebrow} title={title} highlight={highlight} lede={lede}>
            {children}
          </HeroCopy>

          {aside && <HeroAside aside={aside} globe={globe} anchor={anchor} />}
        </div>
      </Container>
    </section>
  )
}
