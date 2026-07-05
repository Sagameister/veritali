"use client";

// The /services route — Halston-style dedicated services page.
// Same pattern as the homepage: this component owns the language state,
// the Navigation switcher flips it, everything below re-renders.

import { useState } from "react";
import type { Language } from "../../types";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import ServicesPage from "../../components/views/ServicesPage";

export default function Services() {
  const [lang, setLang] = useState<Language>("de"); // German default

  return (
    <main>
      <Navigation lang={lang} onLangChange={setLang} />
      <ServicesPage lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
