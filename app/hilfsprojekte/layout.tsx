import type { Metadata } from "next";

// SEO metadata for the /hilfsprojekte page.
export const metadata: Metadata = {
  title: "Hilfsprojekte — VERITA-Schulprojekt im Kongo",
  description:
    "Veritali hilft: Gemeinsam mit ARW (Afrikas Renaissance und Wiederaufbau e.V.) finanziert das VERITA-Schulprojekt die Grundschulausbildung von Kindern aus besonders benachteiligten Familien in der DR Kongo.",
};

export default function HilfsprojekteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
