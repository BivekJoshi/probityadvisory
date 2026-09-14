import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Band, Container, SectionHeader } from '@/components/common'
import { Reveal } from '@/components/motion'
import { paths } from '@/config/routes'
import { ComparisonTable } from './ComparisonTable'

export function WhyOutsourceSection() {
  return (
    <Band tone="card">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            className="mb-7 md:mb-8"
            eyebrow="Why outsource"
            title="A seat you hire, or work you buy."
            lede="The saving is structural, but it is the second reason. The first is capacity that follows your workload — with a qualified accountant on every file."
          />
          <Reveal>
            <Button asChild variant="outline">
              <Link to={paths.whyNepal}>
                The case for Nepal
                <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
        <ComparisonTable />
      </Container>
    </Band>
  )
}
