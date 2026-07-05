"use client";

// Valuation & Consultation Gateways — restructured to match Halston's
// "checkerboard" editorial block (the About section on their homepage):
//
//   ┌────────────────┬──────────────────────┐
//   │  text block    │   large photo        │   row 1
//   │  (bottom-left) │   (bleeds right)     │
//   ├────────────────┴──┬───────────────────┤
//   │   large photo     │   text block +    │   row 2
//   │   (bleeds left)   │   outlined button │
//   └───────────────────┴───────────────────┘
//
// Text sits in the negative space beside each photo, alternating sides.
// The CTA is a wide outlined bar — label left, "+" right — like
// Halston's "ABOUT US +" button.

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SplitText from "../shared/SplitText";
import ClipPathReveal from "../shared/ClipPathReveal";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import { valuationGateway, consultationGateway, t, DEFAULT_LANGUAGE } from "../../data/content";
import type { Gateway, Language } from "../../types";

const EASE = [0.22, 1, 0.36, 1] as const;

// The wide outlined CTA bar (Halston's "ABOUT US  +" style).
function CtaBar({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="group flex items-center justify-between border border-brand-text/25 px-5 py-3.5 max-w-xs hover:border-brand-orange"
    >
      <span className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/80 group-hover:text-brand-orange">
        {label}
      </span>
      {/* The plus drifts 4px right on hover — quiet, within Rule 5 limits */}
      <span className="text-brand-accent transition-transform duration-700 ease-editorial group-hover:translate-x-1">
        +
      </span>
    </a>
  );
}

// One text block: title, body, CTA bar, optional phone sub-label.
function GatewayText({
  gateway,
  lang,
  align,
}: {
  gateway: Gateway;
  lang: Language;
  align: "end" | "start"; // bottom-aligned (row 1) or top-aligned (row 2)
}) {
  const prefersReduced = usePrefersReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-15% 0px" });

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
      className={`flex flex-col h-full max-w-md ${
        align === "end" ? "justify-end" : "justify-start"
      }`}
    >
      <div>
        <h2 className="font-display font-medium text-fs-h2-m md:text-fs-h2 text-brand-text mb-6">
          <SplitText text={t(gateway.title, lang)} />
        </h2>
        <p className="font-sans font-medium text-fs-small md:text-fs-body-m text-brand-muted leading-relaxed mb-8">
          {t(gateway.body, lang)}
        </p>
        <CtaBar label={t(gateway.cta, lang)} href={gateway.href} />
        {gateway.subLabel && (
          <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60 mt-6">
            {t(gateway.subLabel, lang)}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function Gateways({ lang = DEFAULT_LANGUAGE }: { lang?: Language }) {
  return (
    <section id="contact" className="bg-brand-bg py-28">
      {/* ---- Row 1: text bottom-left, photo bleeding to the right edge ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end mb-10 lg:mb-16">
        <div className="order-2 lg:order-1 lg:col-span-4 px-6 md:pl-12 pb-4">
          <GatewayText gateway={valuationGateway} lang={lang} align="end" />
        </div>
        {/* Photo touches the right viewport edge (no right padding) */}
        <div className="order-1 lg:order-2 lg:col-span-8">
          <ClipPathReveal
            src={valuationGateway.image}
            alt={t(valuationGateway.title, lang)}
            aspectRatioClassName="aspect-[16/10]"
          />
        </div>
      </div>

      {/* ---- Row 2: photo bleeding to the left edge, text top-right ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
        {/* Photo touches the left viewport edge (no left padding) */}
        <div className="lg:col-span-7">
          <ClipPathReveal
            src={consultationGateway.image}
            alt={t(consultationGateway.title, lang)}
            aspectRatioClassName="aspect-[16/11]"
          />
        </div>
        <div className="lg:col-span-4 lg:col-start-9 px-6 md:pr-12 pt-4">
          <GatewayText gateway={consultationGateway} lang={lang} align="start" />
        </div>
      </div>
    </section>
  );
}
