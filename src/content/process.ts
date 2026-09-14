export const processSteps = [
  {
    n: '01',
    title: 'Scoping call',
    body: 'You show us one live file and tell us what "finished" means inside your practice. Thirty minutes, no deck.',
  },
  {
    n: '02',
    title: 'Pilot batch',
    body: 'We take a small set of files so you can judge the output before anything depends on it. You review us as you would a new joiner.',
  },
  {
    n: '03',
    title: 'Named team',
    body: 'You get the same two or three people on your work, their hours in writing, and a standing weekly call.',
  },
  {
    n: '04',
    title: 'Steady state',
    body: 'Work moves on whatever rhythm we agreed — overnight, or live alongside you. Capacity flexes with your January, not your headcount.',
  },
] as const

export const nextSteps = [
  {
    n: '01',
    lead: 'We reply within one working day.',
    rest: 'A principal answers, not an assistant.',
  },
  {
    n: '02',
    lead: 'A thirty-minute call.',
    rest: 'You show us one live file and tell us what finished looks like in your practice.',
  },
  {
    n: '03',
    lead: 'A pilot batch.',
    rest: "A small set of files you review exactly as you would a new joiner's, before anything depends on it.",
  },
] as const

export const contactPromise = 'We reply within one working day — from a principal, not an assistant.'

export const engagementModels = [
  {
    title: 'Pilot batch',
    tag: 'Start here',
    body: 'A small set of real files, prepared and returned so you can judge the output before anything depends on it.',
    points: [
      'One real quarter or one year-end',
      "Reviewed as you would a new joiner's work",
      'A straight conversation about the result',
    ],
  },
  {
    title: 'Monthly workload',
    tag: null,
    body: 'Bookkeeping, VAT and payroll moving on an agreed rhythm — overnight, or live alongside your team.',
    points: [
      'The same two or three named people',
      'Working hours agreed in writing',
      'A standing weekly call with a principal',
    ],
  },
  {
    title: 'Peak overflow',
    tag: null,
    body: 'Extra hands for January and the year-end rush, without a headcount to keep busy in June.',
    points: [
      'Year-end accounts and corporation tax',
      'Returned ready for partner review',
      'No recruitment, probation or redundancy',
    ],
  },
] as const

export const pricingNote =
  'Every engagement is priced to the workload rather than a headcount, and quoted once we have seen a live file on the scoping call.'
