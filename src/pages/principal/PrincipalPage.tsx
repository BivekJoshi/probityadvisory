import { useParams } from 'react-router-dom'
import { CTABand } from '@/components/sections'
import { useSeo } from '@/hooks/useSeo'
import { findPrincipal } from '@/content/team'
import { pageSeo, principalSeo } from '@/content/seo'
import NotFoundPage from '@/pages/not-found/NotFoundPage'
import {
  CareerSection,
  ExpertiseSection,
  OtherPrincipals,
  PortfolioHero,
  PortfolioHighlights,
  ProfileSection,
} from './sections'

export default function PrincipalPage() {
  const { slug } = useParams()
  const person = findPrincipal(slug)

  useSeo(person ? principalSeo(person) : pageSeo.notFound)

  if (!person) return <NotFoundPage />

  const firstName = person.name.split(' ')[0]
  // a principal whose details are still to come has empty lists; their sections are left out
  const { highlights, bio, career, focus } = person

  return (
    <>
      <PortfolioHero person={person} overlap={highlights.length > 0} />
      {highlights.length > 0 && <PortfolioHighlights person={person} />}
      {bio.length > 0 && <ProfileSection person={person} />}
      {career.length > 0 && <CareerSection person={person} />}
      {focus.length > 0 && <ExpertiseSection person={person} />}
      {/* on the same ground as the expertise band, so it drops its top padding after one */}
      <OtherPrincipals person={person} className={focus.length > 0 ? 'pt-0' : undefined} />

      <CTABand
        title={`Talk to ${firstName} directly.`}
        body="Thirty minutes on a call with the principal who would actually be running your work — no account manager in between."
        whatsapp
      />
    </>
  )
}
