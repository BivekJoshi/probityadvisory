import { Reveal } from '@/components/motion/Reveal'
import { complianceCalendar } from '@/data/site'

/** The UK compliance year, set on ruled ledger paper. */
export function ComplianceLedger() {
  return (
    <div className="ledger-rule overflow-hidden rounded-md border border-line bg-card">
      {complianceCalendar.map((row, i) => (
        <Reveal
          key={row.when}
          delay={i * 0.045}
          distance={12}
          className="group grid items-baseline gap-1 border-t border-line-soft px-5 py-3.5 transition-colors duration-200 first:border-t-0 hover:bg-gold-soft sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-5"
        >
          <span className="tabular font-mono text-[13.5px] font-medium text-gold-ink">
            {row.when}
          </span>
          <span className="text-[14.5px] leading-[1.5] text-foreground">{row.what}</span>
        </Reveal>
      ))}
    </div>
  )
}
