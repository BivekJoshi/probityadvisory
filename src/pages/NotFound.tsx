import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container, Eyebrow } from '@/components/layout/Container'
import { useSeo } from '@/hooks/useSeo'
import { site } from '@/data/site'

export default function NotFound() {
  useSeo({ title: `Page not found — ${site.name}` })

  return (
    <section className="bg-navy-deep py-[clamp(80px,14vw,160px)] text-on-navy">
      <Container>
        <Eyebrow onDark>404</Eyebrow>
        <h1 className="max-w-[18ch] text-[clamp(31px,5vw,52px)] text-white">
          That page is not on the file.
        </h1>
        <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.62] text-on-navy-muted">
          The link may be out of date. Everything we do sits under the five pages in the menu above.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="gold" size="lg">
            <Link to="/">
              Back to the home page
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline-dark" size="lg">
            <Link to="/contact">Contact us</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
