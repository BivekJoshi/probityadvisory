import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { Stagger, StaggerItem } from '@/components/motion'
import { serviceIcons } from '@/components/icons'
import { services } from '@/content/services'
import { paths } from '@/config/routes'

/** Home-page summary of the three services; each card opens its full write-up. */
export function ServiceCards() {
  return (
    <Stagger className="grid gap-5 lg:grid-cols-3">
      {services.map((service, i) => {
        const Icon = serviceIcons[service.slug]
        return (
          <StaggerItem
            key={service.slug}
            as="article"
            className="group relative flex flex-col rounded-2xl border border-line bg-card p-7 shadow-card transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lift"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-12 place-items-center rounded-xl bg-navy-deep text-gold">
                <Icon className="size-5.5" />
              </span>
              <span className="font-mono text-[12px] text-muted-foreground">0{i + 1}</span>
            </div>

            <h3 className="mt-6 text-[22px]">
              {/* stretched link: the whole card is the target, the title is its name */}
              <Link
                to={`${paths.services}#${service.slug}`}
                className="after:absolute after:inset-0 after:rounded-2xl"
              >
                {service.title}
              </Link>
            </h3>
            <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">{service.blurb}</p>

            <ul className="mt-6 flex flex-col gap-2.5 border-t border-line-soft pt-6">
              {service.summary.map((item) => (
                <li key={item} className="flex gap-2.5 text-[14px] leading-normal text-foreground/85">
                  <Check className="mt-0.5 size-4 shrink-0 text-gold-ink" />
                  {item}
                </li>
              ))}
            </ul>

            <span
              aria-hidden="true"
              className="mt-auto flex items-center gap-1.5 pt-7 text-[14px] font-medium text-gold-ink"
            >
              Read the detail
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </StaggerItem>
        )
      })}
    </Stagger>
  )
}
