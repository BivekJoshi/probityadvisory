import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/common'
import { ThemeToggle } from '@/features/theme'
import { paths } from '@/config/routes'
import { useScrolledPast } from '@/hooks/useScrolledPast'
import { cn } from '@/lib/utils'
import { DesktopNav } from './DesktopNav'
import { HeaderBrand } from './HeaderBrand'
import { MobileMenu } from './MobileMenu'

export function Header() {
  // Solid at rest, so it matches the navy masthead it sits on; frosted once the
  // page scrolls light content up underneath it.
  const scrolled = useScrolledPast(8)

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
        <HeaderBrand />
        <DesktopNav />

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to={paths.contact}>Book a call</Link>
          </Button>
          <MobileMenu />
        </div>
      </Container>
    </header>
  )
}
