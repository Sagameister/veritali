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
import { useRef, useEffect, useState } from "react";
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
      transition: { duration: 0.9, ease: EASE, delay: (index % 3) * 0.1 },
    },
  };

  const initials = item.author
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.article
      ref={ref}
      variants={prefersReduced ? undefined : fadeUp}
      initial={prefersReduced ? undefined : "hidden"}
      animate={prefersReduced ? undefined : inView ? "visible" : "hidden"}
      className="group relative overflow-hidden snap-start flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] p-8 flex flex-col gap-5 bg-brand-surface border border-brand-green/20 text-brand-text"
    >
      {/* The brand gradient layer on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-brand-green to-brand-bg opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-editorial"
      />

      <span className="relative font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-accent group-hover:text-brand-text/70 transition-colors duration-700 ease-editorial">
        {t(item.chapter.label, lang)}
      </span>

      <h3 className="relative font-display font-medium text-xl leading-snug transition-colors duration-700 ease-editorial">
        {t(item.chapter.title, lang)}
      </h3>

      <p className="relative font-sans font-medium text-fs-small leading-relaxed text-brand-muted group-hover:text-brand-text/85 transition-colors duration-700 ease-editorial">
        {t(item.chapter.body, lang)}
      </p>

      {/* Author row */}
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoplay, setAutoplay] = useState(true);
  const [scrollState, setScrollState] = useState({ isStart: true, isEnd: false });

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const isStart = el.scrollLeft <= 5;
    const isEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;
    setScrollState({ isStart, isEnd });
  };

  const scroll = (direction: "left" | "right") => {
    setAutoplay(false); // Pause autoplay on manual scroll interaction
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelector("article");
    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width;
    const gap = 24; // gap-6
    const step = cardWidth + gap;

    if (direction === "left") {
      container.scrollBy({ left: -step, behavior: "smooth" });
    } else {
      container.scrollBy({ left: step, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      const container = scrollRef.current;
      if (!container) return;

      const card = container.querySelector("article");
      if (!card) return;

      const cardWidth = card.getBoundingClientRect().width;
      const gap = 24;
      const step = cardWidth + gap;

      const isEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
      if (isEnd) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 5500);

    return () => clearInterval(interval);
  }, [autoplay]);

  const handleMouseEnter = () => setAutoplay(false);
  const handleTouchStart = () => setAutoplay(false);

  return (
    <section id="stories" className="py-28 px-6 md:px-12 bg-brand-bg overflow-hidden">
      {/* Split header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
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

      {/* Slider container */}
      <div
        className="relative w-full group/ticker"
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleTouchStart}
      >
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          disabled={scrollState.isStart}
          className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-brand-accent/55 bg-brand-bg/90 backdrop-blur-md flex items-center justify-center text-brand-accent hover:border-brand-orange hover:text-brand-orange transition-all duration-300 shadow-2xl cursor-pointer disabled:opacity-0 disabled:pointer-events-none"
          aria-label="Zurück scrollen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 px-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((item, idx) => (
            <TestimonialCard key={idx} item={item} lang={lang} index={idx} />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          disabled={scrollState.isEnd}
          className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-brand-accent/55 bg-brand-bg/90 backdrop-blur-md flex items-center justify-center text-brand-accent hover:border-brand-orange hover:text-brand-orange transition-all duration-300 shadow-2xl cursor-pointer disabled:opacity-0 disabled:pointer-events-none"
          aria-label="Weiter scrollen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </section>
  );
}
