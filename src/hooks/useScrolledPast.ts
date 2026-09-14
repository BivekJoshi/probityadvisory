import { useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'

/** Whether the page has scrolled further than `offset` pixels, kept current as it scrolls. */
export function useScrolledPast(offset: number) {
  const [past, setPast] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setPast(y > offset))
  return past
}
