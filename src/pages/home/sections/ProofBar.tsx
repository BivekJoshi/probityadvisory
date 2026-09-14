import { Clock, GraduationCap, Layers } from 'lucide-react'
import { Container } from '@/components/common'
import { Stagger, StaggerItem } from '@/components/motion'
import { proofPoints } from '@/content/proof'

/* in the same order as proofPoints: who, when, where */
const icons = [GraduationCap, Clock, Layers] as const

/** The "who / when / where" card that overlaps the bottom edge of the hero. */
export function ProofBar() {
  return (
    <Container className="relative z-10 -mt-16">
      <Stagger
        as="dl"
        className="grid divide-y divide-line-soft overflow-hidden rounded-2xl border border-line bg-card shadow-lift md:grid-cols-3 md:divide-x md:divide-y-0"
      >
        {proofPoints.map((point, i) => {
          const Icon = icons[i]
          return (
            <StaggerItem key={point.term} className="flex gap-4 p-6 sm:p-7">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-green-soft text-green-ink">
                <Icon className="size-5" />
              </span>
              <div>
                <dt className="text-[13px] font-semibold text-green-ink">{point.term}</dt>
                <dd className="mt-1 text-[15px] leading-[1.55] text-foreground">{point.detail}</dd>
              </div>
            </StaggerItem>
          )
        })}
      </Stagger>
    </Container>
  )
}
