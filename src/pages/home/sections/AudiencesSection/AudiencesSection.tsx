import { Band, Container, SectionHeader } from '@/components/common'
import { AudienceTabs } from './AudienceTabs'

export function AudiencesSection() {
  return (
    <Band>
      <Container>
        <SectionHeader
          eyebrow="Who we work with"
          title="Two kinds of client, one standard of work."
          lede="We are built around UK accountancy practices, and we also act directly for UK businesses that want the same care taken over their own books."
        />
        <AudienceTabs />
      </Container>
    </Band>
  )
}
