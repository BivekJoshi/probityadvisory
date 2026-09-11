import { Band, Container, Eyebrow, Lede, SectionTitle } from '@/components/layout/Container'
import { Badge } from '@/components/ui/badge'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { ServiceDetail } from '@/components/sections/ServiceDetail'
import { ComplianceLedger } from '@/components/sections/ComplianceLedger'
import { CTABand } from '@/components/sections/CTABand'
import { useSeo } from '@/hooks/useSeo'
import { alsoOnRequest, services, site, software } from '@/data/site'

export default function Services() {
  useSeo({
    title: `Services — ${site.name}`,
    description:
      'Bookkeeping and VAT under MTD, year-end accounts and corporation tax, and payroll with CIS and pensions — staffed by qualified Chartered Accountants in Kathmandu.',
  })

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="The compliance spine of your practice."
        highlight={['spine']}
        lede="Three services we staff properly, priced per engagement, delivered inside your own systems."
      />

      <Band className="border-t-0">
        <Container>
          {services.map((service, i) => (
            <ServiceDetail key={service.slug} service={service} index={i} />
          ))}
        </Container>
      </Band>

      <Band>
        <Container>
          <Eyebrow>Also on request</Eyebrow>
          <Reveal>
            <SectionTitle className="mb-4">Beyond the compliance cycle.</SectionTitle>
            <Lede className="mb-6">
              Our principals run their own audit and advisory practices, so the following sit within
              the team's competence and are quoted per assignment rather than carried as a standing
              service.
            </Lede>
          </Reveal>
          <Stagger className="flex flex-wrap gap-2.5" step={0.07}>
            {alsoOnRequest.map((item) => (
              <StaggerItem key={item} as="span">
                <Badge className="transition-colors duration-200 hover:border-gold hover:bg-gold-soft hover:text-gold-ink">
                  {item}
                </Badge>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Band>

      <Band>
        <Container>
          <Eyebrow>Software</Eyebrow>
          <Reveal>
            <SectionTitle className="mb-4">We work in your stack, not ours.</SectionTitle>
            <Lede className="mb-6">
              Nothing is exported into a system of our own. We log into yours, work in the client's
              ledger, and leave the audit trail where your reviewer expects to find it.
            </Lede>
          </Reveal>
          <Stagger className="flex flex-wrap gap-2.5" step={0.07}>
            {software.map((item) => (
              <StaggerItem key={item} as="span">
                <Badge variant="gold">{item}</Badge>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal>
            <p className="mt-6 max-w-[62ch] text-[15px] leading-[1.62] text-muted-foreground">
              Running something we have not listed? Tell us. We will learn it on our own time before
              we touch a client file.
            </p>
          </Reveal>
        </Container>
      </Band>

      <Band>
        <Container>
          <Eyebrow>The UK compliance year</Eyebrow>
          <Reveal>
            <SectionTitle className="mb-2.5">The dates we work to.</SectionTitle>
            <Lede className="mb-7">
              Your deadlines are the only calendar that matters here. These are the ones our
              workflow is built around.
            </Lede>
          </Reveal>
          <ComplianceLedger />
        </Container>
      </Band>

      <CTABand
        dark
        title="Start with one file."
        body="Give us a real quarter or a real year-end. You will know inside a week whether this works for your practice."
        cta="Book a discovery call"
      />
    </>
  )
}
