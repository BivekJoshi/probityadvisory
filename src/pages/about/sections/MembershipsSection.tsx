import { Award } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Band, Container, SectionHeader } from '@/components/common'
import { Stagger, StaggerItem } from '@/components/motion'
import { memberships } from '@/content/team'

export function MembershipsSection() {
  return (
    <Band>
      <Container>
        <SectionHeader
          eyebrow="Qualifications"
          title="Memberships held by our principals in their own names."
        />
        <Stagger className="flex flex-wrap gap-2.5" step={0.06}>
          {memberships.map((item) => (
            <StaggerItem key={item}>
              <Badge>
                <Award className="text-green-ink" />
                {item}
              </Badge>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Band>
  )
}
