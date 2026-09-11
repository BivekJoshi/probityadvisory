import { motion, useReducedMotion } from 'framer-motion'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'
import { LinkedIn } from '@/components/icons/Brand'
import { team } from '@/data/team'
import { cn } from '@/lib/utils'

/**
 * Portraits sit greyscale until hover, which is where the reference file's
 * restraint comes from — the picture stops competing with the credentials.
 */
export function TeamGrid({ full = false }: { full?: boolean }) {
  const reduced = useReducedMotion()

  return (
    <Stagger
      className={cn(
        'grid gap-6 md:grid-cols-3',
        !full && 'md:gap-6',
      )}
      step={0.12}
    >
      {team.map((person) => (
        <StaggerItem key={person.name} as="article" className="group flex flex-col gap-3.5">
          <motion.div
            whileHover={reduced ? undefined : { y: -4 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-4/5 w-full overflow-hidden rounded-md border border-line bg-secondary"
          >
            <img
              src={person.photo}
              alt={person.name}
              loading="lazy"
              width={600}
              height={750}
              className="size-full object-cover grayscale contrast-[1.06] brightness-[1.02] transition-[filter,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-navy/[0.16] mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0"
            />
          </motion.div>

          <div>
            <h3 className="text-[19px]">{person.name}</h3>
            <p className="mt-1 font-mono text-[11px] tracking-[0.09em] text-gold-ink">
              {person.creds}
            </p>
          </div>

          {full ? (
            person.bio.map((para, i) => (
              <p key={i} className="text-[14px] leading-[1.62] text-muted-foreground">
                {para}
              </p>
            ))
          ) : (
            <p className="text-[14px] leading-[1.62] text-muted-foreground">{person.short}</p>
          )}

          {full && person.linkedin && (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener"
              className="mt-auto flex w-fit items-center gap-2 border-b border-line pb-0.5 pt-1 text-[12.5px] text-muted-foreground no-underline transition-colors duration-200 hover:border-gold hover:text-gold-ink"
            >
              <LinkedIn className="size-3.5" />
              LinkedIn profile
            </a>
          )}
        </StaggerItem>
      ))}
    </Stagger>
  )
}
