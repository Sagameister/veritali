import type { Metadata } from "next";
import { getListings, getListingBySlug } from "../../../lib/listings";

// Server-side wrapper for the client detail page: provides per-listing
// SEO metadata and tells Next.js which slugs exist at build time.

export async function generateStaticParams() {
  const items = await getListings();
  return items.map((listing) => ({ slug: listing.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const listing = await getListingBySlug(params.slug);
  if (!listing) return { title: "Objekt" };

  return {
    title: `${listing.title.de} — ${listing.location}`,
    description: `${listing.summary.de} ${listing.parameters}. ${listing.price}.`,
    openGraph: {
      title: listing.title.de,
      description: listing.summary.de,
      images: [listing.image],
    },
  };
}


export default function ObjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
