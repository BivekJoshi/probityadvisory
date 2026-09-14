import { FilePen, KeyRound, Landmark, LockKeyhole } from 'lucide-react'
import { Stagger, StaggerItem } from '@/components/motion'
import { dataSafeguards } from '@/content/proof'

/* in the same order as dataSafeguards */
const icons = [FilePen, Landmark, KeyRound, LockKeyhole] as const

/** The four data controls, as glass cards for the forest band. */
export function DataSafeguards() {
  return (
    <Stagger className="grid gap-4 sm:grid-cols-2">
      {dataSafeguards.map((item, i) => {
        const Icon = icons[i]
        return (
          <StaggerItem key={item.title} className="rounded-2xl border border-on-forest-line bg-white/4 p-6">
            <span className="grid size-10 place-items-center rounded-xl bg-green/15 text-green">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-5 text-[18px] text-white">{item.title}</h3>
            <p className="mt-2 text-[14.5px] leading-[1.6] text-on-forest-muted">{item.body}</p>
          </StaggerItem>
        )
      })}
    </Stagger>
  )
}
