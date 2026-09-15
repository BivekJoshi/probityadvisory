import { Band, Container, SectionHeader } from '@/components/common'
import { TeamGrid } from '@/components/sections'

export function PrincipalsSection() {
  return (
    <Band id="principals" tone="card" className="scroll-mt-24">
      <Container>
        <SectionHeader
          eyebrow="The principals"
          title="Who prepares your work."
          lede="Open a profile for the full background, career and areas of work behind each name."
        />
        <TeamGrid />
      </Container>
    </Band>
  )
}
