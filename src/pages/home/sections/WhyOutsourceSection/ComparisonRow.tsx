import { Check, Minus } from 'lucide-react'
import type { comparison } from '@/content/proof'
import { columns, smallCaps } from './comparisonClasses'

type Row = (typeof comparison)['rows'][number]

interface ComparisonRowProps {
  row: Row
  /** Column names, repeated beside the values when the row stacks on phones. */
  inHouse: string
  probity: string
}

export function ComparisonRow({ row, inHouse, probity }: ComparisonRowProps) {
  return (
    <div role="row" className={`grid border-b border-line-soft last:border-b-0 ${columns}`}>
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
  )
}
