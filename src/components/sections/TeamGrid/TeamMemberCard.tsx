import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { StaggerItem } from '@/components/motion'
import type { Principal } from '@/content/team'
import { principalPath } from '@/config/routes'
import { cn } from '@/lib/utils'

interface TeamMemberCardProps {
  person: Principal
  /** Portrait beside the copy on wide screens — for a two-up grid, where cards have the room. */
  wide?: boolean
}

/**
 * Portraits sit greyscale until hover: they were taken against different
 * backgrounds, and greyscale sets them as one series. The name is the real
 * link; its ::after stretches over the card so the whole card is the target.
 */
export function TeamMemberCard({ person, wide = false }: TeamMemberCardProps) {
  return (
    <StaggerItem
      as="article"
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-card',
        'transition-[translate,box-shadow,border-color] duration-500 ease-brand hover:-translate-y-1 hover:border-green/40 hover:shadow-lift',
        'has-focus-visible:border-green',
        wide && 'xl:flex-row',
      )}
    >
      <div
        className={cn(
          'relative m-2 mb-0 aspect-4/5 overflow-hidden rounded-[20px] bg-secondary sm:aspect-5/4 md:aspect-4/5',
          wide && 'xl:mb-2 xl:mr-0 xl:aspect-auto xl:min-h-100 xl:w-[42%] xl:shrink-0',
        )}
      >
        <img
          src={person.photo}
          alt=""
          loading="lazy"
          decoding="async"
          width={480}
          height={600}
          className="absolute inset-0 size-full object-cover object-[center_22%] grayscale transition-[filter,scale] duration-700 ease-brand group-hover:scale-[1.04] group-hover:grayscale-0"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-green-ink">{person.role}</p>
        <h3 className="mt-2 text-[clamp(22px,2.2vw,26px)] tracking-[-0.01em]">
          <Link
            to={principalPath(person.slug)}
            className="after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none"
          >
            {person.name}
          </Link>
        </h3>
        <p className="mt-1.5 font-mono text-[12px] text-muted-foreground">{person.creds}</p>

        <p className="mt-4 line-clamp-3 text-[15px] leading-[1.65] text-muted-foreground">{person.short}</p>

        <span className="mt-auto flex items-center gap-2 pt-6 text-[14px] font-medium text-foreground/85 transition-colors group-hover:text-green-ink">
          View profile
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </StaggerItem>
  )
}
