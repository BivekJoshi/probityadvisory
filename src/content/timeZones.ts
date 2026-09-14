export const workingPatterns = [
  {
    label: 'Your day',
    sub: 'London',
    range: '09:00 – 17:30',
    left: 37.5,
    width: 35.4,
    tone: 'uk' as const,
  },
  {
    label: 'Overnight',
    sub: 'turnaround',
    range: '04:15 – 13:15 your time · 09:00 – 18:00 ours',
    left: 17.7,
    width: 37.5,
    tone: 'np' as const,
  },
  {
    label: 'Aligned',
    sub: 'to your hours',
    range: '09:00 – 17:30 your time · 13:45 – 22:15 ours',
    left: 37.5,
    width: 35.4,
    tone: 'green' as const,
  },
] as const

export const globeCaption =''
  // 'Lit as the world is right now. Records travel out to Kathmandu; finished work comes home before London opens.'

export type WorkingPattern = (typeof workingPatterns)[number]
