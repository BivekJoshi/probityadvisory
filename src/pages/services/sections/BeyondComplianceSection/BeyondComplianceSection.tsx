import { Band, Container } from '@/components/common'
import { AlsoOnRequestColumn } from './AlsoOnRequestColumn'
import { SoftwareColumn } from './SoftwareColumn'

/** Work quoted per assignment, beside the software we work inside. */
export function BeyondComplianceSection() {
  return (
    <Band tone="card">
      <Container className="grid gap-16 lg:grid-cols-2">
        <AlsoOnRequestColumn />
        <SoftwareColumn />
      </Container>
    </Band>
  )
}
