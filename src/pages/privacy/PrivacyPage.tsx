import { PageHero } from '@/components/sections'
import { useSeo } from '@/hooks/useSeo'
import { pageSeo } from '@/content/seo'
import { NoticeSection } from './sections'

export default function PrivacyPage() {
  useSeo(pageSeo.privacy)

  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy notice."
        highlight={['notice.']}
        lede="What happens to the details you send us through this website, and who to ask about them."
      />
      <NoticeSection />
    </>
  )
}
