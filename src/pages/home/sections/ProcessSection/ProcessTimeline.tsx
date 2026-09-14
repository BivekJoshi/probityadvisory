import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Reveal } from '@/components/motion'
import { processSteps } from '@/content/process'

/**
 * Four numbered steps on a rail that fills with green as the block scrolls
 * past — horizontal from tablet up, vertical on phones.
 */
export function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.6'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden="true"
        className="absolute bottom-5 left-5 top-5 w-px bg-line md:bottom-auto md:right-0 md:h-px md:w-auto"
      >
        <motion.div style={{ scaleX: progress }} className="hidden size-full origin-left bg-green md:block" />
        <motion.div style={{ scaleY: progress }} className="size-full origin-top bg-green md:hidden" />
      </div>

      <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
        {processSteps.map((step, i) => (
          <Reveal
            as="li"
            key={step.n}
            delay={i * 0.08}
            className="grid grid-cols-[40px_minmax(0,1fr)] gap-5 md:block"
          >
            <span className="grid size-10 place-items-center rounded-full border border-line bg-card font-mono text-[13px] font-medium text-green-ink shadow-card">
              {step.n}
            </span>
            <div className="md:mt-6 md:pr-4">
              <h3 className="text-[19px]">{step.title}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-muted-foreground">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  )
}
