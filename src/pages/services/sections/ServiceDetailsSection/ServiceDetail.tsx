import { CalendarCheck, Check } from 'lucide-react'
import { Reveal } from '@/components/motion'
import { serviceIcons } from '@/components/icons'
import type { Service } from '@/content/services'

/** Full write-up of one service: what we do, when it is due, and what comes back. */
export function ServiceDetail({ service, index }: { service: Service; index: number }) {
  const Icon = serviceIcons[service.slug]

  return (
    <Reveal
      as="article"
      id={service.slug}
      className="grid gap-10 rounded-3xl border border-line bg-card p-[clamp(24px,4vw,48px)] shadow-card lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16"
    >
      <div>
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-xl bg-navy-deep text-gold">
            <Icon className="size-5.5" />
          </span>
          <span className="font-mono text-[12px] text-muted-foreground">0{index + 1}</span>
        </div>
        <h2 className="mt-6 text-[clamp(26px,3vw,34px)] tracking-[-0.015em]">{service.title}</h2>
        <p className="mt-3 text-[16px] leading-[1.65] text-muted-foreground">{service.blurb}</p>
        <p className="mt-6 flex items-start gap-2.5 rounded-xl bg-gold-soft px-4 py-3 text-[13.5px] leading-[1.55] text-gold-ink">
          <CalendarCheck className="mt-0.5 size-4 shrink-0" />
          {service.keyedTo}
        </p>
      </div>

      <div>
        <ul className="flex flex-col gap-3.5">
          {service.detail.map((line) => (
            <li key={line} className="flex gap-3 text-[15px] leading-[1.6]">
              <Check className="mt-1 size-4 shrink-0 text-gold-ink" />
              {line}
            </li>
          ))}
        </ul>

        <dl className="mt-8 rounded-2xl border border-line-soft bg-secondary/60 p-5">
          <dt className="text-[13px] font-semibold text-foreground">What comes back to you</dt>
          <dd className="mt-1.5 text-[14.5px] leading-[1.65] text-muted-foreground">
            {service.deliverable}
          </dd>
        </dl>
      </div>
    </Reveal>
  )
}
