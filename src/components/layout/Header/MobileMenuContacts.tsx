import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { paths } from '@/config/routes'
import { site } from '@/config/site'

/** Email, phone and the call to action at the foot of the mobile menu. */
export function MobileMenuContacts({ onNavigate }: { onNavigate: () => void }) {
  return (
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
        <Link to={paths.contact} onClick={onNavigate}>
          Book a call
          <ArrowRight />
        </Link>
      </Button>
    </div>
  )
}
