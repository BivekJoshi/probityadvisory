import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { Plugin } from 'vite'
import { site } from '../src/config/site.ts'
import { absoluteUrl, indexablePages, pageSeo, type PageSeo } from '../src/content/seo.ts'

/** Where index.html leaves room for each page's head tags. */
const SLOT = '<!--seo-->'

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Title, description, canonical URL and the link-preview card for one page. */
function headTags({ path, title, description }: PageSeo) {
  const url = path === null ? null : absoluteUrl(path)
  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    url ? `<link rel="canonical" href="${url}" />` : '<meta name="robots" content="noindex" />',
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${escapeHtml(site.name)}" />`,
    '<meta property="og:locale" content="en_GB" />',
    url && `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:image" content="${absoluteUrl(site.ogImage)}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${escapeHtml(`${site.name} — Outsourced accounting for UK practices`)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
  ]
    .filter(Boolean)
    .join('\n    ')
}

/** The file a route is served from: / is index.html, /team/x is team/x.html. */
const fileFor = (path: string) => (path === '/' ? 'index.html' : `${path.slice(1)}.html`)

function sitemap() {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...indexablePages.map(({ path }) => `  <url><loc>${absoluteUrl(path)}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n')
}

/**
 * Gives every route its own HTML file, so a crawler or a chat app's link preview
 * sees that page's title, description and canonical URL without running the app.
 * Only the head differs; the app still renders the body. Also writes 404.html,
 * which the host serves with a real 404 status, and sitemap.xml.
 *
 * The page list comes from src/content/seo.ts, so a new page or principal is
 * picked up as soon as it has an entry there.
 */
export function staticPages(): Plugin {
  return {
    name: 'probity:static-pages',

    // The dev server answers every route with index.html; fill the slot for the one asked for.
    transformIndexHtml(html, ctx) {
      if (!ctx.server) return html
      const { pathname } = new URL(ctx.originalUrl ?? ctx.path, 'http://localhost')
      const page = indexablePages.find((candidate) => candidate.path === pathname) ?? pageSeo.notFound
      return html.replace(SLOT, headTags(page))
    },

    async writeBundle({ dir }) {
      if (!dir) return
      const template = await readFile(join(dir, 'index.html'), 'utf8')
      if (!template.includes(SLOT)) this.error(`index.html has no ${SLOT} slot to fill`)

      const pages: [string, PageSeo][] = [
        ...indexablePages.map((page): [string, PageSeo] => [fileFor(page.path), page]),
        ['404.html', pageSeo.notFound],
      ]
      for (const [file, page] of pages) {
        const target = join(dir, file)
        await mkdir(dirname(target), { recursive: true })
        await writeFile(target, template.replace(SLOT, headTags(page)))
      }
      await writeFile(join(dir, 'sitemap.xml'), sitemap())
    },
  }
}
