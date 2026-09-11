import { useEffect, useState } from 'react'

const format = (timeZone: string) => {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date())
  } catch {
    return '--:--'
  }
}

/** Live wall-clock time in a given IANA zone, ticking every 10 seconds. */
export function useClock(timeZone: string) {
  const [time, setTime] = useState(() => format(timeZone))

  useEffect(() => {
    setTime(format(timeZone))
    const id = window.setInterval(() => setTime(format(timeZone)), 10_000)
    return () => window.clearInterval(id)
  }, [timeZone])

  return time
}

const offsetMinutes = (timeZone: string, at: Date) => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(at)
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0)
  const asUTC = Date.UTC(
    get('year'),
    get('month') - 1,
    get('day'),
    get('hour') % 24,
    get('minute'),
    get('second'),
  )
  return Math.round((asUTC - at.getTime()) / 60000)
}

/** The live London → Kathmandu gap, phrased the way a person would say it. */
export function useTimeDifference(a: string, b: string) {
  const [label, setLabel] = useState('—')

  useEffect(() => {
    const compute = () => {
      try {
        const now = new Date()
        const diff = offsetMinutes(b, now) - offsetMinutes(a, now)
        const hours = Math.floor(Math.abs(diff) / 60)
        const mins = Math.abs(diff) % 60
        const parts = [`${hours} hour${hours === 1 ? '' : 's'}`]
        if (mins) parts.push(`${mins} minutes`)
        setLabel(`${parts.join(' and ')} ahead`)
      } catch {
        setLabel('—')
      }
    }
    compute()
    const id = window.setInterval(compute, 60_000)
    return () => window.clearInterval(id)
  }, [a, b])

  return label
}
