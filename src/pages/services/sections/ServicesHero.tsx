import { serviceIcons } from '@/components/icons'
import { PageHero } from '@/components/sections'
import { services } from '@/content/services'

/** The services masthead, with a jump link to each service on the page. */
export function ServicesHero() {
  return (
    <PageHero
      eyebrow="Services"
      title="The compliance spine of your practice."
      highlight={['spine']}
      lede="Three services we staff properly, priced per engagement, delivered inside your own systems."
    >
      <nav aria-label="Services on this page" className="flex flex-wrap gap-2">
        {services.map((service) => {
          const Icon = serviceIcons[service.slug]
          return (
            <a
              key={service.slug}
              href={`#${service.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[14px] text-on-navy transition-colors duration-200 hover:border-white/30 hover:bg-white/10"
            >
              <Icon className="size-4 text-gold" />
              {service.title}
            </a>
          )
        })}
      </nav>
    </PageHero>
  )
}
