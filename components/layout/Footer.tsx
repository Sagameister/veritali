"use client";

// Editorial Footer — Halston-style multi-column layout.
// Deep navy base (slightly darker than the page), brass highlights,
// tiny uppercase headings, light link lists, and an integrated mailing list form.

import { useState } from "react";
import { footerContent, seo, t, DEFAULT_LANGUAGE } from "../../data/content";
import type { Language } from "../../types";

export default function Footer({ lang = DEFAULT_LANGUAGE }: { lang?: Language }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Failed to subscribe");
      }

      setSubscribed(true);
      setEmail("");
    } catch (err) {
      console.error(err);
      setErrorMsg(lang === "de" ? "Fehler beim Eintragen." : "Failed to subscribe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-brand-surface border-t border-brand-text/10 px-6 md:px-12 pt-20 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
        {/* Brand column */}
        <div className="md:col-span-4">
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
        <div className="md:col-span-2">
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

        {/* Mailing list column */}
        <div className="md:col-span-2">
          <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-accent mb-6">
            {lang === "de" ? "Newsletter" : "Mailing List"}
          </p>
          <p className="font-sans font-medium text-fs-small text-brand-muted leading-relaxed">
            {lang === "de"
              ? "Tragen Sie sich ein, um neue Off-Market-Objekte vorab zu erhalten."
              : "Subscribe to receive new off-market listings before they launch."}
          </p>
          
          {subscribed ? (
            <p className="mt-4 font-sans font-medium text-fs-small text-brand-accent transition-all duration-300">
              ✓ {lang === "de" ? "Erfolgreich eingetragen!" : "Successfully subscribed!"}
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="relative mt-4 flex items-center border-b border-brand-text/30 focus-within:border-brand-accent transition-colors duration-400">
              <input
                type="email"
                required
                disabled={loading}
                placeholder={lang === "de" ? "E-Mail-Adresse" : "Email address"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent py-2 w-full text-fs-small font-sans focus:outline-none placeholder:text-brand-muted/70 text-brand-text pr-10 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-accent hover:text-brand-orange text-lg font-bold cursor-pointer disabled:opacity-50"
                aria-label="Abonnieren"
              >
                {loading ? "..." : "→"}
              </button>
            </form>
          )}

          {errorMsg && (
            <p className="mt-2 font-sans font-medium text-xs text-brand-orange">
              {errorMsg}
            </p>
          )}
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
