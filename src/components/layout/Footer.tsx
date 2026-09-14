import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/common'
import { ProbityMark, WhatsApp } from '@/components/icons'
import { nav, paths } from '@/config/routes'
import { services } from '@/content/services'
import { site } from '@/config/site'
import { formatTime } from '@/lib/time'
import { useMinute } from '@/hooks/useMinute'

const linkClass = 'text-[14px] text-on-navy-muted transition-colors duration-150 hover:text-white'

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-sans text-[12.5px] font-semibold uppercase tracking-[0.14em] text-gold">
        {title}
      </h2>
      <ul className="mt-5 flex flex-col gap-3">{children}</ul>
    </div>
  )
}

export function Footer() {
  const now = useMinute()

  return (
    <footer className="bg-navy-deep text-on-navy">
      <Container className="py-[clamp(56px,7vw,80px)]">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.7fr_1.2fr_1.2fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to={paths.home} className="flex w-fit items-center gap-2.5">
              <ProbityMark className="size-8" />
              <span className="font-display text-[19px] font-semibold text-white">{site.name}</span>
            </Link>
            <p className="mt-4 max-w-[42ch] text-[14.5px] leading-[1.65] text-on-navy-muted">
              {site.description}
            </p>
          </div>

          <Column title="Pages">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </Column>

          <Column title="Services">
            {services.map((service) => (
              <li key={service.slug}>
                <Link to={`${paths.services}#${service.slug}`} className={linkClass}>
                  {service.title}
                </Link>
              </li>
            ))}
          </Column>

          <Column title="Get in touch">
            <li>
              <a
                href={`https://wa.me/${site.phoneUKRaw}`}
                target="_blank"
                rel="noopener"
                className={`flex items-center gap-2 ${linkClass}`}
              >
                <WhatsApp className="size-3.5" />
                {site.phoneUK} · UK
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${site.phoneNPRaw}`}
                target="_blank"
                rel="noopener"
                className={`flex items-center gap-2 ${linkClass}`}
              >
                <WhatsApp className="size-3.5" />
                {site.phoneNP} · Nepal
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={linkClass}>
                {site.email}
              </a>
            </li>
            <li className="text-[14px] text-on-navy-muted">{site.address}</li>
            <li className="text-[13px] leading-normal text-on-navy-muted/80">{site.hours}</li>
          </Column>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-on-navy-line pt-6 text-[13px] text-on-navy-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {now.getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="tabular font-mono text-[12.5px]">
            London {formatTime('Europe/London', now)} · Kathmandu{' '}
            {formatTime('Asia/Kathmandu', now)}
          </p>
        </div>
      </Container>
    </footer>
  )
}
