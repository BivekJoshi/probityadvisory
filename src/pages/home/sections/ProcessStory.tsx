import { useEffect, useRef, useState } from 'react'
import { useMotionValue, useMotionValueEvent, useScroll } from 'framer-motion'
import { Band, Container, SectionHeader } from '@/components/common'
import { LedgerScene, SceneMount, hasWebGL } from '@/features/three'
import { ProcessTimeline } from './ProcessTimeline'
import { processSteps } from '@/content/process'
import { cn } from '@/lib/utils'

const eyebrow = 'How the work moves'
const title = 'From first call to steady state.'

/**
 * The process as scroll-told story: a sticky 3D stage beside the four steps.
 * The stage position is read from where the step copy actually sits in the
 * viewport, so picture and words can never drift apart. Without WebGL it is
 * the plain timeline.
 */
export function ProcessStory() {
  const [webgl] = useState(hasWebGL)
  const steps = useRef<(HTMLElement | null)[]>([])
  const stage = useMotionValue(0)
  const [active, setActive] = useState(0)
  const { scrollY } = useScroll()

  const measure = () => {
    const centres = steps.current.map((el) => {
      const rect = el?.getBoundingClientRect()
      return rect ? rect.top + rect.height / 2 : 0
    })
    // phones read the steps below the sticky stage, so their focus line sits lower
    const focus = window.innerHeight * (window.matchMedia('(min-width: 1024px)').matches ? 0.5 : 0.74)
    const last = centres.length - 1
    let value = last
    if (focus <= centres[0]) value = 0
    else
      for (let i = 0; i < last; i++) {
        if (focus < centres[i + 1]) {
          value = i + (focus - centres[i]) / (centres[i + 1] - centres[i])
          break
        }
      }
    stage.set(value)
    setActive(Math.round(value))
  }

  useMotionValueEvent(scrollY, 'change', measure)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(measure, [])

  if (!webgl) {
    return (
      <Band>
        <Container>
          <SectionHeader eyebrow={eyebrow} title={title} />
          <ProcessTimeline />
        </Container>
      </Band>
    )
  }

  return (
    <section className="relative bg-navy-deep pt-[clamp(64px,8vw,112px)] text-on-navy">
      <Container>
        <SectionHeader onDark eyebrow={eyebrow} title={title} className="md:mb-6" />

        <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <div
            className={cn(
              'sticky top-16 z-10 h-[46vh] bg-navy-deep',
              'after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-12 after:h-12 after:bg-linear-to-b after:from-navy-deep after:to-transparent',
              'lg:top-[calc((100dvh_-_min(76dvh,680px))/2+32px)] lg:h-[min(76dvh,680px)] lg:self-start lg:bg-transparent lg:after:hidden',
            )}
          >
            <div className="relative size-full overflow-hidden lg:rounded-3xl lg:border lg:border-on-navy-line lg:bg-white/2">
              <SceneMount className="absolute inset-0">
                {(visible) => <LedgerScene active={visible} stage={stage} />}
              </SceneMount>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-6">
                <p className="font-mono text-[12px] tracking-[0.08em] text-on-navy-muted">
                  <span className="text-gold">{processSteps[active].n}</span> / 0{processSteps.length} ·{' '}
                  {processSteps[active].title}
                </p>
                <div className="flex gap-1.5" aria-hidden="true">
                  {processSteps.map((step, i) => (
                    <span
                      key={step.n}
                      className={cn(
                        'h-1 rounded-full transition-all duration-500',
                        i === active ? 'w-7 bg-gold' : 'w-3 bg-white/20',
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <ol className="relative pb-[18vh] pt-[6vh] lg:pb-[26vh] lg:pt-[14vh]">
            {processSteps.map((step, i) => (
              <li
                key={step.n}
                ref={(el) => {
                  steps.current[i] = el
                }}
                className="flex min-h-[60vh] flex-col justify-center lg:min-h-[78vh]"
              >
                <div
                  className={cn(
                    'transition-[opacity,translate] duration-700 ease-brand',
                    i === active ? 'opacity-100' : 'translate-y-2 opacity-30',
                  )}
                >
                  <span className="font-mono text-[13px] tracking-[0.08em] text-gold">
                    {step.n} / 0{processSteps.length}
                  </span>
                  <h3 className="mt-4 text-[clamp(28px,3.4vw,42px)] text-white">{step.title}</h3>
                  <p className="mt-4 max-w-[46ch] text-[17px] leading-[1.7] text-on-navy-muted">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
