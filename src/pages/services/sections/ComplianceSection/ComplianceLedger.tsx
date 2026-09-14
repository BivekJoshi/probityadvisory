import { Stagger, StaggerItem } from '@/components/motion'
import { complianceCalendar } from '@/content/services'

/** The UK compliance year, one dated row per deadline. */
export function ComplianceLedger() {
  return (
    <Stagger
      as="ol"
      step={0.05}
      className="divide-y divide-line-soft overflow-hidden rounded-2xl border border-line bg-card shadow-card"
    >
      {complianceCalendar.map((row) => (
        <StaggerItem
          as="li"
          key={row.when}
          className="grid items-center gap-2.5 px-5 py-4 transition-colors duration-200 hover:bg-secondary/60 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-6 sm:px-6"
        >
          <span className="tabular w-fit rounded-full bg-gold-soft px-3 py-1 font-mono text-[12.5px] font-medium text-gold-ink">
            {row.when}
          </span>
          <span className="text-[15px] leading-[1.55]">{row.what}</span>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
