import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Band, Container, SectionHeader } from '@/components/common'
import { TeamGrid } from '@/components/sections'
import { team } from '@/content/team'
import { paths } from '@/config/routes'

const counts = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six']

export function TeamSection() {
  // the heading follows the roster, so it cannot fall out of step with it
  const count = counts[team.length] ?? String(team.length)

  return (
    <Band className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/3 -z-10 size-120 rounded-full bg-green/6 blur-3xl"
      />
      <Container>
        <SectionHeader
          eyebrow="Who you would be working with"
          title={`${count} principal${team.length === 1 ? '' : 's'}. No account managers.`}
          lede="Every file is prepared by a qualified Chartered Accountant you can speak to directly. Open a profile to see the qualifications and career behind the name."
          action={
            <Button asChild variant="outline">
              <Link to={paths.about}>
                About the firm
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
