# Developer Playbook & Architecture Manual (`agent.md` - Version 3)

This document is a technical, whitelabeled blueprint for building a high-end, design-forward portfolio and services website. It maps the visual and motion standards of premium architectural templates (such as the *Halston* editorial style) and luxury builders (such as *Haven Constructions*) onto a modern web architecture. 

This version (v3) specifically updates the technical stack, styles, and configurations to run on a **dark-mode-first tactile palette** composed of **Greenish, Yellow, and Orange tones integrated into a primary Deep Navy Slate background** [38]. It enforces a geometric **Space Grotesk Regular (400)** header and **Plus Jakarta Sans Light (300)** body typography.

It provides folder layouts, component specifications, and ready-to-use Next.js (React) + Tailwind + Framer Motion/GSAP code blocks.

---

## 1. Technical Stack & Dependencies

The repository is built on a clean, declarative frontend architecture optimized for performance, accessibility, and unhurried fluid transitions.

*   **Framework:** Next.js (App Router)
*   **Styling:** Tailwind CSS (configured with our tactile heritage-boutique tokens)
*   **Motion Core:** Framer Motion (90% of scroll-triggered, staggered, and hover animations)
*   **Timeline Engine:** GSAP (GreenSock) + `@gsap/react` (for scroll-scrubbed horizontal scroll timelines and complex choreography)
*   **Smooth Scroll:** Lenis (smooth scroll integration wrapped globally via a React Provider)

### Package Dependencies (`package.json`)
```json
{
  "dependencies": {
    "@gsap/react": "^2.1.1",
    "@studio-freight/lenis": "^1.0.42",
    "classnames": "^2.5.1",
    "framer-motion": "^11.0.8",
    "gsap": "^3.12.5",
    "lucide-react": "^0.344.0",
    "next": "14.1.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3"
  }
}
```

---

## 2. Codebase Directory Structure

Maintain this flat, modular directory structure to ensure ease of scaling and compatibility with AI-assisted software generation tools.

```
/
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx       # Minimalist navigation with dynamic scrolling effects
│   │   ├── Footer.tsx           # Multi-column editorial footer
│   │   └── SmoothScroll.tsx     # Global Lenis provider wrapper
│   ├── shared/
│   │   ├── SplitText.tsx        # Word-by-word scroll-revealing masks
│   │   ├── ClipPathReveal.tsx   # Cinematic clip-path image expanding container
│   │   └── DividerLine.tsx      # Vertical/horizontal animated layout dividers
│   └── views/
│       ├── Hero.tsx             # Typographic title with background parallax
│       ├── Achievements.tsx     # Grid mapping high-impact statistics
│       ├── PortfolioGrid.tsx    # Asymmetric, masonry portfolio list
│       ├── ClientStories.tsx    # GSAP scroll-locked horizontal chapter timeline
│       └── Collaborators.tsx    # Clean, grid of partner logs/metadata
├── hooks/
│   └── usePrefersReducedMotion.ts # React hook for accessibility handling
├── styles/
│   └── globals.css              # Custom Tailwind utilities, fonts, and scroll resets
├── types/
│   └── index.ts                 # Strongly typed schema interfaces
└── app/
    ├── layout.tsx               # Root layout, wraps SmoothScroll and layout structures
    └── page.tsx                 # Main landing experience combining views
```

---

## 3. Global Configuration & Design Tokens

Define the exact deep navy slate, muted sage green, brushed brass gold, and burnt terracotta orange visual values inside the Tailwind configuration file.

### `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0B131E",       // Deep Navy Slate
          text: "#FBFBFA",     // Warm Linen Text
          green: "#4E5E53",    // Muted Sage Green Accent
          accent: "#DDBE8B",   // Brushed Brass Gold Accent (Yellow Shift)
          orange: "#C27B62",   // Burnt Terracotta Orange Accent
          surface: "#1E2229",  // Charcoal Slate Card base
          lightbg: "#FBFBFA",  // Warm Linen Contrast canvas
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
        display: ["var(--font-display)", "Space Grotesk", "sans-serif"],
      },
      transitionTimingFunction: {
        "editorial": "cubic-bezier(0.22, 1, 0.36, 1)", // Soft deceleration curve
      },
      animation: {
        "fade-in": "fadeIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        }
      }
    },
  },
  plugins: [],
}
```

---

## 4. Core Component Specifications

### A. Smooth Scroll Integration (`components/layout/SmoothScroll.tsx`)
Lenis handles the smooth-scrolling experience globally, ensuring the page feels unhurried and physically grounded.

```tsx
"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

---

### B. Scroll-Triggered Split-Text Mask (`components/shared/SplitText.tsx`)
This utility animates headings word-by-word. It isolates each word in a parent container set to `overflow-hidden` and translates it up vertically with staggered delays. It enforces `font-normal` weight (Space Grotesk 400).

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
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-15% 0px",
  });

  const wordVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1], // Soft deceleration curve
      },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block flex-wrap overflow-hidden font-display font-normal ${className}`}
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

---

### C. Cinematic Clip-Path Image Reveal (`components/shared/ClipPathReveal.tsx`)
Images expand smoothly from a centered, cropped mask instead of utilizing traditional fades.

```tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ClipPathRevealProps {
  src: string;
  alt: string;
  aspectRatioClassName?: string; // e.g. "aspect-[3/4]" or "aspect-video"
}

export default function ClipPathReveal({ src, alt, aspectRatioClassName = "aspect-[3/4]" }: ClipPathRevealProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-20% 0px",
  });

  const containerVariants = {
    hidden: {
      clipPath: "inset(20% 20% 20% 20%)",
      scale: 1.1,
      opacity: 0,
    },
    visible: {
      clipPath: "inset(0% 0% 0%)\",
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div ref={ref} className="overflow-hidden w-full bg-brand-surface">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className={`w-full h-full relative ${aspectRatioClassName}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover select-none pointer-events-none"
        />
      </motion.div>
    </div>
  );
}
```

---

### D. Horizontal-Scroll Client Stories (`components/views/ClientStories.tsx`)
This section transitions standard reviews into horizontal-scroll sliding chapters. It utilizes GSAP's ScrollTrigger to lock the viewport vertically and scrub horizontally. All headings use regular 400 weights.

```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface StoryChapter {
  label: string;
  title: string;
  body: string;
  image?: string;
}

interface ClientStory {
  clientName: string;
  projectMeta: string;
  chapters: StoryChapter[];
}

interface ClientStoriesProps {
  storyData: ClientStory;
}

export default function ClientStories({ storyData }: ClientStoriesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const panels = gsap.utils.toArray(".story-panel");
      const totalWidth = horizontalRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;
      
      gsap.to(horizontalRef.current, {
        x: () => -(totalWidth - windowWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth - windowWidth}`,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-brand-bg select-none">
      <div className="absolute top-12 left-12 z-20">
        <p className="text-sm font-sans tracking-widest uppercase text-brand-muted">
          Client Narrative & Process
        </p>
        <h2 className="text-3xl font-display font-normal text-brand-text mt-2">
          {storyData.clientName} &mdash; <span className="text-brand-orange italic font-normal">{storyData.projectMeta}</span>
        </h2>
      </div>

      <div ref={horizontalRef} className="flex h-full w-max items-center pl-12 pr-48">
        {storyData.chapters.map((chapter, idx) => (
          <div
            key={idx}
            className="story-panel w-[75vw] md:w-[45vw] h-[65vh] flex flex-col justify-between p-12 mr-16 bg-brand-surface border border-brand-green/20 flex-shrink-0"
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-sans tracking-widest text-brand-accent uppercase">
                {chapter.label}
              </span>
              <span className="text-xs font-mono text-brand-muted">
                0{idx + 1} / 0{storyData.chapters.length}
              </span>
            </div>

            <div className="my-auto max-w-md">
              <h3 className="text-xl md:text-2xl font-display font-normal text-brand-text mb-4">
                {chapter.title}
              </h3>
              <p className="text-sm md:text-base text-brand-muted leading-relaxed font-sans font-light">
                {chapter.body}
              </p>
            </div>

            {chapter.image && (
              <div className="w-full h-1/3 overflow-hidden mt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={chapter.image}
                  alt={chapter.title}
                  className="w-full h-full object-cover object-center brightness-90"
                />
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

### E. Achievements Grid Block (`components/views/Achievements.tsx`)
Enforces the modular numerical layout of the Halston template with `font-normal` regular headings.

```tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AchievementItem {
  metric: string;
  label: string;
  description: string;
}

interface AchievementsProps {
  achievements: AchievementItem[];
}

export default function Achievements({ achievements }: AchievementsProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-15% 0px",
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section ref={ref} className="py-24 px-12 bg-brand-bg border-b border-brand-green/20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-2 md:grid-cols-5 gap-8"
      >\n        {achievements.map((item, idx) => (\n          <motion.div key={idx} variants={itemVariants} className="flex flex-col border-l border-brand-green/30 pl-6 py-2\">\n            <span className=\"text-4xl md:text-5xl font-display font-normal text-brand-accent mb-2\">\n              {item.metric}\n            </span>\n            <span className=\"text-sm font-sans font-semibold text-brand-text mb-1 tracking-wider uppercase\">\n              {item.label}\n            </span>\n            <span className=\"text-xs font-sans text-brand-muted leading-relaxed font-light\">\n              {item.description}\n            </span>\n          </motion.div>\n        ))}\n      </motion.div>\n    </section>\n  );\n}\n```

---

## 5. Accessibility Implementation Guidelines

1.  **Reduced Motion Hook:** Utilize custom media-query detectors to cleanly strip CSS transforms and clip-paths for clients who require minimal viewport distraction.
2.  **HTML Semantics:** Heading sequences must cascade correctly (`<h1>` &rarr; `<h2>` &rarr; `<h3>`). All fonts are `font-normal` (400 weight).
3.  **Aria Landmarks:** Smooth scroll integrations and dynamic menus are keyboard navigable and readable by standard screen-reading tools.

---

## 6. AI Agent Engineering Prompts

### Grid & Masonry Layout Generation Prompt
```
Create a highly polished Next.js React component for an asymmetric portfolio grid layout. It must use TypeScript and Tailwind CSS.
- Wrap individual cards inside a custom framer-motion container.
- For listing photos, implement our customized 'ClipPathReveal' component (expanding from 'clip-path: inset(20% 20% 20% 20%)' to 'inset(0% 0% 0% 0%)' over a duration of 1.4s).
- Keep hover interactions quiet: on hover, apply a minor scale transition to the inner image (1.0 to 1.03) and translate an absolute-positioned arrow icon gently (4px horizontally).
- All textual layout elements use Space Grotesk in font-normal (400 weight) for headers, and Plus Jakarta Sans in font-light (300 weight) for body descriptions.
- Adhere to our heritage-boutique color variables: Base Background '#0B131E' (Deep Navy), Green accents '#4E5E53', Brass Gold accents '#DDBE8B', Orange accents '#C27B62', and text '#FBFBFA'.
```
