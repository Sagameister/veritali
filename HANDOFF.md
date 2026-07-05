# HANDOFF.md — Veritali Website (Session Handoff for AI Assistants)

_Last updated: 2026-07-05 (after legal pages, footer offices, AGB removal)_

Read this first. It captures the full state of the project as built in the
current session, including every decision that OVERRIDES the older spec
files. When this document conflicts with `CLAUDE.md`, `design.md`,
`agent.md`, or `content.md`, **this document wins** — those files are the
original briefs; this one reflects what the user actually approved.

---

## 1. What this project is

A premium editorial website for **Veritali**, an owner-managed boutique
real estate brokerage based in **Heidelberg, Germany** (broker: Verena —
"Mama Verena" in the Congo project photos). Visual/motion language is
modeled on the Halston Webflow template
(https://halston-architecture-template.webflow.io/). Brand pillars:
deliberate capacity (few mandates), fair 1.5% commission, artistic
exposés, and a school project in the DR Congo funded by 3% of net
commission.

Old site (content source): https://veritali-immobilien.de — NOTE: it
cannot be fetched by plain HTTP tools (JS-rendered, returns empty); ask
the user to paste content or use a JS-rendering browser tool.

## 2. Tech stack & how to run

- Next.js 14.1.3 (App Router) + TypeScript, Tailwind CSS 3.4
- Framer Motion (~90% of animation), GSAP + @gsap/react (ONLY the
  gallery scroll-lock), Lenis smooth scroll (global, initialized once in
  `components/layout/SmoothScroll.tsx`), react-intersection-observer
- Run: `npm install && npm run dev` → localhost:3000
- Verify: `npx tsc --noEmit` after every change (the convention this
  session; there is no test suite)
- next/font loads: Space Grotesk 300+500, Plus Jakarta Sans 500+700

## 3. Design system — CURRENT state (overrides the .md specs!)

Palette (dark-mode-first, from design.md v3 — user chose this over
CLAUDE.md's light-first palette):

| Token | Hex | Use |
|---|---|---|
| brand-bg | #0B131E | page background (deep navy) |
| brand-text | #FBFBFA | text on dark (warm linen) |
| brand-green | #468E99 | sage accents, dividers, labels |
| brand-accent | #DDBE8B | brass gold: metrics, CTAs, highlights |
| brand-orange | #C27B62 | terracotta: hovers, active CTAs |
| brand-surface | #1E2229 | charcoal cards/panels |
| brand-lightbg | #FBFBFA | light contrast panels (Philosophy) |
| brand-muted | #A9B2BC | secondary copy on dark |

Typography — **the user changed the weights from the spec. Current law:**
- Headlines/display: Space Grotesk **Medium 500** (`font-display font-medium`)
- ALL Jakarta text: **Medium 500** (`font-sans font-medium`)
- EXCEPTION: top-bar nav links + language switcher = **Bold 700**
- EXCEPTION: services-page ticker = Space Grotesk **Light 300**, ALL CAPS
- **Headlines have NO trailing periods** (site-wide decision). Internal
  punctuation and ?/! stay.
- Size tokens: `text-fs-display/-m, fs-h1/-m, fs-h2/-m, fs-body/-m,
  fs-small, fs-label` (defined in tailwind.config.js). Labels pair with
  `uppercase tracking-[0.18em]` + reduced opacity.

Motion rules (unchanged from spec, strictly enforced):
- ONE easing curve everywhere: `cubic-bezier(0.22, 1, 0.36, 1)`
  (`ease-editorial` in Tailwind; `EASE` const in components). No springs
  EXCEPT the cursor-follow badge (high damping, no bounce).
- Scroll reveals: 0.8–1.0s, Y-only 16–24px, `triggerOnce: true`,
  rootMargin "-15% 0px". Clip reveals 1.4s. Stagger 0.08–0.12s.
- Hover limits: scale ≤1.03, translate ≤4px.
- EVERY animated component checks `usePrefersReducedMotion()` and
  bypasses (static render) when true.
- Scroll-highlight text + gallery scroll-lock are the two sanctioned
  scroll-tied exceptions to "animate once".

## 4. Site map & routes

| Route | File | Notes |
|---|---|---|
| / | app/page.tsx | client; owns `lang` state, passes to all sections |
| /objekte | app/objekte/page.tsx | listing overview: active + archive w/ "Mehr laden" (batch 8, mirrors ?seite= into URL) |
| /objekte/[slug] | app/objekte/[slug]/page.tsx | detail; layout.tsx has generateMetadata + generateStaticParams |
| /services | app/services/page.tsx | Halston services-page clone |
| /philosophie | app/philosophie/page.tsx | manifesto page (dark header → linen body → dark 3% purpose block) |
| /hilfsprojekte | app/hilfsprojekte/page.tsx | VERITA Congo school project (REAL content from old site) |
| /kontakt | app/kontakt/page.tsx | headline + friendly line + portrait + form (no eyebrow, no ticker, no contact table) |
| /impressum | app/impressum/page.tsx | legal notice, GERMAN ONLY by design (real § 5 TMG content from client) |
| /datenschutz | app/datenschutz/page.tsx | GDPR privacy policy, GERMAN ONLY by design; Linkify helper renders URLs/emails as links |

Homepage section order: Hero → Achievements → Philosophy teaser (light
linen) → Services teaser (big-type index) → PortfolioGrid → ClientStories
(testimonial masonry) → Gateways (checkerboard CTA) → Footer.

Nav: Objekte /objekte · Leistungen /services · Philosophie /philosophie ·
Hilfsprojekte /hilfsprojekte · [gold CTA button "Gespräch vereinbaren" →
/kontakt, navy text on gold] · DE/EN switcher. Active page link =
text-brand-orange + aria-current. "Kontakt" and "Referenzen" nav links
were deliberately REMOVED. Collaborators section removed from homepage
(component file still exists, unused).

Footer: brand column shows the logo + tagline + TWO office addresses
(Büro Heidelberg: Langer Anger 7-9, 69115 Heidelberg · Büro Stuttgart:
Martin-Luther-Str. 25, 70825 Korntal — data in
`footerContent.offices`). Link columns are left-aligned. Rechtliches
column = Impressum + Datenschutz only (AGB entry was REMOVED — re-add
only if the client ever publishes real terms). Bottom bar links to
/hilfsprojekte ("3% → VERITA-Schulprojekt im Kongo").

## 5. Key architecture facts

- **Bilingual content**: ALL copy lives in `data/content.ts` as
  `{ de, en }` objects (type `Bilingual`), read via `t(field, lang)`.
  German is default. Each page owns `const [lang, setLang] =
  useState<Language>("de")` and passes lang down; the switcher sits in
  Navigation. Language resets on navigation (known limitation, user
  hasn't asked to persist it).
- **Listings** (`data/content.ts`, type in `types/index.ts`): slug,
  status ("available" | "reserved" | "sold"), category, title, location,
  year, parameters, price, summary, image, gallery
  (`{src, label:{de,en}}[]` — room labels, CMS-shaped), size
  ("large"|"small" → 7/5 asymmetric grid), detail {lead, sections
  [{title, body, bullets?}], quote?}. Currently 4 placeholder listings;
  Heidelberg loft is "reserved", rest "available".
- **Shared components** (components/shared/): SplitText (word-by-word
  rise), ClipPathReveal (shutter-open images, lazy loading),
  ScrollHighlightText (words brighten 0.15→1 opacity tied to scroll —
  used on object statements, services statement, philosophie manifesto,
  hilfsprojekte mission), DividerLine (self-drawing hairline),
  ParallaxImage (full-width band, ±12% Y drift — hilfsprojekte),
  GalleryStrip (GSAP pinned horizontal gallery + cursor "SCROLL" badge +
  swipeable lightbox with zoom-crossfade + room-label badges; mobile =
  vertical stack; thumbnails blur() on mouse click but keep focus-visible
  brass ring for keyboard = WCAG 2.4.7 compliant).
- **PortfolioGrid** accepts `items` + `showHeading`; chunks any count
  into asymmetric rows; status pills: available = sage bg/linen text,
  reserved = brass bg/navy text, sold = charcoal bg/muted text.
- **Logo**: `/public/images/veritali-logo-white.svg` (all-white) in nav
  (h-9), footer (h-11), achievements header row (h-7). Colorful
  logo2.svg also in /public/images (unused).

## 6. Local SEO (important to preserve)

- Root layout metadata title leads with "Immobilienmakler Heidelberg",
  region-rich description/keywords, OpenGraph, and a JSON-LD
  `RealEstateAgent` block (Heidelberg, areaServed: Heidelberg, Mannheim,
  Bergstraße, Stuttgart, Frankfurt, Berlin; priceRange 1,5% Provision).
- Visible SEO copy: hero subline "Ihr kompetenter und fairer
  Immobilienmakler in Heidelberg — nur 1,5% Provision" + regions strip;
  repeated in footer. Every page has its own metadata via layout.tsx.
- TODO when domain exists: sitemap.xml, canonical URL, robots, real
  alt-texts, Google Business Profile.

## 7. Facts to keep straight (data corrections made this session)

- Congo partner is **ARW (Afrikas Renaissance und Wiederaufbau e.V.)**,
  Greifswald — NOT "Initiative Horizon Kongo e.V." (that was fictional
  placeholder copy from content.md; already corrected everywhere).
- The project is the **VERITA-Schulprojekt** (started 2021, 20 children,
  90% girls, Mai-Ndombe/Twa via Passionist sisters + Kasai Central via
  CIM sisters, €235/child/6yrs, donation account in page). Full real
  copy is in app/hilfsprojekte/page.tsx (DE + EN translations).
- OPEN QUESTION flagged to user: homepage claims "3% der Nettoprovision"
  (from draft deck); the real Hilfsprojekte text names no percentage —
  confirm 3% with the client before launch.
- Legal entity (from real Impressum): **VERITALI Immobilien GmbH**,
  Geschäftsführerin Dr. Verena Beittinger-Lee, Langer Anger 7-9,
  69115 Heidelberg, HRB 749279 (AG Mannheim), USt-Id DE366270673.
- Phone +49 176 21015298.
- **EMAIL DISCREPANCY (unresolved)**: Impressum/Datenschutz say
  kontakt@veritali-immobilien.de, footer says kontakt@veritali.de —
  ask the client which is real, then unify.
- **Datenschutz text needs legal revision pre-launch**: it was pasted
  from the OLD site and describes tools (Google Analytics/Ads, Osano
  banner, Sendinblue, YouTube, Maps, netcup host) that the NEW site
  does not use. Flagged to user; do not silently "fix" the legal text.

## 8. Known pending / open items

1. **Hilfsprojekte photos**: user must drop 5 real photos into
   `public/images/hilfsprojekte/` named exactly: merci-mama-verena.jpg,
   neue-uniformen.jpg, klassenzimmer.jpg, kleinbauernhof.jpg,
   sekundarschule.jpg. Page is wired; bands show broken until then.
2. **All property photos are Unsplash placeholders** (URLs in
   data/content.ts). Room labels won't match placeholder photos.
3. **Forms don't send** — ConsultationForm (services + kontakt) does
   preventDefault + success message. Needs email wiring (Formspree or
   API route).
4. **Hero video**: commented-out `<video>` slot in Hero.tsx; drop file
   at public/media/hero-clip.mp4 and swap per comment.
5. **Portrait placeholders**: kontakt page + philosophie page each have
   a marked PORTRAIT_PLACEHOLDER const.
6. **Lightbox focus trap** not implemented (ESC/arrows work; strict
   WCAG modal audit would want a trap).
7. **gsap/@gsap/react deps**: still used (GalleryStrip). lucide-react &
   classnames are installed but unused.
8. User asked "what instead of STUDIO in the footer?" — question was
   never answered (no response requested at the time). Footer column
   headings currently: Studio / Purpose / Rechtliches / Kontakt.
9. Unused files kept deliberately: components/views/Collaborators.tsx,
   heroFeatured data, colorful logo2.svg.
10. **CMS backend: deliberately NOT built yet.** User plans a custom CMS
    (was thinking Express + SQLite + JWT). Advice given & accepted: wait
    for the hosting decision first. Vercel was recommended over
    Hostinger; Express+SQLite does NOT fit Vercel serverless — there use
    Next.js route handlers + a hosted DB instead. Data is already
    CMS-shaped (typed listings, gallery {src,label}, status field);
    an offered lib/listings.ts data-seam refactor + SQL schema was not
    yet confirmed by the user.
11. Language resets to German on page navigation (each page owns its own
    lang state). Known limitation; user hasn't asked to persist it.

## 9. Working conventions with this user

- Beginner-friendly: explain code simply, comment what code does.
- Concise replies; minimal formatting fluff.
- Iterates visually via `npm run dev` hot reload — after each change,
  tell them what to look at. Verify with `npx tsc --noEmit`.
- They ask for opinions before big changes ("What do you think?") —
  give an honest recommendation with trade-offs, then wait for "ok".
- They frequently reference Halston template sections and screenshots
  as design targets; replicate structure, keep the Veritali palette.
- German is the site's default language; every visible string must be
  bilingual {de, en}.
- Style guardrails they've set explicitly: brand colors only (no
  yellow/orange reads: gradients now teal→navy), Jakarta all-medium
  except bold topbar, headlines without trailing periods, mobile hero
  darkened (brightness-50 + heavy gradient below md).
- They care about vertical optical centering in CTA rows: big-type
  link rows (e.g. PhilosophyPage "Lassen Sie uns sprechen") use
  `items-center` + `leading-none` + a small `translate-y-[0.1em]` on
  the text to compensate for font descender space. Reuse this pattern.
- Arrows in CTA rows use shared/ArrowIcon.tsx (strokeWidth 2.25,
  w-8 md:w-10), terracotta, translate-x on hover.

## 10. File tree (essentials)

```
app/
  layout.tsx            fonts, metadata+JSON-LD, SmoothScroll wrapper
  page.tsx              homepage (lang state owner)
  objekte/page.tsx      overview + archive load-more
  objekte/[slug]/       page.tsx (client) + layout.tsx (metadata/params)
  services/  philosophie/  hilfsprojekte/  kontakt/
  impressum/  datenschutz/                 (page + layout each)
components/
  layout/   Navigation, Footer, SmoothScroll
  shared/   SplitText, ClipPathReveal, ScrollHighlightText, DividerLine,
            ParallaxImage, GalleryStrip, ArrowIcon
  views/    Hero, Achievements, Philosophy (teaser), PhilosophyPage,
            Services (teaser), ServicesPage (exports Marquee +
            ConsultationForm), PortfolioGrid, ListingDetail,
            ClientStories, Gateways, Collaborators (unused)
data/content.ts         ALL copy, bilingual; t() helper; listings
types/index.ts          Bilingual, Listing, GalleryImage, etc.
hooks/usePrefersReducedMotion.ts
styles/globals.css      tokens, marquee keyframes, reduced-motion kill
public/images/          veritali-logo-white.svg, hilfsprojekte/ (empty)
CLAUDE.md, design.md, agent.md, content.md   original briefs (superseded
                                             where this doc differs)
```

## 11. Pre-Launch Tasks & Checklist
- **Email Address Update:** The email is currently mocked to `kontakt@veritali.de` and encoded in base64 inside `components/layout/Footer.tsx`. Before launch, Verena's official email address must be generated, and the base64 string in `Footer.tsx` (the `atob("...")` parameter) + metadata in `app/layout.tsx` + `data/content.ts` must be updated to match the new mailbox.
- **Remove SEO block:** Remove `index: false, follow: false` from `app/layout.tsx` metadata and remove `Disallow: /` from `public/robots.txt`.
- **Set Mailchimp variables:** Ensure Netlify settings have correct `MAILCHIMP_API_KEY` (with correct suffix, e.g. `-usXX`) and `MAILCHIMP_AUDIENCE_ID` (`d04c3a9d74`).
