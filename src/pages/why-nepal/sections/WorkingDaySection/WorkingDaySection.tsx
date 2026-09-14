import { Band, Container, SectionHeader } from '@/components/common'
import { StatsRow } from '@/components/sections'
import { OverlapChart } from './OverlapChart'

export function WorkingDaySection() {
  return (
    <Band>
      <Container>
        <SectionHeader
          eyebrow="The working day"
          title="We shape our day around yours."
          lede="The time difference is a lever, not a constraint. Tell us when you want the output and we set our hours to it — the two patterns below are simply the ones practices ask for most often."
        />
        <OverlapChart />
        <div className="mt-6">
          <StatsRow />
        </div>
      </Container>
    </Band>
  )
}
