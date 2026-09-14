import { useEffect, useState } from 'react'

/** The current time, re-rendering exactly on each minute boundary. */
export function useMinute() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    let id = 0
    const schedule = () => {
      id = window.setTimeout(() => {
        setNow(new Date())
        schedule()
      }, 60_000 - (Date.now() % 60_000))
    }
    schedule()
    return () => window.clearTimeout(id)
  }, [])

  return now
}
