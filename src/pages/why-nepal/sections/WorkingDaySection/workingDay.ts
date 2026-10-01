import { nepalDay, ukDay } from '@/content/timeZones'
import { offsetMinutes } from '@/lib/time'

const DAY = 24 * 60

const wrap = (minutes: number) => ((minutes % DAY) + DAY) % DAY
const pad = (n: number) => String(n).padStart(2, '0')
const clock = (minutes: number) => `${pad(Math.floor(wrap(minutes) / 60))}:${pad(wrap(minutes) % 60)}`
const span = (start: number, end: number) => `${clock(start)} – ${clock(end)}`
const percent = (minutes: number) => Math.round((minutes / DAY) * 1000) / 10

export interface WorkingPattern {
  label: string
  sub: string
  range: string
  /** Position on the London-time track, as percentages of the day. */
  left: number
  width: number
  tone: 'uk' | 'np' | 'green'
}

/**
 * The two shift patterns beside the UK day, drawn on London time. `gap` is how far
 * Kathmandu runs ahead of London, in minutes: 285 under BST, 345 under GMT.
 * None of these windows crosses London midnight, so no bar needs splitting.
 */
export function workingPatterns(gap: number): WorkingPattern[] {
  const ukLength = ukDay.end - ukDay.start
  const overnightStart = nepalDay.start - gap

  return [
    {
      label: 'Your day',
      sub: 'London',
      range: span(ukDay.start, ukDay.end),
      left: percent(ukDay.start),
      width: percent(ukLength),
      tone: 'uk',
    },
    {
      label: 'Overnight',
      sub: 'turnaround',
      range: `${span(overnightStart, nepalDay.end - gap)} your time · ${span(nepalDay.start, nepalDay.end)} ours`,
      left: percent(wrap(overnightStart)),
      width: percent(nepalDay.end - nepalDay.start),
      tone: 'np',
    },
    {
      label: 'Aligned',
      sub: 'to your hours',
      range: `${span(ukDay.start, ukDay.end)} your time · ${span(ukDay.start + gap, ukDay.end + gap)} ours`,
      left: percent(ukDay.start),
      width: percent(ukLength),
      tone: 'green',
    },
  ]
}

/** Minutes of your day that the overnight run still overlaps. */
export function overnightOverlap(gap: number) {
  return Math.max(0, Math.min(ukDay.end, nepalDay.end - gap) - Math.max(ukDay.start, nepalDay.start - gap))
}

/** What UK clocks are on at `at`: British Summer Time or Greenwich Mean Time. */
export const londonTimeName = (at: Date) =>
  offsetMinutes('Europe/London', at) === 60 ? 'British Summer Time' : 'Greenwich Mean Time'
