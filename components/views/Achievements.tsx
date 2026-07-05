"use client";

// The Achievements Grid — replicated from the Halston template's
// "Achievements" strip (https://halston-architecture-template.webflow.io/).
//
// Halston's anatomy, which we mirror exactly:
//   1. A three-part header row: brand name (left), studio line (center),
//      "Achievements" (right) — tiny uppercase labels.
//   2. A full-width top border, then FIVE equal columns.
//   3. Each column: a small photo thumbnail on top, a VERY large number
//      below it, then a short one-word label. No long descriptions.
//   4. Fine vertical dividers between columns that animate downward.

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import { achievements, achievementsHeading, t, DEFAULT_LANGUAGE } from "../../data/content";
import type { Language } from "../../types";

import Counter from "../shared/Counter";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Achievements({ lang = DEFAULT_LANGUAGE }: { lang?: Language }) {
  const prefersReduced = usePrefersReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-15% 0px" });

  // Columns cascade in one after another (delicate wave).
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 }, // small vertical travel only
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  };

  // Vertical hairline that grows downward from the top.
  const dividerVariants = {
    hidden: { scaleY: 0 },
    visible: { scaleY: 1, transition: { duration: 1.2, ease: EASE } },
  };

  const show = prefersReduced || inView;

  return (
    <section className="py-24 px-6 md:px-12 bg-brand-bg">
      {/* ---- Halston-style three-part header row ---- */}
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/veritali-logo-white.svg"
          alt={achievementsHeading.brand}
          className="h-7 w-auto self-start"
        />
        <span className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60">
          {t(achievementsHeading.studioLine, lang)}
        </span>
        <span className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60">
          {t(achievementsHeading.eyebrow, lang)}
        </span>
      </div>

      {/* ---- Five-column metric strip ---- */}
      <motion.div
        ref={ref}
        variants={prefersReduced ? undefined : containerVariants}
        initial={prefersReduced ? undefined : "hidden"}
        animate={prefersReduced ? undefined : show ? "visible" : "hidden"}
        className="grid grid-cols-2 lg:grid-cols-5 border-t border-brand-text/15"
      >
        {achievements.map((item, idx) => (
          <motion.div
            key={idx}
            variants={prefersReduced ? undefined : itemVariants}
            className="relative flex flex-col gap-4 pt-8 pb-10 px-5 md:px-8"
          >
            {/* Fine vertical divider on the left edge, growing downward
                (skipped on the first column, like Halston's clean left edge) */}
            {idx > 0 && (
              <motion.span
                variants={prefersReduced ? undefined : dividerVariants}
                className="absolute left-0 top-0 h-full w-px bg-brand-text/15 origin-top hidden lg:block"
              />
            )}

            {/* 2. The huge number — Space Grotesk Regular, brass/terracotta */}
            <span
              className={`font-display font-medium leading-none text-6xl md:text-7xl tracking-tight ${
                item.tone === "brass" ? "text-brand-accent" : "text-brand-orange"
              }`}
            >
              <Counter value={item.metric} />
            </span>

            {/* 3. Short one-word label, quiet and small */}
            <span className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60">
              {t(item.label, lang)}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom border closes the strip, like Halston */}
      <div className="border-t border-brand-text/15" />
    </section>
  );
}
