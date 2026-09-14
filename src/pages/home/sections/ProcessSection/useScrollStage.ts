import { useEffect, useRef, useState } from 'react'
import { useMotionValue, useMotionValueEvent, useScroll } from 'framer-motion'

/**
 * How far the reader is through the steps, as a continuous 0…n-1 `stage` plus
 * the nearest whole `active` step. Attach `stepRefs` to each step's element;
 * the value comes from where those elements sit against a focus line.
 */
export function useScrollStage() {
  const stepRefs = useRef<(HTMLElement | null)[]>([])
  const stage = useMotionValue(0)
  const [active, setActive] = useState(0)
  const { scrollY } = useScroll()

  const measure = () => {
    const centres = stepRefs.current.map((el) => {
      const rect = el?.getBoundingClientRect()
      return rect ? rect.top + rect.height / 2 : 0
    })
    // phones read the steps below the sticky stage, so their focus line sits lower
    const focus = window.innerHeight * (window.matchMedia('(min-width: 1024px)').matches ? 0.5 : 0.74)
    const last = centres.length - 1
    let value = last
    if (focus <= centres[0]) value = 0
    else
      for (let i = 0; i < last; i++) {
        if (focus < centres[i + 1]) {
          value = i + (focus - centres[i]) / (centres[i + 1] - centres[i])
          break
        }
      }
    stage.set(value)
    setActive(Math.round(value))
  }

  useMotionValueEvent(scrollY, 'change', measure)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(measure, [])

  return { stepRefs, stage, active }
}
