const formatters = new Map<string, Intl.DateTimeFormat>()

/** Wall-clock HH:MM in an IANA zone. Formatters are cached per zone. */
export function formatTime(timeZone: string, at: Date) {
  let formatter = formatters.get(timeZone)
  if (!formatter) {
    formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    formatters.set(timeZone, formatter)
  }
  return formatter.format(at)
}

/** UTC offset in minutes, read from the zone's "GMT+05:45"-style name. */
function offsetMinutes(timeZone: string, at: Date) {
  const name =
    new Intl.DateTimeFormat('en-GB', { timeZone, timeZoneName: 'longOffset' })
      .formatToParts(at)
      .find((part) => part.type === 'timeZoneName')?.value ?? 'GMT'
  const [, sign, hours, minutes] = /GMT([+-])(\d{2}):?(\d{2})?/.exec(name) ?? []
  if (!sign) return 0
  return (sign === '-' ? -1 : 1) * (Number(hours) * 60 + Number(minutes ?? 0))
}

/** The gap between two zones, phrased the way a person would say it. */
export function formatDifference(from: string, to: string, at: Date) {
  const diff = offsetMinutes(to, at) - offsetMinutes(from, at)
  const hours = Math.floor(Math.abs(diff) / 60)
  const minutes = Math.abs(diff) % 60
  const parts = [`${hours} hour${hours === 1 ? '' : 's'}`]
  if (minutes) parts.push(`${minutes} minutes`)
  return `${parts.join(' and ')} ${diff >= 0 ? 'ahead' : 'behind'}`
}
