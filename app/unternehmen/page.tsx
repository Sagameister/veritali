"use client";

// The /unternehmen route — full company manifesto & details page.

import { useState } from "react";
import type { Language } from "../../types";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import UnternehmenPage from "../../components/views/UnternehmenPage";

export default function Unternehmen() {
  const [lang, setLang] = useState<Language>("de"); // German default

  return (
    <main>
      <Navigation lang={lang} onLangChange={setLang} />
      <UnternehmenPage lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}

