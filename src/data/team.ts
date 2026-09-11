export interface Principal {
  name: string
  creds: string
  photo: string
  short: string
  bio: string[]
  linkedin?: string
}

export const team: Principal[] = [
  {
    name: 'Deepak Pandey',
    creds: 'CA (ICAI) · CA (ICAN) · ACA (ICAEW)',
    photo: '/team/deepak-pandey.jpg',
    short:
      'Audit and advisory practitioner; began his career in credit at Nepal Investment Bank before establishing his own practice.',
    bio: [
      'Deepak qualified with the Institute of Chartered Accountants of India in 2019, the Institute of Chartered Accountants of Nepal in 2021, and the Institute of Chartered Accountants in England and Wales in 2025. He began his career at Nepal Investment Bank, where he worked as an officer in the credit department appraising loan proposals, analysing financial statements and assessing credit risk.',
      'He now runs his own audit and advisory practice in Nepal, working across audit, accounting and financial advisory for clients in several sectors. He sits on the Pokhara Branch Coordination Committee of the ICAN and the Kaski Committee of the Association of Chartered Accountants of Nepal, and is Secretary of the Lions Club of Nepal Landmark.',
    ],
    linkedin: 'https://www.linkedin.com/in/cadeepakpandey/',
  },
  {
    name: 'Sandesh Giri',
    creds: 'CA (ICAI) · CA (ICAN)',
    photo: '/team/sandesh-giri.jpg',
    short:
      'A decade in accounting, audit and taxation, and two years running offshore compliance work for overseas practices.',
    bio: [
      'Sandesh has more than a decade in core accounting, audit and taxation, and is a member of both the Indian and Nepalese institutes. He has worked with mid-sized firms in India and Nepal across trading, manufacturing, banking and financial institutions, tourism and hospitality, hydropower, IT and the NGO and INGO sector, and has served as head of finance inside Nepalese corporates.',
      'For the past two years he has worked in offshore accounting for overseas practices, handling the full compliance cycle — statutory returns, bookkeeping, payroll and accounts finalisation. He works in Xero, QuickBooks, MYOB and HandiLedger.',
    ],
  },
  {
    name: 'Prajwal Paudyal',
    creds: 'CA (ICAI) · CA (ICAN) · Dip IFRS',
    photo: '/team/prajwal-paudyal.jpg',
    short: 'Proprietor of his own practice, a Fellow of the ICAI, and a working US tax consultant.',
    bio: [
      'Prajwal is the proprietor of Paudyal Prajwal & Associates and a Fellow of the Institute of Chartered Accountants of India as well as a member of the Nepalese institute. He holds the Diploma in International Financial Reporting.',
      'He practises as a United States tax consultant and is currently working through the US CPA examinations, which gives the team a second cross-border reporting perspective alongside the UK work.',
    ],
    linkedin: 'https://www.linkedin.com/in/prajwal-paudyal-b67234b5/',
  },
]
