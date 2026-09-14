import { Band, Container, SectionHeader } from '@/components/common'
import { PartnerQuestions } from '@/components/sections'

export function QuestionsSection() {
  return (
    <Band>
      <Container className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <SectionHeader
          className="lg:sticky lg:top-28 lg:self-start"
          eyebrow="What you are not taking on"
          title="The four things partners actually ask."
        />
        <PartnerQuestions />
      </Container>
    </Band>
  )
}
