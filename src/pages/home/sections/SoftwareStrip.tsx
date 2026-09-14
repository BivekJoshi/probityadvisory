import { Container } from '@/components/common'
import { software } from '@/content/services'

/** The ledger platforms we work inside, as a quiet wordmark row. */
export function SoftwareStrip() {
  return (
    <div className="border-y border-line bg-card">
      <Container className="flex flex-col items-center gap-4 py-7 md:flex-row md:justify-between md:gap-10">
        <p className="shrink-0 text-[14px] font-medium text-muted-foreground">
          We work in your stack, not ours
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-9 gap-y-2 md:justify-end">
          {software.map(({ name, logo }) =>
            logo ? (
              <li key={name}>
                <img
                  src={logo}
                  alt={name}
                  loading="lazy"
                  className="h-8 w-auto rounded-md object-contain sm:h-9"
                />
              </li>
            ) : (
              <li
                key={name}
                className="font-display text-[21px] font-semibold text-foreground/45 transition-colors duration-200 hover:text-foreground sm:text-[23px]"
              >
                {name}
              </li>
            ),
          )}
        </ul>
      </Container>
    </div>
  )
}
