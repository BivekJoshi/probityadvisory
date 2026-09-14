import { Band, Container, Eyebrow } from '@/components/common'
import { Reveal } from '@/components/motion'
import { PrinciplesGrid } from './PrinciplesGrid'

export function PrinciplesSection() {
  return (
    <Band>
      <Container>
        <Reveal>
          <Eyebrow>How we are set up</Eyebrow>
        </Reveal>
        <PrinciplesGrid />
      </Container>
    </Band>
  )
}
