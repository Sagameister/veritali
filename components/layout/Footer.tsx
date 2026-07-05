"use client";

// Editorial Footer — Halston-style multi-column layout.
// Deep navy base (slightly darker than the page), brass highlights,
// tiny uppercase headings, light link lists.

import { footerContent, seo, t, DEFAULT_LANGUAGE } from "../../data/content";
import type { Language } from "../../types";

export default function Footer({ lang = DEFAULT_LANGUAGE }: { lang?: Language }) {
  return (
    <footer className="bg-brand-surface border-t border-brand-text/10 px-6 md:px-12 pt-20 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
        {/* Brand column */}
        <div className="md:col-span-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/veritali-logo-white.svg"
            alt="Veritali"
            className="h-11 w-auto mb-4"
          />
          <p className="font-sans font-medium text-fs-small text-brand-muted max-w-sm">
            {t(footerContent.tagline, lang)}
          </p>

          {/* Office addresses */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-14 mt-8">
            {footerContent.offices.map((office, idx) => (
              <address key={idx} className="not-italic">
                <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-accent mb-3">
                  {t(office.label, lang)}
                </p>
                {office.lines.map((line, i) => (
                  <p key={i} className="font-sans font-medium text-fs-small text-brand-muted">
                    {line}
                  </p>
                ))}
              </address>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {footerContent.columns.map((column, idx) => (
          <div key={idx} className="md:col-span-2">
            <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-accent mb-6">
              {t(column.heading, lang)}
            </p>
            <ul className="space-y-3">
              {column.links.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="font-sans font-medium text-fs-small text-brand-muted hover:text-brand-orange"
                  >
                    {t(link.label, lang)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact column */}
        <div className="md:col-span-1">
          <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-accent mb-6">
            {lang === "de" ? "Kontakt" : "Contact"}
          </p>
          <p className="font-sans font-medium text-fs-small text-brand-muted whitespace-nowrap">
            {footerContent.contact.phone}
          </p>
          <p className="font-sans font-medium text-fs-small text-brand-muted">
            {footerContent.contact.email}
          </p>
        </div>
      </div>

      {/* LOCAL SEO: tagline + service regions as visible footer copy */}
      <div className="border-t border-brand-text/10 pt-8 pb-8">
        <p className="font-sans font-medium text-fs-small text-brand-text/70 mb-2">
          {t(seo.tagline, lang)}
        </p>
        <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-green">
          {seo.regions.join("  |  ")}
        </p>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-text/10 pt-8 flex flex-col md:flex-row justify-between gap-4">
        <p className="font-sans font-medium text-xs text-brand-text/40">
          © {new Date().getFullYear()} Veritali. {lang === "de" ? "Alle Rechte vorbehalten." : "All rights reserved."}
        </p>
        <a
          href="/hilfsprojekte"
          className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-green hover:text-brand-orange"
        >
          3% → VERITA-Schulprojekt im Kongo
        </a>
      </div>
    </footer>
  );
}
