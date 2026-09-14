import { cn } from '@/lib/utils'

export function CityClock({ name, time, end = false }: { name: string; time: string; end?: boolean }) {
  return (
    <div className={cn(end && 'text-right')}>
      <p className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-on-navy-muted">
        {name}
      </p>
      <p className="tabular mt-1.5 font-mono text-[clamp(24px,2.6vw,30px)] font-medium leading-none text-white">
        {time}
      </p>
    </div>
  )
}
