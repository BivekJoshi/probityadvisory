import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Audience } from '@/content/audiences'
import { paths } from '@/config/routes'
import { audienceIcons } from './audienceIcons'

/** One audience's pitch and call to action, beside its four illustrated points. */
export function AudiencePanel({ audience }: { audience: Audience }) {
  return (
    <>
      <div className="flex flex-col items-start">
        <h3 className="text-[clamp(24px,2.6vw,32px)] tracking-[-0.01em]">{audience.title}</h3>
        <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.7] text-muted-foreground">
          {audience.body}
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link to={paths.contact}>
            {audience.cta}
            <ArrowRight />
          </Link>
        </Button>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {audience.points.map((point, i) => {
          const Icon = audienceIcons[audience.key][i]
          return (
            <li
              key={point}
              className="flex flex-col gap-3 rounded-2xl border border-line-soft bg-background p-5"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-gold-soft text-gold-ink">
                <Icon className="size-5" />
              </span>
              <span className="text-[15px] font-medium leading-[1.5]">{point}</span>
            </li>
          )
        })}
      </ul>
    </>
  )
}
