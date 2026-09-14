import { Stagger, StaggerItem } from '@/components/motion'
import { stats } from '@/content/proof'

/** The four figures, as a hairline-divided card. */
export function StatsRow() {
  return (
    <Stagger
      as="dl"
      className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat) => (
        // dt stays first in the markup; the figure is lifted above it visually
        <StaggerItem key={stat.label} className="flex flex-col-reverse justify-end gap-3 bg-card p-7">
          <dt className="max-w-[26ch] text-[14px] leading-normal text-muted-foreground">{stat.label}</dt>
          <dd className="tabular font-display text-[clamp(34px,3.6vw,44px)] font-semibold leading-none text-foreground">
            {stat.value}
          </dd>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
