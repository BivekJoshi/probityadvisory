import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Band, Container, SectionHeader } from '@/components/common'
import { Stagger } from '@/components/motion'
import { services } from '@/content/services'
import { paths } from '@/config/routes'
import { AlsoOnRequest } from './AlsoOnRequest'
import { ServiceCard } from './ServiceCard'

export function ServicesSection() {
  return (
    <Band>
      <Container>
        <SectionHeader
          eyebrow="What we take on"
          title="Three things, done properly."
          lede="We would rather be the firm you trust with the compliance spine of your practice than the one that claims twenty services and staffs none of them well."
          action={
            <Button asChild variant="outline">
              <Link to={paths.services}>
                Full service detail
                <ArrowRight />
              </Link>
            </Button>
          }
        />
        <Stagger className="grid gap-5 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </Stagger>
        <AlsoOnRequest />
      </Container>
    </Band>
  )
}
