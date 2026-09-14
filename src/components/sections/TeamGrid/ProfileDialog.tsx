import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { LinkedIn } from '@/components/icons'
import { brandEase } from '@/components/motion'
import type { Principal } from '@/content/team'
import { principalPath } from '@/config/routes'

interface ProfileDialogProps {
  people: Principal[]
  index: number
  open: boolean
  onOpenChange: (open: boolean) => void
  onIndexChange: (index: number) => void
}

/** The quick profile a card opens: portrait, bio and figures, with a way on to the full portfolio. */
export function ProfileDialog({ people, index, open, onOpenChange, onIndexChange }: ProfileDialogProps) {
  const content = useRef<HTMLDivElement>(null)
  const person = people[index]
  const many = people.length > 1
  const prev = people[(index - 1 + people.length) % people.length]
  const next = people[(index + 1) % people.length]

  const go = (step: number) => {
    onIndexChange((index + step + people.length) % people.length)
    content.current?.scrollTo({ top: 0 })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        ref={content}
        closeLabel="Close profile"
        onKeyDown={(event) => {
          if (!many) return
          if (event.key === 'ArrowRight') go(1)
          if (event.key === 'ArrowLeft') go(-1)
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={person.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: brandEase }}
            className="grid md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]"
          >
            <div className="relative h-80 overflow-hidden bg-forest-deep sm:h-100 md:h-auto md:min-h-150">
              <img
                src={person.photo}
                alt={person.name}
                width={480}
                height={600}
                className="absolute inset-0 size-full object-cover object-top md:object-[center_22%]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-forest-deep via-forest-deep/15 to-transparent"
              />
              <div className="absolute inset-x-6 bottom-6">
                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[12px] font-medium text-white backdrop-blur-md">
                  {person.role}
                </span>
                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Qualifications">
                  {person.creds.split(' · ').map((cred) => (
                    <li
                      key={cred}
                      className="rounded-full border border-white/15 bg-forest-deep/50 px-2.5 py-1 font-mono text-[11px] text-on-forest backdrop-blur-md"
                    >
                      {cred}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-7 p-6 sm:p-9">
              <header>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-green-ink">
                  Principal · Probity Advisory
                </p>
                <DialogTitle className="mt-2 text-[clamp(28px,3.2vw,36px)] tracking-[-0.015em]">
                  {person.name}
                </DialogTitle>
                <DialogDescription className="mt-3 text-[16px] leading-[1.6] text-foreground/80">
                  {person.short}
                </DialogDescription>
              </header>

              <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
                {person.highlights.map((item) => (
                  <div key={item.label} className="flex flex-col-reverse justify-end gap-1.5 bg-card p-4">
                    <dt className="text-[12.5px] leading-snug text-muted-foreground">{item.label}</dt>
                    <dd className="tabular font-display text-[24px] font-semibold leading-none text-foreground">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="space-y-4 text-[15px] leading-[1.7] text-muted-foreground">
                {person.bio.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>

              <section>
                <h3 className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-foreground/60">
                  Areas of work
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {person.focus.map((item) => (
                    <li key={item}>
                      <Badge variant="green">{item}</Badge>
                    </li>
                  ))}
                </ul>
              </section>

              <footer className="mt-auto flex flex-wrap items-center gap-3 border-t border-line pt-6">
                <Button asChild>
                  <Link to={principalPath(person.slug)}>
                    View full portfolio
                    <ArrowRight />
                  </Link>
                </Button>
                {person.linkedin && (
                  <Button asChild variant="outline">
                    <a href={person.linkedin} target="_blank" rel="noopener">
                      <LinkedIn />
                      LinkedIn
                      <ArrowUpRight />
                    </a>
                  </Button>
                )}
                {many && (
                  <div className="ml-auto flex gap-2">
                    <Button
                      variant="outline"
                      className="size-11 px-0"
                      onClick={() => go(-1)}
                      aria-label={`Previous: ${prev.name}`}
                    >
                      <ArrowLeft />
                    </Button>
                    <Button
                      variant="outline"
                      className="size-11 px-0"
                      onClick={() => go(1)}
                      aria-label={`Next: ${next.name}`}
                    >
                      <ArrowRight />
                    </Button>
                  </div>
                )}
              </footer>
            </div>
          </motion.article>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
