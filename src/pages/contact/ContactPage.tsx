import { PageHero } from '@/components/sections'
import { useSeo } from '@/hooks/useSeo'
import { pageSeo } from '@/content/seo'
import { ContactSection } from './sections'

export default function ContactPage() {
  useSeo(pageSeo.contact)

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We answer within one working day."
        highlight={['one', 'working', 'day.']}
        lede="Usually the same day. Both numbers below take WhatsApp, which is generally the quickest way to reach us."
      />
      <ContactSection />
    </>
  )
}
