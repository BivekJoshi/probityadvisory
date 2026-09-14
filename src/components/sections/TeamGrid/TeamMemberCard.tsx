import { ArrowUpRight } from 'lucide-react'
import { StaggerItem } from '@/components/motion'
import type { Principal } from '@/content/team'
import { cn } from '@/lib/utils'

interface TeamMemberCardProps {
  person: Principal
  onOpen: () => void
  /** Portrait beside the copy on wide screens — for a two-up grid, where cards have the room. */
  wide?: boolean
}

/**
 * Portraits sit greyscale until hover: they were taken against different
 * backgrounds, and greyscale sets them as one series. The name is the real
 * button; its ::after stretches over the card so the whole card is the target.
 */
export function TeamMemberCard({ person, onOpen, wide = false }: TeamMemberCardProps) {
  const extra = person.focus.length - 3

  return (
    <StaggerItem
      as="article"
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-card',
        'transition-[translate,box-shadow,border-color] duration-500 ease-brand hover:-translate-y-1 hover:border-green/45 hover:shadow-lift',
        'has-focus-visible:border-green',
        wide && 'xl:flex-row',
      )}
    >
      <div
        className={cn(
          'relative aspect-4/5 overflow-hidden bg-secondary sm:aspect-5/4 md:aspect-4/5',
          wide && 'xl:aspect-auto xl:min-h-110 xl:w-[45%] xl:shrink-0',
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
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-forest-deep/85 via-forest-deep/5 to-transparent"
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-forest-deep/45 px-3 py-1 text-[12px] font-medium text-white backdrop-blur-md">
          {person.role}
        </span>
        <ul className="absolute inset-x-4 bottom-4 flex flex-wrap gap-1.5" aria-label="Qualifications">
          {person.creds.split(' · ').map((cred) => (
            <li
              key={cred}
              className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 font-mono text-[11px] tracking-[0.03em] text-white backdrop-blur-md"
            >
              {cred}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-green-ink">Principal</p>
          <h3 className="mt-1.5 text-[clamp(22px,2.2vw,26px)] tracking-[-0.01em]">
            <button
              type="button"
              onClick={onOpen}
              aria-haspopup="dialog"
              className="text-left after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none"
            >
              {person.name}
            </button>
          </h3>
        </div>

        <p className="text-[15px] leading-[1.65] text-muted-foreground">{person.short}</p>

        <ul className="flex flex-wrap gap-1.5" aria-label="Areas of work">
          {person.focus.slice(0, 3).map((item) => (
            <li
              key={item}
              className="rounded-full border border-line bg-secondary/60 px-3 py-1 text-[12.5px] font-medium text-foreground/80"
            >
              {item}
            </li>
          ))}
          {extra > 0 && (
            <li className="rounded-full px-2 py-1 text-[12.5px] font-medium text-muted-foreground">
              +{extra} more
            </li>
          )}
        </ul>

        <div className="mt-auto flex items-center justify-between border-t border-line-soft pt-5">
          <span className="text-[14px] font-medium text-foreground/85 transition-colors group-hover:text-green-ink">
            View profile
          </span>
          <span
            aria-hidden="true"
            className="grid size-10 place-items-center rounded-full border border-line text-foreground/70 transition-[background-color,border-color,color,rotate] duration-300 group-hover:rotate-45 group-hover:border-green group-hover:bg-green group-hover:text-primary-foreground"
          >
            <ArrowUpRight className="size-4.5" />
          </span>
        </div>
      </div>
    </StaggerItem>
  )
}
