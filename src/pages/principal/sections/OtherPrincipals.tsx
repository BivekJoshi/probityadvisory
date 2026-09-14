import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Band, Container, SectionHeader } from '@/components/common'
import { Stagger, StaggerItem } from '@/components/motion'
import { team, type Principal } from '@/content/team'
import { paths, principalPath } from '@/config/routes'

/** Links on to the rest of the team, so a portfolio is never a dead end. */
export function OtherPrincipals({ person }: { person: Principal }) {
  const others = team.filter((other) => other.slug !== person.slug)
  if (others.length === 0) return null

  return (
    <Band className="pt-0">
      <Container>
        <SectionHeader
          eyebrow="The principals"
          title="Also on the team."
          action={
            <Button asChild variant="outline">
              <Link to={paths.about}>
                About the firm
                <ArrowRight />
              </Link>
            </Button>
          }
        />
        <Stagger className="grid gap-5 md:grid-cols-2">
          {others.map((other) => (
            <StaggerItem
              as="article"
              key={other.slug}
              className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-line bg-card p-4 pr-5 shadow-card transition-[border-color,box-shadow] duration-300 hover:border-green/50 hover:shadow-lift sm:pr-6"
            >
              <div className="size-22 shrink-0 overflow-hidden rounded-xl bg-secondary sm:size-28">
                <img
                  src={other.photo}
                  alt=""
                  loading="lazy"
                  width={480}
                  height={600}
                  className="size-full object-cover object-[center_22%] grayscale transition-[filter,scale] duration-700 ease-brand group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-green-ink">{other.role}</p>
                <h3 className="mt-1 text-[20px]">
                  <Link
                    to={principalPath(other.slug)}
                    className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-green"
                  >
                    {other.name}
                  </Link>
                </h3>
                <p className="mt-1 font-mono text-[11.5px] text-muted-foreground">{other.creds}</p>
              </div>
              <span
                aria-hidden="true"
                className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-[background-color,border-color,color,rotate] duration-300 group-hover:rotate-45 group-hover:border-green group-hover:bg-green group-hover:text-primary-foreground"
              >
                <ArrowUpRight className="size-4.5" />
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Band>
  )
}
