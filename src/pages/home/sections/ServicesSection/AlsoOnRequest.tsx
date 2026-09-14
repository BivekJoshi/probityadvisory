import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/motion'
import { alsoOnRequest } from '@/content/services'

/** The dashed strip of work quoted per assignment, under the service cards. */
export function AlsoOnRequest() {
  return (
    <Reveal className="mt-6 flex flex-col gap-4 rounded-2xl border border-dashed border-line px-6 py-5 md:flex-row md:items-center md:gap-6">
      <p className="shrink-0 text-[14px] font-medium text-muted-foreground">Also on request</p>
      <ul className="flex flex-wrap gap-2">
        {alsoOnRequest.map((item) => (
          <li key={item}>
            <Badge>{item}</Badge>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}
