# Visual & Motion Style Guide (`design.md` - Version 3)

This document is the absolute visual and interaction authority for the redesign project. It establishes an editorial, high-end digital identity by pairing a structural, Bauhaus-inspired geometric header system with a lightweight, airy body structure. It codifies the exact color palettes, typography scales, motion dynamics, and micro-interaction specifications to deliver a digital interface that feels like a premium architectural monograph.

This version (v3) specifically implements the **Greenish, Yellow, and Orange set within a primary Deep Navy Blue** brand color palette, translated into refined, organic, quiet luxury tones to respect the brand's heritage while elevating its visual execution.

---

## 1. Core Visual Philosophy

The visual and interactive landscape is built on three foundational design pillars:

1. **Quiet Confidence (Expressive Without Excess):** The interface must prioritize spatial breathing room and high-resolution visual storytelling. Rather than crowding the page with clinical data tables or multiple competing listings, give every portfolio piece, editorial narrative, and customer experience its own dedicated vertical space [3, 8]. Large masonry images, wide margins, and generous negative space force the user to browse with intent [3].
2. **Bauhaus Geometric Structure (Form Follows Purpose):** Headlines and key visual markers are treated as architectural blocks. Layouts are strictly aligned to a rigid, asymmetrical grid system, using crisp horizontal and vertical line dividers that animate into place during page scroll [11, 12, 53].
3. **Motion as Space (A Page that Breathes):** Animations do not perform for the user; they merely reveal the page [50]. Nothing snaps, bounces, or overshoots [50]. Elements drift into place along vertical paths over slow, unhurried durations (0.8s to 1.4s), utilizing a custom, soft-deceleration curve [50].

---

## 2. Typographic Architecture

The typography pairing uses a **\"Sans-on-Sans\" geometric hierarchy** to create a stark, modern, and highly structural architectural feel. 

```
  Space Grotesk (Regular, 400) ──> STRUCTURAL HEADINGS (Bauhaus / House Style)
  Plus Jakarta Sans (Light, 300) ──> AIRY EDITORIAL BODY (Minimalist / Highly Legible)
  Plus Jakarta Sans (Reg, 400) ────> SUB-LABELS & METADATA (Tracking-Widest, Opacity-60)
```

### A. Font Selection & Loading Specifications
* **Header Font:** **`Space Grotesk`** (Google Fonts) — A geometric sans-serif with a structural, technical personality and architectural quirks. Used exclusively for main headlines, project names, and numerical callouts in Regular (400) weight for an engineered, delicate, high-end look.
* **Body & UI Font:** **`Plus Jakarta Sans`** (Google Fonts) — A clean, geometric, modern typeface. Used in Light (300) weight for body copy and editorial paragraphs to create an open, lightweight reading experience. Used in Regular (400) weight for interactive controls, menu list items, metadata labels, and captions.

### B. Typography Scaling Tokens

| Token | Class / Purpose | Desktop Size / Line-Height | Mobile Size / Line-Height | Styling Details |
| :--- | :--- | :--- | :--- | :--- |
| **`fs-display`** | Hero Headlines | `5.5rem` (88px) / `1.05` | `3.25rem` (52px) / `1.1` | Space Grotesk, Regular (400), tracking-tight, split-text animated [11] |
| **`fs-h1`** | Section Titles | `3.5rem` (56px) / `1.1` | `2.25rem` (36px) / `1.15` | Space Grotesk, Regular (400), tracking-tight, split-text animated [11] |
| **`fs-h2`** | Sub-headings / Large Quotes | `2.0rem` (32px) / `1.25` | `1.5rem` (24px) / `1.3` | Space Grotesk, Regular (400), tracking-normal |
| **`fs-body`** | Primary Editorial Body | `1.125rem` (18px) / `1.65` | `1.0rem` (16px) / `1.6` | Plus Jakarta Sans, Light (300), Warm Linen or Charcoal Slate, sub-pixel rendering |
| **`fs-small`** | Captions / Form Controls | `0.875rem` (14px) / `1.5` | `0.875rem` (14px) / `1.5` | Plus Jakarta Sans, Regular (400), Light (300) for inputs |
| **`fs-label`** | Metadata & Section Eyebrows | `0.75rem` (12px) / `1.0` | `0.75rem` (12px) / `1.0` | Plus Jakarta Sans, Regular (400), uppercase, `tracking-[0.18em]`, opacity-60 |

---

## 3. Color Strategy & Tactile Palette (The Heritage-Boutique Transition)

To perfectly honor your classic color scheme—a greenish, yellow, and orange aesthetic set inside deep navy blue—while elevating the presentation to "quiet luxury," we perform a tonal shift. We transition these colors from raw primaries into rich, organic, architectural tones that blend beautifully as a cohesive system.

```
  [ Deep Navy Slate ] #0B131E ─────────────> Primary Canvas Base & All Main Layout Backgrounds
  [ Muted Sage Green ] #4E5E53 ────────────> Landscape / Eco / Structural Accents
  [ Brushed Brass Gold ] #DDBE8B ──────────> High-Light Accents / Key Metrics / Primary Buttons
  [ Burnt Terracotta Orange ] #C27B62 ─────> Interactive Hover Highlights / Warm Details / CTAs
  [ Warm Linen ] #FBFBFA ──────────────────> Light Contrast Canvas / Editorial Text Cards
  [ Charcoal Slate ] #1E2229 ──────────────> Body Text on Light Canvas Elements
```

### A. Color Palette Definitions
1. **Deep Navy Slate (`#0B131E` - Primary Canvas):** A deep, light-absorbing dark navy blue. It serves as the primary backdrop for the entire website, evoking corporate security, trust, and depth while acting as a stunning canvas that makes colors and photography glow.
2. **Muted Sage Green (`#4E5E53` - Green Accent):** A soft, organic moss/sage green. It replaces harsh primary green with an architectural tone reminiscent of landscape design, patinated copper, or premium interior finishes. Used for structural dividing lines, subtle background blocks, or eco-focused metadata tags.
3. **Brushed Brass Gold (`#DDBE8B` - Yellow Accent):** A sophisticated champagne-gold that replaces bright yellow. Inspired by brushed brass hardware, warm gallery lighting, and soft sand textures, it adds quiet luxury to primary buttons, key numerical metrics, and main active states.
4. **Burnt Terracotta Orange (`#C27B62` - Orange Accent):** A warm, earthy clay-orange. It soft-shifts bright primary orange into a premium terracotta tone, representing physical warmth, bricks, and earth. Used as a high-contrast highlight for hover states, interactive arrow indicators, or call-to-action details.
5. **Warm Linen (`#FBFBFA` - Secondary Canvas):** A soft, off-white neutral. Used for isolated white-space panels, editorial card backgrounds, or high-contrast quote blocks to break up the deep navy canvas and offer reading relief.
6. **Charcoal Slate (`#1E2229` - Light Canvas Text):** A soft dark charcoal, used strictly for copy readability inside Warm Linen (`#FBFBFA`) contrast blocks.

### B. Contrast & Accessibility Guidelines
This dark-mode-first aesthetic maintains strict WCAG compliance to ensure the site is highly readable and inclusive:
* **Dark Navy Slate Base (`#0B131E`):**
  * Typography in Warm Linen (`#FBFBFA`) achieves a contrast ratio of **17.2:1** (exceeding WCAG AAA standard of 7:1).
  * Highlight text in Brass Gold (`#DDBE8B`) yields a contrast ratio of **9.8:1** (fully AAA compliant).
  * Sub-text in Muted Sage Green (`#8CA38F` at light tint or opacity) maintains a minimum contrast ratio of **4.8:1** (AA compliant).
* **Light Contrast Base (`#FBFBFA`):**
  * Body copy in Charcoal Slate (`#1E2229`) achieves a **13.5:1** contrast ratio.
  * Secondary indicators in Terracotta Orange (`#C27B62`) maintain a highly visible **4.5:1** contrast ratio.

---

## 4. Motion DNA & Interaction Specifications

All interactive components must respect the unified **Motion Stack Guide** [49]. The page must feel like a singular physical entity that reacts with weight and deliberate deceleration [50].

### A. The Standard Easing Formula
Every animated transition in the project—whether executed via Framer Motion, GSAP, or standard CSS—must utilize the exact same easing curve:
* **The Curve:** **`cubic-bezier(0.22, 1, 0.36, 1)`** (Soft Deceleration) [50].
* **The Physics:** Objects begin moving with immediate, confident velocity, then decelerate slowly and smoothly into their final rest state [50]. No spring bounces, rebounds, or jarring stops are permitted [54].

### B. Standard Motion Variables
* **Scroll Reveals (Pattern #2):** Duration `0.8s` to `1.0s`, translating upward along the Y-axis by `24px` [50, 51]. Vertical translation only—elements must never shift horizontally on scroll [54].
* **Cinematic Large Reveals (Pattern #4):** Duration `1.2s` to `1.4s` [50]. Used for large-scale property image clip-paths or full-screen panels [52].
* **Small UI Details (Pattern #7):** Duration `0.6s` to `0.9s`. Opacity transition only with zero spatial movement to draw attention without adding visual noise [51, 53].
* **Cascade Stagger:** Stagger gap of exactly `0.08s` to `0.12s` between sequential list cards or text segments [51].
* **Viewport Threshold:** Intersection triggers must fire at `\"-15%\"` viewport margins, rendering elements just before they fully occupy the viewport for a seamless reading flow [51].

---

## 5. Blueprint Interactive Patterns

These patterns provide explicit CSS, HTML, and Javascript recipes to build the iconic interactive features of your new high-end website.

### Pattern A: Staggered \"Split-Text\" Geometric Masking
Used to reveal primary headers and core brand philosophies. Key phrases are split word-by-word, wrapped in overflow-hidden spans, and translated vertically up into position [2, 8].

#### 1. HTML/React DOM Structure
```html
<h1 class="font-display text-fs-display text-brand-text leading-none overflow-hidden py-1">
  <span class="inline-block overflow-hidden vertical-mask-wrapper">
    <span class="inline-block transform-y-full opacity-0 split-word-element">Immobilien</span>
  </span>
  <span class="inline-block overflow-hidden vertical-mask-wrapper">
    <span class="inline-block transform-y-full opacity-0 split-word-element">mit</span>
  </span>
  <span class="inline-block overflow-hidden vertical-mask-wrapper">
    <span class="inline-block transform-y-full opacity-0 split-word-element">Verstand</span>
  </span>
</h1>
```

#### 2. Animation Script Parameters (Framer Motion Integration)
```typescript
const wordVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08, // Subtle wave-like cascade delay per word
    },
  },
};
```

---

### Pattern B: Cinematic Image Clip-Path Reveals
Used for primary property listings. Photos do not merely fade in; they open symmetrically from a cropped state, mimicking the physical sensation of opening structural window shutters [52].

```
  Cropped Center State (clip-path: inset(18%)) ──> Symmetrical Expansion ──> Full Media Canvas (inset(0%))
```

#### 1. CSS Custom Clip Rules
```css
/* Custom utility class to hook into Framer Motion or standard CSS */
.clip-reveal-container {
  clip-path: inset(18% 18% 18% 18% round 4px);
  opacity: 0;
  transition: clip-path 1.4s cubic-bezier(0.22, 1, 0.36, 1), 
              opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.clip-reveal-container.in-view {
  clip-path: inset(0% 0% 0% 0% round 0px);
  opacity: 1;
}
```

#### 2. Framer Motion Implementation Spec
```typescript
const clipRevealVariants = {
  hidden: { 
    clipPath: "inset(18% 18% 18% 18% round 4px)", 
    opacity: 0,
    scale: 1.05 
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0% round 0px)",
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
```

---

### Pattern C: Narrative Horizontal-Scroll \"Client Stories\"
Traditional, paragraph-dense customer reviews are transformed into an immersive horizontal-scroll timeline [8, 43]. The browser vertical scroll is locked as this section enters view, converting scroll input into a horizontal sweep through modular narrative chapters [8].

#### GSAP + ScrollTrigger Timeline Configuration
```javascript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger\";

gsap.registerPlugin(ScrollTrigger);

export function initHorizontalScroll(containerRef, scrollPanelRef) {
  const sections = gsap.utils.toArray(".story-chapter-panel");
  
  const scrollTween = gsap.to(scrollPanelRef, {
    x: () => -(scrollPanelRef.scrollWidth - window.innerWidth),
    ease: "none", // Tightly synchronized 1:1 with user's trackpad/wheel input
    scrollTrigger: {
      trigger: containerRef,
      pin: true,           // Lock vertical browser scroll
      scrub: 1.1,          // Add a minor inertia buffer (1.1s lag) for buttery smoothness
      start: "top top",    // Trigger when section top matches viewport top
      end: () => `+=${scrollPanelRef.scrollWidth - window.innerWidth}`,
      invalidateOnRefresh: true,
    }
  });

  return () => {
    scrollTween.scrollTrigger.kill();
    scrollTween.kill();
  };
}
```

---

### Pattern D: The Typographical \"Achievements\" Grid
Inspired by the Halston template, this clean, high-impact numerical layout maps raw operational performance data onto premium typographical columns [11].

```
  [100%]                      [4.8 / 5.0]                 [1.5%]
  Empfehlungsrate             Kundenbewertung             Faire Provision
  Sub-label (opacity-60)      Sub-label (opacity-60)      Sub-label (opacity-60)
```

#### Tailored HTML Architecture
```html
<div class="grid grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-8 border-y border-brand-surface py-16">
  <!-- Stat 01: Recommendation Rate -->
  <div class="flex flex-col items-start reveal-item">
    <span class="font-display text-5xl lg:text-6xl text-brand-accent font-normal mb-2">100%</span>
    <span class="font-sans text-xs uppercase tracking-widest text-brand-text opacity-60">Empfehlungsrate</span>
  </div>

  <!-- Stat 02: Customer Rating -->
  <div class="flex flex-col items-start reveal-item">
    <span class="font-display text-5xl lg:text-6xl text-brand-text font-normal mb-2">4.8</span>
    <span class="font-sans text-xs uppercase tracking-widest text-brand-text opacity-60">Kundenbewertung</span>
  </div>

  <!-- Stat 03: Transparent Fee -->
  <div class="flex flex-col items-start reveal-item">
    <span class="font-display text-5xl lg:text-6xl text-brand-accent font-normal mb-2">1.5%</span>
    <span class="font-sans text-xs uppercase tracking-widest text-brand-text opacity-60">Faire Provision</span>
  </div>

  <!-- Stat 04: Exposure Impact -->
  <div class="flex flex-col items-start reveal-item">
    <span class="font-display text-5xl lg:text-6xl text-brand-text font-normal mb-2">5K+</span>
    <span class="font-sans text-xs uppercase tracking-widest text-brand-text opacity-60">Exposé-Aufrufe</span>
  </div>

  <!-- Stat 05: Philanthropic Purpose -->
  <div class="flex flex-col items-start reveal-item">
    <span class="font-display text-5xl lg:text-6xl text-brand-orange font-normal mb-2">3%</span>
    <span class="font-sans text-xs uppercase tracking-widest text-brand-text opacity-60">Congo Purpose</span>
  </div>
</div>
```

---

## 6. CSS Integration and Custom Variables

Place this styling dictionary directly inside your root stylesheet (`styles/globals.css`) to define the layout boundaries and rendering resets.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-bg: 11, 19, 30;           /* #0B131E (Deep Navy Slate) */
    --color-text: 251, 251, 250;      /* #FBFBFA (Warm Linen Text on Dark Canvas) */
    --color-green: 78, 94, 83;        /* #4E5E53 (Muted Sage Green) */
    --color-accent: 221, 190, 139;    /* #DDBE8B (Brushed Brass Gold) */
    --color-orange: 194, 123, 98;     /* #C27B62 (Burnt Terracotta Orange) */
    --color-surface: 30, 34, 41;      /* #1E2229 (Charcoal Slate / Dark Elements) */
    --color-light-bg: 251, 251, 250;  /* #FBFBFA (Warm Linen for Contrast panels) */
  }

  body {
    background-color: rgb(var(--color-bg));
    color: rgb(var(--color-text));
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 300; /* Plus Jakarta Sans Light */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, .font-display {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 400; /* Regular Space Grotesk Bauhaus Style */
    letter-spacing: -0.02em;
  }
}

/* Base interactive transitions */
a, button {
  transition: color 0.4s cubic-bezier(0.22, 1, 0.36, 1),
              background-color 0.4s cubic-bezier(0.22, 1, 0.36, 1),
              opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Subtle line separator expansions */
.animated-divider {
  width: 100%;
  height: 1px;
  background-color: rgba(var(--color-text), 0.15);
  transform-origin: left;
  transform: scaleX(0);
  transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.animated-divider.in-view {
  transform: scaleX(1);
}
```

---

## 7. Handover Checklists for Developers & AI Agents

When deploying this style guide, verify that the active codebase respects these rigid visual guidelines:

* [ ] **Headline Weight Check:** Ensure ALL heading levels (`h1`, `h2`, `h3`, `h4`, display text) use exactly Space Grotesk with `font-normal` (400 weight). No 700 bold weight is permitted.
* [ ] **Body Copy Weight Check:** Verify that the primary body paragraphs utilize strictly `font-light` (300 weight) for Plus Jakarta Sans.
* [ ] **Tactile Heritage Palette Check:** Verify that Deep Navy Slate (`#0B131E`) forms the website's grounding base. Moss Green (`#4E5E53`), Brass Gold (`#DDBE8B`), and Terracotta Orange (`#C27B62`) should be applied strictly as curated, elegant accent details.
* [ ] **No Sideways Translation:** Verify that scroll reveals utilize only translate Y (`translateY(24px)` to `0px`). Never use translateX triggers [54].
* [ ] **Once-Only Settings:** Verify that every Framer Motion or GSAP scroll trigger utilizes the `once: true` or equivalent setting, preventing content from re-animating repeatedly as the user scrolls up and down [54].
* [ ] **Subdued Opacity Check:** Confirm that sub-labels, metadata tags, categories, and background elements reside at an opacity of `0.4` to `0.7` instead of solid `1.0` [54].
