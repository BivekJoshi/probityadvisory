import { Band, Container, SectionHeader } from '@/components/common'
import { ComplianceLedger } from './ComplianceLedger'

export function ComplianceSection() {
  return (
    <Band>
      <Container>
        <SectionHeader
          eyebrow="The UK compliance year"
          title="The dates we work to."
          lede="Your deadlines are the only calendar that matters here. These are the ones our workflow is built around."
        />
        <ComplianceLedger />
      </Container>
    </Band>
  )
}
