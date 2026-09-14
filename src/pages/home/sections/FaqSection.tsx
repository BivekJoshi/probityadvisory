import { Band, Container, SectionHeader } from '@/components/common'
import { PartnerQuestions } from '@/components/sections'
import { homeFaq } from '@/content/faq'
import { site } from '@/config/site'

export function FaqSection() {
  return (
    <Band className="pt-0">
      <Container className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <SectionHeader
          className="lg:sticky lg:top-28 lg:self-start"
          eyebrow="Questions"
          title="What partners ask before they start."
          lede={
            <>
              Something we have not covered? Ask a principal directly at{' '}
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-foreground underline decoration-gold/60 underline-offset-4 transition-colors hover:text-gold-ink"
              >
                {site.email}
              </a>
              .
            </>
          }
        />
        <PartnerQuestions items={homeFaq} />
      </Container>
    </Band>
  )
}
