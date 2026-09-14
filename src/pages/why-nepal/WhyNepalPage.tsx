import { CTABand, ClockPanel, PageHero } from '@/components/sections'
import { useSeo } from '@/hooks/useSeo'
import { site } from '@/config/site'
import { CostSection, QuestionsSection, WorkingDaySection } from './sections'

export default function WhyNepalPage() {
  useSeo({
    title: `Why Nepal — ${site.name}`,
    description:
      'Nepal runs at UTC+05:45. We set our working day to yours — an overnight turnaround that lands before you open, or a team on your clock all day.',
  })

  return (
    <>
      <PageHero
        eyebrow="Why Nepal"
        title="Nepal runs at UTC+05:45."
        highlight={['utc+05:45.']}
        lede="One of the very few time zones in the world offset by three-quarters of an hour. It is a lever we set to your advantage — work finished overnight, or a team on your clock through the whole of your working day."
        aside={<ClockPanel showDifference />}
      />
      <WorkingDaySection />
      <CostSection />
      <QuestionsSection />

      <CTABand
        title="Test it on a single quarter."
        body="One file, one review, one honest conversation about whether the output is good enough for your practice."
        cta="Book a discovery call"
      />
    </>
  )
}
