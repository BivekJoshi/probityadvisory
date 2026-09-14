import { Check } from 'lucide-react'
import { StaggerItem } from '@/components/motion'
import type { EngagementModel } from '@/content/process'
import { cn } from '@/lib/utils'

/** One way to engage; a tagged model is the featured one and is set in forest. */
export function EngagementCard({ model }: { model: EngagementModel }) {
  const featured = Boolean(model.tag)

  return (
    <StaggerItem
      as="article"
      className={cn(
        'flex flex-col rounded-2xl border p-7',
        featured
          ? 'border-green/40 bg-forest-deep text-on-forest shadow-lift'
          : 'border-line bg-card shadow-card',
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className={cn('text-[22px]', featured && 'text-white')}>{model.title}</h3>
        {model.tag && (
          <span className="rounded-full bg-green px-3 py-1 text-[12px] font-semibold text-primary-foreground">
            {model.tag}
          </span>
        )}
      </div>
      <p
        className={cn(
          'mt-3 text-[15px] leading-[1.6]',
          featured ? 'text-on-forest-muted' : 'text-muted-foreground',
        )}
      >
        {model.body}
      </p>
      <ul
        className={cn(
          'mt-6 flex flex-col gap-2.5 border-t pt-6',
          featured ? 'border-on-forest-line' : 'border-line-soft',
        )}
      >
        {model.points.map((point) => (
          <li
            key={point}
            className={cn(
              'flex gap-2.5 text-[14px] leading-normal',
              featured ? 'text-on-forest' : 'text-foreground/85',
            )}
          >
            <Check className={cn('mt-0.5 size-4 shrink-0', featured ? 'text-green' : 'text-green-ink')} />
            {point}
          </li>
        ))}
      </ul>
    </StaggerItem>
  )
}
