import type { Metadata } from "next";

// SEO metadata for /services (the page itself is a client component,
// so the metadata lives in this thin server-side layout wrapper).
export const metadata: Metadata = {
  title: "Leistungen — Verkauf, Home Staging & Wertermittlung Heidelberg",
  description:
    "Leistungen von Veritali, Ihrem Immobilienmakler in Heidelberg: diskrete Vermarktung, Interior & Inszenierung, Sanierungsberatung, Home Staging und kostenfreie Wertermittlung — für Heidelberg, Mannheim, Bergstraße, Stuttgart, Frankfurt und Berlin.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
