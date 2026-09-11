import { motion } from 'framer-motion'
import { useClock, useTimeDifference } from '@/hooks/useClock'
import { cn } from '@/lib/utils'

interface ClockPanelProps {
  className?: string
  /** Swap the footer note for the live London → Kathmandu gap. */
  showDifference?: boolean
}

function ClockRow({ city, time }: { city: string; time: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-[18px] py-[15px]">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-on-navy-muted">
        {city}
      </span>
      <motion.span
        key={time}
        initial={{ opacity: 0.35 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="tabular font-mono text-[27px] font-medium tracking-[-0.01em] text-white"
      >
        {time}
      </motion.span>
    </div>
  )
}

export function ClockPanel({ className, showDifference = false }: ClockPanelProps) {
  const london = useClock('Europe/London')
  const kathmandu = useClock('Asia/Kathmandu')
  const difference = useTimeDifference('Europe/London', 'Asia/Kathmandu')

  return (
    <div
      className={cn(
        'divide-y divide-[color:var(--on-navy-line)] rounded-md border border-on-navy-line bg-white/[0.03]',
        className,
      )}
    >
      <ClockRow city="London" time={london} />
      <ClockRow city="Kathmandu" time={kathmandu} />
      <div className="bg-gold/[0.09] px-[18px] py-3">
        {showDifference ? (
          <p className="text-[12.5px] leading-[1.5] text-on-navy-muted">
            Right now the difference is{' '}
            <b className="font-mono font-medium text-gold">{difference}</b>.
          </p>
        ) : (
          <p className="text-[12.5px] leading-[1.5] text-on-navy-muted">
            Nepal runs at <b className="font-mono font-medium text-gold">UTC+05:45</b>, and we set
            our hours to suit yours — an overnight run that lands before you open, or a team sitting
            alongside you through your whole working day.
          </p>
        )}
      </div>
    </div>
  )
}
