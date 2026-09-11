import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { WhatsApp } from '@/components/icons/Brand'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

interface CTABandProps {
  title: string
  body: string
  cta?: string
  dark?: boolean
  whatsapp?: boolean
  className?: string
}

export function CTABand({
  title,
  body,
  cta = 'Book a call',
  dark = false,
  whatsapp = false,
  className,
}: CTABandProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-t border-line-soft py-[clamp(52px,7.5vw,92px)]',
        dark && 'border-transparent bg-navy-deep text-on-navy',
        className,
      )}
    >
      {dark && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-1/2 size-[560px] -translate-x-1/2 rounded-full bg-gold/[0.06] blur-3xl"
        />
      )}
      <Container className="relative">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <h2 className={cn('text-[clamp(25px,3.4vw,36px)]', dark && 'text-white')}>{title}</h2>
          <p
            className={cn(
              'max-w-[54ch] text-[16.5px] leading-[1.62]',
              dark ? 'text-on-navy-muted' : 'text-muted-foreground',
            )}
          >
            {body}
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Button asChild variant="gold" size="lg">
              <Link to="/contact">
                {cta}
                <ArrowRight />
              </Link>
            </Button>
            {whatsapp && (
              <Button asChild variant={dark ? 'outline-dark' : 'outline'} size="lg">
                <a href={`https://wa.me/${site.phoneUKRaw}`} target="_blank" rel="noopener">
                  <WhatsApp className="size-4" />
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
