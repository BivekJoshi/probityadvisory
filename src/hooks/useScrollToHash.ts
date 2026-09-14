import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Deep links such as /services#payroll-cis-pensions land on the right element
 * once a lazily loaded page has actually rendered it.
 */
export function useScrollToHash() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
  }, [hash])
}
