import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Start each page at the top, the way a real page load would. Pages that own
 * #anchors (Services) scroll to them themselves once their content exists.
 */
export function useScrollReset() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])
}
