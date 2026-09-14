import { Band, Container, SectionHeader } from '@/components/common'
import { Stagger, StaggerItem } from '@/components/motion'
import type { Principal } from '@/content/team'
import { cn } from '@/lib/utils'

/** The career as a rail: period labels left of the line on wide screens, above each step on narrow ones. */
export function CareerSection({ person }: { person: Principal }) {
  const firstName = person.name.split(' ')[0]
  const lastStep = person.career.length - 1

  return (
    <Band tone="card">
      <Container>
        <SectionHeader eyebrow="Career" title={`How ${firstName} got here.`} />
        <Stagger as="ol" step={0.1} className="max-w-220">
          {person.career.map((step, i) => (
            <StaggerItem
              as="li"
              key={step.title}
              className="grid grid-cols-[24px_minmax(0,1fr)] gap-x-5 md:grid-cols-[150px_24px_minmax(0,1fr)] md:gap-x-8"
            >
              <p className="col-start-2 font-mono text-[12px] uppercase tracking-widest text-green-ink md:col-start-1 md:row-start-1 md:pt-1 md:text-right">
                {step.when}
              </p>

              <div aria-hidden="true" className="relative col-start-1 row-span-2 row-start-1 flex justify-center md:col-start-2">
                <span
                  className={cn(
                    'relative z-10 mt-0.5 grid size-6 place-items-center rounded-full border',
                    i === lastStep ? 'border-green bg-green' : 'border-green/40 bg-card',
                  )}
                >
                  <span className={cn('size-2 rounded-full', i === lastStep ? 'bg-primary-foreground' : 'bg-green')} />
                </span>
                {i < lastStep && <span className="absolute bottom-0 top-7 w-px bg-line" />}
              </div>

              <div className={cn('col-start-2 pt-1.5 md:col-start-3 md:row-start-1 md:pt-0', i < lastStep && 'pb-10')}>
                <h3 className="text-[19px]">{step.title}</h3>
                <p className="mt-2 max-w-[62ch] text-[15px] leading-[1.65] text-muted-foreground">{step.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Band>
  )
}
