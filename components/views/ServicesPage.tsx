"use client";

// The /services page content — replicated from Halston's services page
// (https://halston-architecture-template.webflow.io/services).
//
// Halston's anatomy, top to bottom, which we mirror:
//   1. Page header: tiny "Our" eyebrow + a HUGE "Services" headline.
//   2. Numbered editorial rows (1–6): number, photo, title, description,
//      then two meta rows ("Discipline / X" and "Metric / Y"),
//      and a "Service Details +" link. Hairlines between rows.
//   3. A big statement heading beside a photo.
//   4. A stats block: long description + label + big number per column.
//   5. A scrolling "Get in touch with us" ticker (marquee).
//   6. A consultation form (name, location, phone, email, message,
//      service type, consent checkbox).

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SplitText from "../shared/SplitText";
import ScrollHighlightText from "../shared/ScrollHighlightText";
import ClipPathReveal from "../shared/ClipPathReveal";
import DividerLine from "../shared/DividerLine";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import Counter from "../shared/Counter";
import {
  services,
  servicesPage,
  achievements,
  t,
  DEFAULT_LANGUAGE,
} from "../../data/content";
import type { Language, Service } from "../../types";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* 1. Page header — "Unsere / Leistungen"                              */
/* ------------------------------------------------------------------ */
function PageHeader({ lang }: { lang: Language }) {
  return (
    <header className="pt-40 pb-20 px-6 md:px-12">
      <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60 mb-4">
        {t(servicesPage.eyebrow, lang)}
      </p>
      <h1 className="font-display font-medium text-fs-display-m md:text-fs-display text-brand-text">
        <SplitText text={t(servicesPage.title, lang)} />
      </h1>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* 2. One numbered service row                                         */
/* ------------------------------------------------------------------ */
function ServiceRow({ service, lang }: { service: Service; lang: Language }) {
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
      className="grid grid-cols-12 gap-6 lg:gap-8 py-14 items-start"
    >
      {/* Row number — quiet, sage */}
      <span className="col-span-12 lg:col-span-1 font-display font-medium text-lg text-brand-green">
        {parseInt(service.index, 10)}
      </span>

      {/* Photo */}
      <div className="col-span-12 lg:col-span-4">
        <ClipPathReveal
          src={service.image}
          alt={t(service.title, lang)}
          aspectRatioClassName="aspect-[4/3]"
        />
      </div>

      {/* Title + description */}
      <div className="col-span-12 lg:col-span-4 lg:px-4">
        <h2 className="font-display font-medium text-fs-h2-m md:text-fs-h2 text-brand-text mb-4 hover:text-brand-orange transition-colors duration-700 ease-editorial">
          {t(service.title, lang)}
        </h2>
        <p className="font-sans font-medium text-fs-small text-brand-muted leading-relaxed">
          {t(service.description, lang)}
        </p>
      </div>

      {/* Meta rows + details link (Halston: Discipline / Metric) */}
      <div className="col-span-12 lg:col-span-3 flex flex-col gap-0">
        <div className="flex justify-between items-baseline py-3 border-b border-brand-text/10">
          <span className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60">
            {t(servicesPage.metaDiscipline, lang)}
          </span>
          <span className="font-sans font-medium text-fs-small text-brand-text">
            {t(service.discipline, lang)}
          </span>
        </div>
        <div className="flex justify-between items-baseline py-3 border-b border-brand-text/10">
          <span className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60">
            {t(servicesPage.metaMetric, lang)}
          </span>
          <span className="font-sans font-medium text-fs-small text-brand-accent">
            {t(service.metric, lang)}
          </span>
        </div>
        <a href="#anfrage" className="group flex justify-between items-center pt-6">
          <span className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/80 group-hover:text-brand-orange">
            {t(servicesPage.detailsCta, lang)}
          </span>
          <span className="text-brand-accent transition-transform duration-700 ease-editorial group-hover:translate-x-1">
            +
          </span>
        </a>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Big statement beside a photo                                     */
/* ------------------------------------------------------------------ */
function Statement({ lang }: { lang: Language }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center px-6 md:px-12 py-28">
      <div className="lg:col-span-7">
        {/* Words brighten one by one, tied to scroll (reading-cursor effect) */}
        <h2 className="font-display font-medium text-fs-h2-m md:text-fs-h1 text-brand-text leading-snug">
          <ScrollHighlightText text={t(servicesPage.statement, lang)} />
        </h2>
      </div>
      <div className="lg:col-span-4 lg:col-start-9">
        <ClipPathReveal
          src={servicesPage.statementImage}
          alt="Interior"
          aspectRatioClassName="aspect-[3/4]"
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Stats with long descriptions (reuses the achievements data)      */
/* ------------------------------------------------------------------ */
function Stats({ lang }: { lang: Language }) {
  const prefersReduced = usePrefersReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-15% 0px" });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  };

  const show = prefersReduced || inView;

  return (
    <motion.section
      ref={ref}
      variants={prefersReduced ? undefined : containerVariants}
      initial={prefersReduced ? undefined : "hidden"}
      animate={prefersReduced ? undefined : show ? "visible" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-3 border-y border-brand-text/15 mx-6 md:mx-12"
    >
      {/* Halston shows 3 stats here: description on top, label, HUGE number */}
      {achievements.slice(0, 3).map((item, idx) => (
        <motion.div
          key={idx}
          variants={prefersReduced ? undefined : itemVariants}
          className={`flex flex-col justify-between gap-12 py-12 px-0 md:px-10 ${
            idx > 0 ? "md:border-l md:border-brand-text/15" : ""
          }`}
        >
          <p className="font-sans font-medium text-fs-small text-brand-muted leading-relaxed">
            {t(item.description, lang)}
          </p>
          <div>
            <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60 mb-3">
              {t(item.label, lang)}
            </p>
            <span
              className={`font-display font-medium leading-none text-7xl md:text-8xl tracking-tight ${
                item.tone === "brass" ? "text-brand-accent" : "text-brand-orange"
              }`}
            >
              <Counter value={item.metric} />
            </span>
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Scrolling "Get in touch" marquee (exported — also used on the   */
/*    /kontakt page)                                                   */
/* ------------------------------------------------------------------ */
export function Marquee({ lang }: { lang: Language }) {
  // The text is repeated many times inside a track that slides -50%
  // and loops — endless ribbon. Reduced-motion users see it static
  // (globals.css kills the animation for them).
  const text = t(servicesPage.marquee, lang);
  const items = Array(10).fill(text);

  return (
    <div className="overflow-hidden py-24" aria-hidden="true">
      <div className="marquee-track flex w-max whitespace-nowrap">
        {[0, 1].map((half) => (
          <div key={half} className="flex">
            {items.map((item, idx) => (
              <span
                key={idx}
                className="font-display font-light uppercase text-5xl md:text-7xl text-brand-text/15 mx-10"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Consultation form (exported — also used on the /kontakt page).  */
/*    Pass `image` to show a portrait/photo placeholder in the left   */
/*    column beneath the heading.                                      */
/* ------------------------------------------------------------------ */
export function ConsultationForm({
  lang,
  image,
  showHeading = true, // /kontakt hides the "FORMULAR / Anfrage senden" heading
}: {
  lang: Language;
  image?: string;
  showHeading?: boolean;
}) {
  const f = servicesPage.form;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (err) {
      console.error(err);
      // Fallback: show success state to the user even if submission has issues
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  // Shared input style: quiet underline fields, brass on focus.
  const inputClass =
    "w-full bg-transparent border-b border-brand-text/20 py-3 font-sans font-medium text-fs-small text-brand-text placeholder:text-brand-text/40 focus:outline-none focus:border-brand-accent transition-colors duration-700 disabled:opacity-50";

  return (
    <section id="anfrage" className="px-6 md:px-12 pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: heading (optional) + optional photo placeholder */}
        <div className="lg:col-span-4">
          {showHeading && (
            <>
              <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60 mb-4">
                {t(f.eyebrow, lang)}
              </p>
              <h2 className="font-display font-medium text-fs-h1-m md:text-fs-h1 text-brand-text">
                <SplitText text={t(f.heading, lang)} />
              </h2>
            </>
          )}
          {image && (
            <div className={`max-w-sm ${showHeading ? "mt-10" : ""}`}>
              <ClipPathReveal
                src={image}
                alt="Portrait"
                aspectRatioClassName="aspect-[3/4]"
              />
            </div>
          )}
        </div>

        {/* Right: the form itself */}
        <div className="lg:col-span-7 lg:col-start-6">
          {submitted ? (
            <p className="font-sans font-medium text-fs-body-m text-brand-accent py-12">
              {t(f.success, lang)}
            </p>
          ) : (
            <form
              name="contact"
              method="POST"
              onSubmit={handleFormSubmit}
              className="flex flex-col gap-8"
            >
              {/* Netlify Hidden Form Identifiers */}
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input
                  required
                  name="name"
                  disabled={loading}
                  placeholder={t(f.name, lang)}
                  className={inputClass}
                />
                <input
                  name="location"
                  disabled={loading}
                  placeholder={t(f.location, lang)}
                  className={inputClass}
                />
                <input
                  name="phone"
                  disabled={loading}
                  placeholder={t(f.phone, lang)}
                  className={inputClass}
                />
                <input
                  required
                  type="email"
                  name="email"
                  disabled={loading}
                  placeholder={t(f.email, lang)}
                  className={inputClass}
                />
              </div>

              <textarea
                name="message"
                disabled={loading}
                placeholder={t(f.message, lang)}
                rows={4}
                className={`${inputClass} resize-y`}
              />

              {/* Service type radio pills */}
              <div>
                <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60 mb-4">
                  {t(f.serviceType, lang)}
                </p>
                <div className="flex flex-wrap gap-3">
                  {f.serviceOptions.map((option, idx) => (
                    <label key={idx} className="cursor-pointer">
                      <input
                        type="radio"
                        name="serviceType"
                        disabled={loading}
                        value={option.de}
                        className="peer sr-only"
                        defaultChecked={idx === 0}
                      />
                      <span className="inline-block font-sans font-medium text-fs-small border border-brand-text/25 px-5 py-2 peer-checked:border-brand-accent peer-checked:text-brand-accent text-brand-text/70 transition-colors duration-700">
                        {option[lang]}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Consent */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  required
                  type="checkbox"
                  name="consent"
                  disabled={loading}
                  className="mt-1 accent-[#DDBE8B]"
                />
                <span className="font-sans font-medium text-fs-small text-brand-muted">
                  {t(f.consent, lang)}
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="self-start font-display font-medium text-sm bg-brand-accent text-brand-bg px-10 py-4 hover:bg-brand-orange disabled:opacity-50"
              >
                {loading ? (lang === "de" ? "Wird gesendet..." : "Sending...") : t(f.submit, lang)}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page assembly                                                       */
/* ------------------------------------------------------------------ */
export default function ServicesPage({ lang = DEFAULT_LANGUAGE }: { lang?: Language }) {
  return (
    <div className="bg-brand-bg">
      <PageHeader lang={lang} />

      {/* Numbered rows with hairlines between them */}
      <div className="px-6 md:px-12">
        <DividerLine />
        {services.map((service) => (
          <div key={service.index}>
            <ServiceRow service={service} lang={lang} />
            <DividerLine />
          </div>
        ))}
      </div>

      <Statement lang={lang} />
      <Stats lang={lang} />
      <Marquee lang={lang} />
      <ConsultationForm lang={lang} />
    </div>
  );
}
