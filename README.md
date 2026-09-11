# Probity Advisory — Frontend

Marketing site for Probity Advisory, an outsourced accounting practice in Kathmandu
serving UK accountancy firms. Built from the approved
`probity-advisory-website.html` reference: all copy, the navy/gold identity and the
Spectral / IBM Plex type pairing are carried across unchanged.

## Stack

| Concern | Choice |
| --- | --- |
| Build | Vite 8 + React 19 + TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme`, no config file) |
| Components | shadcn/ui pattern — owned source in `src/components/ui` |
| Animation | Framer Motion 13 |
| 3D | three.js via @react-three/fiber + drei |
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
    ui/         shadcn primitives (button, card, badge, input, select, accordion, sheet …)
    layout/     Header, Footer, Layout shell, Container/Band/Eyebrow, theme toggle
    motion/     Reveal, Stagger, WordReveal, Counter — the animation vocabulary
    three/      Globe (Kathmandu → London arc) + LazyGlobe loader
    sections/   Page-level blocks (hero, clocks, timeline, ledger, forms …)
    icons/      WhatsApp / LinkedIn SVGs
  data/         site.ts and team.ts — every word of copy lives here
  hooks/        useClock, useTheme, useSeo
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
- Theme follows the OS by default; the toggle persists to `localStorage`, and an
  inline script in `index.html` applies it before first paint so there is no flash.

## Motion

Every animated element degrades to a static one under
`prefers-reduced-motion: reduce` — the `Reveal`, `Stagger`, `WordReveal`,
`Counter` and `OverlapChart` components each check it explicitly.

The three.js globe is ~240 kB gzipped, so it is deliberately kept out of the
first paint: `LazyGlobe` code-splits it and only mounts the canvas once the frame
scrolls into view. It also falls back to a plain labelled frame if WebGL is
unavailable.

## Deploying

The build is a static SPA, so the host must rewrite unknown paths to
`index.html` or deep links like `/why-nepal` will 404. Both are included:

- Netlify — `public/_redirects`
- Vercel — `vercel.json`

For Apache/nginx, add the equivalent fallback rule.

## Known gaps

- **The enquiry form has no back end.** A valid submission currently opens the
  visitor's mail client with the enquiry pre-filled. Replace `handleSubmit` in
  `src/components/sections/ContactForm.tsx` with a POST once an endpoint exists.
- **No testimonials.** The reference material contained no approved client
  quotes, so none were invented. Adding a section is straightforward once real
  quotes are cleared for use.
- **Portraits** were extracted from the reference HTML at 480×600. Higher-
  resolution originals would sharpen the team grid on retina displays.
