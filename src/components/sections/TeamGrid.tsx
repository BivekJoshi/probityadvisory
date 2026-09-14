import { ArrowUpRight } from 'lucide-react'
import { Stagger, StaggerItem } from '@/components/motion'
import { LinkedIn } from '@/components/icons'
import { team } from '@/content/team'
import { cn } from '@/lib/utils'

/**
 * Portraits sit greyscale until hover: the three were taken against different
 * backgrounds, and greyscale sets them as one series.
 */
export function TeamGrid({ full = false }: { full?: boolean }) {
  return (
    <Stagger className="grid gap-6 md:grid-cols-3" step={0.1}>
      {team.map((person) => (
        <StaggerItem
          key={person.name}
          as="article"
          className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-card"
        >
          <div className={cn('overflow-hidden bg-secondary', full ? 'aspect-4/5' : 'aspect-square')}>
            <img
              src={person.photo}
              alt={person.name}
              loading="lazy"
              decoding="async"
              width={480}
              height={600}
              className="size-full object-cover object-[center_25%] grayscale transition-[filter,scale] duration-700 ease-brand group-hover:scale-[1.03] group-hover:grayscale-0"
            />
          </div>

          <div className="flex flex-1 flex-col gap-3 p-6">
            <div>
              <h3 className="text-[21px]">{person.name}</h3>
              <p className="mt-1.5 font-mono text-[11.5px] tracking-[0.04em] text-gold-ink">
                {person.creds}
              </p>
            </div>

            {(full ? person.bio : [person.short]).map((para) => (
              <p key={para} className="text-[14.5px] leading-[1.65] text-muted-foreground">
                {para}
              </p>
            ))}

            {full && person.linkedin && (
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener"
                className="mt-auto inline-flex w-fit items-center gap-2 pt-3 text-[13.5px] font-medium text-foreground/80 transition-colors hover:text-gold-ink"
              >
                <LinkedIn className="size-4" />
                LinkedIn profile
                <ArrowUpRight className="size-3.5" />
              </a>
            )}
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
