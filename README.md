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
| 3D | three.js + React Three Fiber 9, custom GLSL (lazy-loaded) |
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
  main.tsx        Entry: mounts <App> inside <AppProviders>
  app/            App.tsx (the route table) · providers.tsx (theme, motion, router)
  config/         routes.ts (every path, and the nav) · site.ts (name, contact details)
  content/        Site copy by topic: services, team, process, proof, faq, audiences, timeZones
  pages/
    home/         HomePage.tsx + sections/ that only the home page uses
    services/     ServicesPage.tsx + sections/
    about/  why-nepal/  contact/  not-found/
  components/
    ui/           shadcn primitives (button, badge, input, select, accordion, sheet …)
    common/       Container, Band, SectionHeader, Eyebrow, Lede — the page building blocks
    layout/       The shell: Layout, Header, Footer, TopBar, ScrollProgress, WhatsAppFab
    sections/     Sections shared by several pages: PageHero, CTABand, ClockPanel, StatsRow …
    motion/       Reveal, Stagger, WordReveal — the animation vocabulary
    icons/        Probity monogram, WhatsApp / LinkedIn, one glyph per service
  features/
    theme/        ThemeProvider, useTheme, ThemeToggle
    three/        WebGL scenes: SceneMount / SceneCanvas, objects, GLSL shaders, land mask
  hooks/          useSeo, useMinute
  lib/            cn(), time-zone formatting
  styles/         globals.css — Tailwind and the brand tokens
```

Copy is deliberately kept out of the components: edit `src/content/` (and
`src/config/site.ts` for contact details) rather than the JSX.

### Where new code goes

- **A new page:** add its path to `paths` in `config/routes.ts` (and to `nav` if it
  belongs in the menu), create `pages/<name>/<Name>Page.tsx` with a default export,
  and add one line to the `pages` table in `app/App.tsx`.
- **A new section:** if one page uses it, put it in that page's `sections/` folder.
  Move it to `components/sections` (and export it from its `index.ts`) once a
  second page needs it.
- **Imports:** every folder under `components/` except `ui/`, and every folder
  under `features/`, has an `index.ts`. Import from the folder
  (`@/components/common`), not the file inside it; within a folder, import
  siblings relatively. `components/ui` keeps one import per file, as the shadcn
  CLI writes it.
- **Links:** use `paths` from `@/config/routes` rather than typing `'/contact'`.

## Design system

Brand tokens are declared once in `src/styles/globals.css` — `:root` for light,
`.dark` for dark — then mapped to both shadcn semantic names (`--color-primary`,
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
`app/providers.tsx`: movement is dropped and fades remain. The only animations
checked locally are the ones that are not transforms — the overlap chart's bar
widths and the travelling dot on the clock card's SVG route.

### 3D scenes

`src/features/three` holds the WebGL work, built on React Three Fiber with
hand-written shaders:

| Scene | Where | What it shows |
| --- | --- | --- |
| `HeroScene` | Home masthead | The live Earth — Natural Earth land as dots, lit by the sun's real position, with work travelling London ↔ Kathmandu — over an animated contour relief |
| `LedgerScene` | Home, "How the work moves" | 180 instanced ledger pages choreographed through the four process steps as you scroll |
| `TerrainScene` | Every other masthead | A slow fly-over of ridged relief drawn as survey contours |
| `ContourScene` | Closing call to action | The contour relief on its own |

- Import scenes only through `@/features/three` (they are lazy) and mount them
  with `<SceneMount>`, which fetches the chunk once the frame is within a screen
  of the viewport and stops rendering whenever it scrolls out of view.
- three.js never ships in the first-paint bundle. Do not add it to
  `manualChunks`: a manual chunk also absorbs React and gets preloaded.
- `<SceneCanvas>` is the only place a canvas is created — transparent,
  decorative, device-pixel ratio capped, on-demand rendering under reduced motion.
- Without WebGL2 (locked-down office machines, some remote desktops) each scene
  falls back to the static design: the SVG clock card, the plain timeline, the
  dotted masthead.
- `features/three/data/landMask.ts` is a generated 60,000-point Fibonacci-sphere
  bitset (~10 kB) from Natural Earth 1:110m land; it only needs regenerating if
  the sample count changes.

## Deploying

The build is a static SPA, so the host must rewrite unknown paths to
`index.html` or deep links like `/why-nepal` will 404. Both are included:

- Netlify — `public/_redirects`
- Vercel — `vercel.json`

For Apache/nginx, add the equivalent fallback rule.

## Leftovers to delete

`@react-three/drei` is installed but no longer imported anywhere; it can go:

```bash
npm uninstall @react-three/drei
```

## Known gaps

- **The enquiry form has no back end.** A valid submission currently opens the
  visitor's mail client with the enquiry pre-filled. Replace `handleSubmit` in
  `src/pages/contact/sections/ContactForm.tsx` with a POST once an endpoint exists.
- **No testimonials.** The reference material contained no approved client
  quotes, so none were invented. Adding a section is straightforward once real
  quotes are cleared for use.
- **Portraits** were extracted from the reference HTML at 480×600. Higher-
  resolution originals would sharpen the team grid on retina displays.
