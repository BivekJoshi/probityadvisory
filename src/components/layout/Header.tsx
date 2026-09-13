import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowRight, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ProbityMark } from '@/components/icons/Brand'
import { Container } from './Container'
import { ThemeToggle } from './ThemeToggle'
import { nav, site } from '@/data/site'
import { cn } from '@/lib/utils'

const ease = [0.16, 1, 0.3, 1] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  // Solid at rest, so it matches the navy masthead it sits on; frosted once the
  // page scrolls light content up underneath it.
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8))

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300',
        scrolled
          ? 'border-white/8 bg-navy-deep/90 backdrop-blur-xl backdrop-saturate-150'
          : 'border-transparent bg-navy-deep',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${site.name} — home`}>
          <ProbityMark className="size-8" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[18px] font-semibold text-white">{site.name}</span>
            <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
              {site.tagline}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/3 p-1">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'relative block rounded-full px-4 py-1.5 text-[14px] transition-colors duration-200',
                      isActive ? 'text-white' : 'text-on-navy-muted hover:text-white',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-white/10"
                          transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/contact">Book a call</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="grid size-9 place-items-center rounded-full border border-white/15 text-on-navy transition-colors hover:border-white/30 hover:bg-white/5 lg:hidden"
              >
                <Menu className="size-4.5" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="flex items-center gap-2.5 font-display text-[18px] font-semibold text-white">
                <ProbityMark className="size-7" />
                {site.name}
              </SheetTitle>

              <nav aria-label="Mobile" className="mt-6">
                <ul className="flex flex-col gap-1">
                  {nav.map((item, i) => (
                    <motion.li
                      key={item.to}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.35, ease }}
                    >
                      {/* Radix `asChild` would overwrite NavLink's function className,
                          so the sheet is closed from the link itself instead. */}
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        onClick={close}
                        className={({ isActive }) =>
                          cn(
                            'block rounded-xl px-4 py-3 font-display text-[21px] transition-colors',
                            isActive ? 'bg-white/6 text-gold' : 'text-on-navy hover:bg-white/4',
                          )
                        }
                      >
                        {item.label}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto flex flex-col gap-3 border-t border-on-navy-line pt-6">
                <a
                  href={`mailto:${site.email}`}
                  className="w-fit text-[14px] text-on-navy-muted transition-colors hover:text-white"
                >
                  {site.email}
                </a>
                <a
                  href={`https://wa.me/${site.phoneUKRaw}`}
                  target="_blank"
                  rel="noopener"
                  className="w-fit text-[14px] text-on-navy-muted transition-colors hover:text-white"
                >
                  {site.phoneUK}
                </a>
                <Button asChild className="mt-2 w-full">
                  <Link to="/contact" onClick={close}>
                    Book a call
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}
