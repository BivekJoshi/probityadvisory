import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ProbityMark } from '@/components/icons'
import { site } from '@/config/site'
import { MobileMenuContacts } from './MobileMenuContacts'
import { MobileNav } from './MobileNav'

/** The menu button below `lg`, and the sheet it opens. */
export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="grid size-9 place-items-center rounded-full border border-white/15 text-on-forest transition-colors hover:border-white/30 hover:bg-white/5 lg:hidden"
        >
          <Menu className="size-4.5" />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="flex items-center gap-2.5 font-display text-[18px] font-semibold text-white">
          <ProbityMark className="h-7 w-auto text-green" />
          {site.name}
        </SheetTitle>

        <MobileNav onNavigate={close} />
        <MobileMenuContacts onNavigate={close} />
      </SheetContent>
    </Sheet>
  )
}
