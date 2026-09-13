import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/sections/PageHero'
import { useSeo } from '@/hooks/useSeo'
import { site } from '@/data/site'

export default function NotFound() {
  useSeo({ title: `Page not found — ${site.name}` })

  return (
    <PageHero
      eyebrow="404"
      title="That page is not on the file."
      lede="The link may be out of date. Everything we do sits under the five pages in the menu above."
    >
      <div className="flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link to="/">
            Back to the home page
            <ArrowRight />
          </Link>
        </Button>
        <Button asChild variant="outline-dark" size="lg">
          <Link to="/contact">Contact us</Link>
        </Button>
      </div>
    </PageHero>
  )
}
