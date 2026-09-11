import { Container } from '@/components/layout/Container'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'
import { proofPoints } from '@/data/site'

/** The three-column "who / when / where" strip beneath the hero. */
export function ProofBar() {
  return (
    <div className="border-y border-line bg-line">
      <Container className="px-0 sm:px-0">
        <Stagger className="grid gap-px md:grid-cols-3">
          {proofPoints.map((point) => (
            <StaggerItem
              key={point.term}
              className="group bg-background px-6 py-6 transition-colors duration-300 hover:bg-card sm:px-7"
            >
              <dt className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-ink">
                {point.term}
              </dt>
              <dd className="m-0 text-[15px] leading-[1.55] text-foreground">{point.detail}</dd>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </div>
  )
}
