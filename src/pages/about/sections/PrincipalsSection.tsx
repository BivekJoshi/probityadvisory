import { Band, Container, SectionHeader } from '@/components/common'
import { TeamGrid } from '@/components/sections'

export function PrincipalsSection() {
  return (
    <Band tone="card">
      <Container>
        <SectionHeader eyebrow="The principals" title="Who prepares your work." />
        <TeamGrid full />
      </Container>
    </Band>
  )
}
