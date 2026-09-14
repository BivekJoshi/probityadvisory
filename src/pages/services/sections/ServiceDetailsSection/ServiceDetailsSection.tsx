import { Band, Container } from '@/components/common'
import { services } from '@/content/services'
import { ServiceDetail } from './ServiceDetail'

/** Every service written up in full; each card is the target of its #slug deep link. */
export function ServiceDetailsSection() {
  return (
    <Band>
      <Container className="flex flex-col gap-6">
        {services.map((service, i) => (
          <ServiceDetail key={service.slug} service={service} index={i} />
        ))}
      </Container>
    </Band>
  )
}
