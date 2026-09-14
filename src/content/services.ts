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

export type Service = (typeof services)[number]
