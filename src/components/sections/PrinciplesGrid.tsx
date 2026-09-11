import { Stagger, StaggerItem } from '@/components/motion/Reveal'
import { principles } from '@/data/site'

/** The four house rules, as a hairline-divided quad. */
export function PrinciplesGrid() {
  return (
    <Stagger className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
      {principles.map((item) => (
        <StaggerItem
          key={item.title}
          className="group relative flex flex-col gap-2 bg-card px-6 py-6 transition-colors duration-300 hover:bg-gold-soft"
        >
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 h-0.5 w-0 bg-gold transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
          />
          <h3 className="text-[16.5px]">{item.title}</h3>
          <p className="text-[14px] leading-[1.65] text-muted-foreground">{item.body}</p>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
