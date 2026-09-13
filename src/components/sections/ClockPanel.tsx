import { useReducedMotion } from 'framer-motion'
import { formatDifference, formatTime, useMinute } from '@/hooks/useClock'
import { cn } from '@/lib/utils'

interface ClockPanelProps {
  className?: string
  /** Swap the footer note for the live London → Kathmandu gap. */
  showDifference?: boolean
}

/* Kathmandu sits on the right, London on the left; work travels right to left. */
const ARC = 'M6 44 Q100 -8 194 44'

function City({ name, time, end = false }: { name: string; time: string; end?: boolean }) {
  return (
    <div className={cn(end && 'text-right')}>
      <p className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-on-navy-muted">
        {name}
      </p>
      <p className="tabular mt-1.5 font-mono text-[clamp(24px,2.6vw,30px)] font-medium leading-none text-white">
        {time}
      </p>
    </div>
  )
}

/** Live London and Kathmandu clocks joined by the route the finished work takes. */
export function ClockPanel({ className, showDifference = false }: ClockPanelProps) {
  const now = useMinute()
  const reduced = useReducedMotion()

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-on-navy-line bg-white/4 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.7)] backdrop-blur-sm',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-on-navy-line px-5 py-3">
        <span className="flex items-center gap-2 text-[12.5px] font-medium text-on-navy-muted">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold/60" />
            <span className="relative inline-flex size-2 rounded-full bg-gold" />
          </span>
          Live time
        </span>
        <span className="font-mono text-[12px] text-gold">UTC+05:45</span>
      </div>

      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-end gap-3 px-5 pb-6 pt-7 sm:gap-5">
        <City name="London" time={formatTime('Europe/London', now)} />
        <svg viewBox="0 0 200 50" className="mb-2 w-full overflow-visible" aria-hidden="true">
          <path
            d={ARC}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="2 5"
            strokeLinecap="round"
            className="text-on-navy-muted/50"
          />
          <circle cx="6" cy="44" r="4" className="fill-on-navy" />
          <circle cx="194" cy="44" r="4" className="fill-gold" />
          {!reduced && (
            <circle r="3" className="fill-gold">
              <animateMotion
                dur="3.6s"
                repeatCount="indefinite"
                path={ARC}
                keyPoints="1;0"
                keyTimes="0;1"
                calcMode="linear"
              />
            </circle>
          )}
        </svg>
        <City name="Kathmandu" time={formatTime('Asia/Kathmandu', now)} end />
      </div>

      <p className="border-t border-on-navy-line bg-gold/7 px-5 py-3.5 text-[13px] leading-[1.55] text-on-navy-muted">
        {showDifference ? (
          <>
            Right now the difference is{' '}
            <b className="font-medium text-gold">
              {formatDifference('Europe/London', 'Asia/Kathmandu', now)}
            </b>
            .
          </>
        ) : (
          <>
            Nepal runs at <b className="font-mono font-medium text-gold">UTC+05:45</b>, and we set
            our hours to suit yours — an overnight run that lands before you open, or a team sitting
            alongside you through your whole working day.
          </>
        )}
      </p>
    </div>
  )
}
