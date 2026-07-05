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

  return (
    <main>
      <Navigation lang={lang} onLangChange={setLang} />
      <Hero lang={lang} />
      <Achievements lang={lang} />
      <Philosophy lang={lang} />
      <Services lang={lang} />
      <PortfolioGrid lang={lang} items={items} />
      <ClientStories lang={lang} />
      <Gateways lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}

