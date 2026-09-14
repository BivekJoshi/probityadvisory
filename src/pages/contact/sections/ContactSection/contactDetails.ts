import { Mail, MapPin, Phone } from 'lucide-react'
import { WhatsApp } from '@/components/icons'
import { site } from '@/config/site'

export const contactDetails = [
  {
    term: 'United Kingdom',
    value: site.phoneUK,
    href: `https://wa.me/${site.phoneUKRaw}`,
    note: 'Call or WhatsApp',
    icon: Phone,
  },
  {
    term: 'Nepal',
    value: site.phoneNP,
    href: `https://wa.me/${site.phoneNPRaw}`,
    note: 'Call or WhatsApp',
    icon: WhatsApp,
  },
  { term: 'Email', value: site.email, href: `mailto:${site.email}`, note: null, icon: Mail },
  { term: 'Office', value: site.address, href: null, note: site.hours, icon: MapPin },
]

export type ContactDetail = (typeof contactDetails)[number]
