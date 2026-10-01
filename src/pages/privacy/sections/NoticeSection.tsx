import { Band, Container } from '@/components/common'
import { Reveal } from '@/components/motion'
import { privacyNotice } from '@/content/privacy'

/** The notice as one readable column, a heading over each part. */
export function NoticeSection() {
  return (
    <Band>
      <Container>
        <div className="flex max-w-[68ch] flex-col gap-10">
          {privacyNotice.map((part) => (
            <Reveal as="section" key={part.heading}>
              <h2 className="text-[clamp(22px,2.4vw,26px)] tracking-[-0.01em]">{part.heading}</h2>
              <div className="mt-3 space-y-4">
                {part.body.map((para) => (
                  <p key={para} className="text-[16.5px] leading-[1.75] text-muted-foreground">
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Band>
  )
}
