import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LinkedIn } from '@/components/icons'
import { PageHero } from '@/components/sections'
import type { Principal } from '@/content/team'
import { paths } from '@/config/routes'
import { PortraitFrame } from './PortraitFrame'

export function PortfolioHero({ person }: { person: Principal }) {
  const [firstName, ...rest] = person.name.split(' ')

  return (
    <PageHero
      overlap
      eyebrow={`Principal · ${person.role}`}
      title={person.name}
      highlight={rest}
      lede={person.short}
      aside={<PortraitFrame person={person} />}
    >
      <p className="font-mono text-[13px] tracking-[0.04em] text-green">{person.creds}</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link to={paths.contact}>
            Book a call with {firstName}
            <ArrowRight />
          </Link>
        </Button>
        {person.linkedin && (
          <Button asChild variant="outline-dark" size="lg">
            <a href={person.linkedin} target="_blank" rel="noopener">
              <LinkedIn />
              LinkedIn
              <ArrowUpRight />
            </a>
          </Button>
        )}
      </div>
    </PageHero>
  )
}
