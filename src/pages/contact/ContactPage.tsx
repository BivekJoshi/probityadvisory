import { PageHero } from '@/components/sections'
import { useSeo } from '@/hooks/useSeo'
import { site } from '@/config/site'
import { ContactSection } from './sections'

export default function ContactPage() {
  useSeo({
    title: `Contact — ${site.name}`,
    description:
      'We answer within one working day, usually the same day. Both numbers take WhatsApp, which is generally the quickest way to reach us.',
  })

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
