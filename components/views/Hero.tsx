"use client";

// The Hero Block — replicated from the Halston template's hero
// (https://halston-architecture-template.webflow.io/).
//
// Halston's anatomy, which we mirror:
//   1. FULL-BLEED background media filling the whole viewport
//      (Halston uses a looping video — a ready <video> slot is below;
//      for now a placeholder image stands in).
//   2. A dark gradient overlay so text stays readable on top of it.
//   3. Small "Featured" project link floating top-left (under the nav).
//   4. The BIG display headline anchored to the BOTTOM-LEFT.
//   5. A row of discipline quick-links under the headline
//      (Architecture / Interior / Renovation → our services).
//   6. A quiet "Recognition" list + consultation button bottom-right.

import { motion, useScroll, useTransform } from "framer-motion";
import SplitText from "../shared/SplitText";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import {
  hero,
  heroDisciplines,
  heroRecognition,
  heroCta,
  seo,
  t,
  DEFAULT_LANGUAGE,
} from "../../data/content";
import type { Language } from "../../types";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero({ lang = DEFAULT_LANGUAGE }: { lang?: Language }) {
  const prefersReduced = usePrefersReducedMotion();

  // Gentle vertical-only parallax: as you scroll the first 600px,
  // the background drifts down 80px — the image feels "behind" the page.
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, 80]);

  // Quiet fade-up used by the satellite elements (small travel, once only).
  const fadeUp = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.0, ease: EASE, delay },
        };

  return (
    // MOBILE FIX: min-h-screen + flex-end instead of a hard h-screen with
    // absolute-positioned content. On phones the content stack is taller
    // than the viewport — with this layout the section simply GROWS instead
    // of the text overflowing up into the navbar.
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-end"
    >
      {/* ---- 1. Full-bleed background media (video-ready) ---- */}
      <motion.div
        style={prefersReduced ? undefined : { y: parallaxY }}
        className="absolute inset-0 scale-[1.06]"
        initial={prefersReduced ? undefined : { opacity: 0, scale: 1.12 }}
        animate={prefersReduced ? undefined : { opacity: 1, scale: 1.06 }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        {/*
          WHEN YOUR MOVIE CLIP IS READY, replace the <img> below with:

          <video
            autoPlay
            muted
            loop
            playsInline
            poster={hero.heroImage}
            className="w-full h-full object-cover"
          >
            <source src="/media/hero-clip.mp4" type="video/mp4" />
          </video>

          (put the file at public/media/hero-clip.mp4)
        */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* MOBILE: image dimmed to 50% brightness so the text pops;
            from md: up it returns to full brightness. */}
        <img
          src={hero.heroImage}
          alt="Architectural interior with soft natural light"
          className="w-full h-full object-cover brightness-50 md:brightness-100"
        />
      </motion.div>

      {/* ---- 2. Legibility overlay ----
          MOBILE: much heavier navy gradient (text sits over the whole image
          on small screens). md: and up: the lighter editorial gradient. */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/95 via-brand-bg/60 to-brand-bg/70 md:from-brand-bg/90 md:via-brand-bg/25 md:to-brand-bg/40" />

      {/* ---- 4 + 5 + 6. Bottom cluster ----
          In normal flow now (not absolute): pt-36 keeps it clear of the
          fixed navbar even when the section has to grow on small phones. */}
      <div className="relative z-10 w-full px-6 md:px-12 pb-10 pt-36 md:pt-28">
        {/* 4. The big display headline, bottom-left like Halston.
            Slightly smaller on phones so the long line breaks gracefully. */}
        <h1 className="font-display font-medium text-[2.5rem] md:text-fs-display leading-none text-brand-text max-w-5xl mb-6">
          <SplitText text={t(hero.title, lang)} />
        </h1>

        {/* LOCAL SEO subline: the "Immobilienmakler in Heidelberg" phrase
            as visible page copy, plus the service-region strip. */}
        <motion.div {...fadeUp(0.7)} className="mb-10">
          <p className="font-sans font-medium text-fs-small md:text-fs-body-m text-brand-accent mb-3">
            {t(seo.tagline, lang)}
          </p>
          <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60">
            {seo.regions.join("  |  ")}
          </p>
        </motion.div>

        {/* Hairline above the bottom rows */}
        <motion.div
          {...fadeUp(0.8)}
          className="h-px w-full bg-brand-text/20 mb-6"
        />

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          {/* 5. Discipline quick-links row */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
            {heroDisciplines.map((d, idx) => (
              <motion.a
                key={idx}
                href={d.href}
                {...fadeUp(0.9 + idx * 0.1)}
                className="group"
              >
                <span className="block font-display font-medium text-base md:text-lg text-brand-text group-hover:text-brand-orange transition-colors duration-700 ease-editorial">
                  {d.label[lang]} <span className="text-brand-accent">+</span>
                </span>
                <span className="block font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60 mt-1">
                  {lang === "de" ? "Entdecken" : "Explore"}
                </span>
              </motion.a>
            ))}
          </div>

          {/* 6. Recognition list + consultation CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-8 sm:gap-12">
            <motion.div {...fadeUp(1.2)}>
              <span className="block font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60 mb-2">
                {t(heroRecognition.label, lang)}
              </span>
              <ul className="space-y-1">
                {heroRecognition.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="font-sans font-medium text-fs-small text-brand-text/80"
                  >
                    {item[lang]}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.a
              href="#contact"
              {...fadeUp(1.3)}
              className="inline-block font-display font-medium text-sm border border-brand-accent/60 text-brand-accent px-8 py-3.5 hover:bg-brand-orange hover:border-brand-orange hover:text-brand-bg whitespace-nowrap"
            >
              {t(heroCta, lang)}
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
