import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Immobilienbewertung — Veritali",
  description: "Kostenlose und unverbindliche Einwertung Ihrer Immobilie.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
