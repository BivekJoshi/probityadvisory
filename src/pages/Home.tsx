import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Band, Container, Eyebrow, Lede, SectionTitle } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { WordReveal } from '@/components/motion/WordReveal'
import { LazyGlobe } from '@/components/three/LazyGlobe'
import { ClockPanel } from '@/components/sections/ClockPanel'
import { ProofBar } from '@/components/sections/ProofBar'
import { ServiceCards } from '@/components/sections/ServiceCards'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { TeamGrid } from '@/components/sections/TeamGrid'
import { SoftwareMarquee } from '@/components/sections/SoftwareMarquee'
import { StatsRow } from '@/components/sections/StatsRow'
import { CTABand } from '@/components/sections/CTABand'
import { useSeo } from '@/hooks/useSeo'
import { site } from '@/data/site'

export default function Home() {
  const reduced = useReducedMotion()
  useSeo({
    title: `${site.name} — Outsourced accounting for UK practices`,
    description: site.description,
  })

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="relative overflow-hidden bg-navy-deep py-[clamp(48px,7vw,88px)] text-on-navy">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/3 size-[440px] rounded-full bg-navy/60 blur-3xl"
        />
        <Container className="relative">
          <div className="grid items-center gap-[clamp(32px,5vw,60px)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            <div>
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Eyebrow onDark>Outsourced accounting for UK practices</Eyebrow>
              </motion.div>

              <WordReveal
                text="Your name is on the file. We prepare it that way."
                highlight={['probity']}
                delay={0.12}
                className="text-[clamp(31px,4.9vw,54px)] tracking-[-0.015em] text-white"
              />

              <motion.div
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <Lede onDark className="mt-6 max-w-[54ch]">
                  Bookkeeping, VAT, year-end accounts and payroll for UK accountancy firms —
                  prepared in Kathmandu by qualified Chartered Accountants and returned ready for
                  partner review.
                </Lede>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild variant="gold" size="lg">
                    <Link to="/contact">
                      Book a discovery call
                      <ArrowRight />
                    </Link>
                  </Button>
                  <Button asChild variant="outline-dark" size="lg">
                    <Link to="/services">See what we take on</Link>
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* globe over the live clocks — the whole proposition in one column */}
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-5"
            >
              <LazyGlobe className="h-[240px] w-full sm:h-[300px]" dark />
              <ClockPanel />
            </motion.div>
          </div>
        </Container>
      </section>

      <ProofBar />

      {/* ---------------- services ---------------- */}
      <Band className="border-t-0">
        <Container>
          <Eyebrow>What we take on</Eyebrow>
          <Reveal>
            <SectionTitle>Three things, done properly.</SectionTitle>
            <Lede className="mb-8 mt-3.5">
              We would rather be the firm you trust with the compliance spine of your practice than
              the one that claims twenty services and staffs none of them well.
            </Lede>
          </Reveal>

          <ServiceCards />

          <Reveal className="mt-7">
            <Button asChild variant="outline">
              <Link to="/services">
                Full service detail
                <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </Container>
      </Band>

      <SoftwareMarquee />

      {/* ---------------- process ---------------- */}
      <Band className="border-t-0">
        <Container>
          <Eyebrow>How the work moves</Eyebrow>
          <Reveal>
            <SectionTitle className="mb-8">From first call to steady state.</SectionTitle>
          </Reveal>
          <ProcessTimeline />
        </Container>
      </Band>

      {/* ---------------- figures ---------------- */}
      <Band className="py-0">
        <Container className="px-0 sm:px-0">
          <StatsRow />
        </Container>
      </Band>

      {/* ---------------- direct clients ---------------- */}
      <Band dark>
        <Container>
          <Eyebrow onDark>Not an accountancy practice?</Eyebrow>
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <Reveal>
              <SectionTitle className="text-white">
                We also work directly with UK businesses.
              </SectionTitle>
              <p className="mt-4 max-w-[56ch] text-[16.5px] leading-[1.62] text-on-navy-muted">
                Owner-managed companies, contractors and landlords who want their bookkeeping, VAT
                and year-end handled properly — and who would rather have their questions answered
                by the person who did the work than by whoever picks up the phone.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="flex lg:justify-end">
              <Button asChild variant="gold" size="lg">
                <Link to="/contact">
                  Talk to us
                  <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </div>
        </Container>
      </Band>

      {/* ---------------- team ---------------- */}
      <Band>
        <Container>
          <Eyebrow>Who you would be working with</Eyebrow>
          <Reveal>
            <SectionTitle className="mb-8">Three principals. No account managers.</SectionTitle>
          </Reveal>
          <TeamGrid />
          <Reveal className="mt-7">
            <Button asChild variant="outline">
              <Link to="/about">
                Read the full profiles
                <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </Container>
      </Band>

      <CTABand
        title="The fastest way to judge us is to give us something real."
        body="Send one set of records — a messy quarter, a year-end you have been putting off — and see what comes back."
        whatsapp
      />
    </>
  )
}
