import { Link } from 'react-router-dom'
import { Container } from './Container'
import { WhatsApp } from '@/components/icons/Brand'
import { nav, site } from '@/data/site'
import { useClock } from '@/hooks/useClock'

export function Footer() {
  const london = useClock('Europe/London')
  const kathmandu = useClock('Asia/Kathmandu')

  return (
    <footer className="border-t border-on-navy-line bg-navy-deep text-on-navy">
      <Container className="py-[clamp(44px,6vw,68px)]">
        <div className="grid gap-10 md:grid-cols-[1.4fr_0.8fr_1fr]">
          <div>
            <h4 className="font-display text-[19px] font-semibold text-white">{site.name}</h4>
            <p className="mt-3 max-w-[46ch] text-[14.5px] leading-[1.65] text-on-navy-muted">
              {site.description}
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
              Pages
            </h4>
            <div className="mt-4 flex flex-col gap-2.5">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="w-fit text-[14px] text-on-navy-muted no-underline transition-colors duration-150 hover:text-gold"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
              Get in touch
            </h4>
            <div className="mt-4 flex flex-col gap-2.5">
              <a
                href={`https://wa.me/${site.phoneUKRaw}`}
                target="_blank"
                rel="noopener"
                className="flex w-fit items-center gap-2 text-[14px] text-on-navy-muted no-underline transition-colors duration-150 hover:text-gold"
              >
                <WhatsApp className="size-[15px]" />
                {site.phoneUK} · UK
              </a>
              <a
                href={`https://wa.me/${site.phoneNPRaw}`}
                target="_blank"
                rel="noopener"
                className="flex w-fit items-center gap-2 text-[14px] text-on-navy-muted no-underline transition-colors duration-150 hover:text-gold"
              >
                <WhatsApp className="size-[15px]" />
                {site.phoneNP} · Nepal
              </a>
              <a
                href={`mailto:${site.email}`}
                className="w-fit text-[14px] text-on-navy-muted no-underline transition-colors duration-150 hover:text-gold"
              >
                {site.email}
              </a>
              <span className="text-[14px] text-on-navy-muted">{site.address}</span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-on-navy-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-on-navy-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="tabular font-mono text-[12px] text-on-navy-muted">
            London {london} · Kathmandu {kathmandu}
          </p>
        </div>
      </Container>
    </footer>
  )
}
