"use client";

// Dynamic object detail route: /objekte/reiheneckhaus-walldorf etc.
// The [slug] folder name means Next.js fills in whatever comes after
// /objekte/ as a parameter; we look up the matching listing by slug.

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import type { Language, Listing } from "../../../types";
import { getListingBySlug } from "../../../lib/listings";
import Navigation from "../../../components/layout/Navigation";
import Footer from "../../../components/layout/Footer";
import ListingDetail from "../../../components/views/ListingDetail";

export default function ObjectDetailPage() {
  const [lang, setLang] = useState<Language>("de"); // German default
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams<{ slug: string }>();

  useEffect(() => {
    if (params.slug) {
      getListingBySlug(params.slug).then((res) => {
        setListing(res);
        setLoading(false);
      });
    }
  }, [params.slug]);

  if (loading) {
    return (
      <main className="bg-brand-bg min-h-screen text-brand-text flex items-center justify-center font-sans font-medium text-sm">
        {lang === "de" ? "Wird geladen..." : "Loading..."}
      </main>
    );
  }

  if (!listing) notFound(); // unknown slug → 404 page

  return (
    <main>
      <Navigation lang={lang} onLangChange={setLang} />
      <ListingDetail listing={listing} lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}

