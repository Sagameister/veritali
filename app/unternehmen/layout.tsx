import type { Metadata } from "next";

// SEO metadata for the /unternehmen page.
export const metadata: Metadata = {
  title: "Unternehmen — Das Prinzip der bewussten Kapazität",
  description:
    "Warum Veritali die Anzahl aktiver Mandate bewusst limitiert: ungeteilte Aufmerksamkeit, künstlerische Exposés und eine faire Provision von nur 1,5% — Ihr eigentümergeführter Immobilienmakler in Heidelberg.",
};

export default function UnternehmenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

