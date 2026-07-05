"use client";

// The /objekte route — all property listings in a single unified grid.
// Available properties appear first, followed by reserved and sold properties chronologically.

import { useEffect, useState } from "react";
import type { Language, Listing } from "../../types";
import { getListings } from "../../lib/listings";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import SplitText from "../../components/shared/SplitText";
import PortfolioGrid from "../../components/views/PortfolioGrid";

export default function Objekte() {
  const [lang, setLang] = useState<Language>("de"); // German default
  const [items, setItems] = useState<Listing[]>([]);

  useEffect(() => {
    getListings().then(setItems);
  }, []);

  // Sort: Available listings first, everything else chronologically (retaining API order)
  const sorted = [...items].sort((a, b) => {
    if (a.status === "available" && b.status !== "available") return -1;
    if (a.status !== "available" && b.status === "available") return 1;
    return 0;
  });

  return (
    <main>
      <Navigation lang={lang} onLangChange={setLang} />

      <div className="bg-brand-bg pb-24">
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

        {/* ---- 2. Unified Grid Grid (Available first, then Reserved/Sold) ---- */}
        <PortfolioGrid lang={lang} showHeading={false} items={sorted} variant="compact" />
      </div>

      <Footer lang={lang} />
    </main>
  );
}
