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
  config/         routes.ts (every path, and the nav) · site.ts (name, URL, contact details)
  content/        Site copy by topic: services, team, process, proof, faq, audiences, timeZones,
                  privacy — and seo.ts, every page's title and description
  pages/
    home/         HomePage.tsx + sections/ that only the home page uses
    services/     ServicesPage.tsx + sections/
    about/  why-nepal/  contact/  privacy/  principal/  not-found/
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
plugins/          staticPages.ts — the Vite plugin that writes each route's HTML, 404.html, sitemap.xml
public/api/       enquiry.php — emails the contact form to info@ from the web host
```

Copy is deliberately kept out of the components: edit `src/content/` (and
`src/config/site.ts` for contact details) rather than the JSX.

### Where new code goes

- **A new page:** add its path to `paths` in `config/routes.ts` (and to `nav` if it
  belongs in the menu), give it a title and description in `pageSeo` in
  `content/seo.ts`, create `pages/<name>/<Name>Page.tsx` with a default export that
  calls `useSeo(pageSeo.<name>)`, and add one line to the `pages` table in
  `app/App.tsx`. A page file only sets its SEO and lists its sections in order; the
  markup lives in the sections. The `pageSeo` entry is also what gets the page its
  own HTML file and sitemap entry at build time — without it the live server
  answers the URL with a 404.
- **A new section:** if one page uses it, put it in that page's `sections/` folder
  and export it from `sections/index.ts`. Move it to `components/sections` once a
  second page needs it.
- **When a component grows parts,** make it a folder of the same name:
  `Header/Header.tsx` is the entry, with `DesktopNav.tsx`, `MobileMenu.tsx` … beside
  it. The parts are private to that folder, and the parent `index.ts` exports only
  the entry.
- **Logic sits beside the UI, not inside it:** state and effects go in a `useX.ts`
  hook (`useEnquiryForm`, `useScrollStage`), pure functions and lookup tables in a
  plain `.ts` file (`enquiry.ts`, `poses.ts`). Promote them to `src/hooks` or
  `src/lib` once something else needs them.
- **Imports:** every folder under `components/` except `ui/`, every folder under
  `features/`, and each page's `sections/` has an `index.ts`. Import from the
  folder (`@/components/common`), not the file inside it; within a folder, import
  siblings relatively. `components/ui` keeps one import per file, as the shadcn
  CLI writes it.
- **Links:** use `paths` from `@/config/routes` rather than typing `'/contact'`.
- **Easing:** use `brandEase` from `@/components/motion` rather than repeating the curve.

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

`.github/workflows/deploy.yml` builds and uploads to the cPanel host on every push
to `PRODUCTION`.

The build gives every route its own HTML file — `about.html`,
`team/deepak-pandey.html` … — whose `<head>` already carries that page's title,
description, canonical URL and link-preview tags (`og:image` is
`public/og-image.png`, the firm's 1200×630 card). The app still renders the body.
It also writes `404.html` and `sitemap.xml`; `robots.txt` is in `public/`.

- **Apache (live)** — `deploy/public_html.htaccess` serves `/about` from
  `about.html`, 301s `/about.html` and `/about/` to `/about`, and answers anything
  else with `404.html` and a real 404 status. There is no catch-all fallback any
  more, so a route without a `pageSeo` entry 404s.
- **Netlify** — `public/_redirects` only forwards the old
  `probityadvisory.netlify.app` copy to the real domain.
- **Vercel** — `vercel.json` turns on clean URLs; `404.html` is picked up as is.

### Contact form

The form POSTs JSON to `/api/enquiry.php`, which runs on the cPanel host's PHP and
`mail()`s the enquiry to `info@probityadvisory.co.uk` with the visitor in
Reply-To. A hidden `website` field is the spam honeypot. The dev server and
`vite preview` cannot run PHP, so locally a send always shows the failure notice.

Delivery depends on the domain's DNS: an MX record for the mailbox, and an SPF
record that lets the web host send as `@probityadvisory.co.uk` (plus DKIM),
otherwise the domain's DMARC policy (`p=quarantine`) sends the mail to spam. If
the mailboxes live with an outside provider rather than cPanel, set cPanel's
*Email Routing* to *Remote Mail Exchanger* so the host does not try to deliver
`info@` locally.

## Leftovers to delete

`@react-three/drei` is installed but no longer imported anywhere; it can go:

```bash
npm uninstall @react-three/drei
```

## Known gaps

- **The privacy notice is a stand-in.** `src/content/privacy.ts` describes what the
  site does today; replace it with the firm's own text when it arrives.
- **Prajwal Paudyal's profile is deliberately bare** — name, credentials and one
  line — until his own details are confirmed. Fill in `bio`, `career` and the rest
  in `src/content/team.ts` and the profile sections reappear by themselves.
- **No testimonials.** The reference material contained no approved client
  quotes, so none were invented. Adding a section is straightforward once real
  quotes are cleared for use.
- **Portraits** were extracted from the reference HTML at 480×600. Higher-
  resolution originals would sharpen the team grid on retina displays.
