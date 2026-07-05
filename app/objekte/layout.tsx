import type { Metadata } from "next";

// SEO metadata for the /objekte listing overview page.
export const metadata: Metadata = {
  title: "Objekte — Aktuelle Immobilienangebote",
  description:
    "Aktuelle Immobilienangebote von Veritali, Ihrem Immobilienmakler in Heidelberg: Häuser, Wohnungen und Denkmalimmobilien in Heidelberg, Mannheim, Wiesbaden und der Region — künstlerisch inszeniert, fair vermittelt.",
};

export default function ObjekteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
