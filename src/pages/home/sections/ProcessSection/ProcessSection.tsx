import { useState } from 'react'
import { Band, Container, SectionHeader } from '@/components/common'
import { hasWebGL } from '@/features/three'
import { ProcessStage } from './ProcessStage'
import { ProcessSteps } from './ProcessSteps'
import { ProcessTimeline } from './ProcessTimeline'
import { useScrollStage } from './useScrollStage'

const eyebrow = 'How the work moves'
const title = 'From first call to steady state.'

/**
 * The process as scroll-told story: a sticky 3D stage beside the four steps.
 * The stage position is read from where the step copy actually sits in the
 * viewport, so picture and words can never drift apart. Without WebGL it is
 * the plain timeline.
 */
export function ProcessSection() {
  const [webgl] = useState(hasWebGL)
  const { stepRefs, stage, active } = useScrollStage()

  if (!webgl) {
    return (
      <Band>
        <Container>
          <SectionHeader eyebrow={eyebrow} title={title} />
          <ProcessTimeline />
        </Container>
      </Band>
    )
  }

  return (
    <section className="relative bg-forest-deep pt-[clamp(64px,8vw,112px)] text-on-forest">
      <Container>
        <SectionHeader onDark eyebrow={eyebrow} title={title} className="md:mb-6" />

        <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <ProcessStage stage={stage} active={active} />
          <ProcessSteps stepRefs={stepRefs} active={active} />
        </div>
      </Container>
    </section>
  )
}
