import type { RefObject } from 'react'
import { useMinute } from '@/hooks/useMinute'
import { formatTime } from '@/lib/time'
import { CityLabel } from './CityLabel'

type DivRef = RefObject<HTMLDivElement | null>

/** The London and Kathmandu tags the globe scene moves over its city markers. */
export function GlobeLabels({ london, kathmandu }: { london: DivRef; kathmandu: DivRef }) {
  const now = useMinute()

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
      <CityLabel ref={london} city="London" note="Your practice" time={formatTime('Europe/London', now)} />
      <CityLabel
        ref={kathmandu}
        city="Kathmandu"
        note="Our team"
        time={formatTime('Asia/Kathmandu', now)}
        green
      />
    </div>
  )
}
