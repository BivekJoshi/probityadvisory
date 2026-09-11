import { Mail, MapPin, Phone } from 'lucide-react'
import { Band, Container, Eyebrow } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { ContactForm } from '@/components/sections/ContactForm'
import { WhatsApp } from '@/components/icons/Brand'
import { useSeo } from '@/hooks/useSeo'
import { nextSteps, site } from '@/data/site'

const details = [
  {
    term: 'United Kingdom',
    value: site.phoneUK,
    href: `https://wa.me/${site.phoneUKRaw}`,
    note: 'Call or WhatsApp',
    icon: Phone,
  },
  {
    term: 'Nepal',
    value: site.phoneNP,
    href: `https://wa.me/${site.phoneNPRaw}`,
    note: 'Call or WhatsApp',
    icon: WhatsApp,
  },
  {
    term: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
    note: null,
    icon: Mail,
  },
  {
    term: 'Office',
    value: site.address,
    href: null,
    note: site.hours,
    icon: MapPin,
  },
]

export default function Contact() {
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

      <Band className="border-t-0">
        <Container>
          <div className="grid items-start gap-[clamp(30px,4vw,56px)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <Eyebrow>Direct</Eyebrow>
              <dl className="m-0 flex flex-col overflow-hidden rounded-md border border-line bg-card">
                {details.map(({ term, value, href, note, icon: Icon }) => (
                  <div
                    key={term}
                    className="group border-t border-line-soft px-[18px] py-4 transition-colors duration-200 first:border-t-0 hover:bg-gold-soft"
                  >
                    <dt className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink">
                      <Icon className="size-3.5" />
                      {term}
                    </dt>
                    <dd className="m-0 text-[15px] leading-[1.55]">
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener"
                          className="text-foreground no-underline transition-colors hover:text-gold-ink"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-foreground">{value}</span>
                      )}
                      {note && (
                        <small className="mt-1 block text-[12.5px] text-muted-foreground">
                          {note}
                        </small>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <Eyebrow className="mt-9">What happens next</Eyebrow>
              <div className="overflow-hidden rounded-md border border-line bg-card">
                {nextSteps.map((step, i) => (
                  <Reveal
                    key={step.n}
                    delay={i * 0.08}
                    distance={12}
                    className="grid grid-cols-[34px_minmax(0,1fr)] items-baseline gap-3.5 border-t border-line-soft px-[18px] py-4 first:border-t-0"
                  >
                    <span className="font-mono text-[12px] text-gold-ink">{step.n}</span>
                    <span className="text-[14.5px] leading-[1.55] text-foreground">
                      <b className="font-semibold">{step.lead}</b> {step.rest}
                    </span>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <Eyebrow>Send an enquiry</Eyebrow>
              <ContactForm />
            </div>
          </div>
        </Container>
      </Band>
    </>
  )
}
