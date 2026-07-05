import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum der VERITALI Immobilien GmbH, Langer Anger 7-9, 69115 Heidelberg — Angaben gemäß § 5 TMG.",
};

export default function ImpressumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
