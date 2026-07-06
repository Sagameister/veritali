"use client";

// The /impressum page — legally required provider identification (§ 5 TMG).
// NOTE: The legal text is intentionally GERMAN-ONLY regardless of the
// language switcher — machine-translating legal notices is risky, and an
// Impressum for a German GmbH is customarily kept in German.

import { useState } from "react";
import type { Language } from "../../types";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import SplitText from "../../components/shared/SplitText";
import DividerLine from "../../components/shared/DividerLine";

// Company facts — rendered as a label/value table.
const companyFacts = [
  { label: "Gesellschaft", value: "VERITALI Immobilien GmbH" },
  { label: "Anschrift", value: "Langer Anger 7-9, 69115 Heidelberg" },
  { label: "Vertreten durch", value: "Geschäftsführerin Dr. Verena Beittinger-Lee" },
  { label: "Telefon", value: "0176 21015298", href: "tel:+4917621015298" },
  {
    label: "E-Mail",
    value: "kontakt@veritali-immobilien.de",
    href: "mailto:kontakt@veritali-immobilien.de",
  },
  { label: "Registergericht", value: "Amtsgericht Mannheim" },
  { label: "Registernummer", value: "HRB 749279" },
  { label: "USt-IdNr. (§ 27 a UStG)", value: "DE366270673" },
];

// Legal prose sections.
const sections: { title: string; paragraphs: React.ReactNode[] }[] = [
  {
    title: "EU-Streitschlichtung",
    paragraphs: [
      <>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:{" "}
        <a
          href="https://ec.europa.eu/consumers/odr/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-accent hover:text-brand-orange underline underline-offset-4"
        >
          https://ec.europa.eu/consumers/odr
        </a>
        . Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </>,
    ],
  },
  {
    title: "Verbraucherstreitbeilegung / Universalschlichtungsstelle",
    paragraphs: [
      "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    ],
  },
  {
    title: "Haftung für Inhalte",
    paragraphs: [
      "Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
      "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
    ],
  },
  {
    title: "Haftung für Links",
    paragraphs: [
      "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.",
      "Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
    ],
  },
  {
    title: "Urheberrecht",
    paragraphs: [
      "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.",
      "Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.",
    ],
  },
];

export default function Impressum() {
  const [lang, setLang] = useState<Language>("de");

  return (
    <main>
      <Navigation lang={lang} onLangChange={setLang} />

      <div className="bg-brand-bg">
        {/* ---- Page header ---- */}
        <header className="pt-40 pb-16 px-6 md:px-12">
          <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60 mb-4">
            RECHTLICHES
          </p>
          <h1 className="font-display font-medium text-fs-display-m md:text-fs-display leading-none text-brand-text">
            <SplitText text="Impressum" />
          </h1>
        </header>

        {/* ---- Company facts (§ 5 TMG) as a label/value table ---- */}
        <section className="px-6 md:px-12 pb-20">
          <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-green mb-6">
            ANGABEN GEMÄSS § 5 TMG
          </p>
          <div className="max-w-2xl border-t border-brand-text/15">
            {companyFacts.map((fact, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-6 py-4 border-b border-brand-text/10"
              >
                <dt className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60 shrink-0">
                  {fact.label}
                </dt>
                <dd className="font-sans font-medium text-fs-small text-brand-text sm:text-right">
                  {fact.href ? (
                    <a href={fact.href} className="hover:text-brand-orange">
                      {fact.value}
                    </a>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Legal prose sections ---- */}
        <section className="px-6 md:px-12 pb-20">
          <DividerLine />
          <div className="max-w-4xl pt-16 columns-1 md:columns-2 gap-8 md:gap-12">
            {sections.map((section, idx) => (
              <div key={idx} className="mb-10 break-inside-avoid">
                <h2 className="font-display font-medium text-fs-h2-m md:text-fs-h2 text-brand-text mb-5">
                  <SplitText text={section.title} staggerDelay={0.04} />
                </h2>
                {section.paragraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className="font-sans font-medium text-fs-small md:text-fs-body-m text-brand-muted leading-relaxed mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ---- Credit ---- */}
        <section className="px-6 md:px-12 pb-28">
          <DividerLine />
          <div className="pt-10 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
            <span className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60">
              Webdesign & Webentwicklung
            </span>
            <a
              href="https://desluv.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans font-medium text-fs-small text-brand-accent hover:text-brand-orange"
            >
              Desluv
            </a>
          </div>
        </section>
      </div>

      <Footer lang={lang} />
    </main>
  );
}
