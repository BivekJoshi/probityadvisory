import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ClockPanel, PageHero } from '@/components/sections'
import { heroAssurances } from '@/content/proof'
import { paths } from '@/config/routes'

export function HomeHero() {
  return (
    <PageHero
      overlap
      scene="globe"
      eyebrow="Outsourced accounting for UK practices"
      title={'Your Accounts.\nOur Expertise.\nOne Seamless Team.'}
      highlight={['that', 'way']}
      lede="Bookkeeping, VAT, year-end accounts and payroll for UK accountancy firms — prepared in Kathmandu by qualified Chartered Accountants and returned ready for partner review."
      aside={<ClockPanel />}
    >
      <div className="flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link to={paths.contact}>
            Book a discovery call
            <ArrowRight />
          </Link>
        </Button>
        <Button asChild variant="outline-dark" size="lg">
          <Link to={paths.services}>See what we take on</Link>
        </Button>
      </div>
      <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
        {heroAssurances.map((item) => (
          <li key={item} className="flex items-center gap-2 text-[14px] text-on-forest-muted">
            <Check className="size-4 text-green" />
            {item}
          </li>
        ))}
      </ul>
    </PageHero>
  )
}
