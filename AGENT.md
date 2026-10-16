# AGENT.md — VS Developers Website

Change log and project context for AI coding agents. Read this before touching the repo so you can resume from where the last agent stopped instead of restarting.

---

## 1. What this project is

A marketing website for **VS Developers**, a family-run plotted-development (land plot) builder based in **Bengaluru East, India**. Three finished layouts, all **DTCP approved & DC converted**:

| Project | Slug (unchanged) | Display name | Verified location | Acres | Plots | Sizes |
|---|---|---|---|---|---|---|
| VS Heritage | `vs-heritage` | VS Heritage | Vemagal-Kurugal, Karnataka | 12.5 | 148 | 30×50 & 40×60 ft |
| VS Rose Meadows | `vs-rosemeadows` | VS Rose Meadows | Vemagal-Kurugal, Karnataka | 4.7 | 71 | Starts at 30×40 ft |
| VS Yogitha Garden | `vs-yogitha` | VS Yogitha Garden | Vemagal Hosahalli | 6.8 | 76 | 30×40 & 30×50 ft |

Notes:

- **Display names changed but slugs did not** — the slugs keep their old short form (`vs-rosemeadows`, `vs-yogitha`). Never rename slugs; URLs and `getProject()` depend on them.
- **No sold-out messaging anywhere on the site (user decision).** There are no status pills, badges, footer status words, or "100% SOLD OUT" copy. The `status` field was deleted from the `Project` type and from all three records. Facts bar shows `Handover → Delivered`; highlights say "Fully Handed Over / Handed Over / Delivered".
- **`Bengaluru East` is intentionally still used** as the company-wide / market descriptor (stats sub-label, `index.html` meta + JSON-LD description, footer, navbar mega-menu, About hero, Coverflow, Perspective3DStackCards). Per-**project** location strings use the verified Vemagal values above. Don't "fix" one from the other.
- The registered office address in `CONTACT.address` is in **Bhattarahalli, Virgonagar, Bengaluru – 560049** — that is the office, not a project location.
- Sales pitch: "Schedule a Site Visit" / "Schedule a Visit" CTAs. No live inventory is sold on the site.

**PRD source of truth:** `VS_Developers_Detailed_PRD.pdf` at the repo root; extracted text at `C:\Users\thera\AppData\Local\Temp\opencode\prd.txt`.

---

## 2. Tech stack & commands

- **React 19.2.6 + TypeScript + Vite 7.3.2**
- **Tailwind CSS 4** (theme tokens defined in `src/index.css` via `@theme`, not a config file)
- **Framer Motion 13** for all animation / scroll effects
- **three / @react-three/fiber / @react-three/drei** for the interactive 3D plot viewer
- **react-router-dom `HashRouter`** (hash-based routing — `/#/projects`, `/#/projects/:slug`, `/#/about`, `/#/gallery`, `/#/careers`, `/#/contact`). Unknown paths (`path="*"`) render Home.
- **`vite-plugin-singlefile`** — the production build inlines all JS + CSS into ONE `dist/index.html` (~1.602 MB). Static assets in `public/` are still copied out as separate files (images, hero video, `robots.txt`, `sitemap.xml`, `llms.txt`) and referenced by absolute path (`/projects/heritage/heritage-1.jpg`).
- **Production domain: `https://vsdevelopersbengaluru.com`** (confirmed by the user). It lives in ONE place in code — `SITE.url` in `src/data/site.ts` — and is duplicated in `index.html`, `public/robots.txt`, `public/sitemap.xml` and `public/llms.txt` (static files can't read a TS constant). Change all five if the domain ever changes.

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
- `PROJECTS: Project[]` — full project records: `slug`, `name`, `shortName`, `tagline`, `location`, `address?`, `areaAcres`, `plotCount`, `sizes`, `approvals`, `heroImage`, `video`, `highlights`, `amenities`, `locationAdvantages`, `gallery`, `about`, `mapEmbed?`, `mapUrl?`, `directionsUrl?`, and a generated `layout` (3D plot data). **There is no `status` field** — it was removed because nothing renders it.
  - `locationAdvantages` is `[]` for all three projects, and `ProjectDetail.tsx` renders that block conditionally (`length > 0 &&`), so it is currently invisible. Refill it only if the user supplies verified advantages.
  - `address` currently mirrors `location` (no street/PIN was invented — see §4).
- `getProject(slug)` — lookup helper
- `makeLayout(rows, cols, sqftOptions, opts)` — **internal generator** that procedurally builds the 3D plot grid. Hardcoded to `status: "sold"` for every *plot* (that is `PlotStatus`, unrelated to the removed project `status`). There is commented-out `isEdge` logic that was meant to detect corner plots.
- `STATS`, `TESTIMONIALS`, `SERVICES` (6 items), `WHY_STEPS` (6 items), `ROLES`, `TRUST_BADGES`, `TAGLINE`
- `SITE` — `{ url, name, logo, ogImage }`. `SITE.url` is the canonical production origin used by `usePageMeta` for canonical/OG URLs.
- `HERO_VIDEO`, `HERO_POSTER`

### Pages (`src/pages/`, routed in `src/App.tsx`)
- `Home.tsx` — the big one. Hero video, HotstarProjectSpotlight, Coverflow3DProjectShowcase, Perspective3DStackCards, stats, services, why-us (pinned split), locations, testimonials, ScheduleVisit CTA
- `Projects.tsx` — alternating showcase cards for the 3 projects
- `ProjectDetail.tsx` — per-project page: hero, facts bar (Acres / Plots / Plot Sizes / Approvals / Handover), highlights, amenities, 3D layout viewer, gallery, map, enquiry form
- `Gallery.tsx`, `About.tsx`, `Contact.tsx`, `Careers.tsx`

### Components (`src/components/`)
- `ui.tsx` — the shared design-system barrel. Exports `CountUp`, `Cta`, `Field`, `Icon`, `inputCls`, `Lightbox`, `Magnetic`, `ParallaxImage`, `Reveal`, `SectionHeading`, `StaggerGroup`, `StaggerItem`, `TextReveal`, `ScrollText`, `TrustBadges`, `usePageMeta`, `WhatsAppGlyph`, `EASE`, `EASE_LUX`, plus scroll/3D helpers (`Scroll3D`, `Parallax3DLayer`, `CinematicSection`, `TiltCard`, `GoldRule`, `useIsDesktop`, `CursorDot`)
  - `Reveal` is the generic scroll-entrance wrapper. Optional `x`, `rotate`, `scale`, `blur` props let a card animate in with a slight 3D lift/tilt; defaults preserve the original behaviour.
  - `StaggerGroup` / `StaggerItem` — wrap a grid in `<StaggerGroup stagger={0.09} delay={0.1}>` and each card in `<StaggerItem className="h-full">` so cards fade/rise in sequence on viewport entry. Used by Home (services + why-us), About, Careers, Footer. This is the **preferred** pattern for card-grid scroll animation; pair with `hover:-translate-y-1` on the card for hover lift.
  - `TextReveal` — word/character reveal that fires **once** when the element enters the viewport. In `mode="character"` each **word** is wrapped in `<span className="inline-block whitespace-nowrap">` containing per-character spans — without that wrapper the browser breaks words between every letter (real bug fixed in §4). Don't remove it.
  - `ScrollText` — **scroll-linked** word reveal (words stay dim + blurred until the block scrolls up). Used for the "text animation while scrolling" requirement on every page **except Home**. Accepts plain strings *and* ReactNode (handles `<em>`/`<br>`; inline styling is preserved).
  - `SectionHeading` takes an optional `textEffect?: "reveal" | "scroll"` (default `"reveal"`). Pass `textEffect="scroll"` on non-Home pages.
  - `Cta` has `whitespace-nowrap` in its base classes so phone numbers like `+91 9035585849` never break after the country code.
  - `usePageMeta(title, description?)` — per-route SEO. Sets `document.title`, updates/creates the `description`, `og:title/description/url` and `twitter:title/description` metas, and rewrites `<link rel="canonical">` to `SITE.url + "/#/route"` (root for Home). Re-runs on `hashchange`. **Every page must call it** — it replaced the old `usePageTitle`.
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

### Session: sticky-stack cards — no transparency + slower scroll (latest)

User: "from the 2nd and 3rd card, the rest of the cards come in transparent — don't make them transparent", then "decrease the scroll animation speed of those cards."

- **Removed the `opacity` transition** from `ScrollStackCard` (`Perspective3DStackCards.tsx`). Every card is now **fully opaque**; only `y` (110% → 0%) and `scale` (0.97 → 1) animate. The incoming card is hidden by **clipping**, not fading: the stack container (`relative h-[clamp(...)] w-full max-w-6xl`) gained `overflow-hidden rounded-[2.25rem] shadow-2xl`, so cards slide up from under the bottom edge. The per-card `shadow-2xl` moved to the container (it would otherwise be clipped). `overflow-hidden` here is on a **descendant** of the sticky element, so it does not affect the pin.
- **Slowed the transition** by lengthening the scroll track: `h-[350vh]` → **`h-[500vh]`**. The `useScroll` target/offset are unchanged, so each of the 5 card windows now spans ~80vh of scroll instead of ~50vh.
- Verified with `tsc` + `build` (dist 1,603.87 kB). No browser pass (user instruction).

### Session: SEO + GEO pass (technical, on-page, structured data, AI discoverability)

Domain confirmed as `https://vsdevelopersbengaluru.com`. Added a `SITE` constant and a per-route meta hook, then static crawler files. Verified with `tsc` + `build` (dist 1,602.15 kB) + dist greps (no browser pass).

- **`index.html`** — added `<link rel="canonical">`, `<meta name="robots" content="index, follow, max-image-preview:large">`, `geo.region/placename/position`, absolute `og:url`/`og:image` (was `/vs-logo-new.jpg` relative → now `https://…/hero-poster.jpg`), `og:site_name`, `og:locale`, `og:image:width/height/alt`, and the full Twitter `summary_large_image` set. **JSON-LD** rewritten: a `WebSite` node, the `RealEstateAgent` upgraded to `["RealEstateAgent","Organization"]` with `@id`/`url`/`logo`/`image`/`geo`/`hasMap`/`areaServed`/`openingHoursSpecification` and per-listing `url`s, plus a new `ItemList` of the three projects.
- **`src/data/site.ts`** — added `export const SITE = { url, name, logo, ogImage }`.
- **`src/components/ui.tsx`** — replaced `usePageTitle(title)` with `usePageMeta(title, description?)` (title + description + canonical + OG/Twitter, recomputed on `hashchange`); added private `setHeadMeta` / `setHeadLink` helpers.
- **All 7 pages** (`Home`, `Projects`, `ProjectDetail`, `About`, `Gallery`, `Careers`, `Contact`) — now call `usePageMeta` with a hand-written ≤160-char description (per-project template for `ProjectDetail`).
- **`public/robots.txt`** — allow all, `Disallow: /api/`, an explicit allow block for AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended) for GEO, and the sitemap + llms.txt pointers.
- **`public/sitemap.xml`** — 9 `<loc>` entries (root + `#/` routes for about/projects/3 project pages/**gallery**/careers/contact).
- **`public/llms.txt`** — GEO summary: brand blurb, key facts (founded, scale, approvals, office, phone, email, hours, languages), the three projects with facts + links, services, page index, content licence.
- **Heading hierarchy fixed** — `Careers` h3→h2 (2×, was skipping h1→h3) and `Footer` h4→h2 (3×, was jumping h1→h4). Every page now has exactly one `<h1>`. No visual change (Tailwind resets heading defaults; `index.css` has no heading rules).
- **Image alt audit** — all `<img>`/`ImageReveal` have meaningful alt (`p.name`, gallery `caption`, card titles); no empty or missing alts.

### Session: animation-completeness sweep + hero performance

"Card and text animations are still not implemented on the complete website" — closed the last gaps and removed the two biggest scroll-jank sources. Verified with `tsc` + `build` only.

- **Text reveal added to the remaining plain headings/paragraphs**: `HotstarProjectSpotlight` h2 + sub, `Coverflow3DProjectShowcase` h2 + sub, `Perspective3DStackCards` h2 + sub, and Home's FeaturedProjects heading + sub, Why heading + sub (all wrapped in `TextReveal`).
- **`Gallery.tsx`** — masonry items changed from mount-time `animate` to `whileInView` + `viewport={{ once: true, amount: 0.15 }}` with `delay: (i % 3) * 0.07`, so tiles now stagger in on scroll instead of all appearing at load.
- **`Perspective3DStackCards.tsx` (sticky stack)** — header wrapped in `Reveal`; card box widened/shortened to `max-w-6xl` + `h-[clamp(440px,calc(100vh-7rem),600px)]`; `backdrop-blur-xl` removed from the stacked card (5 stacked full-screen blurs were re-compositing every frame) and the metric row's `backdrop-blur` dropped; image column became `flex-1`. Kept `position: sticky` intact (no `overflow-hidden` ancestor).
- **`Navbar.tsx`** — `backdrop-blur-xl` → `backdrop-blur-md` on both the scrolled bar and the mobile menu (a fixed full-width blur re-composites the viewport each scroll frame).
- **`Home.tsx` hero video** — `preload="auto"` → `preload="metadata"`, and a new `IntersectionObserver` pauses the 4K clip when the hero is out of view (resumes when it returns); `onPause` now checks `heroVisible.current` so the resume handler doesn't fight the observer.

### Session: sold-out removal + card animations + sticky stack fix + phone wrapping

Per user request — "remove sold pills", "animate the service/why cards", "the sticky card section shows a white gap", "the phone number breaks across lines".

- **Sold-out / status badges removed everywhere** (grep `Sold Out` → 0 hits in `dist/index.html`):
  - `Projects.tsx` — deleted `isSoldOut` / `statusBadgeText` / `statusBadgeColor` and the status pill (`h2` margin adjusted `mt-4` → `mt-0`).
  - `Home.tsx` — status pills removed from FeaturedProjects and Locations cards (the index pill stays).
  - `Navbar.tsx` mega-menu project item — now renders `{p.sizes}` only, no status prefix.
  - `Footer.tsx` — dropped ` · {p.status}` from the projects link list; also added `whitespace-nowrap` to the phone link.
  - `ProjectComparison.tsx` — desktop header pill + **mobile** card pill removed (`h3 mt-2` → `mt-0` in both).
  - `ProjectDetail.tsx` — hero gold status pill removed (`h1 mt-4` → margin dropped); facts-bar "Status" row relabelled to **`Handover → Delivered`**.
  - `HotstarProjectSpotlight.tsx` — `topBadge` → `#1 in Vemagal-Kurugal` / `#1 at Vemagal Hosahalli` (the `· 100% Delivered & Occupied` subtitle on Heritage was kept).
  - `Coverflow3DProjectShowcase.tsx` — spec rows `100% Sold Out & Delivered` → `Delivered`, `100% Sold Out & Handed Over` → `Handed Over`.
  - `three/PlotViewer.tsx` legend badge `100% Sold Out & Delivered` → `Plots Delivered`.
  - `site.ts` highlights → `Fully Handed Over` / `Handed Over` / `Delivered`; **deleted the `status` field from the `Project` interface and all three records** (nothing referenced it any more).
- **Services cards ("Six services. One promise.")** — grid wrapped in `StaggerGroup stagger={0.09} delay={0.1}`, each card `StaggerItem h-full` → `Scroll3D intensity={8}` → card with `duration-500 hover:-translate-y-1.5`.
- **Why VS Developers?** — left column (eyebrow + `h2` + sub) wrapped in `Reveal`; right card grid wrapped in `StaggerGroup stagger={0.08} delay={0.15}` with per-card `StaggerItem h-full`, and non-active cards gained `hover:-translate-y-1 hover:border-white/20`. `StaggerGroup`/`StaggerItem` added to the Home import list.
- **Sticky card stack (`Perspective3DStackCards.tsx`) — three real bugs fixed:**
  1. The section had `overflow-hidden`, which makes it a scroll container and silently **breaks `position: sticky`** — removed.
  2. `useScroll` targeted the whole `<section>` (header + `py-20` + the track), so every card's `[i/n, (i+1)/n]` window lagged the actual pin range and the last card only finished after the sticky had released. Progress now targets the tall track ref (`stackRef`) with `offset: ["start start", "end end"]`.
  3. The sticky box was `top-6 h-[600px] sm:h-[500px]` inside a `h-[500vh]` track, and `opacity` faded across the **entire** window → the incoming card looked white/washed. Now `sticky top-0 h-screen` (pin range == progress range) and the track is `h-[500vh]`. *(The card `opacity` ramp was later removed entirely — see the next session.)*
- **Phone-number wrapping** — `whitespace-nowrap` added to the `Cta` base class (fixes the contact map button), plus the phone anchors in `Footer`, `Home`, `About`, `ProjectDetail`.
- Verified: `npx tsc --noEmit` clean, `npm run build` OK (`dist/index.html` 1,595.86 kB), `Sold Out` count in dist = **0**, no preview server run (user asked not to).

### Session: TextReveal mid-word line break fix

- **Bug:** headings using `TextReveal mode="character"` broke **between every letter** (9 call sites: About, Contact, Careers, Projects ×2, Home, ProjectDetail ×2, Gallery).
- **Cause:** each character was its own `inline-block` `motion.span`, so the browser could wrap at any character.
- **Fix (`ui.tsx`):** the character branch now groups each word's spans in `<span key={`word-${startIndex}`} className="inline-block whitespace-nowrap">`. `ScrollText`/word mode were already atomic per word.
- Verified: `tsc` clean + build OK (single splitter site confirmed by grep).

### Session: verified project locations pass

User confirmed the three real locations; everything else was deleted rather than invented (no new addresses, PINs, coordinates or travel times; `mapUrl`/`mapEmbed` untouched).

- **`site.ts`** — Heritage → `Vemagal-Kurugal, Karnataka`; Rose Meadows → `Vemagal-Kurugal, Karnataka`; Yogitha Garden → `Vemagal Hosahalli`. `address` set to the same value (previously PIN `563157` was removed rather than guessed). `locationAdvantages: []` for all three. Taglines / `about` / `highlights` / gallery captions rewritten to the Vemagal wording; careers role `location` "Budigere Cross & Seegehalli sites" → "Vemagal project sites".
- **`HotstarProjectSpotlight.tsx`** — locations, topBadges, yearMeta, descriptions, tags, highlights; `VS ROSEMEADOWS`→`VS ROSE MEADOWS`, `VS YOGITHA`→`VS YOGITHA GARDEN`.
- **`Coverflow3DProjectShowcase.tsx`** — locations, subheadline, description, specs; section headline → `"Strategic Vemagal Corridors"`.
- **`ProjectComparison.tsx`** — Micro-Market Location row → verified values; the two travel-time Connectivity rows **and** the `"Connectivity"` category were deleted (unverifiable claims). `CATEGORIES` is now `["All","Overview","Approvals","Infrastructure","Lifestyle"]`.
- **`About.tsx`** timeline, **`index.html`** JSON-LD descriptions/`addressLocality` (Rose's en dash → hyphen), **`Home.tsx`** location-card line now falls back to `{p.tagline}` instead of `locationAdvantages[0]/[1]`.
- **`ProjectDetail.tsx`** location block: eyebrow → "Location", headline → `{project.location}` (ScrollText), `<address>` block removed, advantages list conditional on `length > 0`.
- Verified with `tsc` + `build` + a Playwright pass over Home, all 3 project pages, `/projects`, `/about`, `/gallery`: correct location per project, zero `undefined`/stale tokens, zero console errors.

### Session: PRD content pass (names, CTAs, audit report)

- Renamed `VS Rosemeadows` → **VS Rose Meadows** and `VS Yogitha` → **VS Yogitha Garden** across `site.ts`, `Coverflow3DProjectShowcase.tsx`, `About.tsx`, `Gallery.tsx`, `index.html`.
- CTAs aligned to the PRD wording: Home → "Schedule a Site Visit", Navbar → "Schedule a Visit" (desktop + mobile).
- Delivered a PRD-vs-site audit report; open gaps it flagged: PRD route/label set differs from the live HashRouter routes and nav labels; the PRD's domain (`vsdevelopersbengaluru.com`) is not shown anywhere on the site; PRD §7.5 success wording absent; `STATS`/`TESTIMONIALS`/badge claims unverified; `Bengaluru East` vs Vemagal regional wording mismatch (left intentionally — see §1).

### Session: site-wide scroll animations + hover text effects

Added motion/polish across the whole site per user request: card scroll animations, scroll-linked text animation on every page **except Home**, and hover text effects on cards.

- **`src/index.css`** — added the `.hover-card` family of utilities (see §3 "Card + hover-text utilities") and `.scroll-word`. All disabled under `prefers-reduced-motion`.
- **`src/components/ui.tsx`** — extended `Reveal` with optional `x`, `rotate`, `scale`, `blur`; added `ScrollText` + internal `ScrollWord`; `SectionHeading` gained `textEffect?: "reveal" | "scroll"`.
- **Non-Home pages** — page-hero subtitles and section headings/paragraphs use `ScrollText` / `textEffect="scroll"`; card grids got `hover-card` + hover-text utilities.
- **Home carousels + Navbar mega-menu** — card-title hover colour only; **no CSS hover transforms** on these because Framer Motion owns their `transform`.
- Verified with `tsc`, `build`, and a Playwright smoke test across all 7 routes (no console/page errors beyond pre-existing THREE deprecation warnings).

### Session: full audit + first round of fixes

Ran a full codebase review, then fixed the following. `npx tsc --noEmit` was failing with **11 errors** before; it is now **clean**, and `npm run build` succeeds.

#### TypeScript / build errors fixed (all unused-variable errors)
| File | Fix |
|---|---|
| `src/data/site.ts` | Deleted unused private `px()` Pexels helper |
| `src/data/site.ts` | Commented out unused `isEdge` computation in `makeLayout` |
| `src/components/HotstarProjectSpotlight.tsx` | Removed unused `useEffect` import |
| `src/components/Coverflow3DProjectShowcase.tsx` | Commented out unused `isPrev` / `isNext` |
| `src/components/three/PlotViewer.tsx` | Commented out unused `FILTERS` array; changed `const [filter, setFilter]` → `const [filter]` |
| `src/pages/Gallery.tsx` | Commented out unused `EXTRA` array + its `px` helper |
| `src/pages/Home.tsx` | Removed unused `GoldRule`, `TiltCard`, `useIsDesktop` imports |

#### Content / data-correctness fixes
- **`index.html` JSON-LD** — fixed listings that contradicted `site.ts` (Heritage was "Old Madras Road, 5 acres, 87 plots"; Yogitha was "Seegehalli, Whitefield, 3 acres, 54 plots"). *Both were later superseded by the verified-locations pass — see §1 for the values that are now authoritative.*
- **`src/components/ProjectComparison.tsx`** — corrected mismatched/swapped locations, reworded the metro row, corrected airport/IT-hub timings, added the missing `"Infrastructure"` category. *Several of those rows were then deleted in the locations pass.*
- **`src/pages/About.tsx`** — timeline entry corrected from "flagship 5-acre layout on Old Madras Road" to the 12.5-acre flagship. *Later reworded again to Vemagal-Kurugal.*
- **`src/pages/Projects.tsx`** — `statusBadgeText` logic renamed `isEven` → `reverseLayout`. *(That badge was removed entirely in the latest session.)*

#### Functional / UX fixes
- **`src/pages/Contact.tsx`** — "Get directions" card now links to `CONTACT.mapUrl`; "Plan a visit" card links to a pre-filled WhatsApp message
- **`src/components/Coverflow3DProjectShowcase.tsx`** — arrow-key handler calls `e.preventDefault()` so arrow keys don't also scroll the page
- **`src/components/three/PlotViewer.tsx`** — selected-plot card now uses `STATUS_LABEL[selected.status]` instead of hardcoded sold copy
- **`src/pages/ProjectDetail.tsx`** — 3D viewer subtitle claimed "Corner plots are shown in gold" but the generator never produces corner plots → reworded
- **`src/components/ui.tsx`** — `CountUp` supports one decimal place; fixes `areaAcres` 12.5/4.7/6.8 rendering as 13/5/7
- **`index.html`** — added missing `<meta property="og:image" content="/vs-logo-new.jpg" />`

---

## 5. Known issues / remaining work (NOT yet fixed)

These were identified during audits but **intentionally left alone** — either the user decided to leave them, or they're bigger design decisions:

1. **`ProjectComparison.tsx` is complete but never rendered.** Full desktop table + mobile tab UI, but no page imports it. Home has a "Compare all three" card linking to `/projects`, which does NOT render it. **Decided: leave as-is.** Its data was corrected in the locations pass (§4). If you wire it up, add `<ProjectComparison />` to `src/pages/Projects.tsx`.
2. **`Gallery.tsx` `EXTRA` array** — 8 stock Pexels photos that are NOT actual VS Developers properties. Commented out (user decision: leave, don't render). Mark them illustrative if ever shown.
3. **Repo root has tracked, unreferenced folders** `heritage/`, `rose/`, `yogitha/` with 45 raw `WhatsApp Image …` JPEGs (~15 MB). Unreferenced; usable copies live in `public/projects/{heritage,rose,yogitha}/`. **Decided: leave them.**
4. **No-op `.replace("w=1600&h=1000", …)` calls** in `Navbar.tsx` (2) and `ProjectDetail.tsx` (1) — leftovers from Pexels query-string URLs. Harmless dead code.
5. **`makeLayout` never produces non-sold plots.** `isEdge` is commented out and `PlotStatus` is hardcoded `"sold"`. Intentional for the "delivered" story, but it means the PlotViewer's status-aware copy is unreachable for other statuses. To support a future live launch: uncomment `isEdge` and assign `corner` / `available` / `reserved` inside the loop.
6. **`STATS` marketing numbers don't match the 3 visible projects.** Site claims 110+ acres / 1800+ plots; the three featured projects sum to ~24 acres / 295 plots. Likely intentional (legacy projects not shown) — flagged, not changed.
7. **No 404 page** (`App.tsx` routes `path="*"` → Home). *(`robots.txt`, `sitemap.xml` and `llms.txt` now exist — see §4 SEO/GEO session.)*
7b. **HashRouter and SEO don't mix well.** Because routing is fragment-based (`/#/about`), every page is served the same `index.html` and crawlers generally canonicalise `#/about` back to `/`. The per-route `usePageMeta` + sitemap entries above are the best available mitigation, but the real fix is migrating to `BrowserRouter` (real paths) plus prerendering or SSG — a build/architecture change, deliberately not done. Confirm the host rewrites unknown paths to `/index.html` before attempting it.
8. **Absolute asset paths** (`/projects/...`, `/hero-video.mp4`) mean the site must be served from the domain root. Set Vite `base` if deploying to a subdirectory.
9. **`vite-plugin-singlefile` does NOT inline `public/` assets.** Deploy `dist/` whole, or all media breaks.
10. **Hero video autoplay** relies on `muted` + a `keepPlaying` retry handler; some browsers may still block — `HERO_POSTER` covers it.
11. **Root `logo.jpeg`** is tracked but unused (the site uses `/vs-logo-new.jpg` and SVG logos from `public/`).
12. **`locationAdvantages` is empty for all three projects**, so the ProjectDetail "Location" advantages list renders nothing (it's guarded). Populate only with user-verified advantages.
13. **Browser-pass debt.** The last three sessions (sold-pill removal, animation sweeps, sticky-stack sizing, SEO/GEO) were verified with `tsc` + `build` + dist greps only — **no browser pass** (the user asked not to start a preview). Visually confirm when convenient: the `Perspective3DStackCards` pin/transition on `/`, card entrances across pages, the hero video still autoplaying, and that per-route `<title>`/canonical update as you navigate.

---

## 6. Verification checklist (run after any change)

```bash
npx tsc --noEmit     # must be clean — catches unused vars, type errors
npm run build        # must succeed — verifies the singlefile bundle
```

For content changes, also grep the built bundle for stale strings before reporting done:

```powershell
$d = Get-Content dist\index.html -Raw
[regex]::Matches($d, "Sold Out").Count      # must be 0
Select-String -Path dist\index.html -Pattern 'rel="canonical"|og:url|application/ld\+json'   # SEO tags present
Test-Path dist\robots.txt, dist\sitemap.xml, dist\llms.txt   # crawler files copied from public/
```

For visual/behavioral changes run `npm run dev` (or `npm run preview`) and check the affected route. The most fragile pieces are the three Home carousels (`HotstarProjectSpotlight`, `Coverflow3DProjectShowcase`, `Perspective3DStackCards`) — they use `useScroll`/`useTransform` with hard-coded `vh` windows and are easy to break. Remember `wait_until="domcontentloaded"` in Playwright: `networkidle` never settles on these animated pages.

---

## 7. Conventions for future agents

- **Never hardcode project facts in a component.** Add/change them in `src/data/site.ts` so JSON-LD, the comparison table, and all pages stay in sync.
- **The production domain lives in `SITE.url` (`src/data/site.ts`) plus four static copies** (`index.html`, `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`). Never invent a domain and never add a second hardcoded origin in a component — import `SITE`.
- **Every page must call `usePageMeta(title, description)`** with a unique title and a ≤160-char description. When you add a route, add it to `public/sitemap.xml` too, and keep the project facts in `llms.txt` in sync with `site.ts`.
- **If you change project data, grep for the old value** in `index.html` (JSON-LD) and `src/components/ProjectComparison.tsx` — both duplicate facts and have gone stale before.
- **Do not reintroduce sold-out / inventory messaging.** No status pills, no `status` field, no "Selling / Completed / Sold Out" copy. If a future launch needs live inventory, that's a product decision — raise it first.
- **Never rename a project slug.** Display names may change; `vs-rosemeadows` and `vs-yogitha` stay.
- **Keep `Bengaluru East` (company/market) and the Vemagal project locations distinct.** They are both correct; don't reconcile them.
- **Always run `npx tsc --noEmit`**, not just `npm run build`.
- **Prefer commenting out unused code over deleting** when it represents unimplemented intent (e.g. the corner-plot logic).
- **Animation:** reuse `EASE` from `ui.tsx`, respect `prefers-reduced-motion`, and use `StaggerGroup`/`StaggerItem` for card-grid entrances instead of hand-rolling per-card `whileInView`.
- **Text on scroll:** use `ScrollText` (or `SectionHeading textEffect="scroll"`) on every page **except Home**. Home deliberately keeps `TextReveal` only. Never strip the `whitespace-nowrap` word wrapper from `TextReveal`'s character mode.
- **Card hovers:** give cards `hover-card` + `hover-title` (+ `hover-icon`/`hover-desc`/`hover-arrow`/`hover-reveal` as needed), or a Tailwind `hover:-translate-y-*` where Framer Motion isn't animating `transform`. Never put `hover-card` on a Framer Motion element that owns its `transform`.
- **Sticky sections:** never put `overflow-hidden` (or any `overflow` other than `visible`) on an ancestor of a `position: sticky` element — it silently kills the stick. For a progress-pinned stack, measure `useScroll` against the tall track element itself, not the outer section, and make the sticky box height match the pin range (`h-screen` + `top-0`).
- **The "JioHotstar/Hotstar" component names** (`HotstarProjectSpotlight`) are just leftover names for a premium carousel UI. They are not related to the actual JioHotstar product.
