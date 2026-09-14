import type { Ref } from 'react'
import { cn } from '@/lib/utils'

interface CityLabelProps {
  ref: Ref<HTMLDivElement>
  city: string
  note: string
  time: string
  gold?: boolean
}

/** A city tag the globe scene pins over its marker every frame. */
export function CityLabel({ ref, city, note, time, gold = false }: CityLabelProps) {
  return (
    <div ref={ref} className="absolute left-0 top-0 opacity-0 will-change-transform">
      <div className="whitespace-nowrap rounded-xl border border-white/12 bg-navy-deep/70 px-3 py-2 shadow-[0_12px_30px_-12px_rgb(0_0_0/0.6)] backdrop-blur-md">
        <p className="flex items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-[0.16em] text-on-navy-muted">
          <span className={cn('size-1.5 rounded-full', gold ? 'bg-gold' : 'bg-on-navy')} />
          {city} · {note}
        </p>
        <p className="tabular mt-1.5 font-mono text-[18px] leading-none text-white">{time}</p>
      </div>
    </div>
  )
}
