import { Reveal } from '@/components/motion/Reveal'
import { services } from '@/data/site'

type Service = (typeof services)[number]

/** Full write-up of one service: what we do, and what comes back. */
export function ServiceDetail({ service, index }: { service: Service; index: number }) {
  return (
    <article
      id={service.slug}
      className="grid gap-[clamp(20px,4vw,48px)] border-t border-line-soft py-9 first:border-t-0 first:pt-1.5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
    >
      <Reveal direction="right" delay={index * 0.05}>
        <div className="lg:sticky lg:top-28">
          <h3 className="text-[24px]">{service.title}</h3>
          <p className="mt-3.5 border-l-2 border-gold py-1.5 pl-3.5 font-mono text-[12px] leading-[1.6] text-gold-ink">
            {service.keyedTo}
          </p>
        </div>
      </Reveal>

      <Reveal delay={index * 0.05 + 0.08}>
        <ul className="flex list-none flex-col gap-2.5 p-0">
          {service.detail.map((line) => (
            <li
              key={line}
              className="relative pl-5 text-[14.5px] leading-[1.55] text-foreground before:absolute before:left-0 before:top-[0.62em] before:h-px before:w-2.5 before:bg-gold"
            >
              {line}
            </li>
          ))}
        </ul>

        <div className="mt-5 rounded-md border border-line bg-card p-4 sm:p-[18px]">
          <dt className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink">
            What comes back to you
          </dt>
          <dd className="m-0 text-[14px] leading-[1.6] text-muted-foreground">
            {service.deliverable}
          </dd>
        </div>
      </Reveal>
    </article>
  )
}
