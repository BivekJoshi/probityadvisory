import { Container } from '@/components/common'
import { Stagger, StaggerItem } from '@/components/motion'
import { software } from '@/content/services'

/** The ledger platforms we work inside, as a row of labelled logos. */
export function SoftwareStrip() {
  return (
    <div className="border-y border-line bg-card">
      <Container className="flex flex-col items-center gap-7 py-10 md:flex-row md:justify-between md:gap-12">
        <p className="shrink-0 text-center text-[15px] font-medium text-muted-foreground md:text-left">
          We work in your stack, not ours
        </p>
        <Stagger
          as="ul"
          step={0.1}
          className="flex flex-wrap items-end justify-center gap-x-10 gap-y-7 sm:gap-x-12 md:justify-end"
        >
          {software.map(({ name, logo }) => (
            <StaggerItem as="li" key={name} className="group flex cursor-default flex-col items-center gap-2.5">
              <span className="flex h-12 items-center transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-110 sm:h-14">
                {logo ? (
                  <img
                    src={logo}
                    alt=""
                    loading="lazy"
                    className="h-full w-auto max-w-28 rounded-lg object-contain drop-shadow-sm transition-[filter] duration-300 group-hover:drop-shadow-lg sm:max-w-32"
                  />
                ) : (
                  <span className="font-display text-[22px] font-semibold text-foreground/70">{name}</span>
                )}
              </span>
              <span className="text-[13px] font-medium text-muted-foreground transition-colors duration-200 group-hover:text-green-ink">
                {name}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </div>
  )
}
