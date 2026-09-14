import { BadgeCheck, CircleHelp, ShieldCheck, UsersRound } from 'lucide-react'
import { Stagger, StaggerItem } from '@/components/motion'
import { principles } from '@/content/team'

/* in the same order as principles */
const icons = [UsersRound, BadgeCheck, CircleHelp, ShieldCheck] as const

/** The four house rules. */
export function PrinciplesGrid() {
  return (
    <Stagger className="grid gap-5 sm:grid-cols-2">
      {principles.map((item, i) => {
        const Icon = icons[i]
        return (
          <StaggerItem
            key={item.title}
            className="rounded-2xl border border-line bg-card p-7 shadow-card transition-colors duration-300 hover:border-gold/50"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-gold-soft text-gold-ink">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-5 text-[20px]">{item.title}</h3>
            <p className="mt-2.5 text-[15px] leading-[1.65] text-muted-foreground">{item.body}</p>
          </StaggerItem>
        )
      })}
    </Stagger>
  )
}
