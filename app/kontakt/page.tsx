"use client";

// The /kontakt page — mirrors the contact block from the services page
// (marquee + consultation form), preceded by a proper page header with
// contact details, and with a portrait photo placeholder in the form's
// left column (swap the URL for a real portrait later).

import { useState } from "react";
import type { Language } from "../../types";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import SplitText from "../../components/shared/SplitText";
import { ConsultationForm } from "../../components/views/ServicesPage";
import { consultationGateway, t } from "../../data/content";

// Official portrait of Dr. Verena Beittinger-Lee
const PORTRAIT_IMAGE = "/images/Vee.webp";

export default function KontaktPage() {
  const [lang, setLang] = useState<Language>("de"); // German default

  return (
    <main>
      <Navigation lang={lang} onLangChange={setLang} />

      <div className="bg-brand-bg">
        {/* ---- Page header ---- */}
        <header className="pt-40 pb-16 px-6 md:px-12">
          <h1 className="font-display font-medium text-fs-display-m md:text-fs-display leading-none text-brand-text max-w-4xl mb-10">
            <SplitText text={t(consultationGateway.title, lang)} />
          </h1>

          {/* Friendly one-liner instead of a contact-detail table
              (phone + email still live in the footer) */}
          <p className="font-sans font-medium text-fs-body-m md:text-fs-body text-brand-muted max-w-2xl">
            {lang === "de"
              ? "Ob Verkauf, Suche oder einfach eine erste Frage — schreiben Sie uns ein paar Zeilen. Wir melden uns persönlich, meist noch am selben Tag."
              : "Whether you're selling, searching, or simply have a first question — drop us a few lines. We'll get back to you personally, usually the same day."}
          </p>
        </header>

        {/* ---- Consultation form (no heading) with official portrait ---- */}
        <ConsultationForm lang={lang} image={PORTRAIT_IMAGE} showHeading={false} />
      </div>

      <Footer lang={lang} />
    </main>
  );
}
