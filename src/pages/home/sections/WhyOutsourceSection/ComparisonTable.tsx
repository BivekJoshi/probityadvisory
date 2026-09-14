import { ProbityMark } from '@/components/icons'
import { Reveal } from '@/components/motion'
import { comparison } from '@/content/proof'
import { columns, smallCaps } from './comparisonClasses'
import { ComparisonRow } from './ComparisonRow'

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
          <ComparisonRow key={row.label} row={row} inHouse={inHouse} probity={probity} />
        ))}
      </div>
    </Reveal>
  )
}
