import { ArrowUpRight, Award, Landmark } from 'lucide-react'
import { Band, Container, Eyebrow, SectionTitle } from '@/components/common'
import { Reveal } from '@/components/motion'
import { LinkedIn } from '@/components/icons'
import type { Principal } from '@/content/team'
import { cn } from '@/lib/utils'

/** The bio set as an editorial column, beside a sticky card of credentials. */
export function ProfileSection({ person }: { person: Principal }) {
  const firstName = person.name.split(' ')[0]

  return (
    <Band>
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow>Profile</Eyebrow>
            <SectionTitle>About {firstName}.</SectionTitle>
          </Reveal>
          <div className="mt-8 space-y-6">
            {person.bio.map((para, i) => (
              <Reveal key={para} delay={i * 0.08}>
                <p
                  className={cn(
                    i === 0
                      ? 'text-[18.5px] leading-[1.7] text-foreground sm:text-[20px]'
                      : 'text-[16.5px] leading-[1.75] text-muted-foreground',
                  )}
                >
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-line bg-card p-6 shadow-card sm:p-7 lg:sticky lg:top-24">
            <h3 className="flex items-center gap-2.5 text-[17px]">
              <Award className="size-4.5 text-green-ink" />
              Qualifications
            </h3>
            <ul className="mt-5 divide-y divide-line-soft">
              {person.qualifications.map((q) => (
                <li key={q.body} className="flex items-start gap-3.5 py-3.5 first:pt-0">
                  <span className="mt-0.5 shrink-0 rounded-md bg-green-soft px-2 py-0.5 font-mono text-[12px] font-medium text-green-ink">
                    {q.title}
                  </span>
                  <span className="flex-1 text-[14.5px] leading-[1.5] text-foreground/85">{q.body}</span>
                  {q.year && (
                    <span className="tabular shrink-0 font-mono text-[12.5px] text-muted-foreground">{q.year}</span>
                  )}
                </li>
              ))}
            </ul>

            {person.roles && (
              <>
                <h3 className="mt-7 flex items-center gap-2.5 text-[17px]">
                  <Landmark className="size-4.5 text-green-ink" />
                  Offices held
                </h3>
                <ul className="mt-4 space-y-3">
                  {person.roles.map((role) => (
                    <li key={role} className="flex gap-3 text-[14.5px] leading-[1.5] text-foreground/85">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-green" />
                      {role}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {person.linkedin && (
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener"
                className="mt-7 flex items-center gap-2 border-t border-line-soft pt-5 text-[14px] font-medium text-foreground/80 transition-colors hover:text-green-ink"
              >
                <LinkedIn className="size-4" />
                LinkedIn profile
                <ArrowUpRight className="ml-auto size-4" />
              </a>
            )}
          </div>
        </Reveal>
      </Container>
    </Band>
  )
}
