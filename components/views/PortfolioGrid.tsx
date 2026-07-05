"use client";

// The Portfolio Masonry Grid — Halston's asymmetric listing layout.
// "Asymmetric" here means: large cards span 7 of 12 columns, small cards
// span 5, and every other row flips which side is bigger — so the eye
// zig-zags down the page instead of reading a boring uniform grid.
// Photos open via ClipPathReveal (cinematic shutter effect).
//
// Accepts any list of listings via `items` (defaults to all), chunked
// into rows of two — so it works for 4 cards or 40. Each photo carries
// a status badge (Verfügbar / Reserviert / Verkauft).

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SplitText from "../shared/SplitText";
import ClipPathReveal from "../shared/ClipPathReveal";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import { listings, portfolioHeading, statusLabels, t, DEFAULT_LANGUAGE } from "../../data/content";
import type { Language, Listing } from "../../types";

const EASE = [0.22, 1, 0.36, 1] as const;

// Color-coded pills: available = sage green, reserved = brass gold,
// sold = charcoal. Text color chosen per background for contrast.
const statusPill: Record<string, string> = {
  available: "bg-brand-green text-brand-text",
  reserved: "bg-brand-accent text-brand-bg",
  sold: "bg-brand-surface text-brand-text/70",
};

function ListingCard({ listing, lang }: { listing: Listing; lang: Language }) {
  const prefersReduced = usePrefersReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-15% 0px" });

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: EASE } },
  };

  return (
    <motion.article
      ref={ref}
      variants={prefersReduced ? undefined : fadeUp}
      initial={prefersReduced ? undefined : "hidden"}
      animate={prefersReduced ? undefined : inView ? "visible" : "hidden"}
    >
      {/* The whole card links to the object's detail page */}
      <a href={`/objekte/${listing.slug}`} className="group block">
      {/* Photo with quiet hover zoom (max scale 1.03 — Rule 5) */}
      <div className="relative overflow-hidden">
        <div className="transition-transform duration-1000 ease-editorial group-hover:scale-[1.03]">
          <ClipPathReveal
            src={listing.image}
            alt={t(listing.title, lang)}
            aspectRatioClassName={listing.size === "large" ? "aspect-[4/3]" : "aspect-[3/4]"}
          />
        </div>
        {/* Status pill — color-coded by status, top-left */}
        <span
          className={`absolute top-4 left-4 px-3 py-1.5 font-sans font-medium text-fs-label uppercase tracking-[0.18em] ${
            statusPill[listing.status]
          }`}
        >
          {t(statusLabels[listing.status], lang)}
        </span>
      </div>

      {/* Card meta */}
      <div className="mt-6">
        <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-green mb-3">
          {t(listing.category, lang)}
        </p>
        <h3 className="font-display font-medium text-fs-h2-m md:text-fs-h2 text-brand-text mb-3 transition-colors duration-700 ease-editorial group-hover:text-brand-orange">
          {t(listing.title, lang)} <span className="text-brand-accent">+</span>
        </h3>
        <p className="font-sans font-medium text-xs text-brand-text/60 mb-2">
          {listing.location} — {listing.year}
        </p>
        <p className="font-sans font-medium text-xs text-brand-muted mb-4">
          {listing.parameters}
        </p>
        <p className="font-sans font-medium text-fs-small text-brand-muted leading-relaxed mb-4 max-w-lg">
          {t(listing.summary, lang)}
        </p>
        <p className="font-display font-medium text-lg text-brand-accent">
          {listing.price}
        </p>
      </div>
      </a>
    </motion.article>
  );
}

export default function PortfolioGrid({
  lang = DEFAULT_LANGUAGE,
  showHeading = true, // the /objekte page brings its own page header
  items = listings, // any subset (active, archive, …); defaults to all
}: {
  lang?: Language;
  showHeading?: boolean;
  items?: Listing[];
}) {
  // Chunk into rows of two for the asymmetric 7/5 layout.
  const rows: Listing[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }

  return (
    <section id="portfolio" className="py-28 px-6 md:px-12 bg-brand-bg">
      {showHeading && (
        <>
          <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60 mb-4">
            {t(portfolioHeading.eyebrow, lang)}
          </p>
          <h2 className="font-display font-medium text-fs-h1-m md:text-fs-h1 text-brand-text mb-20">
            <SplitText text={t(portfolioHeading.title, lang)} />
          </h2>
        </>
      )}

      {/* Asymmetric rows: two listings per row, 7/5 column split that flips */}
      <div className="space-y-24">
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end"
          >
            {row.map((listing, i) => {
              const isLarge = listing.size === "large";
              const span = isLarge ? "lg:col-span-7" : "lg:col-span-5";
              const offset = !isLarge ? "lg:mb-24" : ""; // vertical stagger
              return (
                <div key={listing.slug} className={`${span} ${offset}`}>
                  <ListingCard listing={listing} lang={lang} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
