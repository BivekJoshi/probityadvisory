import { Band, Container, SectionHeader } from '@/components/common'
import { PartnerQuestions } from '@/components/sections'
import { homeFaq } from '@/content/faq'
import { site } from '@/config/site'

const askPrincipal = (
  <>
    Something we have not covered? Ask a principal directly at{' '}
    <a
      href={`mailto:${site.email}`}
      className="font-medium text-foreground underline decoration-green/60 underline-offset-4 transition-colors hover:text-green-ink"
    >
      {site.email}
    </a>
    .
  </>
)

export function FaqSection() {
  return (
    <Band className="pt-0">
      <Container className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <SectionHeader
          className="lg:sticky lg:top-28 lg:self-start"
          eyebrow="Questions"
          title="What partners ask before they start."
          lede={askPrincipal}
        />
        <div>
          <PartnerQuestions items={homeFaq} />
          <p className="mt-8 text-[15px] leading-[1.6] text-muted-foreground">{askPrincipal}</p>
        </div>
      </Container>
    </Band>
  )
}
