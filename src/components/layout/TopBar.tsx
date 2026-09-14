import { Clock, Mail } from 'lucide-react'
import { WhatsApp } from '@/components/icons'
import { Container } from '@/components/common'
import { contactPromise } from '@/content/process'
import { site } from '@/config/site'

const linkClass = 'flex items-center gap-1.5 transition-colors duration-150 hover:text-white'

/** Thin contact strip above the masthead. It scrolls away; the header below it sticks. */
export function TopBar() {
  return (
    <div className="hidden border-b border-on-navy-line bg-navy-deep text-[12.5px] text-on-navy-muted md:block">
      <Container className="flex h-9 items-center justify-between gap-6">
        <p className="flex items-center gap-2">
          <Clock className="size-3.5 text-gold" />
          {contactPromise}
        </p>
        <ul className="flex items-center gap-5">
          <li>
            <a href={`https://wa.me/${site.phoneUKRaw}`} target="_blank" rel="noopener" className={linkClass}>
              <WhatsApp className="size-3.5 text-gold" />
              {site.phoneUK}
              <span className="text-on-navy-muted/70">UK</span>
            </a>
          </li>
          <li>
            <a href={`https://wa.me/${site.phoneNPRaw}`} target="_blank" rel="noopener" className={linkClass}>
              <WhatsApp className="size-3.5 text-gold" />
              {site.phoneNP}
              <span className="text-on-navy-muted/70">Nepal</span>
            </a>
          </li>
          <li className="hidden lg:block">
            <a href={`mailto:${site.email}`} className={linkClass}>
              <Mail className="size-3.5 text-gold" />
              {site.email}
            </a>
          </li>
        </ul>
      </Container>
    </div>
  )
}
