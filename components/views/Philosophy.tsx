"use client";

// Philosophy TEASER (homepage) — the condensed version.
// The full manifesto and pillars live on /philosophie; this panel keeps
// the homepage's one light moment (Warm Linen) and gives first-time
// visitors the essence: headline, two-sentence excerpt, the three
// pillar names, and a link to the full page.

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SplitText from "../shared/SplitText";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import { manifesto, manifestoExcerpt, pillars, t, DEFAULT_LANGUAGE } from "../../data/content";
import type { Language } from "../../types";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Philosophy({ lang = DEFAULT_LANGUAGE }: { lang?: Language }) {
  const prefersReduced = usePrefersReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-15% 0px" });

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  };

  return (
    // Light contrast panel: Warm Linen background, Charcoal Slate text.
    <section id="philosophy" className="bg-brand-lightbg text-[#1E2229] py-24 px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
        {/* Left: eyebrow + headline + excerpt */}
        <div className="lg:col-span-7">
          <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-[#468E99] mb-6">
            {lang === "de" ? "UNSERE PHILOSOPHIE" : "OUR PHILOSOPHY"}
          </p>
          <h2 className="font-display font-medium text-fs-h1-m md:text-fs-h1 text-[#1E2229] mb-6">
            <SplitText text={t(manifesto.title, lang)} />
          </h2>
          <p className="font-sans font-medium text-fs-body-m md:text-fs-body text-[#1E2229]/80 max-w-2xl">
            {t(manifestoExcerpt, lang)}
          </p>
        </div>

        {/* Right: pillar names + link to the full page, bottom-aligned */}
        <motion.div
          ref={ref}
          variants={prefersReduced ? undefined : fadeUp}
          initial={prefersReduced ? undefined : "hidden"}
          animate={prefersReduced ? undefined : inView ? "visible" : "hidden"}
          className="lg:col-span-4 lg:col-start-9 flex flex-col justify-end gap-8"
        >
          {/* The three pillars, as a quiet stacked list */}
          <ul className="border-t border-[#1E2229]/15">
            {pillars.map((pillar, idx) => (
              <li
                key={idx}
                className="flex items-baseline gap-4 py-3 border-b border-[#1E2229]/15"
              >
                <span className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-[#468E99]">
                  0{idx + 1}
                </span>
                <span className="font-display font-medium text-lg text-[#1E2229]">
                  {t(pillar.title, lang)}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="/unternehmen"
            className="group flex items-center justify-between border border-[#1E2229]/25 px-5 py-3.5 hover:border-brand-orange"
          >
            <span className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-[#1E2229]/80 group-hover:text-brand-orange transition-colors duration-700 ease-editorial">
              <span className="hover-mask-reveal">
                <span className="text-primary">
                  {lang === "de" ? "Mehr über unser Unternehmen" : "More about our company"}
                </span>
                <span className="text-secondary" aria-hidden="true">
                  {lang === "de" ? "Mehr über unser Unternehmen" : "More about our company"}
                </span>
              </span>
            </span>
            <span className="text-brand-orange flex items-center -translate-y-[1.5px]">
              <span className="hover-icon-reveal">
                <span className="icon-primary">+</span>
                <span className="icon-secondary" aria-hidden="true">+</span>
              </span>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
