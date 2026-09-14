import { Band, Container } from '@/components/common'
import { StatsRow } from '@/components/sections'

export function StatsSection() {
  return (
    <Band className="py-[clamp(48px,6vw,80px)]">
      <Container>
        <StatsRow />
      </Container>
    </Band>
  )
}
