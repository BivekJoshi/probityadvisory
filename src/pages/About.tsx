import { Band, Container, Eyebrow, SectionTitle } from '@/components/layout/Container'
import { Badge } from '@/components/ui/badge'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { PrinciplesGrid } from '@/components/sections/PrinciplesGrid'
import { TeamGrid } from '@/components/sections/TeamGrid'
import { CTABand } from '@/components/sections/CTABand'
import { useSeo } from '@/hooks/useSeo'
import { memberships, site } from '@/data/site'

export default function About() {
  useSeo({
    title: `About — ${site.name}`,
    description:
      'Three qualified Chartered Accountants in Kathmandu — ICAEW, ICAI and ICAN — who take on UK practice work directly, with no account manager in between.',
  })

  return (
    <>
      <PageHero
        eyebrow="About"
        title="Probity is an old word for a plain idea."
        highlight={['probity']}
        lede="Doing the work properly when nobody is checking. It is the only thing worth promising in this business, because everything else — the software, the turnaround, the rate — can be matched by somebody cheaper next year."
      />

      <Band className="border-t-0">
        <Container>
          <Eyebrow>How we are set up</Eyebrow>
          <PrinciplesGrid />
        </Container>
      </Band>

      <Band>
        <Container>
          <Eyebrow>The principals</Eyebrow>
          <Reveal>
            <SectionTitle className="mb-9">Who prepares your work.</SectionTitle>
          </Reveal>
          <TeamGrid full />
        </Container>
      </Band>

      <Band>
        <Container>
          <Eyebrow>Qualifications</Eyebrow>
          <Reveal>
            <SectionTitle className="mb-6">
              Memberships held by our principals in their own names.
            </SectionTitle>
          </Reveal>
          <Stagger className="flex flex-wrap gap-2.5" step={0.08}>
            {memberships.map((item) => (
              <StaggerItem key={item} as="span">
                <Badge className="transition-colors duration-200 hover:border-gold hover:bg-gold-soft hover:text-gold-ink">
                  {item}
                </Badge>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Band>

      <CTABand
        dark
        title="Meet the people, not the pitch."
        body="Thirty minutes on a call with the principal who would actually be running your work."
      />
    </>
  )
}
