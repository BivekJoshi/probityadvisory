import { Check, Minus } from 'lucide-react'
import { ProbityMark } from '@/components/icons'
import { Reveal } from '@/components/motion'
import { comparison } from '@/content/proof'

const columns = 'sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)]'
const smallCaps = 'text-[11.5px] font-semibold uppercase tracking-[0.12em]'

/**
 * Hiring a seat against buying the work, row by row. Three columns from tablet
 * up; on phones each row stacks and the column names move beside the values.
 */
export function ComparisonTable() {
  const [inHouse, probity] = comparison.columns

  return (
    <Reveal>
      <div
        role="table"
        aria-label={`${inHouse} compared with ${probity}`}
        className="overflow-hidden rounded-2xl border border-line bg-card shadow-card"
      >
        <div role="row" className={`hidden border-b border-line sm:grid ${columns}`}>
          <span role="columnheader" className="px-6 py-4">
            <span className="sr-only">Consideration</span>
          </span>
          <span role="columnheader" className={`px-6 py-4 text-muted-foreground ${smallCaps}`}>
            {inHouse}
          </span>
          <span
            role="columnheader"
            className={`flex items-center gap-2 bg-gold-soft px-6 py-4 text-gold-ink ${smallCaps}`}
          >
            <ProbityMark className="size-5" />
            {probity}
          </span>
        </div>

        {comparison.rows.map((row) => (
          <div
            key={row.label}
            role="row"
            className={`grid border-b border-line-soft last:border-b-0 ${columns}`}
          >
            <span
              role="rowheader"
              className="px-5 pt-5 font-display text-[17px] font-semibold leading-snug sm:px-6 sm:py-5"
            >
              {row.label}
            </span>
            <span
              role="cell"
              className="flex items-start gap-2.5 px-5 py-3 text-[15px] leading-normal text-muted-foreground sm:px-6 sm:py-5"
            >
              <Minus className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" />
              <span>
                <span className={`mb-0.5 block sm:hidden ${smallCaps}`}>{inHouse}</span>
                {row.inHouse}
              </span>
            </span>
            <span
              role="cell"
              className="mx-4 mb-5 flex items-start gap-2.5 rounded-xl bg-gold-soft px-4 py-3 text-[15px] font-medium leading-normal sm:m-0 sm:rounded-none sm:px-6 sm:py-5"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-gold-ink" />
              <span>
                <span className={`mb-0.5 block text-gold-ink sm:hidden ${smallCaps}`}>{probity}</span>
                {row.probity}
              </span>
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  )
}
