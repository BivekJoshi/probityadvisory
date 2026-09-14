import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Band, Container, SectionHeader } from '@/components/common'
import { TeamGrid } from '@/components/sections'
import { paths } from '@/config/routes'

export function TeamSection() {
  return (
    <Band>
      <Container>
        <SectionHeader
          eyebrow="Who you would be working with"
          title="Three principals. No account managers."
          action={
            <Button asChild variant="outline">
              <Link to={paths.about}>
                Read the full profiles
                <ArrowRight />
              </Link>
            </Button>
          }
        />
        <TeamGrid />
      </Container>
    </Band>
  )
}
