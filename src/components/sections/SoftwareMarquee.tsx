import { software } from '@/data/site'
import { cn } from '@/lib/utils'

/**
 * Continuous rail of the ledger platforms. Duplicated once so the
 * -50% keyframe loops seamlessly.
 */
export function SoftwareMarquee({ className }: { className?: string }) {
  const items = [...software, ...software, ...software, ...software]

  return (
    <div
      className={cn(
        'relative overflow-hidden border-y border-line bg-card py-5',
        '[mask-image:linear-gradient(to_right,transparent,black_9%,black_91%,transparent)]',
        className,
      )}
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max items-center gap-12 pr-12">
        {[...items, ...items].map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="shrink-0 font-display text-[22px] font-semibold text-muted-foreground/55 transition-colors sm:text-[26px]"
          >
            {name}
            <span className="ml-12 text-gold/50">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
