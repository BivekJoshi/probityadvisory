import { Band, Container, SectionHeader } from '@/components/common'
import { Reveal } from '@/components/motion'
import { CTABand, ClockPanel, PageHero, PartnerQuestions, StatsRow } from '@/components/sections'
import { useSeo } from '@/hooks/useSeo'
import { site } from '@/config/site'
import { OverlapChart } from './sections/OverlapChart'

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

      <Band>
        <Container>
          <SectionHeader
            eyebrow="The working day"
            title="We shape our day around yours."
            lede="The time difference is a lever, not a constraint. Tell us when you want the output and we set our hours to it — the two patterns below are simply the ones practices ask for most often."
          />
          <OverlapChart />
          <div className="mt-6">
            <StatsRow />
          </div>
        </Container>
      </Band>

      <Band tone="card">
        <Container>
          <SectionHeader
            eyebrow="The honest version of the cost argument"
            title="Cheaper is the second reason, not the first."
          />
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <p className="text-[17px] leading-[1.75] text-muted-foreground">
                The saving is real and it is structural: a qualified accountant's salary in Kathmandu
                is a fraction of the same seat in London or Manchester, and there is no recruitment
                fee, no notice period, no desk and no employer's NIC attached to it. You will feel it
                most in the months where your own team is either idle or drowning.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[17px] leading-[1.75] text-muted-foreground">
                But we do not lead with a percentage, because a cheap file you have to redo is the
                most expensive thing in a practice. The argument we would rather make is that the
                person preparing your work sat the same order of professional examination your own
                people did — and that you can check that claim by giving us one file.
              </p>
            </Reveal>
          </div>
        </Container>
      </Band>

      <Band>
        <Container className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHeader
            className="lg:sticky lg:top-28 lg:self-start"
            eyebrow="What you are not taking on"
            title="The four things partners actually ask."
          />
          <PartnerQuestions />
        </Container>
      </Band>

      <CTABand
        title="Test it on a single quarter."
        body="One file, one review, one honest conversation about whether the output is good enough for your practice."
        cta="Book a discovery call"
      />
    </>
  )
}
