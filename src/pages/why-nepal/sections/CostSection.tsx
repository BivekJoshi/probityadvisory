import { Band, Container, SectionHeader } from '@/components/common'
import { Reveal } from '@/components/motion'

export function CostSection() {
  return (
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
  )
}
