import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { engagementModels, pricingNote } from '@/content/process'
import { paths } from '@/config/routes'
import { cn } from '@/lib/utils'

/** The three ways in, with the pilot set apart in navy as the place to start. */
export function EngagementModels() {
  return (
    <>
      <Stagger className="grid gap-5 lg:grid-cols-3">
        {engagementModels.map((model) => {
          const featured = Boolean(model.tag)
          return (
            <StaggerItem
              key={model.title}
              as="article"
              className={cn(
                'flex flex-col rounded-2xl border p-7',
                featured
                  ? 'border-gold/40 bg-navy-deep text-on-navy shadow-lift'
                  : 'border-line bg-card shadow-card',
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className={cn('text-[22px]', featured && 'text-white')}>{model.title}</h3>
                {model.tag && (
                  <span className="rounded-full bg-gold px-3 py-1 text-[12px] font-semibold text-primary-foreground">
                    {model.tag}
                  </span>
                )}
              </div>
              <p
                className={cn(
                  'mt-3 text-[15px] leading-[1.6]',
                  featured ? 'text-on-navy-muted' : 'text-muted-foreground',
                )}
              >
                {model.body}
              </p>
              <ul
                className={cn(
                  'mt-6 flex flex-col gap-2.5 border-t pt-6',
                  featured ? 'border-on-navy-line' : 'border-line-soft',
                )}
              >
                {model.points.map((point) => (
                  <li
                    key={point}
                    className={cn(
                      'flex gap-2.5 text-[14px] leading-normal',
                      featured ? 'text-on-navy' : 'text-foreground/85',
                    )}
                  >
                    <Check className={cn('mt-0.5 size-4 shrink-0', featured ? 'text-gold' : 'text-gold-ink')} />
                    {point}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          )
        })}
      </Stagger>

      <Reveal className="mt-6 flex flex-col gap-5 rounded-2xl border border-line bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <p className="max-w-[62ch] text-[15px] leading-[1.65] text-muted-foreground">{pricingNote}</p>
        <Button asChild className="w-fit shrink-0">
          <Link to={paths.contact}>
            Ask for a quote
            <ArrowRight />
          </Link>
        </Button>
      </Reveal>
    </>
  )
}
