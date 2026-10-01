import { useMinute } from '@/hooks/useMinute'
import { zoneGap } from '@/lib/time'
import { OverlapRow } from './OverlapRow'
import { TimeAxis } from './TimeAxis'
import { londonTimeName, overnightOverlap, workingPatterns } from './workingDay'

const numbers = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']

/**
 * Twenty-four-hour bars showing the two shift patterns practices ask for, worked
 * out from the live London–Kathmandu gap, so they move when UK clocks change.
 * Narrow screens print the range under the bar, since it will not fit inside.
 */
export function OverlapChart() {
  const now = useMinute()
  const gap = zoneGap('Europe/London', 'Asia/Kathmandu', now)
  const overlapHours = Math.round(overnightOverlap(gap) / 60)

  return (
    <div className="rounded-2xl border border-line bg-card p-6 shadow-card sm:p-8">
      <div className="flex flex-col gap-5">
        {workingPatterns(gap).map((row, i) => (
          <OverlapRow key={row.label} row={row} index={i} />
        ))}
        <TimeAxis />
      </div>

      <p className="mt-7 border-t border-line-soft pt-5 text-[14px] leading-[1.65] text-muted-foreground">
        Hours shown in {londonTimeName(now)}. Run overnight, work lands finished before you open
        and you still get roughly {numbers[overlapHours] ?? overlapHours} hour
        {overlapHours === 1 ? '' : 's'} of live overlap each morning. Run aligned, the team is on
        your clock for the whole of your working day. Anything between the two — a split shift,
        cover through your January, a fixed daily hand-back time — is a matter of agreeing it.
      </p>
    </div>
  )
}
