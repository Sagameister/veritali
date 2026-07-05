"use client";

// The Services teaser (homepage) — compact editorial index.
// Deliberately minimal: five OVERSIZED clickable titles, nothing else.
// The detail (descriptions, photos, metrics, form) lives on /services;
// this section just names the disciplines and invites the click.
//
// Design notes:
//   - The large type IS the design — display-size titles with thin
//     hairlines between them, like a book's table of contents.
//   - Every row is a real link to /services (no fake arrows).
//   - On hover: title warms to terracotta, the service's key metric
//     fades in quietly on the right, the arrow drifts 4px (Rule 5).
//   - Ends with an "Alle Leistungen +" row.

import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ArrowIcon from "../shared/ArrowIcon";
import DividerLine from "../shared/DividerLine";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import { services, servicesHeading, t, DEFAULT_LANGUAGE } from "../../data/content";
import type { Language } from "../../types";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Services({ lang = DEFAULT_LANGUAGE }: { lang?: Language }) {
  const prefersReduced = usePrefersReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-15% 0px" });

  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Motion values for tracking cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics with soft lag
  const springX = useSpring(mouseX, { stiffness: 150, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  };

  const show = prefersReduced || inView;

  return (
    <section
      id="services"
      className="py-28 px-6 md:px-12 bg-brand-bg relative"
      onMouseMove={handleMouseMove}
    >
      {/* Section header row: eyebrow left, quiet hint right */}
      <div className="flex items-baseline justify-between gap-6 mb-12">
        <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60">
          {t(servicesHeading.eyebrow, lang)}
        </p>
        <p className="hidden md:block font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/40">
          {lang === "de" ? "05 Disziplinen" : "05 Disciplines"}
        </p>
      </div>

      <motion.ul
        ref={ref}
        variants={prefersReduced ? undefined : containerVariants}
        initial={prefersReduced ? undefined : "hidden"}
        animate={prefersReduced ? undefined : show ? "visible" : "hidden"}
      >
        {services.map((service, idx) => (
          <motion.li key={service.index} variants={prefersReduced ? undefined : rowVariants}>
            {idx === 0 && <DividerLine />}
            <a
              href="/services"
              className="group flex items-center gap-6 md:gap-10 py-7 md:py-9"
              onMouseEnter={() => !prefersReduced && setActiveImage(service.image)}
              onMouseLeave={() => !prefersReduced && setActiveImage(null)}
            >
              {/* Index — matches the title's terracotta on hover */}
              <span className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-green w-8 shrink-0 transition-colors duration-700 ease-editorial group-hover:text-brand-orange">
                {service.index}
              </span>

              {/* Oversized title — the design element itself */}
              <h3 className="font-display font-medium text-fs-h1-m md:text-fs-h1 tracking-tight text-brand-text transition-colors duration-700 ease-editorial group-hover:text-brand-orange">
                <span className="hover-mask-reveal">
                  <span className="text-primary">{t(service.title, lang)}</span>
                  <span className="text-secondary" aria-hidden="true">
                    {t(service.title, lang)}
                  </span>
                </span>
              </h3>

              {/* Key metric — invisible until hover, terracotta like the title */}
              <span className="hidden lg:block ml-auto font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-editorial whitespace-nowrap">
                {t(service.metric, lang)}
              </span>

              {/* Arrow — reveals from behind on hover */}
              <span className="ml-auto lg:ml-0 text-brand-accent transition-colors duration-700 ease-editorial group-hover:text-brand-orange">
                <span className="hover-icon-reveal">
                  <span className="icon-primary">
                    <ArrowIcon className="w-6 h-6" />
                  </span>
                  <span className="icon-secondary" aria-hidden="true">
                    <ArrowIcon className="w-6 h-6" />
                  </span>
                </span>
              </span>
            </a>
            <DividerLine delay={idx * 0.05} />
          </motion.li>
        ))}

        {/* Closing row: the explicit "all services" invitation */}
        <motion.li variants={prefersReduced ? undefined : rowVariants}>
          <a
            href="/services"
            className="group flex items-center py-7"
          >
            <span className="w-8 shrink-0" />
            <div className="flex items-center gap-3">
              <span className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/70 group-hover:text-brand-orange transition-colors duration-700 ease-editorial">
                <span className="hover-mask-reveal">
                  <span className="text-primary">{lang === "de" ? "Alle Leistungen" : "All services"}</span>
                  <span className="text-secondary" aria-hidden="true">
                    {lang === "de" ? "Alle Leistungen" : "All services"}
                  </span>
                </span>
              </span>
              <span className="text-brand-accent transition-colors duration-700 ease-editorial group-hover:text-brand-orange leading-none flex items-center -translate-y-[1.5px]">
                <span className="hover-icon-reveal">
                  <span className="icon-primary">+</span>
                  <span className="icon-secondary" aria-hidden="true">+</span>
                </span>
              </span>
            </div>
          </a>
        </motion.li>
      </motion.ul>

      {/* Floating magnetic cursor-following preview card */}
      {!prefersReduced && (
        <motion.div
          style={{
            x: springX,
            y: springY,
            pointerEvents: "none",
          }}
          animate={{
            opacity: activeImage ? 1 : 0,
            scale: activeImage ? 1 : 0.8,
          }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed top-0 left-0 z-50 w-64 h-40 overflow-hidden pointer-events-none rounded-sm border border-brand-text/10 shadow-2xl hidden lg:block bg-brand-surface ml-5 -translate-y-1/2"
        >
          {activeImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={activeImage}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
      )}
    </section>
  );
}
