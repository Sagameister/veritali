import type { Metadata } from "next";

// SEO metadata for the /kontakt page.
export const metadata: Metadata = {
  title: "Kontakt — Gespräch vereinbaren",
  description:
    "Kontaktieren Sie Veritali, Ihren Immobilienmakler in Heidelberg: kostenfreie Ersteinschätzung, diskrete Beratung für Verkauf und Suche — telefonisch, per E-Mail oder über unser Anfrageformular.",
};

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
