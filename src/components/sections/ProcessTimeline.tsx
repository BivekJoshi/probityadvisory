import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Reveal } from '@/components/motion/Reveal'
import { processSteps } from '@/data/site'

/**
 * Four steps with a gold rule that fills as the block scrolls past —
 * the strongest single piece of motion on the home page.
 */
export function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.55'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })
  const scaleX = useTransform(progress, [0, 1], [0, 1])
  const scaleY = scaleX

  return (
    <div ref={ref} className="relative">
      {/* horizontal rail — desktop */}
      <div className="relative mb-px hidden h-px w-full bg-line md:block">
        <motion.div style={{ scaleX }} className="h-full origin-left bg-gold" />
      </div>

      <div className="relative grid overflow-hidden rounded-md rounded-t-none border border-line bg-card md:grid-cols-4 md:rounded-t-none">
        {/* vertical rail — mobile */}
        <div className="absolute inset-y-0 left-0 w-px bg-line md:hidden">
          <motion.div style={{ scaleY }} className="h-full w-full origin-top bg-gold" />
        </div>

        {processSteps.map((step, i) => (
          <Reveal
            key={step.n}
            delay={i * 0.09}
            className="flex flex-col gap-2.5 border-b border-line px-6 py-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
          >
            <span className="font-mono text-[11px] tracking-[0.16em] text-gold-ink">{step.n}</span>
            <h3 className="text-[16.5px]">{step.title}</h3>
            <p className="text-[13.5px] leading-[1.6] text-muted-foreground">{step.body}</p>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
