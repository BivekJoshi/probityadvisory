import { cn } from '@/lib/utils'

const ticks = ['00:00', '06:00', '12:00', '18:00', '24:00']

/** Hour marks under the bars, aligned to the bar track rather than the label column. */
export function TimeAxis() {
  return (
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
  )
}
