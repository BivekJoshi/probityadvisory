import { useEffect, useState, type RefObject } from 'react'

/** `near` latches once the node is within a screen of the viewport; `active` is whether it is on screen. */
export function useSceneVisibility(ref: RefObject<HTMLElement | null>, supported: boolean) {
  const [near, setNear] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || !supported) return

    const nearby = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setNear(true)
        nearby.disconnect()
      },
      { rootMargin: '100% 0px' },
    )
    const visible = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting))

    nearby.observe(node)
    visible.observe(node)
    return () => {
      nearby.disconnect()
      visible.disconnect()
    }
  }, [ref, supported])

  return { near, active }
}
