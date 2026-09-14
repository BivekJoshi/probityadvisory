import { workingPatterns } from '@/content/timeZones'
import { OverlapRow } from './OverlapRow'
import { TimeAxis } from './TimeAxis'

/**
 * Twenty-four-hour bars showing the two shift patterns practices ask for.
 * Narrow screens print the range under the bar, since it will not fit inside.
 */
export function OverlapChart() {
  return (
    <div className="rounded-2xl border border-line bg-card p-6 shadow-card sm:p-8">
      <div className="flex flex-col gap-5">
        {workingPatterns.map((row, i) => (
          <OverlapRow key={row.label} row={row} index={i} />
        ))}
        <TimeAxis />
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
