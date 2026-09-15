export interface Qualification {
  /** The designation as it is written after a name. */
  title: string;
  body: string;
  year?: string;
}

export interface CareerStep {
  /** A year or a short period label. The bios do not date every step, so neither do we. */
  when: string;
  title: string;
  detail: string;
}

export interface Highlight {
  value: string;
  label: string;
}

export interface Principal {
  slug: string;
  name: string;
  role: string;
  creds: string;
  photo: string;
  short: string;
  bio: string[];
  highlights: Highlight[];
  qualifications: Qualification[];
  career: CareerStep[];
  focus: string[];
  sectors?: string[];
  software?: string[];
  /** Offices held in professional and civic bodies. */
  roles?: string[];
  linkedin?: string;
}

/*
 * Everything below the bio is the bio restated as structure — no fact appears in
 * highlights, career or focus that is not already in the paragraphs.
 */
export const team: Principal[] = [
  {
    slug: "deepak-pandey",
    name: "Deepak Pandey",
    role: "Audit & advisory",
    creds: "CA (ICAI) · CA (ICAN) · ACA (ICAEW)",
    photo: "/team/deepak-pandey.jpg",
    short:
      "Audit and advisory practitioner; began his career in credit at Nepal Investment Bank before establishing his own practice.",
    bio: [
      "Deepak qualified with the Institute of Chartered Accountants of India in 2019, the Institute of Chartered Accountants of Nepal in 2021, and the Institute of Chartered Accountants in England and Wales in 2025. He began his career at Nepal Investment Bank, where he worked as an officer in the credit department appraising loan proposals, analysing financial statements and assessing credit risk.",
      "He now runs his own audit and advisory practice in Nepal, working across audit, accounting and financial advisory for clients in several sectors. He sits on the Pokhara Branch Coordination Committee of the ICAN and the Kaski Committee of the Association of Chartered Accountants of Nepal, and is Secretary of the Lions Club of Nepal Landmark.",
    ],
    highlights: [
      {
        value: "3",
        label: "Chartered institutes, in India, Nepal and England & Wales",
      },
      { value: "2019", label: "First qualified as a Chartered Accountant" },
      { value: "ICAEW", label: "Associate Chartered Accountant since 2025" },
    ],
    qualifications: [
      {
        title: "CA",
        body: "Institute of Chartered Accountants of India",
        year: "2019",
      },
      {
        title: "CA",
        body: "Institute of Chartered Accountants of Nepal",
        year: "2021",
      },
      {
        title: "ACA",
        body: "Institute of Chartered Accountants in England and Wales",
        year: "2025",
      },
    ],
    career: [
      {
        when: "Early career",
        title: "Credit officer, Nepal Investment Bank",
        detail:
          "Appraised loan proposals, analysed financial statements and assessed credit risk in the credit department.",
      },
      {
        when: "2019",
        title: "Chartered Accountant — ICAI",
        detail:
          "Qualified with the Institute of Chartered Accountants of India.",
      },
      {
        when: "2021",
        title: "Chartered Accountant — ICAN",
        detail:
          "Qualified with the Institute of Chartered Accountants of Nepal.",
      },
      {
        when: "2025",
        title: "Associate Chartered Accountant — ICAEW",
        detail:
          "Qualified with the Institute of Chartered Accountants in England and Wales.",
      },
      {
        when: "Today",
        title: "Principal, his own audit & advisory practice",
        detail:
          "Audit, accounting and financial advisory for clients in several sectors in Nepal.",
      },
    ],
    focus: [
      "Audit",
      "Accounting",
      "Financial advisory",
      "Credit appraisal",
      "Financial statement analysis",
    ],
    roles: [
      "Member, Pokhara Branch Coordination Committee — ICAN",
      "Member, Kaski Committee — Association of Chartered Accountants of Nepal",
      "Secretary, Lions Club of Nepal Landmark",
    ],
    linkedin: "https://www.linkedin.com/in/cadeepakpandey/",
  },
  {
    slug: "sandesh-giri",
    name: "Sandesh Giri",
    role: "Offshore compliance",
    creds: "CA (ICAI) · CA (ICAN)",
    photo: "/team/sandesh-giri.jpg",
    short:
      "A decade in accounting, audit and taxation, and two years running offshore compliance work for overseas practices.",
    bio: [
      "Sandesh has more than a decade in core accounting, audit and taxation, and is a member of both the Indian and Nepalese institutes. He has worked with mid-sized firms in India and Nepal across trading, manufacturing, banking and financial institutions, tourism and hospitality, hydropower, IT and the NGO and INGO sector, and has served as head of finance inside Nepalese corporates.",
      "For the past two years he has worked in offshore accounting for overseas practices, handling the full compliance cycle — statutory returns, bookkeeping, payroll and accounts finalisation. He works in Xero, QuickBooks, MYOB and HandiLedger.",
    ],
    highlights: [
      { value: "10+", label: "Years in accounting, audit and taxation" },
      { value: "2", label: "Years in offshore work for overseas practices" },
      { value: "4", label: "Ledger platforms he works inside" },
    ],
    qualifications: [
      { title: "CA", body: "Institute of Chartered Accountants of India" },
      { title: "CA", body: "Institute of Chartered Accountants of Nepal" },
    ],
    career: [
      {
        when: "Practice",
        title: "Mid-sized firms in India and Nepal",
        detail:
          "Core accounting, audit and taxation across trading, manufacturing, financial institutions, hospitality, hydropower, IT and the NGO sector.",
      },
      {
        when: "Industry",
        title: "Head of finance, Nepalese corporates",
        detail:
          "Ran the finance function from inside the business rather than as its adviser.",
      },
      {
        when: "Past two years",
        title: "Offshore accounting for overseas practices",
        detail:
          "The full compliance cycle — statutory returns, bookkeeping, payroll and accounts finalisation.",
      },
    ],
    focus: [
      "Statutory returns",
      "Bookkeeping",
      "Payroll",
      "Accounts finalisation",
      "Audit",
      "Taxation",
    ],
    sectors: [
      "Trading",
      "Manufacturing",
      "Banking & financial institutions",
      "Tourism & hospitality",
      "Hydropower",
      "IT",
      "NGO & INGO",
    ],
    software: ["Xero", "QuickBooks", "MYOB", "HandiLedger"],
  },
  {
    slug: "prajwal-paudyal",
    name: "Prajwal Paudyal",
    role: "Audit & advisory",
    creds: "CA (ICAI) · CA (ICAN) · Dip IFRS",
    photo: "/team/prajwal-paudyal.jpg",
    short:
      "Proprietor of his own practice, a Fellow of the ICAI, and a working US tax consultant.",
    bio: [
      "Prajwal qualified with the Institute of Chartered Accountants of India in 2019, the Institute of Chartered Accountants of Nepal in 2021... He is the founder/practising professional at Paudyal Prajwal & Associates, providing professional services to businesses and organisations.His professional experience includes statutory and internal audits, tax advisory and compliance, financial reporting, accounting and bookkeeping, financial analysis, internal control reviews, due diligence, and business consultancy.",
      "He now runs his own audit and advisory practice in Nepal, working across audit, accounting and financial advisory for clients in several sectors. He sits on the Pokhara Branch Coordination Committee of the ICAN and the Kaski Committee of the Association of Chartered Accountants of Nepal, and is Secretary of the Lions Club of Nepal Landmark.",
    ],
    highlights: [
      {
        value: "3",
        label: "Chartered institutes, in India, Nepal and England & Wales",
      },
      { value: "2019", label: "First qualified as a Chartered Accountant" },
      { value: "ICAEW", label: "Associate Chartered Accountant since 2025" },
    ],
    qualifications: [
      {
        title: "CA",
        body: "Institute of Chartered Accountants of India",
        year: "2019",
      },
      {
        title: "CA",
        body: "Institute of Chartered Accountants of Nepal",
        year: "2021",
      },
      {
        title: "ACA",
        body: "Institute of Chartered Accountants in England and Wales",
        year: "2025",
      },
    ],
    career: [
      {
        when: "Early career",
        title: "Credit officer, Nepal Investment Bank",
        detail:
          "Appraised loan proposals, analysed financial statements and assessed credit risk in the credit department.",
      },
      {
        when: "2019",
        title: "Chartered Accountant — ICAI",
        detail:
          "Qualified with the Institute of Chartered Accountants of India.",
      },
      {
        when: "2021",
        title: "Chartered Accountant — ICAN",
        detail:
          "Qualified with the Institute of Chartered Accountants of Nepal.",
      },
      {
        when: "2025",
        title: "Associate Chartered Accountant — ICAEW",
        detail:
          "Qualified with the Institute of Chartered Accountants in England and Wales.",
      },
      {
        when: "Today",
        title: "Principal, his own audit & advisory practice",
        detail:
          "Audit, accounting and financial advisory for clients in several sectors in Nepal.",
      },
    ],
    focus: [
      "Audit",
      "Accounting",
      "Financial advisory",
      "Credit appraisal",
      "Financial statement analysis",
    ],
    roles: [
      "Member, Pokhara Branch Coordination Committee — ICAN",
      "Member, Kaski Committee — Association of Chartered Accountants of Nepal",
      "Secretary, Lions Club of Nepal Landmark",
    ],
    linkedin: "https://www.linkedin.com/in/cadeepakpandey/",
  },
];

export const findPrincipal = (slug: string | undefined) =>
  team.find((person) => person.slug === slug);

export const principles = [
  {
    title: "Small on purpose",
    body: "Three principals, each running their own practice in Nepal, who take on UK work together. You deal with one of us directly. There is no account manager between you and the person who prepared your file.",
  },
  {
    title: "Qualified, not merely trained",
    body: "Every file is prepared by someone who has passed a full Chartered Accountancy qualification — ICAI in India, ICAN in Nepal, and in one case the ICAEW. That is a different proposition from a processing centre with a supervisor.",
  },
  {
    title: "We say when we do not know",
    body: "A guess dressed as a figure is the most expensive thing an outsourced team can send you. Anything we cannot settle comes back on a queries list with our reasoning attached.",
  },
  {
    title: "Your systems, your audit trail",
    body: "We work inside your practice software and your client's ledger. Nothing is copied into a system of ours, and every engagement begins with the data paperwork in place before a login is issued.",
  },
] as const;

export const memberships = [
  "Institute of Chartered Accountants in England and Wales",
  "Institute of Chartered Accountants of India",
  "Institute of Chartered Accountants of Nepal",
  "Diploma in IFRS",
] as const;
