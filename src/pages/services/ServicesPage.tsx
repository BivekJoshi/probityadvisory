import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Band, Container, SectionHeader } from '@/components/common'
import { Badge } from '@/components/ui/badge'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { serviceIcons } from '@/components/icons'
import { CTABand, PageHero } from '@/components/sections'
import { useSeo } from '@/hooks/useSeo'
import { alsoOnRequest, services, software } from '@/content/services'
import { site } from '@/config/site'
import { ServiceDetail } from './sections/ServiceDetail'
import { ComplianceLedger } from './sections/ComplianceLedger'

export default function ServicesPage() {
  const { hash } = useLocation()
  useSeo({
    title: `Services — ${site.name}`,
    description:
      'Bookkeeping and VAT under MTD, year-end accounts and corporation tax, and payroll with CIS and pensions — staffed by qualified Chartered Accountants in Kathmandu.',
  })

  // Deep links such as /services#payroll-cis-pensions land on the right card
  // once this lazily loaded page has actually rendered it.
  useEffect(() => {
    if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
  }, [hash])

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="The compliance spine of your practice."
        highlight={['spine']}
        lede="Three services we staff properly, priced per engagement, delivered inside your own systems."
      >
        <nav aria-label="Services on this page" className="flex flex-wrap gap-2">
          {services.map((service) => {
            const Icon = serviceIcons[service.slug]
            return (
              <a
                key={service.slug}
                href={`#${service.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[14px] text-on-navy transition-colors duration-200 hover:border-white/30 hover:bg-white/10"
              >
                <Icon className="size-4 text-gold" />
                {service.title}
              </a>
            )
          })}
        </nav>
      </PageHero>

      <Band>
        <Container className="flex flex-col gap-6">
          {services.map((service, i) => (
            <ServiceDetail key={service.slug} service={service} index={i} />
          ))}
        </Container>
      </Band>

      <Band tone="card">
        <Container className="grid gap-16 lg:grid-cols-2">
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

          <div>
            <SectionHeader
              className="md:mb-8"
              eyebrow="Software"
              title="We work in your stack, not ours."
              lede="Nothing is exported into a system of our own. We log into yours, work in the client's ledger, and leave the audit trail where your reviewer expects to find it."
            />
            <Stagger className="flex flex-wrap gap-2.5" step={0.05}>
              {software.map((item) => (
                <StaggerItem key={item}>
                  <Badge variant="gold">{item}</Badge>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal>
              <p className="mt-6 max-w-[56ch] text-[15px] leading-[1.65] text-muted-foreground">
                Running something we have not listed? Tell us. We will learn it on our own time
                before we touch a client file.
              </p>
            </Reveal>
          </div>
        </Container>
      </Band>

      <Band>
        <Container>
          <SectionHeader
            eyebrow="The UK compliance year"
            title="The dates we work to."
            lede="Your deadlines are the only calendar that matters here. These are the ones our workflow is built around."
          />
          <ComplianceLedger />
        </Container>
      </Band>

      <CTABand
        title="Start with one file."
        body="Give us a real quarter or a real year-end. You will know inside a week whether this works for your practice."
        cta="Book a discovery call"
      />
    </>
  )
}
