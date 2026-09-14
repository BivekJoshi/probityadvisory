/** Every route path in one place: the router, the navigation and in-page links all read from here. */
export const paths = {
  home: '/',
  services: '/services',
  about: '/about',
  whyNepal: '/why-nepal',
  contact: '/contact',
} as const

export const nav = [
  { label: 'Home', to: paths.home },
  { label: 'Services', to: paths.services },
  { label: 'About', to: paths.about },
  { label: 'Why Nepal', to: paths.whyNepal },
  { label: 'Contact', to: paths.contact },
] as const
