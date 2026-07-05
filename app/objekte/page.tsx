"use client";

// The /objekte route — all property listings.
//
// STRUCTURE (built for growth):
//   1. Page header with object counter.
//   2. ACTIVE listings (Verfügbar) — always shown in full. The brand is
//      "deliberate capacity": there will only ever be a handful.
//   3. ARCHIVE (Reserviert / Verkauft) — where volume accumulates over
//      the years. Loads in batches of 8 via a "Mehr laden +" button;
//      the ?seite= URL parameter mirrors the state so deep links and
//      crawlers can reach every batch.

import { useEffect, useState } from "react";
import type { Language, Listing } from "../../types";
import { getListings } from "../../lib/listings";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import SplitText from "../../components/shared/SplitText";
import DividerLine from "../../components/shared/DividerLine";
import PortfolioGrid from "../../components/views/PortfolioGrid";

const ARCHIVE_BATCH = 8; // archive objects revealed per "Mehr laden" click

export default function Objekte() {
  const [lang, setLang] = useState<Language>("de"); // German default
  const [archivePages, setArchivePages] = useState(1);
  const [items, setItems] = useState<Listing[]>([]);

  useEffect(() => {
    getListings().then(setItems);
  }, []);

  const active = items.filter((item) => item.status === "available");
  const archive = items.filter((item) => item.status !== "available");
  const visibleArchive = archive.slice(0, archivePages * ARCHIVE_BATCH);
  const hasMore = visibleArchive.length < archive.length;

  // Restore batch depth from the URL (?seite=2) on first load.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("seite");
    const page = param ? parseInt(param, 10) : 1;
    if (!Number.isNaN(page) && page > 1) setArchivePages(page);
  }, []);

  // Reveal the next batch and mirror it into the URL (no page reload).
  const loadMore = () => {
    const next = archivePages + 1;
    setArchivePages(next);
    const url = new URL(window.location.href);
    url.searchParams.set("seite", String(next));
    window.history.replaceState(null, "", url.toString());
  };

  return (
    <main>
      <Navigation lang={lang} onLangChange={setLang} />

      <div className="bg-brand-bg">
        {/* ---- Page header ---- */}
        <header className="pt-40 px-6 md:px-12">
          <div className="flex items-baseline justify-between gap-6 mb-4">
            <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60">
              {lang === "de" ? "AUSGEWÄHLTE OBJEKTE" : "SELECTED WORKS"}
            </p>
            <p className="hidden md:block font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/40">
              {String(items.length).padStart(2, "0")}{" "}
              {lang === "de" ? "Objekte" : "Objects"}
            </p>
          </div>
          <h1 className="font-display font-medium text-fs-display-m md:text-fs-display leading-none text-brand-text max-w-4xl">
            <SplitText text="Bespoke Exposés" />
          </h1>
          <p className="font-sans font-medium text-fs-body-m md:text-fs-body text-brand-muted max-w-2xl mt-8">
            {lang === "de"
              ? "Bewusst wenige Mandate, ungeteilte Aufmerksamkeit: Jedes Objekt erhält eine künstlerische Inszenierung, die seine Seele sichtbar macht."
              : "Deliberately few mandates, undivided attention: every property receives an artistic presentation that makes its soul visible."}
          </p>
        </header>

        {/* ---- 2. Active listings (always all) ---- */}
        <PortfolioGrid lang={lang} showHeading={false} items={active} variant="compact" />

        {/* ---- 3. Archive with "Mehr laden" batching ---- */}
        {archive.length > 0 && (
          <section className="px-6 md:px-12 pb-28">
            <DividerLine />
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-6 pt-16 mb-12">
              <h2 className="font-display font-medium text-fs-h1-m md:text-fs-h1 text-brand-text">
                <SplitText text={lang === "de" ? "Referenzen" : "References"} />
              </h2>
              <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/40">
                {lang === "de" ? "Verkauft & Reserviert" : "Sold & Reserved"}
              </p>
            </div>

            <PortfolioGrid lang={lang} showHeading={false} items={visibleArchive} variant="compact" />

            {hasMore && (
              <div className="flex justify-center">
                <button
                  onClick={loadMore}
                  className="group flex items-center gap-6 border border-brand-accent/50 px-8 py-4 hover:border-brand-orange"
                >
                  <span className="font-sans font-bold text-fs-label uppercase tracking-[0.18em] text-brand-accent group-hover:text-brand-orange transition-colors duration-700 ease-editorial">
                    {lang === "de" ? "Mehr laden" : "Load more"}
                  </span>
                  <span className="text-brand-accent transition-transform duration-700 ease-editorial group-hover:translate-x-1">
                    +
                  </span>
                </button>
              </div>
            )}
          </section>
        )}
      </div>

      <Footer lang={lang} />
    </main>
  );
}
