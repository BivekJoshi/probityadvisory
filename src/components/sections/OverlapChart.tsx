import { motion, useReducedMotion } from 'framer-motion'
import { workingPatterns } from '@/data/site'
import { cn } from '@/lib/utils'

const tone = {
  uk: 'bg-chart-uk text-white',
  np: 'bg-teal text-white',
  gold: 'bg-gold font-medium text-primary-foreground',
} as const

const ticks = ['00:00', '06:00', '12:00', '18:00', '24:00']

/**
 * Twenty-four-hour bars showing the two shift patterns practices ask for.
 * Narrow screens print the range under the bar, since it will not fit inside.
 * Bars grow by width rather than transform, so reduced motion is checked here.
 */
export function OverlapChart() {
  const reduced = useReducedMotion()

  return (
    <div className="rounded-2xl border border-line bg-card p-6 shadow-card sm:p-8">
      <div className="flex flex-col gap-5">
        {workingPatterns.map((row, i) => (
          <div
            key={row.label}
            className="grid items-center gap-2 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-5"
          >
            <p className="text-[13.5px] leading-snug sm:text-right">
              <span className="font-semibold text-foreground">{row.label}</span>{' '}
              <span className="text-muted-foreground sm:block">{row.sub}</span>
            </p>

            <div>
              <div className="relative h-9 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className={cn('absolute inset-y-1 flex items-center rounded-full px-3', tone[row.tone])}
                  style={{ left: `${row.left}%` }}
                  initial={{ width: reduced ? `${row.width}%` : 0 }}
                  whileInView={{ width: `${row.width}%` }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="tabular hidden whitespace-nowrap font-mono text-[11px] lg:inline">
                    {row.range}
                  </span>
                </motion.div>
              </div>
              <p className="tabular mt-1.5 font-mono text-[11.5px] leading-normal text-muted-foreground lg:hidden">
                {row.range}
              </p>
            </div>
          </div>
        ))}

        <div className="grid sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-5">
          <span aria-hidden="true" className="hidden sm:block" />
          <div className="tabular relative h-4 font-mono text-[11px] text-muted-foreground">
            {ticks.map((tick, i) => {
              const edge = i === 0 ? 'left-0' : i === ticks.length - 1 ? 'right-0' : '-translate-x-1/2'
              const inner = i > 0 && i < ticks.length - 1
              return (
                <span
                  key={tick}
                  className={cn('absolute top-0', edge)}
                  style={inner ? { left: `${(i / (ticks.length - 1)) * 100}%` } : undefined}
                >
                  {tick}
                </span>
              )
            })}
          </div>
        </div>
      </div>

      <p className="mt-7 border-t border-line-soft pt-5 text-[14px] leading-[1.65] text-muted-foreground">
        Hours shown in British Summer Time. Run overnight, work lands finished before you open and
        you still get roughly four hours of live overlap each morning. Run aligned, the team is on
        your clock for the whole of your working day. Anything between the two — a split shift,
        cover through your January, a fixed daily hand-back time — is a matter of agreeing it.
      </p>
    </div>
  )
}
