import type { MotionValue } from 'framer-motion'
import { LedgerScene, SceneMount } from '@/features/three'
import { processSteps } from '@/content/process'
import { cn } from '@/lib/utils'

interface ProcessStageProps {
  /** The continuous step position that drives the scene. */
  stage: MotionValue<number>
  /** The step nearest the focus line, named in the caption. */
  active: number
}

/** The sticky 3D stage, captioned with the step it is showing. */
export function ProcessStage({ stage, active }: ProcessStageProps) {
  return (
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
  )
}
