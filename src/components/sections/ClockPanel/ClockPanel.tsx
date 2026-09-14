import { useMinute } from '@/hooks/useMinute'
import { formatTime } from '@/lib/time'
import { cn } from '@/lib/utils'
import { CityClock } from './CityClock'
import { ClockNote } from './ClockNote'
import { RouteArc } from './RouteArc'

interface ClockPanelProps {
  className?: string
  /** Swap the footer note for the live London → Kathmandu gap. */
  showDifference?: boolean
}

/** Live London and Kathmandu clocks joined by the route the finished work takes. */
export function ClockPanel({ className, showDifference = false }: ClockPanelProps) {
  const now = useMinute()

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
        <CityClock name="London" time={formatTime('Europe/London', now)} />
        <RouteArc />
        <CityClock name="Kathmandu" time={formatTime('Asia/Kathmandu', now)} end />
      </div>

      <ClockNote now={now} showDifference={showDifference} />
    </div>
  )
}
