"use client";

// The Impact Partner Grid — Halston's trusted collaborators lockup.
// Three quiet columns: partner name, uppercase metadata line, light copy.

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import DividerLine from "../shared/DividerLine";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import { collaborators, collaboratorsHeading, t, DEFAULT_LANGUAGE } from "../../data/content";
import type { Language } from "../../types";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Collaborators({ lang = DEFAULT_LANGUAGE }: { lang?: Language }) {
  const prefersReduced = usePrefersReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-15% 0px" });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  };

  const show = prefersReduced || inView;

  return (
    <section id="partners" className="py-28 px-6 md:px-12 bg-brand-bg">
      <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60 mb-4">
        {t(collaboratorsHeading.eyebrow, lang)}
      </p>
      <h2 className="font-display font-medium text-fs-h1-m md:text-fs-h1 text-brand-text mb-16">
        {t(collaboratorsHeading.title, lang)}
      </h2>

      <DividerLine />

      <motion.div
        ref={ref}
        variants={prefersReduced ? undefined : containerVariants}
        initial={prefersReduced ? undefined : "hidden"}
        animate={prefersReduced ? undefined : show ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16"
      >
        {collaborators.map((partner, idx) => (
          <motion.div key={idx} variants={prefersReduced ? undefined : itemVariants}>
            <h3 className="font-display font-medium text-fs-h2-m md:text-fs-h2 text-brand-text mb-3">
              {partner.name}
            </h3>
            <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-green mb-5">
              {t(partner.metadata, lang)}
            </p>
            <p className="font-sans font-medium text-fs-small text-brand-muted leading-relaxed">
              {t(partner.body, lang)}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <DividerLine />
    </section>
  );
}
