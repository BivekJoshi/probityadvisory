import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Container } from './Container'
import { ThemeToggle } from './ThemeToggle'
import { nav, site } from '@/data/site'
import { cn } from '@/lib/utils'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const reduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-on-navy-line bg-navy-deep',
        'transition-shadow duration-300',
        scrolled && 'shadow-[0_10px_30px_-20px_rgba(0,0,0,0.9)]',
      )}
    >
      <Container>
        <div
          className={cn(
            'flex items-center gap-6 transition-[padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
            scrolled ? 'py-2.5' : 'py-3.5',
          )}
        >
          <Link to="/" className="flex shrink-0 items-baseline gap-2.5 no-underline">
            <span className="font-display text-[19px] font-semibold tracking-[0.01em] text-on-navy">
              {site.name}
            </span>
            <span className="hidden font-mono text-[9.5px] uppercase tracking-[0.22em] text-gold sm:inline">
              {site.tagline}
            </span>
          </Link>

          <nav aria-label="Main" className="ml-auto hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative rounded-md px-3 py-2 text-[13.5px] no-underline transition-colors duration-150',
                    isActive
                      ? 'text-on-navy'
                      : 'text-on-navy-muted hover:bg-white/[0.06] hover:text-on-navy',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId={reduced ? undefined : 'nav-underline'}
                        className="absolute inset-x-3 -bottom-px h-0.5 bg-gold"
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <ThemeToggle />
            <Button asChild size="sm" variant="gold" className="hidden sm:inline-flex">
              <Link to="/contact">Book a call</Link>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open menu"
                  className="grid size-9 place-items-center rounded-md border border-on-navy-line/60 text-on-navy transition-colors hover:border-gold hover:text-gold lg:hidden"
                >
                  <Menu className="size-[18px]" />
                </button>
              </SheetTrigger>
              <SheetContent>
                <SheetTitle className="font-display text-[19px] font-semibold text-on-navy">
                  {site.name}
                </SheetTitle>
                <p className="-mt-2 font-mono text-[9.5px] uppercase tracking-[0.22em] text-gold">
                  {site.tagline}
                </p>

                <nav className="mt-6 flex flex-col" aria-label="Mobile">
                  {nav.map((item, i) => (
                    <motion.div
                      key={item.to}
                      initial={reduced ? false : { opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Radix `asChild` would overwrite NavLink's function className,
                          so the sheet is closed from the link itself instead. */}
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            'block border-b border-on-navy-line/50 py-3.5 font-display text-[21px] no-underline transition-colors',
                            isActive ? 'text-gold' : 'text-on-navy hover:text-gold',
                          )
                        }
                      >
                        {item.label}
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-auto flex flex-col gap-3 border-t border-on-navy-line pt-5">
                  <a
                    href={`mailto:${site.email}`}
                    className="font-mono text-[12.5px] text-on-navy-muted no-underline transition-colors hover:text-gold"
                  >
                    {site.email}
                  </a>
                  <a
                    href={`https://wa.me/${site.phoneUKRaw}`}
                    target="_blank"
                    rel="noopener"
                    className="font-mono text-[12.5px] text-on-navy-muted no-underline transition-colors hover:text-gold"
                  >
                    {site.phoneUK}
                  </a>
                  <Button asChild variant="gold" className="mt-1 w-full">
                    <Link to="/contact" onClick={() => setOpen(false)}>
                      Book a call
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  )
}
