import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Datenschutzerklärung der VERITALI Immobilien GmbH — Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
};

export default function DatenschutzLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
