import { Band, Container, SectionHeader } from '@/components/common'
import { Reveal } from '@/components/motion'
import { AudiencePanel } from './AudiencePanel'

export function AudiencesSection() {
  return (
    <Band>
      <Container>
        <SectionHeader
          eyebrow="Who we work with"
          title="Built for UK accountancy practices."
          lede="We work for UK accountancy practices, not their clients — your client relationships stay yours."
        />
        <Reveal className="grid gap-10 rounded-3xl border border-line bg-card p-[clamp(24px,4vw,48px)] shadow-card lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
          <AudiencePanel />
        </Reveal>
      </Container>
    </Band>
  )
}
