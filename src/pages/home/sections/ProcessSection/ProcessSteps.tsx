import type { RefObject } from 'react'
import { processSteps } from '@/content/process'
import { cn } from '@/lib/utils'

interface ProcessStepsProps {
  /** Filled with each step's element, so the stage can be measured against them. */
  stepRefs: RefObject<(HTMLElement | null)[]>
  active: number
}

/** The four steps, each a screen tall; the one at the focus line is lit. */
export function ProcessSteps({ stepRefs, active }: ProcessStepsProps) {
  return (
    <ol className="relative pb-[18vh] pt-[6vh] lg:pb-[26vh] lg:pt-[14vh]">
      {processSteps.map((step, i) => (
        <li
          key={step.n}
          ref={(el) => {
            stepRefs.current[i] = el
          }}
          className="flex min-h-[60vh] flex-col justify-center lg:min-h-[78vh]"
        >
          <div
            className={cn(
              'transition-[opacity,translate] duration-700 ease-brand',
              i === active ? 'opacity-100' : 'translate-y-2 opacity-30',
            )}
          >
            <span className="font-mono text-[13px] tracking-[0.08em] text-green">
              {step.n} / 0{processSteps.length}
            </span>
            <h3 className="mt-4 text-[clamp(28px,3.4vw,42px)] text-white">{step.title}</h3>
            <p className="mt-4 max-w-[46ch] text-[17px] leading-[1.7] text-on-forest-muted">
              {step.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
