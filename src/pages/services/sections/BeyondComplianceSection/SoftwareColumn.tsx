import { Badge } from '@/components/ui/badge'
import { SectionHeader } from '@/components/common'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { software } from '@/content/services'

export function SoftwareColumn() {
  return (
    <div>
      <SectionHeader
        className="md:mb-8"
        eyebrow="Software"
        title="We work in your stack, not ours."
        lede="Nothing is exported into a system of our own. We log into yours, work in the client's ledger, and leave the audit trail where your reviewer expects to find it."
      />
      <Stagger className="flex flex-wrap gap-2.5" step={0.05}>
        {software.map((item) => (
          <StaggerItem key={item}>
            <Badge variant="green">{item}</Badge>
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal>
        <p className="mt-6 max-w-[56ch] text-[15px] leading-[1.65] text-muted-foreground">
          Running something we have not listed? Tell us. We will learn it on our own time
          before we touch a client file.
        </p>
      </Reveal>
    </div>
  )
}
