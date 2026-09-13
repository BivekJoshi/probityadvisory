import { Mail, MapPin, Phone } from 'lucide-react'
import { Band, Container } from '@/components/layout/Container'
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
  { term: 'Email', value: site.email, href: `mailto:${site.email}`, note: null, icon: Mail },
  { term: 'Office', value: site.address, href: null, note: site.hours, icon: MapPin },
]

const heading = 'mb-4 text-[22px]'

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

      <Band>
        <Container className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div className="flex flex-col gap-12">
            <Reveal as="section" aria-labelledby="direct">
              <h2 id="direct" className={heading}>
                Direct
              </h2>
              <dl className="grid gap-3">
                {details.map(({ term, value, href, note, icon: Icon }) => (
                  <div
                    key={term}
                    className="flex gap-4 rounded-2xl border border-line bg-card p-5 shadow-card"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold-soft text-gold-ink">
                      <Icon className="size-4.5" />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-[13px] text-muted-foreground">{term}</dt>
                      <dd className="mt-0.5 text-[15.5px] font-medium">
                        {href ? (
                          <a
                            href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel="noopener"
                            className="transition-colors hover:text-gold-ink"
                          >
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                        {note && (
                          <span className="mt-1 block text-[13px] font-normal text-muted-foreground">
                            {note}
                          </span>
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal as="section" aria-labelledby="next" delay={0.08}>
              <h2 id="next" className={heading}>
                What happens next
              </h2>
              <ol className="divide-y divide-line-soft rounded-2xl border border-line bg-card shadow-card">
                {nextSteps.map((step) => (
                  <li key={step.n} className="grid grid-cols-[32px_minmax(0,1fr)] gap-4 p-5">
                    <span className="grid size-8 place-items-center rounded-full bg-navy-deep font-mono text-[12px] text-gold">
                      {step.n}
                    </span>
                    <p className="text-[15px] leading-[1.6]">
                      <b className="font-semibold">{step.lead}</b>{' '}
                      <span className="text-muted-foreground">{step.rest}</span>
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal as="section" aria-labelledby="enquiry" delay={0.12}>
            <h2 id="enquiry" className={heading}>
              Send an enquiry
            </h2>
            <ContactForm />
          </Reveal>
        </Container>
      </Band>
    </>
  )
}
