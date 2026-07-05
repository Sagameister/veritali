"use client";

// Client Stories — testimonial MASONRY (no more scroll-hijacking).
// Modeled on the referenced card layout:
//   1. Split header: title with one italic word (left) + small
//      right-aligned description.
//   2. A masonry of quote cards. Each card: chapter label, quote-style
//      heading, body, and an author row (initials avatar + name + role).
//   3. ONE highlighted card with a warm terracotta→brass gradient,
//      like the glowing middle card in the sample.
//
// Masonry technique: CSS columns. The browser fills column 1 top-to-bottom,
// then column 2, etc. — cards keep natural heights and stagger organically.
// `break-inside-avoid` stops a card from being sliced across two columns.

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SplitText from "../shared/SplitText";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import { volkerStory, oliverStory, storiesHeading, t, DEFAULT_LANGUAGE } from "../../data/content";
import type { Language, StoryChapter } from "../../types";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Testimonial {
  chapter: StoryChapter;
  author: string;
  role: { de: string; en: string };
}

// Flatten both story sets into one card list (all seven chapters).
const testimonials: Testimonial[] = [
  ...volkerStory.chapters.map((chapter) => ({
    chapter,
    author: volkerStory.clientName,
    role: { de: "Verkäufer & Käufer, Heidelberg", en: "Seller & buyer, Heidelberg" },
  })),
  ...oliverStory.chapters.map((chapter) => ({
    chapter,
    author: oliverStory.clientName,
    role: { de: "Verkäufer, Mannheim", en: "Seller, Mannheim" },
  })),
];

function TestimonialCard({
  item,
  lang,
  index,
}: {
  item: Testimonial;
  lang: Language;
  index: number;
}) {
  const prefersReduced = usePrefersReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-10% 0px" });

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      // Small per-card delay creates the cascade as you scroll down
      transition: { duration: 0.9, ease: EASE, delay: (index % 3) * 0.1 },
    },
  };

  // Initials for the little avatar circle (e.g. "Dr. Volker T." → "DV")
  const initials = item.author
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // HOVER GRADIENT: a gradient can't crossfade via CSS directly, so we
  // layer an absolutely-positioned gradient behind the content at
  // opacity 0 and fade it in on hover. Text colors swap in sync via
  // group-hover classes — everything on the same soft-deceleration curve.
  return (
    <motion.article
      ref={ref}
      variants={prefersReduced ? undefined : fadeUp}
      initial={prefersReduced ? undefined : "hidden"}
      animate={prefersReduced ? undefined : inView ? "visible" : "hidden"}
      className="group relative overflow-hidden break-inside-avoid mb-6 p-8 flex flex-col gap-5 bg-brand-surface border border-brand-green/20 text-brand-text"
    >
      {/* The brand gradient layer (sage green → deep navy) — invisible
          until hover. Both are core brand colors, so light text stays
          readable on top of it. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-brand-green to-brand-bg opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-editorial"
      />

      {/* Content sits above the gradient layer */}
      <span className="relative font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-accent group-hover:text-brand-text/70 transition-colors duration-700 ease-editorial">
        {t(item.chapter.label, lang)}
      </span>

      <h3 className="relative font-display font-medium text-xl leading-snug transition-colors duration-700 ease-editorial">
        {t(item.chapter.title, lang)}
      </h3>

      <p className="relative font-sans font-medium text-fs-small leading-relaxed text-brand-muted group-hover:text-brand-text/85 transition-colors duration-700 ease-editorial">
        {t(item.chapter.body, lang)}
      </p>

      {/* Author row: initials avatar + name + role */}
      <div className="relative flex items-center gap-3 mt-auto pt-2">
        <span className="flex items-center justify-center w-9 h-9 rounded-full font-display font-medium text-xs bg-brand-accent text-brand-bg group-hover:bg-brand-text group-hover:text-brand-bg transition-colors duration-700 ease-editorial">
          {initials}
        </span>
        <span>
          <span className="block font-sans font-medium text-fs-small transition-colors duration-700 ease-editorial">
            {item.author}
          </span>
          <span className="block font-sans font-medium text-xs text-brand-text/50 group-hover:text-brand-text/70 transition-colors duration-700 ease-editorial">
            {item.role[lang]}
          </span>
        </span>
      </div>
    </motion.article>
  );
}

export default function ClientStories({ lang = DEFAULT_LANGUAGE }: { lang?: Language }) {
  return (
    <section id="stories" className="py-28 px-6 md:px-12 bg-brand-bg">
      {/* Split header: italic-accented title left, small description right */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
        {/* Composite split headline: the three parts cascade as ONE wave —
            the `delay` prop offsets each part by the words before it. */}
        <h2 className="font-display font-medium text-fs-h1-m md:text-fs-h1 text-brand-text max-w-xl">
          <SplitText text={t(storiesHeading.titlePre, lang)} />
          <em className="text-brand-accent">
            <SplitText
              text={t(storiesHeading.titleItalic, lang)}
              delay={t(storiesHeading.titlePre, lang).split(" ").length * 0.08}
            />
          </em>
          {t(storiesHeading.titlePost, lang).trim() && (
            <SplitText
              text={t(storiesHeading.titlePost, lang).trim()}
              delay={
                (t(storiesHeading.titlePre, lang).split(" ").length +
                  t(storiesHeading.titleItalic, lang).split(" ").length) *
                0.08
              }
            />
          )}
        </h2>
        <p className="font-sans font-medium text-fs-small text-brand-muted max-w-sm md:text-right">
          {t(storiesHeading.description, lang)}
        </p>
      </div>

      {/* Masonry: 1 column on phones, 2 on tablets, 3 on desktop */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
        {testimonials.map((item, idx) => (
          <TestimonialCard key={idx} item={item} lang={lang} index={idx} />
        ))}
      </div>
    </section>
  );
}
