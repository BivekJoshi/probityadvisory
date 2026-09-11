import { motion, useReducedMotion } from 'framer-motion'
import { workingPatterns } from '@/data/site'
import { cn } from '@/lib/utils'

const tone = {
  uk: 'bg-navy',
  np: 'bg-teal',
  gold: 'bg-gold',
} as const

const ticks = ['00:00', '06:00', '12:00', '18:00', '24:00']

/**
 * Twenty-four-hour bars showing the two shift patterns practices ask for.
 * Narrow screens print the range under the bar, since it will not fit inside it.
 */
export function OverlapChart() {
  const reduced = useReducedMotion()

  return (
    <div className="rounded-md border border-line bg-card px-5 pb-5 pt-6 sm:px-6">
      {workingPatterns.map((row, i) => (
        <div
          key={row.label}
          className="mb-4 grid items-center gap-1.5 sm:mb-3 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-4"
        >
          <span className="font-mono text-[11px] uppercase leading-[1.4] tracking-[0.1em] text-muted-foreground sm:text-right">
            {row.label} <span className="sm:hidden">· </span>
            <br className="hidden sm:block" />
            {row.sub}
          </span>

          <div>
            <div className="relative h-[26px] overflow-hidden rounded-sm bg-secondary">
              <motion.div
                className={cn('absolute inset-y-0 flex items-center rounded-sm pl-2.5', tone[row.tone])}
                style={{ left: `${row.left}%` }}
                initial={reduced ? { width: `${row.width}%` } : { width: 0 }}
                whileInView={{ width: `${row.width}%` }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.12 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* only legible inside the bar once there is room for it */}
                <span
                  className={cn(
                    'tabular hidden whitespace-nowrap font-mono text-[10.5px] lg:inline',
                    row.tone === 'gold' ? 'font-medium text-[#20180A]' : 'text-white',
                  )}
                >
                  {row.range}
                </span>
              </motion.div>
            </div>
            <p className="tabular mt-1.5 font-mono text-[10.5px] leading-[1.5] text-muted-foreground lg:hidden">
              {row.range}
            </p>
          </div>
        </div>
      ))}

      <div className="grid gap-2 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-4">
        <span aria-hidden="true" className="hidden sm:block" />
        <div className="relative h-[18px]">
          {ticks.map((tick, i) => (
            <span
              key={tick}
              className={cn(
                'tabular absolute top-0 font-mono text-[10px] text-muted-foreground',
                i === 0 && 'left-0',
                i === ticks.length - 1 && 'right-0',
                i > 0 && i < ticks.length - 1 && '-translate-x-1/2',
              )}
              style={
                i > 0 && i < ticks.length - 1 ? { left: `${i * 25}%` } : undefined
              }
            >
              {tick}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-2.5 border-t border-line-soft pt-3 text-[12.5px] leading-[1.6] text-muted-foreground">
        Hours shown in British Summer Time. Run overnight, work lands finished before you open and
        you still get roughly four hours of live overlap each morning. Run aligned, the team is on
        your clock for the whole of your working day. Anything between the two — a split shift,
        cover through your January, a fixed daily hand-back time — is a matter of agreeing it.
      </p>
    </div>
  )
}
