import { Band, Container, Eyebrow, Lede, SectionTitle } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { ClockPanel } from '@/components/sections/ClockPanel'
import { OverlapChart } from '@/components/sections/OverlapChart'
import { PartnerQuestions } from '@/components/sections/PartnerQuestions'
import { StatsRow } from '@/components/sections/StatsRow'
import { CTABand } from '@/components/sections/CTABand'
import { useSeo } from '@/hooks/useSeo'
import { site } from '@/data/site'

export default function WhyNepal() {
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

      <Band className="border-t-0">
        <Container>
          <Eyebrow>The working day</Eyebrow>
          <Reveal>
            <SectionTitle className="mb-2.5">We shape our day around yours.</SectionTitle>
            <Lede className="mb-7">
              The time difference is a lever, not a constraint. Tell us when you want the output and
              we set our hours to it — the two patterns below are simply the ones practices ask for
              most often.
            </Lede>
          </Reveal>
          <OverlapChart />
        </Container>
      </Band>

      <Band className="py-0">
        <Container className="px-0 sm:px-0">
          <StatsRow />
        </Container>
      </Band>

      <Band>
        <Container>
          <Eyebrow>The honest version of the cost argument</Eyebrow>
          <Reveal>
            <SectionTitle className="mb-5">Cheaper is the second reason, not the first.</SectionTitle>
          </Reveal>
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal delay={0.06}>
              <p className="text-[16px] leading-[1.7] text-muted-foreground">
                The saving is real and it is structural: a qualified accountant's salary in
                Kathmandu is a fraction of the same seat in London or Manchester, and there is no
                recruitment fee, no notice period, no desk and no employer's NIC attached to it. You
                will feel it most in the months where your own team is either idle or drowning.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="text-[16px] leading-[1.7] text-muted-foreground">
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
        <Container>
          <Eyebrow>What you are not taking on</Eyebrow>
          <Reveal>
            <SectionTitle className="mb-7">The four things partners actually ask.</SectionTitle>
          </Reveal>
          <PartnerQuestions />
        </Container>
      </Band>

      <CTABand
        dark
        title="Test it on a single quarter."
        body="One file, one review, one honest conversation about whether the output is good enough for your practice."
        cta="Book a discovery call"
      />
    </>
  )
}
