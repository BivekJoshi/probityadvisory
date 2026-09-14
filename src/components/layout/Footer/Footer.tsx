import { Link } from 'react-router-dom'
import { Container } from '@/components/common'
import { nav, paths } from '@/config/routes'
import { services } from '@/content/services'
import { FooterBottom } from './FooterBottom'
import { FooterBrand } from './FooterBrand'
import { FooterColumn, footerLinkClass } from './FooterColumn'
import { FooterContact } from './FooterContact'

export function Footer() {
  return (
    <footer className="bg-navy-deep text-on-navy">
      <Container className="py-[clamp(56px,7vw,80px)]">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.7fr_1.2fr_1.2fr]">
          <FooterBrand />

          <FooterColumn title="Pages">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={footerLinkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Services">
            {services.map((service) => (
              <li key={service.slug}>
                <Link to={`${paths.services}#${service.slug}`} className={footerLinkClass}>
                  {service.title}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterContact />
        </div>

        <FooterBottom />
      </Container>
    </footer>
  )
}
