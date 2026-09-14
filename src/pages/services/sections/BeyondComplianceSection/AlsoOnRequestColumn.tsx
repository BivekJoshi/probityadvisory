import { Badge } from '@/components/ui/badge'
import { SectionHeader } from '@/components/common'
import { Stagger, StaggerItem } from '@/components/motion'
import { alsoOnRequest } from '@/content/services'

export function AlsoOnRequestColumn() {
  return (
    <div>
      <SectionHeader
        className="md:mb-8"
        eyebrow="Also on request"
        title="Beyond the compliance cycle."
        lede="Our principals run their own audit and advisory practices, so the following sit within the team's competence and are quoted per assignment rather than carried as a standing service."
      />
      <Stagger className="flex flex-wrap gap-2.5" step={0.05}>
        {alsoOnRequest.map((item) => (
          <StaggerItem key={item}>
            <Badge>{item}</Badge>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}
