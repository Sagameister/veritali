import type { Metadata } from "next";
// next/font downloads the Google Fonts at build time and self-hosts them —
// faster, and no layout shift while fonts load.
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "../styles/globals.css";
import SmoothScroll from "../components/layout/SmoothScroll";

// Header font: Space Grotesk — Medium 500 (house style) plus Light 300
// (used only for the oversized ticker on the services page).
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "500"],
  variable: "--font-display", // exposed as a CSS variable for Tailwind
  display: "swap",
});

// Body font: Plus Jakarta Sans — Medium 500 everywhere, plus Bold 700
// reserved for the top-bar navigation links.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-sans",
  display: "swap",
});

// LOCAL SEO: the title leads with "Immobilienmakler Heidelberg" — the exact
// phrase clients search for — and the description names the service regions.
export const metadata: Metadata = {
  title: {
    default: "Immobilienmakler Heidelberg — Veritali | Faire 1,5% Provision",
    template: "%s | Veritali — Immobilienmakler Heidelberg",
  },
  description:
    "Ihr kompetenter und fairer Immobilienmakler in Heidelberg — nur 1,5% Provision. Eigentümergeführtes Boutique-Maklerbüro für Heidelberg, Mannheim, Bergstraße, Stuttgart, Frankfurt und Berlin. Künstlerische Exposés, 100% Empfehlungsrate, 3% globaler Purpose.",
  keywords: [
    "Immobilienmakler Heidelberg",
    "Immobilien Heidelberg",
    "Makler Heidelberg",
    "Immobilienmakler Mannheim",
    "Immobilienmakler Bergstraße",
    "faire Provision Immobilienmakler",
    "1,5% Provision",
    "Immobilie verkaufen Heidelberg",
    "Wertermittlung Heidelberg",
  ],
  openGraph: {
    title: "Veritali — Immobilienmakler Heidelberg | Faire 1,5% Provision",
    description:
      "Eigentümergeführtes Boutique-Maklerbüro in Heidelberg. Faire 1,5% Provision, künstlerische Exposés und 3% globaler Purpose.",
    locale: "de_DE",
    alternateLocale: "en_US",
    type: "website",
  },
};

// Structured data (JSON-LD): tells Google explicitly "this is a real
// estate agent based in Heidelberg serving these regions" — this is what
// powers local search results and the map pack.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Veritali",
  description:
    "Eigentümergeführtes Boutique-Maklerbüro in Heidelberg. Faire 1,5% Provision, künstlerische Exposés, 3% der Nettoprovision für humanitäre Projekte im Kongo.",
  telephone: "+49 176 21015298",
  email: "kontakt@veritali.de",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Heidelberg",
    addressRegion: "Baden-Württemberg",
    addressCountry: "DE",
  },
  areaServed: [
    "Heidelberg",
    "Mannheim",
    "Bergstraße",
    "Stuttgart",
    "Frankfurt",
    "Berlin",
  ],
  priceRange: "1,5% Provision (zzgl. MwSt.)",
  knowsLanguage: ["de", "en"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // German default (content is bilingual and swappable — see data/content.ts)
    <html lang="de" className={`${spaceGrotesk.variable} ${jakarta.variable}`}>
      <body className="bg-brand-bg text-brand-text font-sans font-medium">
        {/* Structured data for local search (invisible to visitors) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/*
          SmoothScroll wraps the WHOLE site exactly once (never per-component)
          so Lenis drives a single, unhurried global scroll.
        */}
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
