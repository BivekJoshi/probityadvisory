import { useEffect } from 'react'
import { absoluteUrl, type PageSeo } from '@/content/seo'

/** The `<meta>` or `<link>` matching `selector`, created with `attrs` if the page has none. */
function headTag(selector: string, tag: 'meta' | 'link', attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = document.createElement(tag)
    for (const [name, value] of Object.entries(attrs)) el.setAttribute(name, value)
    document.head.appendChild(el)
  }
  return el
}

/**
 * Keeps the title, description, canonical URL and link-preview tags in step with
 * the route. The build writes the same tags into each page's HTML; this covers
 * navigation inside the app, and hosts that serve one index.html for every path.
 */
export function useSeo({ path, title, description }: PageSeo) {
  useEffect(() => {
    document.title = title
    headTag('meta[name="description"]', 'meta', { name: 'description' }).setAttribute('content', description)
    headTag('meta[property="og:title"]', 'meta', { property: 'og:title' }).setAttribute('content', title)
    headTag('meta[property="og:description"]', 'meta', { property: 'og:description' }).setAttribute(
      'content',
      description,
    )

    const canonical = document.head.querySelector('link[rel="canonical"]')
    const ogUrl = document.head.querySelector('meta[property="og:url"]')
    const noindex = document.head.querySelector('meta[name="robots"]')
    if (path === null) {
      canonical?.remove()
      ogUrl?.remove()
      if (!noindex) headTag('meta[name="robots"]', 'meta', { name: 'robots', content: 'noindex' })
      return
    }
    noindex?.remove()
    headTag('link[rel="canonical"]', 'link', { rel: 'canonical' }).setAttribute('href', absoluteUrl(path))
    headTag('meta[property="og:url"]', 'meta', { property: 'og:url' }).setAttribute('content', absoluteUrl(path))
  }, [path, title, description])
}
