"use client";

// The landing page — stacks all nine sections in Halston's editorial order.
//
// LANGUAGE SWITCHING: this component owns ONE piece of state — the current
// language ("de" by default). The Navigation's DE/EN switcher changes it,
// and because every section receives it as a prop, the entire page swaps
// language instantly. All copy lives in data/content.ts as {de, en} pairs.

import { useState, useEffect } from "react";
import type { Language, Listing } from "../types";
import { getListings } from "../lib/listings";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import Hero from "../components/views/Hero";
import Achievements from "../components/views/Achievements";
import Philosophy from "../components/views/Philosophy";
import Services from "../components/views/Services";
import PortfolioGrid from "../components/views/PortfolioGrid";
import ClientStories from "../components/views/ClientStories";
import Gateways from "../components/views/Gateways";

export default function Home() {
  // "de" is the default; the nav switcher flips this to "en" and back.
  const [lang, setLang] = useState<Language>("de");
  const [items, setItems] = useState<Listing[]>([]);

  useEffect(() => {
    getListings().then(setItems);
  }, []);

  // Sort available first, then reserved/sold chronologically. Limit to 6.
  const sortedAndSliced = [...items]
    .sort((a, b) => {
      if (a.status === "available" && b.status !== "available") return -1;
      if (a.status !== "available" && b.status === "available") return 1;
      return 0;
    })
    .slice(0, 6);

  return (
    <main>
      <Navigation lang={lang} onLangChange={setLang} />
      <Hero lang={lang} />
      <Achievements lang={lang} />
      <Philosophy lang={lang} />
      <Services lang={lang} />
      
      <div>
        <PortfolioGrid lang={lang} items={sortedAndSliced} variant="compact" cols={3} />
        
        {/* See all listings button */}
        <div className="flex justify-center bg-brand-bg pb-24">
          <a
            href="/objekte"
            className="group flex items-center gap-6 border border-brand-accent/50 px-8 py-4 hover:border-brand-orange"
          >
            <span className="font-sans font-bold text-fs-label uppercase tracking-[0.18em] text-brand-accent group-hover:text-brand-orange transition-colors duration-700 ease-editorial">
              {lang === "de" ? "Alle Objekte ansehen" : "See all listings"}
            </span>
            <span className="text-brand-accent transition-transform duration-700 ease-editorial group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>

      <ClientStories lang={lang} />
      <Gateways lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}

