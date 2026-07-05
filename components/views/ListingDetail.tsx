"use client";

// Object (listing) detail page — modeled on Halston's project detail page
// (https://halston-architecture-template.webflow.io/project/wannsee-residence).
//
// Halston's anatomy, which we mirror (minus Project Overview + testimonial,
// per the brief):
//   1. Huge H1 title over a full-bleed hero photo.
//   2. Big statement line (our editorial summary).
//   3. Photo gallery grid.
//   4. Facts table: label/value rows with hairlines
//      (Objekt / Lage / Eckdaten / Preis / Jahr).
//   5. Editorial body: bold lead paragraph, sections with headings,
//      prose and bullet lists, optional pull quote.
//   6. Related object cards at the bottom (the other listings).

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SplitText from "../shared/SplitText";
import ScrollHighlightText from "../shared/ScrollHighlightText";
import ClipPathReveal from "../shared/ClipPathReveal";
import GalleryStrip from "../shared/GalleryStrip";
import DividerLine from "../shared/DividerLine";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import { getListings } from "../../lib/listings";
import { t, DEFAULT_LANGUAGE } from "../../data/content";
import type { Language, Listing } from "../../types";

const EASE = [0.22, 1, 0.36, 1] as const;

// Small fade-up wrapper so each block reveals quietly, once.
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const prefersReduced = usePrefersReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-10% 0px" });

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: EASE } },
  };

  return (
    <motion.div
      ref={ref}
      variants={prefersReduced ? undefined : fadeUp}
      initial={prefersReduced ? undefined : "hidden"}
      animate={prefersReduced ? undefined : inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---- 4. Facts table row ---- */
function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline gap-6 py-4 border-b border-brand-text/10">
      <span className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60 shrink-0">
        {label}
      </span>
      <span className="font-sans font-medium text-fs-small text-brand-text text-right">
        {value}
      </span>
    </div>
  );
}

/* ---- 6. Related object card (compact version matching the new card style) ---- */
function RelatedCard({ listing, lang }: { listing: Listing; lang: Language }) {
  return (
    <a href={`/objekte/${listing.slug}`} className="group flex flex-col h-full justify-between">
      <div className="space-y-4">
        {/* Photo */}
        <div className="overflow-hidden aspect-[4/3] bg-brand-lightbg/5 relative">
          <div className="w-full h-full transition-transform duration-1000 ease-editorial group-hover:scale-[1.03]">
            <ClipPathReveal
              src={listing.image}
              alt={t(listing.title, lang)}
              aspectRatioClassName="aspect-[4/3]"
            />
          </div>
        </div>
        
        {/* Meta text */}
        <div className="space-y-2">
          <p className="font-sans font-medium text-[11px] uppercase tracking-[0.18em] text-brand-green">
            {t(listing.category, lang)}
          </p>
          <h3 className="font-display font-medium text-lg md:text-xl text-brand-text transition-colors duration-700 ease-editorial group-hover:text-brand-orange leading-snug line-clamp-2 min-h-[3.2em]">
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
      <div className="pt-4 mt-auto">
        <p className="font-display font-medium text-xl md:text-2xl text-brand-accent">
          {listing.price}
        </p>
      </div>
    </a>
  );
}

export default function ListingDetail({
  listing,
  lang = DEFAULT_LANGUAGE,
}: {
  listing: Listing;
  lang?: Language;
}) {
  const [related, setRelated] = useState<Listing[]>([]);

  const { scrollY } = useScroll();
  // Map window scroll of 0px -> 800px to vertical translation of 0px -> 160px
  const yHero = useTransform(scrollY, [0, 800], [0, 160]);

  useEffect(() => {
    getListings().then((allListings) => {
      // Filter out the current listing and take the latest 3
      const filtered = allListings.filter((item) => item.slug !== listing.slug).slice(0, 3);
      setRelated(filtered);
    });
  }, [listing.slug]);

  const factLabels = {
    object: lang === "de" ? "Objekt" : "About",
    location: lang === "de" ? "Lage" : "Location",
    parameters: lang === "de" ? "Eckdaten" : "Key facts",
    price: lang === "de" ? "Preis" : "Price",
    year: lang === "de" ? "Jahr" : "Year",
  };

  return (
    <div className="bg-brand-bg">
      {/* ---- 1. Title + full-bleed hero photo ---- */}
      <header className="pt-40 px-6 md:px-12">
        <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-green mb-4">
          {t(listing.category, lang)}
        </p>
        <h1 className="font-display font-medium text-fs-h1-m md:text-fs-display leading-none text-brand-text max-w-5xl mb-12">
          <SplitText text={t(listing.title, lang)} staggerDelay={0.05} />
        </h1>
      </header>

      <div className="relative overflow-hidden w-full aspect-[16/8] bg-brand-surface">
        <motion.img
          src={listing.image}
          alt={t(listing.title, lang)}
          style={{ y: yHero }}
          className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover pointer-events-none select-none"
        />
      </div>

      {/* ---- 2. Big statement line ----
          Words brighten one by one as you scroll (reading-cursor effect). */}
      <div className="px-6 md:px-12 py-24">
        <h2 className="font-display font-medium text-fs-h2-m md:text-fs-h1 text-brand-text leading-snug max-w-4xl">
          <ScrollHighlightText text={t(listing.summary, lang)} />
        </h2>
      </div>

      {/* ---- 3. Gallery: horizontal scroll-lock strip, click → lightbox
          (vertical stack on mobile) ---- */}
      <GalleryStrip images={listing.gallery} alt={t(listing.title, lang)} lang={lang} />

      {/* ---- 4 + 5. Facts table + editorial body ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 px-6 md:px-12 py-24">
        {/* Facts (sticky on desktop so it follows while you read) */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
          <Reveal>
            <FactRow label={factLabels.object} value={listing.slug.replace(/-/g, " ")} />
            <FactRow label={factLabels.location} value={listing.location} />
            <FactRow label={factLabels.parameters} value={listing.parameters} />
            <FactRow label={factLabels.price} value={listing.price} />
            <FactRow label={factLabels.year} value={listing.year} />

            <a
              href="/#contact"
              className="group mt-8 flex items-center justify-between border border-brand-accent/50 px-5 py-3.5 hover:border-brand-orange"
            >
              <span className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-accent group-hover:text-brand-orange">
                {lang === "de" ? "Besichtigung anfragen" : "Request a viewing"}
              </span>
              <span className="text-brand-accent transition-transform duration-700 ease-editorial group-hover:translate-x-1">
                +
              </span>
            </a>
          </Reveal>
        </div>

        {/* Editorial body */}
        <div className="lg:col-span-7 lg:col-start-6">
          {/* Bold lead paragraph */}
          <Reveal>
            <p className="font-sans font-medium text-fs-body-m md:text-fs-body text-brand-text leading-relaxed mb-12">
              {t(listing.detail.lead, lang)}
            </p>
          </Reveal>

          {/* Sections: heading + prose + bullets */}
          {listing.detail.sections.map((section, idx) => (
            <Reveal key={idx} className="mb-12">
              <h3 className="font-display font-medium text-fs-h2-m md:text-fs-h2 text-brand-text mb-4">
                {t(section.title, lang)}
              </h3>
              <p className="font-sans font-medium text-fs-small md:text-fs-body-m text-brand-muted leading-relaxed mb-6">
                {t(section.body, lang)}
              </p>
              {section.bullets && (
                <ul className="space-y-3">
                  {section.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex gap-3 font-sans font-medium text-fs-small text-brand-muted"
                    >
                      <span className="text-brand-green shrink-0">—</span>
                      {t(bullet, lang)}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}

          {/* Optional pull quote */}
          {listing.detail.quote && (
            <Reveal>
              <blockquote className="border-l-2 border-brand-accent pl-6 py-2 font-display font-medium text-xl md:text-2xl text-brand-text/90 italic">
                „{t(listing.detail.quote, lang)}“
              </blockquote>
            </Reveal>
          )}
        </div>
      </div>

      {/* ---- 6. Related objects ---- */}
      <section className="px-6 md:px-12 pb-28">
        <DividerLine />
        <div className="flex items-end justify-between gap-6 pt-16 mb-12">
          <h2 className="font-display font-medium text-fs-h2-m md:text-fs-h1 text-brand-text max-w-xl">
            <SplitText text={lang === "de" ? "Weitere Objekte" : "More objects"} />
          </h2>
          <a
            href="/objekte"
            className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/70 hover:text-brand-orange whitespace-nowrap"
          >
            {lang === "de" ? "Alle Objekte" : "All objects"}{" "}
            <span className="text-brand-accent">+</span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {related.map((item) => (
            <div key={item.slug} className="border border-brand-text/10 p-5 flex flex-col justify-between rounded-sm">
              <RelatedCard listing={item} lang={lang} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
