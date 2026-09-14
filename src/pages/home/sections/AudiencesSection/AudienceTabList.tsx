import { motion } from 'framer-motion'
import { audiences } from '@/content/audiences'
import { cn } from '@/lib/utils'
import { useTabKeyboard } from './useTabKeyboard'

interface AudienceTabListProps {
  active: number
  onSelect: (index: number) => void
}

export function AudienceTabList({ active, onSelect }: AudienceTabListProps) {
  const { tabRefs, onKeyDown } = useTabKeyboard(audiences.length, active, onSelect)

  return (
    <div
      role="tablist"
      aria-label="Who we work with"
      onKeyDown={onKeyDown}
      className="flex gap-1 border-b border-line-soft p-2 sm:p-3"
    >
      {audiences.map((item, i) => {
        const selected = i === active
        return (
          <button
            key={item.key}
            ref={(el) => {
              tabRefs.current[i] = el
            }}
            type="button"
            role="tab"
            id={`audience-tab-${item.key}`}
            aria-selected={selected}
            aria-controls={`audience-panel-${item.key}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(i)}
            className={cn(
              'relative flex-1 rounded-2xl px-4 py-3 text-[14.5px] font-medium transition-colors duration-200 sm:flex-none sm:px-6',
              selected ? 'text-white' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {selected && (
              <motion.span
                layoutId="audience-pill"
                className="absolute inset-0 rounded-2xl bg-forest-deep"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              />
            )}
            <span className="relative">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
