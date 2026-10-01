import { CTABand } from '@/components/sections'
import { useSeo } from '@/hooks/useSeo'
import { pageSeo } from '@/content/seo'
import {
  AudiencesSection,
  DataSection,
  EngagementSection,
  FaqSection,
  HomeHero,
  ProcessSection,
  ProofBar,
  ServicesSection,
  SoftwareStrip,
  StatsSection,
  TeamSection,
  WhyOutsourceSection,
} from './sections'

export default function HomePage() {
  useSeo(pageSeo.home)

  return (
    <>
      <HomeHero />
      <ProofBar />
      <ServicesSection />
      <SoftwareStrip />
      <AudiencesSection />
      <WhyOutsourceSection />
      <ProcessSection />
      <StatsSection />
      <EngagementSection />
      <DataSection />
      <TeamSection />
      <FaqSection />

      <CTABand
        title="The fastest way to judge us is to give us something real."
        body="Send one set of records — a messy quarter, a year-end you have been putting off — and see what comes back."
        whatsapp
      />
    </>
  )
}
