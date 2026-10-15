# AGENT.md — VS Developers Website

Change log and project context for AI coding agents. Read this before touching the repo so you can resume from where the last agent stopped instead of restarting.

---

## 1. What this project is

A marketing website for **VS Developers**, a family-run plotted-development (land plot) builder in **Bengaluru East, India**. Three finished, fully sold-out layouts:

| Project | Slug | Location | Acres | Plots | Sizes |
|---|---|---|---|---|---|
| VS Heritage | `vs-heritage` | Kalkere, Bengaluru East | 12.5 | 148 | 30x50 & 40x60 ft |
| VS Rosemeadows | `vs-rosemeadows` | Vemagal-Kurugal, Sulibele Road | 4.7 | 71 | Starts at 30x40 ft |
| VS Yogitha | `vs-yogitha` | Budigere, Old Madras Road | 6.8 | 76 | 30x40 & 30x50 ft |

All three are **DTCP approved & DC converted**, and all are marketed as **100% Sold Out & Delivered**. The current sales pitch is "register for VIP early access to our next launch" — there is no live inventory to sell.

---

## 2. Tech stack & commands

- **React 19.2.6 + TypeScript + Vite 7.3.2**
- **Tailwind CSS 4** (theme tokens defined in `src/index.css` via `@theme`, not a config file)
- **Framer Motion 13** for all animation / scroll effects
- **three / @react-three/fiber / @react-three/drei** for the interactive 3D plot viewer
- **react-router-dom `HashRouter`** (hash-based routing — `/#/projects`, `/#/project/:slug`)
- **`vite-plugin-singlefile`** — the production build inlines all JS + CSS into ONE `dist/index.html` (~1.59 MB). Static assets in `public/` are still copied out as separate files (images, hero video) and referenced by absolute path (`/projects/heritage/heritage-1.jpg`).

```bash
npm run dev      # Vite dev server
npm run build    # vite build -> dist/index.html  (does NOT run tsc)
npm run preview  # preview the built site
npx tsc --noEmit # typecheck (REQUIRED - build alone does not catch unused vars)
```

**Gotcha:** `npm run build` succeeds even with TypeScript errors because Vite uses esbuild, which strips types without checking them. Always run `npx tsc --noEmit` too. The tsconfig has `noUnusedLocals` + `noUnusedParameters` on, so unused imports/vars are hard errors.

**No lint script is configured.**

---

## 3. Architecture — where things live

### Content model (single source of truth)
**`src/data/site.ts`** — ALL real content lives here. Never hardcode facts in components.

- `CONTACT` — phone, WhatsApp helper (`CONTACT.whatsapp(msg)`), email, address, `mapUrl`, `mapEmbed`, hours
- `PROJECTS: Project[]` — full project records: `slug`, `name`, `location`, `status`, `areaAcres`, `plotCount`, `sizes`, `approvals`, `heroImage`, `video`, `highlights`, `amenities`, `locationAdvantages`, `gallery`, `about`, `mapEmbed`, `mapUrl`, `directionsUrl`, and a generated `layout` (3D plot data)
- `getProject(slug)` — lookup helper
- `makeLayout(rows, cols, sqftOptions, opts)` — **internal generator** that procedurally builds the 3D plot grid. Currently hardcoded to `status: "sold"` for every plot (matching the "100% delivered" story). There is commented-out `isEdge` logic that was meant to detect corner plots.
- `STATS`, `TESTIMONIALS`, `SERVICES`, `WHY_STEPS`, `ROLES`, `TRUST_BADGES`, `TAGLINE`
- `HERO_VIDEO = "/hero-video.mp4"`, `HERO_POSTER = "/hero-poster.jpg"`

### Pages (`src/pages/`, routed in `src/App.tsx`)
- `Home.tsx` — the big one. Hero video, HotstarProjectSpotlight, Coverflow3DProjectShowcase, Perspective3DStackCards, stats, services, testimonials, ScheduleVisit CTA
- `Projects.tsx` — alternating showcase cards for the 3 projects
- `ProjectDetail.tsx` — per-project page: hero, facts bar, highlights, amenities, 3D layout viewer, gallery, map, enquiry form
- `Gallery.tsx`, `About.tsx`, `Contact.tsx`, `Careers.tsx`

### Components (`src/components/`)
- `ui.tsx` — the shared design-system barrel. Exports `CountUp`, `Cta`, `Field`, `Icon`, `inputCls`, `Lightbox`, `Magnetic`, `ParallaxImage`, `Reveal`, `SectionHeading`, `TextReveal`, `ScrollText`, `TrustBadges`, `usePageTitle`, `WhatsAppGlyph`, `EASE`, `EASE_LUX`, plus scroll/3D helpers (`Scroll3D`, `Parallax3DLayer`, `CinematicSection`, `TiltCard`, `GoldRule`, `useIsDesktop`, `CursorDot`)
  - `Reveal` is the generic scroll-entrance wrapper. Optional `x`, `rotate`, `scale`, `blur` props let a card animate in with a slight 3D lift/tilt; defaults preserve the original behaviour.
  - `TextReveal` — word/character reveal that fires **once** when the element enters the viewport.
  - `ScrollText` — **scroll-linked** word reveal (words stay dim + blurred until the block scrolls up). Used for the "text animation while scrolling" requirement on every page **except Home**. Accepts plain strings *and* ReactNode (handles `<em>`/`<br>`; inline styling is preserved). Wraps each word in `<span class="scroll-word">`.
  - `SectionHeading` takes an optional `textEffect?: "reveal" | "scroll"` (default `"reveal"`). Pass `textEffect="scroll"` on non-Home pages.
- `Navbar.tsx`, `Footer.tsx`
- `HotstarProjectSpotlight.tsx`, `Coverflow3DProjectShowcase.tsx`, `Perspective3DStackCards.tsx` — the three showpiece carousels on Home
- `ProjectComparison.tsx` — **complete but NOT rendered anywhere** (see §5)
- `three/PlotViewer.tsx` — React Three Fiber 3D master-plan viewer. `Canvas` + `Scene` with `MiniVilla` models for sold plots. Lazily imported from `ProjectDetail.tsx` via `React.lazy`/`Suspense`.

### Styling conventions
- Forest/mint/gold color palette. Utility classes like `bg-mint-50`, `text-forest-900`, `bg-gold-500`, `card-shadow`, `paper-grain`, `animate-marquee`, `preserve-3d` are Tailwind theme extensions from `src/index.css`
- Border radius uses large "rounded-[2rem]" / "rounded-[1.75rem]" values for the soft, premium look
- `font-display` = Fraunces (serif), body = Manrope (both loaded from Google Fonts in `index.html`)
- `EASE` (exported from `ui.tsx`) is the shared Framer Motion easing curve — use it for consistency
- **Card + hover-text utilities** live in `src/index.css` and are applied as plain classes:
  - `.hover-card` — adds a smooth `translateY(-8px)` lift + eased border/shadow/background transitions on hover. Add it to any *plain* `<div>`/`<Link>` card. **Do not add it to a Framer Motion element** whose `transform` is driven by `animate`/`style` — the inline transform wins and the lift silently breaks (text-colour effects still work).
  - `.hover-title` — title colour eases to forest-600 on card hover (on **dark** cards use Tailwind `group-hover:text-gold-300` instead — forest-600 is invisible there).
  - `.hover-desc`, `.hover-arrow` (slides +6px), `.hover-icon` (pop), `.hover-underline` (scaleX in), `.hover-reveal` (fade-up).
  - These are disabled under `prefers-reduced-motion`.

---

## 4. Change history

### Session: site-wide scroll animations + hover text effects (latest)

Added motion/polish across the whole site per user request: card scroll animations, scroll-linked text animation on every page **except Home**, and hover text effects on cards.

- **`src/index.css`** — added the `.hover-card` family of utilities (see §3 "Card + hover-text utilities") and `.scroll-word`. All disabled under `prefers-reduced-motion`.
- **`src/components/ui.tsx`**
  - Extended `Reveal` with optional `x`, `rotate`, `scale`, `blur` (defaults unchanged, so no existing call sites break).
  - Added `ScrollText` + internal `ScrollWord` — a genuine scroll-linked per-word reveal (`useScroll` + one `useTransform` per word). Preserves inline markup, exposes an `sr-only` copy for a11y.
  - `SectionHeading` gained `textEffect?: "reveal" | "scroll"`.
  - Imported the `MotionValue` type.
- **Non-Home pages** (`About`, `Careers`, `Contact`, `Gallery`, `Projects`, `ProjectDetail`) — page-hero subtitles and section headings/paragraphs now use `ScrollText` / `textEffect="scroll"`. Their card grids got `hover-card` + `hover-title`/`hover-desc`/`hover-icon`/`hover-arrow`.
- **`Home.tsx`** — intentionally **no** `ScrollText` (Home is the landing page). Its cards got hover text effects: FeaturedProjects card (title → `group-hover:text-gold-300` on the dark card), the "Compare all three" card, Services cards, Locations cards, AboutSnapshot image card.
- **Home carousels** (`HotstarProjectSpotlight`, `Coverflow3DProjectShowcase`, `Perspective3DStackCards`) + `Navbar` mega-menu — added card-title hover colour (`group-hover:text-gold-300` / `group-hover:text-forest-600`). **No CSS hover transforms were added to these** because their `transform` is owned by Framer Motion.
- Verified: `npx tsc --noEmit` clean, `npm run build` succeeds (`dist/index.html` ~1.594 MB), and a Playwright smoke test across all 7 routes reported **no console/page errors** (only pre-existing THREE deprecation warnings from the 3D viewer).

### Session: full audit + first round of fixes

Ran a full codebase review, then fixed the following. `npx tsc --noEmit` was failing with **11 errors** before; it is now **clean**, and `npm run build` succeeds.

#### TypeScript / build errors fixed (all unused-variable errors)
| File | Fix |
|---|---|
| `src/data/site.ts` | Deleted unused private `px()` Pexels helper |
| `src/data/site.ts` | Commented out unused `isEdge` computation in `makeLayout` |
| `src/components/HotstarProjectSpotlight.tsx` | Removed unused `useEffect` import |
| `src/components/Coverflow3DProjectShowcase.tsx` | Commented out unused `isPrev` / `isNext` |
| `src/components/three/PlotViewer.tsx` | Commented out unused `FILTERS` array; changed `const [filter, setFilter]` → `const [filter]` (setter was never called — filter UI was never built) |
| `src/pages/Gallery.tsx` | Commented out unused `EXTRA` array (8 stock Pexels photos, never rendered) and its `px` helper |
| `src/pages/Home.tsx` | Removed unused `GoldRule`, `TiltCard`, `useIsDesktop` imports |

#### Content / data-correctness fixes
- **`index.html` JSON-LD (`RealEstateAgent` → `makesOffer` listings)** — fixed stale data that contradicted `site.ts`:
  - VS Heritage: was "Old Madras Road, Bhattarahalli. 5 acres, 87 plots" → now "Kalkere, Bengaluru East. 12.5 acres, 148 plots"
  - VS Yogitha: was "Seegehalli, Whitefield. 3 acres, 54 plots" → now "Budigere, Old Madras Road. 6.8 acres, 76 plots"
  - VS Rosemeadows was already correct
- **`src/components/ProjectComparison.tsx`** — `COMPARISON_DATA` had mismatched/swapped locations vs `site.ts`:
  - Micro-Market Location row: Heritage "Old Madras Road, Bhattarahalli" → "Kalkere, Bengaluru East"; Rosemeadows "Budigere Cross (Airport Arc)" → "Vemagal-Kurugal, Sulibele Road"; Yogitha "Seegehalli, Whitefield Tech Hub" → "Budigere, Old Madras Road"
  - Nearest Metro Station row: reworded to name actual stations/landmarks instead of vague labels
  - Airport / IT Hub Access row: Heritage now "15 mins to Manyata Tech Park" (was Whitefield ITPL); Rosemeadows now "35 mins to Kempegowda Airport via SH-104" (was 25 mins)
  - Added missing `"Infrastructure"` to `CATEGORIES` (2 rows used that category but it wasn't in the filter list, so those rows were unreachable via the filter UI)
- **`src/pages/About.tsx`** — timeline entry said "flagship 5-acre layout on Old Madras Road" → now "flagship 12.5-acre layout at Kalkere, Bengaluru East"
- **`src/pages/Projects.tsx`** — `statusBadgeText` was hardcoded `"100% SOLD OUT"` for every project regardless of `p.status`. Now derived: if `p.status` is `Sold Out` / `100% Sold Out` / `Completed` → "100% SOLD OUT" (green), otherwise the actual status (gold). Also renamed the confusingly-named `isEven` (which was `idx % 2 === 1`, i.e. actually odd) → `reverseLayout`

#### Functional / UX fixes
- **`src/pages/Contact.tsx`** — "Get directions" card (`href: undefined`, so it rendered as a non-clickable link) now links to `CONTACT.mapUrl`. "Plan a visit" card now links to a pre-filled WhatsApp message
- **`src/components/Coverflow3DProjectShowcase.tsx`** — the global `ArrowLeft`/`ArrowRight` keydown handler now calls `e.preventDefault()` so arrow keys don't also scroll the page while moving the carousel
- **`src/components/three/PlotViewer.tsx`** — the selected-plot detail card was hardcoded "Constructed Villa (Sold)" + sold-out copy for every plot. Now uses `STATUS_LABEL[selected.status]` and picks copy by status (sold / corner / reserved / available), so it stays correct if a future launch has live inventory
- **`src/pages/ProjectDetail.tsx`** — the 3D viewer section subtitle claimed "Corner plots are shown in gold", but the layout generator never produces corner plots. Changed to "…This layout is fully handed over."
- **`src/components/ui.tsx`** — `CountUp` now supports one decimal place when the target is not an integer. **This fixes a real display bug:** `areaAcres` values like 12.5, 4.7, 6.8 were being rounded to "13", "5", "7" in the ProjectDetail facts bar. Now correctly shows 12.5 / 4.7 / 6.8
- **`index.html`** — added missing `<meta property="og:image" content="/vs-logo-new.jpg" />`

---

## 5. Known issues / remaining work (NOT yet fixed)

These were identified during the audit but **intentionally left alone** — either the user decided to leave them, or they're bigger design decisions:

1. **`ProjectComparison.tsx` is complete but never rendered.** It has a full desktop table + mobile tab UI, but no page imports it. Home has a "Compare all three, side by side" card that links to `/projects`, which does NOT render this component. **Decided: leave as-is for now.** The data inside it was corrected (see §4). If you wire it up, add `<ProjectComparison />` to `src/pages/Projects.tsx`.
2. **`Gallery.tsx` `EXTRA` array** — 8 stock Pexels photos that are NOT actual VS Developers properties. Commented out (per user decision to leave as-is, not delete, not render). If you ever show them, mark them clearly as illustrative or replace with real photos.
3. **Repo root has tracked, unreferenced folders** `heritage/`, `rose/`, `yogitha/` containing 45 raw `WhatsApp Image …` JPEGs (~15 MB). No code references them; the usable copies already live in `public/projects/{heritage,rose,yogitha}/`. **Decided: leave them.**
4. **No-op `.replace("w=1600&h=1000", …)` calls** in `Navbar.tsx` (2 places) and `ProjectDetail.tsx` (1 place). These are leftovers from when images were hosted on Pexels with query-string dimensions. The images are now local paths, so the replace is a no-op. Harmless, but dead code.
5. **`makeLayout` never produces non-sold plots.** `isEdge` (corner detection) is commented out, and `status` is hardcoded `"sold"`. This is *intentional* for the current "100% delivered" story, but it means the PlotViewer's status-aware copy I added (§4) is currently unreachable for non-sold statuses. To support a future live launch: uncomment `isEdge`, and assign statuses (`corner` for edge plots, `available`/`reserved` for others) inside the loop.
6. **`STATS` marketing numbers don't match the 3 visible projects.** Site claims 110+ acres / 1800+ plots, but the three featured projects sum to ~24 acres / 295 plots. This is likely intentional (legacy projects not shown), but flagged for the user to confirm.
7. **No `robots.txt`, no XML sitemap, no 404 page** (`App.tsx` routes `path="*"` → Home).
8. **Absolute asset paths** (`/projects/...`, `/hero-video.mp4`) mean the site must be served from the domain root, not a subpath. Set Vite `base` if deploying to a subdirectory.
9. **`vite-plugin-singlefile` does NOT inline `public/` assets.** If you deploy only `dist/index.html` without the sibling image/video files, all media breaks. The `dist/` folder must be deployed whole (or the assets inlined differently).
10. **Hero video autoplay** relies on `muted` + a `keepPlaying` retry handler. Some browsers may still block; the `poster` fallback (`HERO_POSTER`) covers this.
11. **Root `logo.jpeg`** is tracked but unused (the site uses `/vs-logo-new.jpg` and SVG logos from `public/`).

---

## 6. Verification checklist (run after any change)

```bash
npx tsc --noEmit     # must be clean — catches unused vars, type errors
npm run build        # must succeed — verifies the singlefile bundle
```

For visual/behavioral changes, also run `npm run dev` and check the affected route. The most fragile pieces are the three Home carousels (`HotstarProjectSpotlight`, `Coverflow3DProjectShowcase`, `Perspective3DStackCards`) — they use `useScroll`/`useTransform` with hard-coded pixel/`vh` offsets and are easy to break.

---

## 7. Conventions for future agents

- **Never hardcode project facts in a component.** Add/change them in `src/data/site.ts` so JSON-LD, the comparison table, and all pages stay in sync.
- **If you change project data, grep for the old value** in `index.html` (JSON-LD) and `src/components/ProjectComparison.tsx` — both duplicate facts and have gone stale before.
- **Always run `npx tsc --noEmit`**, not just `npm run build`.
- **Prefer commenting out unused code over deleting** when the code represents unimplemented intent (e.g. the corner-plot logic), so a future agent can see what was planned.
- **Animation:** reuse `EASE` from `ui.tsx`, and respect `prefers-reduced-motion` (the `CountUp`, `Magnetic`, and `TiltCard` helpers already do this — follow their pattern).
- **Text on scroll:** use `ScrollText` (or `SectionHeading textEffect="scroll"`) on every page **except Home**. Home deliberately keeps `TextReveal` only. For a plain one-shot reveal use `TextReveal`.
- **Card hovers:** give cards `hover-card` + `hover-title` (+ `hover-icon`/`hover-desc`/`hover-arrow`/`hover-reveal` as needed). Strip any existing Tailwind `hover:-translate-y-*` from an element before adding `hover-card` (both set `transform`; the class transition is the intended one). Never put `hover-card` on a Framer Motion element that owns its `transform`.
- **The "JioHotstar/Hotstar" component names** (`HotstarProjectSpotlight`) are just leftover names for a premium carousel UI. They are not related to the actual JioHotstar product.
