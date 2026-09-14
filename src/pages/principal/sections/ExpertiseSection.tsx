import { Building2, MonitorCog } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Band, Container, SectionHeader } from '@/components/common'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import type { Principal } from '@/content/team'

export function ExpertiseSection({ person }: { person: Principal }) {
  const firstName = person.name.split(' ')[0]
  const groups = [
    { title: 'Sectors', Icon: Building2, items: person.sectors },
    { title: 'Software', Icon: MonitorCog, items: person.software },
  ].filter((group) => group.items?.length)

  return (
    <Band>
      <Container>
        <SectionHeader eyebrow="Areas of work" title={`What ${firstName} works on.`} />

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" step={0.06}>
          {person.focus.map((item, i) => (
            <StaggerItem
              key={item}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-card px-6 py-5 shadow-card transition-colors duration-300 hover:border-green/50"
            >
              <span className="font-display text-[17px] font-semibold">{item}</span>
              <span className="tabular font-mono text-[12px] text-muted-foreground transition-colors group-hover:text-green-ink">
                {String(i + 1).padStart(2, '0')}
              </span>
            </StaggerItem>
          ))}
        </Stagger>

        {groups.length > 0 && (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {groups.map(({ title, Icon, items }, i) => (
              <Reveal key={title} delay={i * 0.08} className="rounded-2xl border border-line bg-secondary/50 p-6 sm:p-7">
                <h3 className="flex items-center gap-2.5 text-[17px]">
                  <span className="grid size-9 place-items-center rounded-xl bg-green-soft text-green-ink">
                    <Icon className="size-4.5" />
                  </span>
                  {title}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {items?.map((item) => (
                    <li key={item}>
                      <Badge>{item}</Badge>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </Band>
  )
}
