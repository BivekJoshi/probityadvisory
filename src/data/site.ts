/**
 * Every word of copy on the site lives here, so the pages stay layout-only.
 * Content is carried across verbatim from the approved reference document.
 */

export const site = {
  name: 'Probity Advisory',
  tagline: 'Est. Kathmandu',
  description:
    'Outsourced bookkeeping, VAT, year-end accounts and payroll for UK accountancy practices, prepared in Kathmandu by qualified Chartered Accountants.',
  email: 'info@probityadvisory.co.uk',
  phoneUK: '+44 7438 453173',
  phoneUKRaw: '447438453173',
  phoneNP: '+977 9856048625',
  phoneNPRaw: '9779856048625',
  address: 'Baluwatar, Kathmandu, Nepal',
  hours: 'Working hours 09:00 – 18:00 Nepal time, Sunday to Friday',
} as const

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Why Nepal', to: '/why-nepal' },
  { label: 'Contact', to: '/contact' },
] as const

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

export interface Stat {
  /** Counts up on first view. Omit for a figure that is a label, not a quantity. */
  value?: number
  /** Shown as-is when `value` is absent. */
  text?: string
  suffix?: string
  label: string
}

export const stats: Stat[] = [
  { value: 3, label: 'Chartered Accountants behind every file' },
  { value: 5, label: 'Ledger platforms we work inside' },
  { value: 1, suffix: ' day', label: 'To hear back — from a principal, not an assistant' },
  { text: 'UTC+05:45', label: 'The offset we turn to your advantage' },
]

export const services = [
  {
    slug: 'bookkeeping-vat-mtd',
    title: 'Bookkeeping, VAT & MTD',
    blurb:
      'Ledgers kept clean month to month, reconciled and returned with the queries listed rather than guessed.',
    keyedTo: 'Keyed to: one month and seven days after the VAT quarter end',
    summary: [
      'Purchase and sales ledger processing',
      'Bank and credit-card reconciliation',
      'Month-end close and trial balance',
      'VAT returns under Making Tax Digital',
    ],
    detail: [
      'Purchase ledger, sales ledger and expense processing, with a consistent coding policy agreed with you up front',
      'Bank, credit-card and control account reconciliation, multi-currency where the client needs it',
      'Month-end close: accruals, prepayments, depreciation and a reconciled trial balance',
      'VAT return preparation and MTD submission, including the flat rate scheme, partial exemption and the domestic reverse charge where they apply',
      'A standing queries schedule — every unresolved item listed and dated, never guessed at',
    ],
    deliverable:
      'A reconciled ledger, a trial balance that ties, the VAT return with its workings attached, and the open queries in one list your client can answer in a single sitting.',
  },
  {
    slug: 'year-end-corporation-tax',
    title: 'Year-end accounts & corporation tax',
    blurb:
      'A review-ready file: accounts, computation and a working paper set your partner can actually follow.',
    keyedTo: 'Keyed to: accounts nine months after year end, CT600 at twelve',
    summary: [
      'Statutory accounts under FRS 102 1A and FRS 105',
      'Cross-referenced lead schedules',
      'Corporation tax computation and CT600',
      'Review points flagged, not buried',
    ],
    detail: [
      'Statutory accounts under FRS 102 Section 1A or FRS 105, formatted to your house style and your accounts production software',
      'A full working paper file with lead schedules cross-referenced to every figure in the accounts',
      'Corporation tax computation and CT600, with capital allowances, disallowables and loss schedules set out separately',
      "Directors' loan account reconstruction and dividend paperwork where the file calls for it",
      'A partner review memorandum: the judgements we made, the points we could not settle, and what we recommend',
    ],
    deliverable:
      'A file you can review rather than rebuild — accounts, computation and workings in one pack, with the review points at the front instead of buried in the schedules.',
  },
  {
    slug: 'payroll-cis-pensions',
    title: 'Payroll, CIS & pensions',
    blurb: 'Runs that land on time, every time, with the submissions evidenced back to you.',
    keyedTo: 'Keyed to: RTI on or before payday, CIS by the 19th, PAYE by the 22nd',
    summary: [
      'Weekly, fortnightly and monthly runs',
      'RTI on or before payday',
      'CIS verification, statements and returns',
      'Auto-enrolment and pension uploads',
    ],
    detail: [
      'Weekly, fortnightly, four-weekly and monthly runs, with RTI full payment submissions filed on or before each payday',
      'Starters and leavers, P45s, statutory sick and family-leave pay, student loans and attachment of earnings orders',
      'CIS subcontractor verification, monthly returns and deduction statements',
      'Auto-enrolment assessment, pension scheme uploads, opt-outs and three-yearly re-enrolment',
      'Year-end payroll: P60s by 31 May, P11D and P11D(b) by 6 July',
    ],
    deliverable:
      'Payslips ready to release, the FPS and EPS confirmations as evidence, a payment summary telling the client exactly what to pay and when, and the CIS statements for the subcontractors.',
  },
] as const

export const alsoOnRequest = [
  'Management accounts & KPI packs',
  'Budgets & cash-flow forecasting',
  'Company secretarial & Companies House filings',
  'Cloud migration & system set-up',
  'Practice overflow at peak',
] as const

export const software = ['FreeAgent', 'QuickBooks', 'Sage', 'Xero', 'MYOB'] as const

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

export const complianceCalendar = [
  { when: '7th', what: 'VAT return filed and paid — one month and seven days after the quarter end' },
  {
    when: 'On payday',
    what: 'RTI full payment submission, on or before the day employees are paid',
  },
  { when: '19th', what: 'CIS monthly return; PAYE and NIC if paying by post' },
  { when: '22nd', what: 'PAYE and NIC cleared into HMRC by electronic payment' },
  { when: '5 April', what: 'Tax year end — payroll cut-off and the start of the year-end run' },
  { when: '31 May', what: 'P60s issued to everyone employed on 5 April' },
  { when: '6 July', what: 'P11D and P11D(b) filed; Class 1A NIC paid by 22 July' },
  {
    when: '+9 months',
    what: 'Accounts filed at Companies House after the accounting reference date',
  },
  {
    when: '+12 months',
    what: 'CT600 filed with HMRC — with the tax itself due at nine months and a day',
  },
] as const

export const principles = [
  {
    title: 'Small on purpose',
    body: 'Three principals, each running their own practice in Nepal, who take on UK work together. You deal with one of us directly. There is no account manager between you and the person who prepared your file.',
  },
  {
    title: 'Qualified, not merely trained',
    body: 'Every file is prepared by someone who has passed a full Chartered Accountancy qualification — ICAI in India, ICAN in Nepal, and in one case the ICAEW. That is a different proposition from a processing centre with a supervisor.',
  },
  {
    title: 'We say when we do not know',
    body: 'A guess dressed as a figure is the most expensive thing an outsourced team can send you. Anything we cannot settle comes back on a queries list with our reasoning attached.',
  },
  {
    title: 'Your systems, your audit trail',
    body: "We work inside your practice software and your client's ledger. Nothing is copied into a system of ours, and every engagement begins with the data paperwork in place before a login is issued.",
  },
] as const

export const memberships = [
  'Institute of Chartered Accountants in England and Wales',
  'Institute of Chartered Accountants of India',
  'Institute of Chartered Accountants of Nepal',
  'Diploma in IFRS',
] as const

export const partnerQuestions = [
  {
    q: 'What happens to my capacity in January?',
    a: 'It flexes. You are buying hours against a workload, not a headcount you have to keep busy in June. No recruitment, no probation, no redundancy conversation when the peak passes.',
  },
  {
    q: 'Will I get a different person every time?',
    a: 'No. You get the same two or three named people on your files, their agreed working hours in writing, and a standing weekly call with the principal responsible for your account.',
  },
  {
    q: "Where does my client's data actually go?",
    a: "Into your systems, where it already is. We log into your practice software and the client's ledger rather than exporting anything to a platform of ours, and access is granted per engagement and withdrawn at the end of it.",
  },
  {
    q: 'Is transferring data to Nepal even allowed?',
    a: "With the right paperwork, yes. Every engagement starts with a written data-processing agreement and the ICO's International Data Transfer Agreement in place before a single login is issued — not after the first deadline.",
  },
] as const

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
    tone: 'gold' as const,
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
