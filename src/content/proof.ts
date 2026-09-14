export const proofPoints = [
  {
    term: 'Who does the work',
    detail:
      'Three qualified Chartered Accountants — ICAEW, ICAI and ICAN — not a processing floor.',
  },
  {
    term: 'When it gets done',
    detail: 'On your clock. We shift our working day to the hours that suit your practice.',
  },
  {
    term: 'Where it gets done',
    detail: 'Inside your stack: FreeAgent, QuickBooks, Sage, Xero and MYOB.',
  },
] as const

export const stats = [
  { value: '3', label: 'Chartered Accountants behind every file' },
  { value: '5', label: 'Ledger platforms we work inside' },
  { value: '1 day', label: 'To hear back — from a principal, not an assistant' },
  { value: 'UTC+05:45', label: 'The offset we turn to your advantage' },
] as const

/** The reassurances set under the home-page calls to action. */
export const heroAssurances = [
  // 'Thirty-minute call, no deck',
  // 'Pilot batch before you commit',
  // 'Named Chartered Accountants',
] as const

export const comparison = {
  columns: ['Hiring in-house', 'Probity Advisory'],
  rows: [
    {
      label: 'Who prepares the file',
      inHouse: 'Whoever you manage to recruit',
      probity: 'A qualified Chartered Accountant',
    },
    {
      label: 'Recruitment fees and notice periods',
      inHouse: 'Yours to carry',
      probity: 'None',
    },
    {
      label: "Employer's NIC and a desk",
      inHouse: 'On top of the salary',
      probity: 'None — you pay for the work',
    },
    {
      label: 'January and year-end',
      inHouse: 'Overtime, or turning work away',
      probity: 'Capacity flexes to the workload',
    },
    {
      label: 'The quiet months',
      inHouse: 'A salary to cover regardless',
      probity: 'Hours scale back down',
    },
    {
      label: 'Overnight turnaround',
      inHouse: 'Not without a night shift',
      probity: 'Work lands before you open',
    },
  ],
} as const

export const dataSafeguards = [
  {
    title: 'Paperwork before logins',
    body: 'A written data-processing agreement is signed before a single login is issued.',
  },
  {
    title: 'Lawful transfer to Nepal',
    body: "The ICO's International Data Transfer Agreement is in place from day one, not after the first deadline.",
  },
  {
    title: 'Access per engagement',
    body: 'Logins are granted for each engagement and withdrawn at the end of it.',
  },
  {
    title: 'Nothing leaves your systems',
    body: "We work inside your practice software and your client's ledger. No copies in a platform of ours.",
  },
] as const
