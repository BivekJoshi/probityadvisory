import { useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  CalendarRange,
  FilePen,
  HardHat,
  House,
  ShieldCheck,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion/Reveal'
import { audiences } from '@/data/site'
import { cn } from '@/lib/utils'

/* one glyph per point, in the same order as each audience's points */
const icons: Record<(typeof audiences)[number]['key'], readonly LucideIcon[]> = {
  practices: [CalendarRange, FilePen, UsersRound, ShieldCheck],
  businesses: [Building2, HardHat, House, UsersRound],
}

const ease = [0.16, 1, 0.3, 1] as const

/** Practices and direct clients, one tab each, so both read an answer written for them. */
export function AudienceTabs() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const audience = audiences[active]

  // Arrow keys move between tabs, as the ARIA tabs pattern expects.
  const onKeyDown = (event: KeyboardEvent) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    event.preventDefault()
    const next = (active + step + audiences.length) % audiences.length
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <Reveal className="overflow-hidden rounded-3xl border border-line bg-card shadow-card">
      <div
        role="tablist"
        aria-label="Who we work with"
        onKeyDown={onKeyDown}
        className="flex gap-1 border-b border-line-soft p-2 sm:p-3"
      >
        {audiences.map((item, i) => {
          const selected = i === active
          return (
            <button
              key={item.key}
              ref={(el) => {
                tabs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`audience-tab-${item.key}`}
              aria-selected={selected}
              aria-controls={`audience-panel-${item.key}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                'relative flex-1 rounded-2xl px-4 py-3 text-[14.5px] font-medium transition-colors duration-200 sm:flex-none sm:px-6',
                selected ? 'text-white' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {selected && (
                <motion.span
                  layoutId="audience-pill"
                  className="absolute inset-0 rounded-2xl bg-navy-deep"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className="relative">{item.label}</span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={audience.key}
          role="tabpanel"
          id={`audience-panel-${audience.key}`}
          aria-labelledby={`audience-tab-${audience.key}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease }}
          className="grid gap-10 p-[clamp(24px,4vw,48px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14"
        >
          <div className="flex flex-col items-start">
            <h3 className="text-[clamp(24px,2.6vw,32px)] tracking-[-0.01em]">{audience.title}</h3>
            <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.7] text-muted-foreground">
              {audience.body}
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/contact">
                {audience.cta}
                <ArrowRight />
              </Link>
            </Button>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {audience.points.map((point, i) => {
              const Icon = icons[audience.key][i]
              return (
                <li
                  key={point}
                  className="flex flex-col gap-3 rounded-2xl border border-line-soft bg-background p-5"
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-gold-soft text-gold-ink">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-[15px] font-medium leading-[1.5]">{point}</span>
                </li>
              )
            })}
          </ul>
        </motion.div>
      </AnimatePresence>
    </Reveal>
  )
}
