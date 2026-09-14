import { motion, useReducedMotion } from 'framer-motion'
import { brandEase } from '@/components/motion'
import type { WorkingPattern } from '@/content/timeZones'
import { cn } from '@/lib/utils'

const tone = {
  uk: 'bg-chart-uk text-white',
  np: 'bg-teal text-white',
  green: 'bg-green font-medium text-primary-foreground',
} as const

/**
 * One shift pattern as a bar across the day. Bars grow by width rather than
 * transform, so reduced motion is checked here.
 */
export function OverlapRow({ row, index }: { row: WorkingPattern; index: number }) {
  const reduced = useReducedMotion()

  return (
    <div className="grid items-center gap-2 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-5">
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
            transition={{ duration: 0.9, delay: 0.1 + index * 0.14, ease: brandEase }}
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
  )
}
