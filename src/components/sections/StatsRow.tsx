import { Counter } from '@/components/motion/Counter'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'
import { stats } from '@/data/site'
import { cn } from '@/lib/utils'

/** Figures that count up the first time they scroll into view. */
export function StatsRow({ dark = false }: { dark?: boolean }) {
  return (
    <Stagger className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4" step={0.1}>
      {stats.map((stat) => (
        <StaggerItem
          key={stat.label}
          className={cn(
            'group px-6 py-7 transition-colors duration-300',
            dark ? 'bg-navy-deep hover:bg-navy' : 'bg-background hover:bg-card',
          )}
        >
          <p
            className={cn(
              /* fixed height keeps every label on the same baseline across the row */
              'tabular flex h-[clamp(30px,4vw,44px)] items-end font-display font-semibold leading-none',
              stat.text
                ? 'font-mono text-[clamp(21px,2.6vw,28px)] tracking-[-0.01em]'
                : 'text-[clamp(30px,4vw,44px)]',
              dark ? 'text-white' : 'text-foreground',
            )}
          >
            {stat.text ? (
              <>
                <span className="text-gold">UTC</span>
                {stat.text.slice(3)}
              </>
            ) : (
              <>
                <Counter to={stat.value ?? 0} />
                {stat.suffix && <span className="text-gold">{stat.suffix}</span>}
              </>
            )}
          </p>
          <p
            className={cn(
              'mt-3 max-w-[28ch] text-[13.5px] leading-[1.55]',
              dark ? 'text-on-navy-muted' : 'text-muted-foreground',
            )}
          >
            {stat.label}
          </p>
          <span
            aria-hidden="true"
            className="mt-4 block h-px w-8 bg-gold transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-16"
          />
        </StaggerItem>
      ))}
    </Stagger>
  )
}
