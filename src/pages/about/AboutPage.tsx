import { Award } from 'lucide-react'
import { Band, Container, Eyebrow, SectionHeader } from '@/components/common'
import { Badge } from '@/components/ui/badge'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { CTABand, PageHero, TeamGrid } from '@/components/sections'
import { useSeo } from '@/hooks/useSeo'
import { memberships } from '@/content/team'
import { site } from '@/config/site'
import { PrinciplesGrid } from './sections/PrinciplesGrid'

export default function AboutPage() {
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

      <Band>
        <Container>
          <Reveal>
            <Eyebrow>How we are set up</Eyebrow>
          </Reveal>
          <PrinciplesGrid />
        </Container>
      </Band>

      <Band tone="card">
        <Container>
          <SectionHeader eyebrow="The principals" title="Who prepares your work." />
          <TeamGrid full />
        </Container>
      </Band>

      <Band>
        <Container>
          <SectionHeader
            eyebrow="Qualifications"
            title="Memberships held by our principals in their own names."
          />
          <Stagger className="flex flex-wrap gap-2.5" step={0.06}>
            {memberships.map((item) => (
              <StaggerItem key={item}>
                <Badge>
                  <Award className="text-gold-ink" />
                  {item}
                </Badge>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Band>

      <CTABand
        title="Meet the people, not the pitch."
        body="Thirty minutes on a call with the principal who would actually be running your work."
      />
    </>
  )
}
