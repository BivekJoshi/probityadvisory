# Probity Advisory — Frontend

Marketing site for Probity Advisory, an outsourced accounting practice in Kathmandu
serving UK accountancy firms. All copy, the navy/gold identity and the
Spectral / IBM Plex type pairing come from the approved
`probity-advisory-website.html` reference.

## Stack

| Concern | Choice |
| --- | --- |
| Build | Vite 8 + React 19 + TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme`, no config file) |
| Components | shadcn/ui pattern — owned source in `src/components/ui` |
| Animation | Framer Motion 13 |
| Routing | React Router 7 |
| Icons | lucide-react (brand glyphs hand-rolled in `components/icons`) |

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production bundle into dist/
npm run preview  # serve the built bundle
npm run lint
```

## Layout

```
src/
  components/
    ui/         shadcn primitives (button, badge, input, select, accordion, sheet …)
    layout/     Header, Footer, Layout shell, Container/Band/SectionHeader, theme toggle
    motion/     Reveal, Stagger, WordReveal — the animation vocabulary
    sections/   Page-level blocks (hero, clocks, timeline, ledger, forms …)
    icons/      Probity monogram, WhatsApp / LinkedIn, one glyph per service
  data/         site.ts and team.ts — every word of copy lives here
  hooks/        useMinute + time formatting, useTheme, useSeo
  pages/        Home, Services, About, WhyNepal, Contact, NotFound
```

Copy is deliberately kept out of the components: edit `src/data/site.ts` and
`src/data/team.ts` rather than the JSX.

## Design system

Brand tokens are declared once in `src/index.css` — `:root` for light, `.dark`
for dark — then mapped to both shadcn semantic names (`--color-primary`,
`--color-border` …) and brand aliases you can use directly (`bg-navy-deep`,
`text-gold`, `border-line`). Changing a brand colour in one place moves the whole
site, in both themes.

- **Display** Spectral · **Body** IBM Plex Sans · **Figures** IBM Plex Mono
- **Radius** 6 / 10 / 14 / 18 / 24 / 32 px (`rounded-sm` … `rounded-3xl`). Cards
  are `rounded-2xl`; buttons, badges and eyebrows are pills.
- **Structure** Every page opens with `<PageHero>`; every section opens with
  `<SectionHeader eyebrow title lede action />` inside a `<Band>`.
- Theme follows the OS by default; the toggle persists to `localStorage`, and an
  inline script in `index.html` applies it before first paint so there is no flash.

## Motion

Reduced motion is handled once, by `<MotionConfig reducedMotion="user">` in
`main.tsx`: movement is dropped and fades remain. The only animations checked
locally are the ones that are not transforms — the overlap chart's bar widths
and the travelling dot on the clock card's SVG route.

The hero's London ↔ Kathmandu clock card is plain SVG and CSS. There is no
WebGL, so it renders on locked-down office machines and remote desktops too.

## Deploying

The build is a static SPA, so the host must rewrite unknown paths to
`index.html` or deep links like `/why-nepal` will 404. Both are included:

- Netlify — `public/_redirects`
- Vercel — `vercel.json`

For Apache/nginx, add the equivalent fallback rule.

## Leftovers to delete

These files are no longer imported, so they are not in the bundle, but they are
still type-checked and linted:

```
src/components/three/                   (Globe, LazyGlobe)
src/components/motion/Counter.tsx
src/components/sections/SoftwareMarquee.tsx
```

Once they are gone, drop the 3D dependencies:

```bash
npm uninstall three @react-three/fiber @react-three/drei @types/three
```

## Known gaps

- **The enquiry form has no back end.** A valid submission currently opens the
  visitor's mail client with the enquiry pre-filled. Replace `handleSubmit` in
  `src/components/sections/ContactForm.tsx` with a POST once an endpoint exists.
- **No testimonials.** The reference material contained no approved client
  quotes, so none were invented. Adding a section is straightforward once real
  quotes are cleared for use.
- **Portraits** were extracted from the reference HTML at 480×600. Higher-
  resolution originals would sharpen the team grid on retina displays.
