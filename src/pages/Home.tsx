import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Band, Container, SectionHeader } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { ClockPanel } from '@/components/sections/ClockPanel'
import { ProofBar } from '@/components/sections/ProofBar'
import { ServiceCards } from '@/components/sections/ServiceCards'
import { SoftwareStrip } from '@/components/sections/SoftwareStrip'
import { AudienceTabs } from '@/components/sections/AudienceTabs'
import { ComparisonTable } from '@/components/sections/ComparisonTable'
import { ProcessStory } from '@/components/sections/ProcessStory'
import { StatsRow } from '@/components/sections/StatsRow'
import { EngagementModels } from '@/components/sections/EngagementModels'
import { DataSafeguards } from '@/components/sections/DataSafeguards'
import { TeamGrid } from '@/components/sections/TeamGrid'
import { PartnerQuestions } from '@/components/sections/PartnerQuestions'
import { CTABand } from '@/components/sections/CTABand'
import { useSeo } from '@/hooks/useSeo'
import { alsoOnRequest, heroAssurances, homeFaq, site } from '@/data/site'

export default function Home() {
  useSeo({
    title: `${site.name} — Outsourced accounting for UK practices`,
    description: site.description,
  })

  return (
    <>
      <PageHero
        overlap
        scene="globe"
        eyebrow="Outsourced accounting for UK practices"
        title="Your name is on the file. We prepare it that way."
        highlight={['that', 'way']}
        lede="Bookkeeping, VAT, year-end accounts and payroll for UK accountancy firms — prepared in Kathmandu by qualified Chartered Accountants and returned ready for partner review."
        aside={<ClockPanel />}
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/contact">
              Book a discovery call
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline-dark" size="lg">
            <Link to="/services">See what we take on</Link>
          </Button>
        </div>
        <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
          {heroAssurances.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[14px] text-on-navy-muted">
              <Check className="size-4 text-gold" />
              {item}
            </li>
          ))}
        </ul>
      </PageHero>

      <ProofBar />

      <Band>
        <Container>
          <SectionHeader
            eyebrow="What we take on"
            title="Three things, done properly."
            lede="We would rather be the firm you trust with the compliance spine of your practice than the one that claims twenty services and staffs none of them well."
            action={
              <Button asChild variant="outline">
                <Link to="/services">
                  Full service detail
                  <ArrowRight />
                </Link>
              </Button>
            }
          />
          <ServiceCards />
          <Reveal className="mt-6 flex flex-col gap-4 rounded-2xl border border-dashed border-line px-6 py-5 md:flex-row md:items-center md:gap-6">
            <p className="shrink-0 text-[14px] font-medium text-muted-foreground">Also on request</p>
            <ul className="flex flex-wrap gap-2">
              {alsoOnRequest.map((item) => (
                <li key={item}>
                  <Badge>{item}</Badge>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Band>

      <SoftwareStrip />

      <Band>
        <Container>
          <SectionHeader
            eyebrow="Who we work with"
            title="Two kinds of client, one standard of work."
            lede="We are built around UK accountancy practices, and we also act directly for UK businesses that want the same care taken over their own books."
          />
          <AudienceTabs />
        </Container>
      </Band>

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
                <Link to="/why-nepal">
                  The case for Nepal
                  <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </div>
          <ComparisonTable />
        </Container>
      </Band>

      <ProcessStory />

      <Band className="py-[clamp(48px,6vw,80px)]">
        <Container>
          <StatsRow />
        </Container>
      </Band>

      <Band tone="card">
        <Container>
          <SectionHeader
            eyebrow="Ways to work with us"
            title="Start small. Scale when it works."
            lede="Begin with a pilot batch, then settle into whichever rhythm suits your practice — or bring us in only when the peak arrives."
          />
          <EngagementModels />
        </Container>
      </Band>

      <Band tone="dark" className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
        <div
          aria-hidden="true"
          className="absolute -right-40 top-1/4 -z-10 size-120 rounded-full bg-gold/8 blur-3xl"
        />
        <Container className="grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          <SectionHeader
            onDark
            className="lg:mb-0"
            eyebrow="Data and confidentiality"
            title="Your clients' data stays where it already is."
            lede="It is the first thing partners ask about offshore work, so it is settled in writing before an engagement starts — not after the first deadline."
          />
          <DataSafeguards />
        </Container>
      </Band>

      <Band>
        <Container>
          <SectionHeader
            eyebrow="Who you would be working with"
            title="Three principals. No account managers."
            action={
              <Button asChild variant="outline">
                <Link to="/about">
                  Read the full profiles
                  <ArrowRight />
                </Link>
              </Button>
            }
          />
          <TeamGrid />
        </Container>
      </Band>

      <Band className="pt-0">
        <Container className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHeader
            className="lg:sticky lg:top-28 lg:self-start"
            eyebrow="Questions"
            title="What partners ask before they start."
            lede={
              <>
                Something we have not covered? Ask a principal directly at{' '}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-foreground underline decoration-gold/60 underline-offset-4 transition-colors hover:text-gold-ink"
                >
                  {site.email}
                </a>
                .
              </>
            }
          />
          <PartnerQuestions items={homeFaq} />
        </Container>
      </Band>

      <CTABand
        title="The fastest way to judge us is to give us something real."
        body="Send one set of records — a messy quarter, a year-end you have been putting off — and see what comes back."
        whatsapp
      />
    </>
  )
}
