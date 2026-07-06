"use client";

// The /news route — overview list of all news items.

import { useState } from "react";
import type { Language } from "../../types";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import NewsPage from "../../components/views/NewsPage";

export default function News() {
  const [lang, setLang] = useState<Language>("de"); // German default

  return (
    <main>
      <Navigation lang={lang} onLangChange={setLang} />
      <NewsPage lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
