import { useParams } from 'react-router-dom'
import { CTABand } from '@/components/sections'
import { useSeo } from '@/hooks/useSeo'
import { findPrincipal } from '@/content/team'
import { site } from '@/config/site'
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

  useSeo({
    title: person ? `${person.name}, ${person.role} — ${site.name}` : `Page not found — ${site.name}`,
    description: person?.short,
  })

  if (!person) return <NotFoundPage />

  const firstName = person.name.split(' ')[0]

  return (
    <>
      <PortfolioHero person={person} />
      <PortfolioHighlights person={person} />
      <ProfileSection person={person} />
      <CareerSection person={person} />
      <ExpertiseSection person={person} />
      <OtherPrincipals person={person} />

      <CTABand
        title={`Talk to ${firstName} directly.`}
        body="Thirty minutes on a call with the principal who would actually be running your work — no account manager in between."
        whatsapp
      />
    </>
  )
}
