/*
 * Title and description for every page. The pages set them at runtime (useSeo),
 * and the build writes them into each route's own HTML file, with the canonical
 * URL and the link-preview tags, so crawlers and chat apps see them without
 * running the app. The build reads this file too, which is why its imports
 * carry their .ts extensions and avoid the `@/` alias.
 */
import { paths, principalPath } from '../config/routes.ts'
import { site } from '../config/site.ts'
import { team, type Principal } from './team.ts'

export interface PageSeo {
  /** The route; null for the not-found page, which has no URL of its own. */
  path: string | null
  title: string
  description: string
}

export const pageSeo = {
  home: {
    path: paths.home,
    title: `${site.name} — Outsourced accounting for UK practices`,
    description: site.description,
  },
  services: {
    path: paths.services,
    title: `Services — ${site.name}`,
    description:
      'Bookkeeping and VAT under MTD, year-end accounts and corporation tax, and payroll with CIS and pensions — staffed by qualified Chartered Accountants in Kathmandu.',
  },
  about: {
    path: paths.about,
    title: `About — ${site.name}`,
    description:
      'Three qualified Chartered Accountants in Kathmandu — ICAEW, ICAI and ICAN — who take on UK practice work directly, with no account manager in between.',
  },
  whyNepal: {
    path: paths.whyNepal,
    title: `Why Nepal — ${site.name}`,
    description:
      'Nepal runs at UTC+05:45. We set our working day to yours — an overnight turnaround that lands before you open, or a team on your clock all day.',
  },
  contact: {
    path: paths.contact,
    title: `Contact — ${site.name}`,
    description:
      'We answer within one working day, usually the same day. Both numbers take WhatsApp, which is generally the quickest way to reach us.',
  },
  privacy: {
    path: paths.privacy,
    title: `Privacy notice — ${site.name}`,
    description:
      'What Probity Advisory does with the details you send through this website, and who to ask about them.',
  },
  notFound: {
    path: null,
    title: `Page not found — ${site.name}`,
    description: site.description,
  },
} satisfies Record<string, PageSeo>

type IndexablePage = PageSeo & { path: string }

export const principalSeo = (person: Principal): IndexablePage => ({
  path: principalPath(person.slug),
  title: `${person.name}${person.role ? `, ${person.role}` : ''} — ${site.name}`,
  description: person.short,
})

const pages: PageSeo[] = Object.values(pageSeo)

/** Every page that has a URL: one HTML file each at build time, and one sitemap entry. */
export const indexablePages: IndexablePage[] = [
  ...pages.filter((page): page is IndexablePage => page.path !== null),
  ...team.map(principalSeo),
]

/** The absolute address of a path on the live site. */
export const absoluteUrl = (path: string) => `${site.url}${path}`
