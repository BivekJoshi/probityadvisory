/* Nothing here imports three, so it is safe to use from the main bundle. */

/**
 * The pointer across the whole window: `x`/`y` normalised to -1…1 with y up,
 * plus the raw client position. The canvases sit behind page content with
 * pointer events off, so they read this instead of R3F's own pointer.
 */
export const pointer = { x: 0, y: 0, clientX: -1e4, clientY: -1e4 }

let tracking = false

export function trackPointer() {
  if (tracking || typeof window === 'undefined') return
  tracking = true
  window.addEventListener(
    'pointermove',
    (event) => {
      pointer.clientX = event.clientX
      pointer.clientY = event.clientY
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = -((event.clientY / window.innerHeight) * 2 - 1)
    },
    { passive: true },
  )
}
