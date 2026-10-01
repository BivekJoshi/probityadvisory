import { CTABand } from '@/components/sections'
import { useScrollToHash } from '@/hooks/useScrollToHash'
import { useSeo } from '@/hooks/useSeo'
import { pageSeo } from '@/content/seo'
import {
  BeyondComplianceSection,
  ComplianceSection,
  ServiceDetailsSection,
  ServicesHero,
} from './sections'

export default function ServicesPage() {
  useSeo(pageSeo.services)
  useScrollToHash()

  return (
    <>
      <ServicesHero />
      <ServiceDetailsSection />
      <BeyondComplianceSection />
      <ComplianceSection />

      <CTABand
        title="Start with one file."
        body="Give us a real quarter or a real year-end. You will know inside a week whether this works for your practice."
        cta="Book a discovery call"
      />
    </>
  )
}
