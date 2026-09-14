import { useRef, type KeyboardEvent } from 'react'

/** Arrow keys move between tabs and take focus with them, as the ARIA tabs pattern expects. */
export function useTabKeyboard(count: number, active: number, onSelect: (index: number) => void) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (event: KeyboardEvent) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    event.preventDefault()
    const next = (active + step + count) % count
    onSelect(next)
    tabRefs.current[next]?.focus()
  }

  return { tabRefs, onKeyDown }
}
