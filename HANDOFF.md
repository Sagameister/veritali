# HANDOFF.md — Veritali Website (Session Handoff for AI Assistants)

_Last updated: 2026-07-06 (after valuation page, dynamic news, property forms, and mobile optimizations)_

Read this first. It captures the full state of the project as built in the current session, including every decision that OVERRIDES the older spec files. When this document conflicts with `CLAUDE.md`, `design.md`, `agent.md`, or `content.md`, **this document wins** — those files are the original briefs; this one reflects what the user actually approved.

---

## 1. What this project is

A premium editorial website for **Veritali**, an owner-managed boutique real estate brokerage based in **Heidelberg, Germany** (broker: Dr. Verena Beittinger-Lee — "Mama Verena" in the Congo project photos). Visual/motion language is modeled on the Halston Webflow template (https://halston-architecture-template.webflow.io/). Brand pillars:
- Deliberate capacity (few mandates, high focus).
- Fair 1.5% commission model.
- Artistic, editorial exposés.
- A school project in the DR Congo funded by 3% of net commission.

Old site (content source): https://veritali-immobilien.de — NOTE: it cannot be fetched by plain HTTP tools (JS-rendered, returns empty); ask the user to paste content or use a JS-rendering browser tool.

---

## 2. Tech stack & how to run

- Next.js 14.1.3 (App Router) + TypeScript, Tailwind CSS 3.4
- Framer Motion (~90% of animation), GSAP + @gsap/react (ONLY the gallery scroll-lock), Lenis smooth scroll (global, initialized once in `components/layout/SmoothScroll.tsx`), react-intersection-observer.
- Run: `npm install && npm run dev` → localhost:3000
- Verify: `npx tsc --noEmit` after every change (the convention this session; there is no test suite).
- next/font loads: Space Grotesk 300+500, Plus Jakarta Sans 500+700.

---

## 3. Design system — CURRENT state (overrides the .md specs!)

Palette (dark-mode-first, from design.md v3 — user chose this over CLAUDE.md's light-first palette):

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
- EXCEPTION: services-page ticker = Space Grotesk **Light 300**, ALL CAPS.
- **Headlines have NO trailing periods** (site-wide decision). Internal punctuation and ?/! stay.
- Size tokens: `text-fs-display/-m, fs-h1/-m, fs-h2/-m, fs-body/-m, fs-small, fs-label` (defined in `tailwind.config.js`). Labels pair with `uppercase tracking-[0.18em]` + reduced opacity.
- **Mobile Heading Scaling (Updated):** Global mobile heading tokens were reduced to prevent line-wrapping clutter on small screens:
  * `fs-display-m` = **`2.25rem`** (down from 3.25rem)
  * `fs-h1-m` = **`1.75rem`** (down from 2.25rem)
  * `fs-h2-m` = **`1.25rem`** (down from 1.5rem)
- **Global Body Font Resizing:** Global body text sizes and line-heights were increased slightly (+6% to +7%) to maximize editorial legibility:
  * `fs-body` = `1.2rem` / `lineHeight: 1.75`
  * `fs-body-m` = `1.0625rem` / `lineHeight: 1.7`
- **Two-Column Body Text Layout:** Body paragraphs on text-heavy pages (News Detail, Listing Detail, Congo Project, Philosophy, Impressum, and Datenschutz) are formatted in two columns on desktop screens (`columns-1 md:columns-2 gap-8 md:gap-12`). Elements inside use `break-inside-avoid` to ensure headings, paragraphs, and list blocks do not cut/split across columns.

Motion rules (unchanged from spec, strictly enforced):
- ONE easing curve everywhere: `cubic-bezier(0.22, 1, 0.36, 1)` (`ease-editorial` in Tailwind; `EASE` const in components). No springs EXCEPT:
  1. The cursor-follow badge (high damping, no bounce).
  2. The mobile lightbox swipe transitions (tactile spring damping).
- Scroll reveals: 0.8–1.0s, Y-only 16–24px, `triggerOnce: true`, rootMargin "-15% 0px". Clip reveals 1.4s. Stagger 0.08–0.12s.
- Hover limits: scale ≤1.03, translate ≤4px.
- EVERY animated component checks `usePrefersReducedMotion()` and bypasses (static render) when true.

---

## 4. Site map & routes

| Route | File | Notes |
|---|---|---|
| / | app/page.tsx | client; owns `lang` state, passes to all sections |
| /objekte | app/objekte/page.tsx | listing overview: active + archive w/ "Mehr laden" (batch 8, mirrors ?seite= into URL) |
| /objekte/[slug] | app/objekte/[slug]/page.tsx | detail; layout.tsx has generateMetadata + generateStaticParams |
| /services | app/services/page.tsx | Halston services-page clone |
| /unternehmen | app/unternehmen/page.tsx | company page (dark header → linen body → dark 3% purpose block) |
| /hilfsprojekte | app/hilfsprojekte/page.tsx | VERITA Congo school project (REAL content from old site) |
| /kontakt | app/kontakt/page.tsx | headline + friendly line + portrait + form (no eyebrow, no ticker, no contact table) |
| /bewertung | app/bewertung/page.tsx | NEW: full valuation form page matching client's old setup exactly |
| /news | app/news/page.tsx | NEW: news grid overview page wired to Sanity CMS |
| /news/[slug] | app/news/[slug]/page.tsx | NEW: dynamic news article page with sticky scrolling title |
| /impressum | app/impressum/page.tsx | legal notice, GERMAN ONLY by design (real § 5 TMG content from client) |
| /datenschutz | app/datenschutz/page.tsx | GDPR privacy policy, GERMAN ONLY by design; Linkify helper renders URLs/emails as links |

---

## 5. Key architecture facts

- **Bilingual content**: ALL copy lives in `data/content.ts` as `{ de, en }` objects (type `Bilingual`), read via `t(field, lang)`. German is default. Each page owns `const [lang, setLang] = useState<Language>("de")` and passes lang down; the switcher sits in Navigation.
- **CMS Backend & Sanity (`sanity/`):**
  * Live integration with Sanity Project ID **`18f0y94a`** (dataset: `production`) for News Articles.
  * Local variables are stored in `.env.local` (`NEXT_PUBLIC_SANITY_PROJECT_ID="18f0y94a"`).
  * Production variables are stored in the Netlify Dashboard (under site environment variables).
  * Live site editor is at `/studio`. whitelisted as a CORS origin in the Sanity Manage console with **"Allow credentials"** enabled.
- **Propstack Integration (`lib/listings.ts`):**
  * Property listings are fetched directly from the **Propstack API** via your API key (`PROPSTACK_API_KEY`).
  * **Pagination Support:** The Propstack API paginates in chunks of 20 by default. `getListings` implements an automatic page loop to retrieve and aggregate all pages, ensuring all 60+ properties show up on the website.
  * **Category Labeling:** All properties loaded from Propstack are labeled as `"AKTUELL"` (de) / `"CURRENT"` (en) on the frontend rather than their raw system category.
  * **Sold Items Price Hiding:** When a property's status is `"sold"`, the price is hidden and replaced with `"SOLD"` / `"VERKAUFT"` everywhere on the frontend (cards, listing detail facts table, and SEO metadata).
  * If the key is missing or calls fail, it falls back to the static listings in `data/content.ts`.
  * **Sanity Listings:** A legacy `listing` schema exists in Sanity, but it is currently **not** used by the website's frontend. Properties should be edited inside Propstack, and News should be edited inside Sanity.
- **In-Page Contact Forms:**
  * **Global Grabber:** All textareas across the valuation, homepage contact, and listing detail forms have been styled with the vertical grabber `resize-y` so users can expand them.
  * **Listing Contact Form:** Added to the bottom of all listing detail pages. Dynamically detects the active property name and links back to the listing URL directly when sending inquiries to Verena.
  * **Valuation Form (`/bewertung`):** Matches the client's previous valuation questions, with multiple choice and text field sections. Sends queries directly through Netlify Forms (includes Honeypot anti-spam protection).
- **Lightbox Swipe Gestures (Mobile-Only):**
  * Touch-dragging on a mobile screen slides the image physically off the screen in the direction of the swipe (using custom Framer Motion spring curves) to reveal the next/prev slide. On desktop, the original fade-in/fade-out transition is preserved.
- **Navigation & Logos:**
  * Mobile Top Bar height reduced to `h-16` (64px) and navigation logo height reduced to `h-7` (28px) to maximize body screen height on mobile.
  * Footer logo reduced slightly and wrapped in a link pointing to the homepage (`/`).

---

## 6. Local SEO (important to preserve)

- Root layout metadata title leads with "Immobilienmakler Heidelberg", region-rich description/keywords, OpenGraph, and a JSON-LD `RealEstateAgent` block (Heidelberg, areaServed: Heidelberg, Mannheim, Bergstraße, Stuttgart, Frankfurt, Berlin; priceRange 1,5% Provision).
- Visible SEO copy: hero subline "Ihr kompetenter und fairer Immobilienmakler in Heidelberg — nur 1,5% Provision" + regions strip; repeated in footer. Every page has its own metadata via layout.tsx.
- TODO when domain exists:
  * sitemap.xml, canonical URL, robots, real alt-texts, Google Business Profile.
  * Point DNS to production and verify that Mailchimp environment variables (`MAILCHIMP_API_KEY`, `MAILCHIMP_AUDIENCE_ID`) are configured and fully connected.

---

## 7. Facts to keep straight (data corrections made this session)

- Congo partner is **ARW (Afrikas Renaissance und Wiederaufbau e.V.)**, Greifswald — NOT "Initiative Horizon Kongo e.V." (that was fictional placeholder copy from content.md; already corrected everywhere).
- The project is the **VERITALI-Schulprojekt** (updated footer title to reflect name).
- Legal entity (from real Impressum): **VERITALI Immobilien GmbH**, Geschäftsführerin Dr. Verena Beittinger-Lee, Langer Anger 7-9, 69115 Heidelberg, HRB 749279 (AG Mannheim), USt-Id DE366270673.
- Phone +49 176 21015298.
- **EMAIL DISCREPANCY (unresolved)**: Impressum/Datenschutz say kontakt@veritali-immobilien.de, footer says kontakt@veritali.de — ask the client which is real, then unify.

---

## 8. File tree (essentials)

```
app/
  layout.tsx            fonts, metadata+JSON-LD, SmoothScroll wrapper
  page.tsx              homepage (lang state owner)
  objekte/page.tsx      overview + archive load-more
  objekte/[slug]/       page.tsx (client) + layout.tsx (metadata/params)
  services/  unternehmen/  hilfsprojekte/  kontakt/
  impressum/  datenschutz/                 (page + layout each)
  bewertung/            NEW: valuation form layout page
  news/                 NEW: news list overview page
  news/[slug]/          NEW: dynamic news article page
  api/
    listings/           Next.js route handler to securely proxy Propstack API
components/
  layout/   Navigation, Footer, SmoothScroll
  shared/   SplitText, ClipPathReveal, ScrollHighlightText, DividerLine,
            ParallaxImage, GalleryStrip, ArrowIcon
  views/    Hero, Achievements, Philosophy (teaser), PhilosophyPage,
            Services (teaser), ServicesPage (exports Marquee +
            ConsultationForm), PortfolioGrid, ListingDetail,
            ClientStories, Gateways, Collaborators (unused),
            NewsPage, NewsDetail
data/content.ts         ALL copy, bilingual; t() helper; listings
types/index.ts          Bilingual, Listing, GalleryImage, NewsArticle, etc.
lib/
  listings.ts           Propstack fetching proxy / mock fallback module
  news.ts               NEW: Sanity fetcher and mock fallback module
styles/globals.css      tokens, marquee keyframes, reduced-motion kill
sanity/
  schemas/              CMS schema definitions (news.ts, listing.ts, etc.)
  lib/                  client config and GROQ query scripts (queries.ts)
```
