import { WhatsApp } from '@/components/icons'
import { site } from '@/config/site'
import { FooterColumn, footerLinkClass } from './FooterColumn'

export function FooterContact() {
  return (
    <FooterColumn title="Get in touch">
      <li>
        <a
          href={`https://wa.me/${site.phoneUKRaw}`}
          target="_blank"
          rel="noopener"
          className={`flex items-center gap-2 ${footerLinkClass}`}
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
          className={`flex items-center gap-2 ${footerLinkClass}`}
        >
          <WhatsApp className="size-3.5" />
          {site.phoneNP} · Nepal
        </a>
      </li>
      <li>
        <a href={`mailto:${site.email}`} className={footerLinkClass}>
          {site.email}
        </a>
      </li>
      <li className="text-[14px] text-on-forest-muted">{site.address}</li>
      <li className="text-[13px] leading-normal text-on-forest-muted/80">{site.hours}</li>
    </FooterColumn>
  )
}
