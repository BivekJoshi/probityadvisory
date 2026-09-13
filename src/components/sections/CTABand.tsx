import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { WhatsApp } from '@/components/icons/Brand'
import { SceneMount } from '@/components/three/SceneMount'
import { ContourScene } from '@/components/three/scenes'
import { site } from '@/data/site'

interface CTABandProps {
  title: string
  body: string
  cta?: string
  whatsapp?: boolean
}

/** The closing call to action: a navy card set inside the page. */
export function CTABand({ title, body, cta = 'Book a call', whatsapp = false }: CTABandProps) {
  return (
    <section className="pb-[clamp(64px,8vw,112px)]">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-3xl border border-on-navy-line bg-navy-deep px-6 py-[clamp(52px,7vw,88px)] text-center text-on-navy">
          <SceneMount className="absolute inset-0 -z-10" fallback={<div className="bg-dots absolute inset-0" />}>
            {(active) => <ContourScene active={active} focus={[0.5, 0.15]} leftFade={0} intensity={0.6} />}
          </SceneMount>
          <div
            aria-hidden="true"
            className="absolute -bottom-48 left-1/2 -z-10 size-140 -translate-x-1/2 rounded-full bg-gold/12 blur-3xl"
          />
          <h2 className="mx-auto max-w-[24ch] text-[clamp(28px,3.6vw,42px)] tracking-[-0.015em] text-white">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-[54ch] text-[17px] leading-[1.65] text-on-navy-muted">
            {body}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/contact">
                {cta}
                <ArrowRight />
              </Link>
            </Button>
            {whatsapp && (
              <Button asChild variant="outline-dark" size="lg">
                <a href={`https://wa.me/${site.phoneUKRaw}`} target="_blank" rel="noopener">
                  <WhatsApp />
                  WhatsApp us
                </a>
              </Button>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
