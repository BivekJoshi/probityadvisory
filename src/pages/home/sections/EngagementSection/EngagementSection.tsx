import { Band, Container, SectionHeader } from '@/components/common'
import { Stagger } from '@/components/motion'
import { engagementModels } from '@/content/process'
import { EngagementCard } from './EngagementCard'
import { PricingNote } from './PricingNote'

/** The three ways in, with the pilot set apart in forest as the place to start. */
export function EngagementSection() {
  return (
    <Band tone="card">
      <Container>
        <SectionHeader
          eyebrow="Ways to work with us"
          title="Start small. Scale when it works."
          lede="Begin with a pilot batch, then settle into whichever rhythm suits your practice — or bring us in only when the peak arrives."
        />
        <Stagger className="grid gap-5 lg:grid-cols-3">
          {engagementModels.map((model) => (
            <EngagementCard key={model.title} model={model} />
          ))}
        </Stagger>
        <PricingNote />
      </Container>
    </Band>
  )
}
