import { Container } from '@/components/common'
import { Stagger, StaggerItem } from '@/components/motion'
import type { Principal } from '@/content/team'

/** Three figures from the bio, on a card that overlaps the bottom edge of the hero. */
export function PortfolioHighlights({ person }: { person: Principal }) {
  return (
    <Container className="relative z-10 -mt-16">
      <Stagger
        as="dl"
        className="grid divide-y divide-line-soft overflow-hidden rounded-2xl border border-line bg-card shadow-lift md:grid-cols-3 md:divide-x md:divide-y-0"
      >
        {person.highlights.map((item) => (
          <StaggerItem key={item.label} className="relative flex flex-col-reverse justify-end gap-3 p-6 sm:p-7">
            <span aria-hidden="true" className="absolute left-0 top-7 h-9 w-0.75 rounded-r-full bg-green" />
            <dt className="max-w-[30ch] text-[14px] leading-normal text-muted-foreground">{item.label}</dt>
            <dd className="tabular font-display text-[clamp(30px,3.4vw,42px)] font-semibold leading-none text-foreground">
              {item.value}
            </dd>
          </StaggerItem>
        ))}
      </Stagger>
    </Container>
  )
}
