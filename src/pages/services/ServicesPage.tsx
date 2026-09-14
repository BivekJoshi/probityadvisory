import { CTABand } from '@/components/sections'
import { useScrollToHash } from '@/hooks/useScrollToHash'
import { useSeo } from '@/hooks/useSeo'
import { site } from '@/config/site'
import {
  BeyondComplianceSection,
  ComplianceSection,
  ServiceDetailsSection,
  ServicesHero,
} from './sections'

export default function ServicesPage() {
  useSeo({
    title: `Services — ${site.name}`,
    description:
      'Bookkeeping and VAT under MTD, year-end accounts and corporation tax, and payroll with CIS and pensions — staffed by qualified Chartered Accountants in Kathmandu.',
  })
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
