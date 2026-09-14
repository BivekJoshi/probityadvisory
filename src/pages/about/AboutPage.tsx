import { CTABand, PageHero } from '@/components/sections'
import { useSeo } from '@/hooks/useSeo'
import { site } from '@/config/site'
import { MembershipsSection, PrincipalsSection, PrinciplesSection } from './sections'

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
      <PrinciplesSection />
      <PrincipalsSection />
      <MembershipsSection />

      <CTABand
        title="Meet the people, not the pitch."
        body="Thirty minutes on a call with the principal who would actually be running your work."
      />
    </>
  )
}
