# CLAUDE.md — System Instructions & AI Developer Playbook

This instruction file acts as the absolute visual, technical, and architectural authority for AI coding assistants (such as Claude, Cursor, v0, or Copilot) building this project. It enforces the visual and motion standards of premium architectural templates (such as the *Halston* editorial style) and custom luxury builders (such as *Haven Constructions*) onto a modern, high-performance web architecture.

Keep this file in the root directory of your repository. 

---

## 1. Technical Stack & Architecture Standards

AI agents must strictly adhere to this technical stack and repository structure. Do **not** install or configure alternative libraries.

*   **Framework:** Next.js (App Router with TypeScript)
*   **Styling:** Tailwind CSS (utility-first, using the design tokens below)
*   **Core Motion:** Framer Motion (90% of scroll triggers, staggered lists, hover effects, clip-paths)
*   **Timeline Engine:** GSAP (GreenSock) + `@gsap/react` (strictly for scrubbed horizontal-scroll client chapter views)
*   **Smooth Scroll:** Lenis (globally wrapped via a React provider in `app/layout.tsx` — never re-initialize per component)

### Directory Tree
```
/
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx       # Translucent nav, handles backdrop blur on scroll
│   │   ├── Footer.tsx           # Multi-column editorial layout
│   │   └── SmoothScroll.tsx     # Global Lenis scroll wrapper
│   ├── shared/
│   │   ├── SplitText.tsx        # Word-by-word overflow-masked text reveals
│   │   ├── ClipPathReveal.tsx   # Cinematic clip-path image reveals
│   │   └── DividerLine.tsx      # Animated grid line transitions
│   └── views/
│       ├── Hero.tsx             # Typographic intro, parallax background
│       ├── Achievements.tsx     # Typographic achievements grid (Halston Style)
│       ├── PortfolioGrid.tsx    # Asymmetric, masonry grid for active listings
│       ├── ClientStories.tsx    # GSAP scroll-locked horizontal chapter narrative
│       └── Collaborators.tsx    # Partner logo and metadata grid
├── hooks/
│   └── usePrefersReducedMotion.ts # Hook for strict accessibility checks
├── styles/
│   └── globals.css              # Custom scrollbars, font resets, Tailwind layer injections
└── app/
    ├── layout.tsx               # Layout wrapper with global smooth scroll
    └── page.tsx                 # Home landing experience combining components
```

---

## 2. Typographic Architecture ("Sans-on-Sans" Bauhaus)

We utilize an unhurried, structural sans-on-sans geometric system. Never use serif headings. All typography must feel engineered and architectural.

*   **Header Font:** `Space Grotesk` (Google Fonts) — A geometric, structural sans-serif with technical and architectural quirks.
    *   **Weight Standard:** Strictly **Regular (400 weight)**. Avoid bold weights to ensure a light, clean, and highly sophisticated layout.
*   **Body & Copy Font:** `Plus Jakarta Sans` (Google Fonts) — A modern, geometric sans-serif.
    *   **Weight Standard:** Strictly **Light (300 weight)**. This airy, lightweight structure provides an open, modern reading experience and lets property photography remain the focal point.
*   **Labels & Metadata:** `Plus Jakarta Sans` (Google Fonts).
    *   **Weight Standard:** Strictly **Regular (400 weight)**. Must pair with `tracking-[0.18em]` (wide tracking), uppercase transformation, and `opacity-60`.

### Tailwind Typographic Mapping
| Component | Font / Styling | Desktop Size / Line-Height | Mobile Size / Line-Height |
| :--- | :--- | :--- | :--- |
| **`fs-display`** | Space Grotesk (Regular 400), tracking-tight | `5.5rem` (88px) / `1.05` | `3.25rem` (52px) / `1.1` |
| **`fs-h1`** | Space Grotesk (Regular 400), tracking-tight | `3.5rem` (56px) / `1.1` | `2.25rem` (36px) / `1.15` |
| **`fs-h2`** | Space Grotesk (Regular 400), tracking-normal | `2.0rem` (32px) / `1.25` | `1.5rem` (24px) / `1.3` |
| **`fs-body`** | Plus Jakarta Sans (Light 300), sub-pixel rendering | `1.125rem` (18px) / `1.65` | `1.0rem` (16px) / `1.6` |
| **`fs-label`** | Plus Jakarta Sans (Regular 400), uppercase, `tracking-[0.18em]`, opacity-60 | `0.75rem` (12px) / `1.0` | `0.75rem` (12px) / `1.0` |

---

## 3. Heritage-Boutique Color Palette

We utilize a sophisticated, architectural translation of deep navy, sage green, brushed brass-gold, and burnt terracotta set against textured linen backdrops. Maintain strict contrast safety ratios (WCAG AAA compliant).

```
  [ Slate Midnight Navy ] #131B26 ──────────> Primary dark base / Hero backgrounds / Dark footers
  [ Sage Green ] #5A6F5C ───────────────────> Structural grid dividers / Subtle labels / Active indicators
  [ Brushed Brass Gold ] #D4C5B9 ───────────> Primary highlight / Performance metrics / UI gold-lines
  [ Burnt Terracotta ] #C86A4B ─────────────> Interactive hover states / Action controls / Active CTAs
  [ Warm Linen ] #FBFBFA ───────────────────> Canvas base (90% light surface area) / Soft reading panels
  [ Charcoal Slate ] #1E2229 ───────────────> Primary body text (warm, high-contrast, non-harsh)
  [ Surface Warm Linen ] #F1EFEA ───────────> Elevated cards / Horizontal panels / Divider lines
```

### Global CSS Token Declaration (`styles/globals.css`)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-bg: 251, 251, 250;       /* #FBFBFA (Warm Linen) */
    --color-text: 30, 34, 41;         /* #1E2229 (Charcoal Slate) */
    --color-accent-gold: 212, 197, 185; /* #D4C5B9 (Brushed Brass Gold) */
    --color-accent-clay: 200, 106, 75;  /* #C86A4B (Burnt Terracotta) */
    --color-accent-sage: 90, 111, 92;   /* #5A6F5C (Sage Green) */
    --color-primary: 19, 27, 38;      /* #131B26 (Slate Midnight Navy) */
    --color-surface: 241, 239, 234;   /* #F1EFEA (Surface Warm Linen) */
  }

  body {
    background-color: rgb(var(--color-bg));
    color: rgb(var(--color-text));
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6, .font-display {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 400; /* Strict regular weight */
    letter-spacing: -0.02em;
  }
}
```

---

## 4. Animation Language & Motion DNA

All animations must feel **unhurried, confident, and quiet** (a page that *breathes* rather than *performs*). 

### Easing & Physics Constants
*   **The Curve:** **`cubic-bezier(0.22, 1, 0.36, 1)`** (Soft Deceleration). No spring or bounce behaviors are allowed.
*   **Scroll Reveals:** Duration `0.8s` to `1.0s`, translating Y-axis only. Limit travel to `16px – 24px` to keep reveals elegant.
*   **Cinematic Reveals:** Duration `1.2s` to `1.4s` (used strictly for layout image clip-paths or full panel expansion).
*   **UI Details:** Duration `0.6s` to `0.9s`. Opacity only with zero translation.
*   **Stagger Gap:** `0.08s` to `0.12s` per item to create a delicate wave cascade.
*   **Viewport Margin:** Set trigger margins to `"-15%"` or `"-20%"`.

### Anti-Patterns to Avoid
1.  **Never animate elements more than once:** Use `once: true` on all scroll indicators to keep the reading layout physically stable.
2.  **No horizontal movement on scroll:** Elements must only move vertically. Sideways drifts look gimmicky and disrupt column boundaries.
3.  **No harsh opacity jumps:** All reveals must pair with smooth opacity ramps.
4.  **No scroll-jacking:** Do not interfere with native trackpad or wheel movement, except inside the locked horizontal-scrolling client narratives wrapper.

---

## 5. UI Code Snippets & Blueprints

### A. Word-by-Word Split-Text Reveal (`components/shared/SplitText.tsx`)
```tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SplitTextProps {
  text: string;
  className?: string;
  staggerDelay?: number;
}

export default function SplitText({ text, className = "", staggerDelay = 0.08 }: SplitTextProps) {
  const words = text.split(" ");
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-15% 0px" });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: staggerDelay } }
  };

  const wordVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block flex-wrap overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden mr-[0.25em] py-[0.1em] -my-[0.1em]">
          <motion.span variants={wordVariants} className="inline-block origin-bottom font-normal">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
```

### B. Cinematic Image Clip-Path Reveal (`components/shared/ClipPathReveal.tsx`)
```tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ClipPathProps {
  src: string;
  alt: string;
  aspectRatioClassName?: string;
}

export default function ClipPathReveal({ src, alt, aspectRatioClassName = "aspect-[3/4]" }: ClipPathProps) {
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-20% 0px" });

  const clipVariants = {
    hidden: {
      clipPath: "inset(20% 20% 20% 20% round 4px)",
      scale: 1.1,
      opacity: 0
    },
    visible: {
      clipPath: "inset(0% 0% 0% 0% round 0px)",
      scale: 1,
      opacity: 1,
      transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div ref={ref} className="overflow-hidden w-full bg-brand-surface">
      <motion.div
        variants={clipVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className={`w-full h-full relative ${aspectRatioClassName}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full h-full object-cover pointer-events-none select-none" />
      </motion.div>
    </div>
  );
}
```

### C. Horizontal Scroll Client Story Canvas (`components/views/ClientStories.tsx`)
```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface Chapter {
  label: string;
  title: string;
  body: string;
  image?: string;
}

interface StoryData {
  clientName: string;
  projectMeta: string;
  chapters: Chapter[];
}

export default function ClientStories({ storyData }: { storyData: StoryData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !scrollRef.current) return;

    const totalScrollWidth = scrollRef.current.scrollWidth;
    const windowWidth = window.innerWidth;

    gsap.to(scrollRef.current, {
      x: () => -(totalScrollWidth - windowWidth),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${totalScrollWidth - windowWidth}`,
        invalidateOnRefresh: true,
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-brand-primary select-none text-white">
      <div className="absolute top-12 left-12 z-20">
        <p className="text-xs font-sans tracking-widest uppercase text-[#5A6F5C]">Client Story & Journey</p>
        <h2 className="text-2xl font-display mt-2 font-normal text-white">
          {storyData.clientName} &mdash; <span className="text-[#D4C5B9] italic font-normal">{storyData.projectMeta}</span>
        </h2>
      </div>

      <div ref={scrollRef} className="flex h-full w-max items-center pl-12 pr-48">
        {storyData.chapters.map((chapter, idx) => (
          <div
            key={idx}
            className="w-[75vw] md:w-[45vw] h-[65vh] flex flex-col justify-between p-12 mr-16 bg-[#FBFBFA] text-[#1E2229] border border-black/5 flex-shrink-0"
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-sans tracking-widest text-[#5A6F5C] uppercase">{chapter.label}</span>
              <span className="text-xs font-mono text-brand-muted">0{idx + 1} / 0{storyData.chapters.length}</span>
            </div>

            <div className="max-w-md my-auto">
              <h3 className="text-xl md:text-2xl font-display text-brand-text mb-4 font-normal">{chapter.title}</h3>
              <p className="text-sm md:text-base text-brand-muted leading-relaxed font-sans">{chapter.body}</p>
            </div>
            
            {chapter.image && (
              <div className="w-full h-1/3 overflow-hidden mt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={chapter.image} alt={chapter.title} className="w-full h-full object-cover object-center" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 6. Strict Developer Rules for AI Assistants

When answering user queries, creating components, or proposing refactors, the AI must follow these strict guidelines:

*   **Rule 1: Weight Preservation.** Ensure Space Grotesk headings always resolve with the CSS classes `font-normal` or Tailwind `font-normal` (weight 400). Never inject `font-bold` or `font-semibold` on titles.
*   **Rule 2: Color Compliance.** All text rendering must use custom hex tokens: `#1E2229` for dark text and `#FBFBFA` for light text. Never use pure black `#000000` or raw tailwind `text-gray-900`. 
*   **Rule 3: Frame Limits.** Every animation component must enforce accessibility checks. Intersecting scroll triggers must use the `usePrefersReducedMotion` check and immediately bypass transition hooks if active.
*   **Rule 4: Multi-Language Readiness.** All UI labels and hardcoded components must separate content layers into customizable objects (supporting bilingual mapping) to allow clean content hydration without changing functional code.
*   **Rule 5: No Interactive Bloat.** Hover animations must be subtle: restrict interactive triggers to image scaling (max 1.03), letter-spacing expansion, or small layout offset translates (max Y 4px). Avoid complex keyframes or rotational effects.
*   **Rule 6: Development Cache Hygiene & Style Verification.** Next.js compiled caches (`.next/`) must be entirely cleared (`rm -rf .next`) whenever files are relocated across workspaces, npm dependencies are modified (e.g., Sanity or styled-components packages), or webpack chunk loading errors occur (e.g., `MODULE_NOT_FOUND` or `Cannot find module './XXXX.js'`). In dev mode, if unstyled pages or chunk errors occur, stop the dev server, wipe the `.next/` directory, and restart compile via `npm run dev` to build a clean cache.
*   **Rule 7: Pre-flight Verification Checklist.** Before presenting changes or declaring a task complete: (1) stop any active `next dev` task before running `npm run build` to prevent cache conflict, (2) run `npx tsc --noEmit` to verify TypeScript compiler state, (3) verify all navigation and relative links map to active, existing routes (e.g. no dead `/philosophie` redirect links), and (4) verify style asset generation by checking the dev/build server output.
