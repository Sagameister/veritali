"use client";

// The Portfolio Grid view.
// Supports two variants:
// 1. "asymmetric" (default): Large cards span 7/12 cols, small cards span 5/12 cols, flips row-by-row.
// 2. "compact": Elegant 4-column grid (desktop) with 1px border lines separating cells.

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SplitText from "../shared/SplitText";
import ClipPathReveal from "../shared/ClipPathReveal";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import { listings, portfolioHeading, statusLabels, t, DEFAULT_LANGUAGE } from "../../data/content";
import type { Language, Listing } from "../../types";

const EASE = [0.22, 1, 0.36, 1] as const;

const statusPill: Record<string, string> = {
  available: "bg-brand-green text-brand-text",
  reserved: "bg-brand-accent text-brand-bg",
  sold: "bg-brand-surface text-brand-text/70",
};

// 1. The original Asymmetric Listing Card
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
      <a href={`/objekte/${listing.slug}`} className="group block">
        <div className="relative overflow-hidden">
          <div className="transition-transform duration-1000 ease-editorial group-hover:scale-[1.03]">
            <ClipPathReveal
              src={listing.image}
              alt={t(listing.title, lang)}
              aspectRatioClassName={listing.size === "large" ? "aspect-[4/3]" : "aspect-[3/4]"}
            />
          </div>
          <span
            className={`absolute top-4 left-4 px-3 py-1.5 font-sans font-medium text-fs-label uppercase tracking-[0.18em] ${
              statusPill[listing.status]
            }`}
          >
            {t(statusLabels[listing.status], lang)}
          </span>
        </div>

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
            {listing.status === "sold" ? t(statusLabels.sold, lang).toUpperCase() : listing.price}
          </p>
        </div>
      </a>
    </motion.article>
  );
}

// 2. The new Compact Listing Card (for standard 4-column grid)
function CompactListingCard({ listing, lang }: { listing: Listing; lang: Language }) {
  const prefersReduced = usePrefersReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-15% 0px" });

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <motion.article
      ref={ref}
      variants={prefersReduced ? undefined : fadeUp}
      initial={prefersReduced ? undefined : "hidden"}
      animate={prefersReduced ? undefined : inView ? "visible" : "hidden"}
      className="h-full"
    >
      <a href={`/objekte/${listing.slug}`} className="group flex flex-col h-full justify-between">
        <div className="space-y-5">
          {/* Photo */}
          <div className="relative overflow-hidden aspect-[4/3] bg-brand-lightbg/5">
            <div className="w-full h-full transition-transform duration-1000 ease-editorial group-hover:scale-[1.03]">
              <ClipPathReveal
                src={listing.image}
                alt={t(listing.title, lang)}
                aspectRatioClassName="aspect-[4/3]"
              />
            </div>
            <span
              className={`absolute top-3 left-3 px-2.5 py-1 font-sans font-medium text-[9px] uppercase tracking-[0.18em] ${
                statusPill[listing.status]
              }`}
            >
              {t(statusLabels[listing.status], lang)}
            </span>
          </div>

          {/* Meta text */}
          <div className="space-y-2">
            <p className="font-sans font-medium text-[11px] uppercase tracking-[0.18em] text-brand-green">
              {t(listing.category, lang)}
            </p>
            <h3 className="font-display font-medium text-lg md:text-xl text-brand-text transition-colors duration-700 ease-editorial group-hover:text-brand-orange leading-snug line-clamp-none sm:line-clamp-3 min-h-0 sm:min-h-[4.8em]">
              {t(listing.title, lang)} <span className="text-brand-accent">+</span>
            </h3>
            <p className="font-sans font-medium text-xs md:text-sm text-brand-text/75">
              {listing.location} — {listing.year}
            </p>
            <p className="font-sans font-medium text-xs md:text-sm text-brand-text/80">
              {listing.parameters}
            </p>
          </div>
        </div>

        {/* Price at the bottom */}
        <div className="pt-5 mt-auto">
          <p className="font-display font-medium text-xl md:text-2xl text-brand-accent">
            {listing.status === "sold" ? t(statusLabels.sold, lang).toUpperCase() : listing.price}
          </p>
        </div>
      </a>
    </motion.article>
  );
}

export default function PortfolioGrid({
  lang = DEFAULT_LANGUAGE,
  showHeading = true,
  items = listings,
  variant = "asymmetric",
  cols = 4,
}: {
  lang?: Language;
  showHeading?: boolean;
  items?: Listing[];
  variant?: "asymmetric" | "compact";
  cols?: 3 | 4;
}) {
  // Chunking for asymmetric grid layout
  const rows: Listing[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }

  // COMPACT VARIANT (3 or 4 columns with elegant borders)
  if (variant === "compact") {
    return (
      <section id="portfolio" className="py-16 px-6 md:px-12 bg-brand-bg">
        {showHeading && (
          <div className="mb-16">
            <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60 mb-4">
              {t(portfolioHeading.eyebrow, lang)}
            </p>
            <h2 className="font-display font-medium text-fs-h1-m md:text-fs-h1 text-brand-text">
              <SplitText text={t(portfolioHeading.title, lang)} />
            </h2>
          </div>
        )}

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"} border-t border-l border-brand-text/10`}>
          {items.map((listing) => (
            <div
              key={listing.slug}
              className="border-r border-b border-brand-text/10 p-5 md:p-6 flex flex-col justify-between"
            >
              <CompactListingCard listing={listing} lang={lang} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ASYMMETRIC VARIANT (Original layout)
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

      <div className="space-y-24">
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end"
          >
            {row.map((listing) => {
              const isLarge = listing.size === "large";
              const span = isLarge ? "lg:col-span-7" : "lg:col-span-5";
              const offset = !isLarge ? "lg:mb-24" : "";
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
