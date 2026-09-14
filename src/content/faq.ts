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

export const homeFaq = [
  ...partnerQuestions,
  {
    q: 'How is the work priced?',
    a: 'Per engagement, against the workload rather than a headcount. We quote once we have seen a live file on the scoping call, so the figure reflects your actual records rather than a guess.',
  },
  {
    q: 'Which software do you work in?',
    a: 'FreeAgent, QuickBooks, Sage, Xero and MYOB. Running something else? Tell us — we will learn it on our own time before we touch a client file.',
  },
] as const
