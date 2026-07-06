// Strongly-typed shapes for all content (agent.md §2).
// Rule 4 (Multi-Language Readiness): every piece of visible text lives in a
// Bilingual object so German/English can be swapped without touching code.

export type Language = "de" | "en";

/** A string that exists in both German and English. */
export interface Bilingual {
  de: string;
  en: string;
}

export interface Achievement {
  metric: string; // e.g. "100%" — numbers are language-neutral
  tone: "brass" | "terracotta"; // which accent color the number uses
  label: Bilingual;
  description: Bilingual; // kept in data for reuse, not shown in the grid
  image: string; // small thumbnail above the number (Halston style)
}

export interface Pillar {
  title: Bilingual;
  body: Bilingual;
}

export interface Service {
  index: string; // "01", "02", ...
  title: Bilingual;
  description: Bilingual;
  discipline: Bilingual; // meta row, e.g. "Vermarktung" (Halston: "Discipline")
  metric: Bilingual; // meta row, e.g. "100% Empfehlungen" (Halston: "Metric")
  image: string; // editorial photo for the services page row
}

/** One gallery photo with its room label (CMS-controlled later). */
export interface GalleryImage {
  src: string;
  label: Bilingual; // e.g. { de: "Wohnzimmer", en: "Living room" }
}

/** One editorial section on a listing detail page (heading + prose + bullets). */
export interface ListingSection {
  title: Bilingual;
  body: Bilingual;
  bullets?: Bilingual[];
}

/** Marketing status of a listing — drives the badge and the page split. */
export type ListingStatus = "available" | "reserved" | "sold";

export interface Listing {
  slug: string; // URL id, e.g. "reiheneckhaus-walldorf" → /objekte/reiheneckhaus-walldorf
  status: ListingStatus;
  category: Bilingual;
  title: Bilingual;
  location: string;
  year: string;
  parameters: string;
  price: string;
  summary: Bilingual;
  image: string; // placeholder photo URL (medium resolution for thumbnails)
  heroImage?: string; // high-resolution photo URL for detail page hero
  gallery: GalleryImage[]; // detail-page photos, each with a room label
  size: "large" | "small"; // drives the asymmetric masonry layout
  detail: {
    lead: Bilingual; // bold opening paragraph
    sections: ListingSection[];
    quote?: Bilingual; // optional pull quote
  };
}

export interface StoryChapter {
  label: Bilingual;
  title: Bilingual;
  body: Bilingual;
  image?: string;
}

export interface ClientStory {
  clientName: string;
  projectMeta: Bilingual;
  chapters: StoryChapter[];
}

export interface Collaborator {
  name: string;
  metadata: Bilingual;
  body: Bilingual;
}

export interface Gateway {
  title: Bilingual;
  body: Bilingual;
  cta: Bilingual;
  subLabel?: Bilingual;
  image: string; // the photo paired with this text block (checkerboard layout)
  href: string; // link destination, e.g. "/bewertung" or "/kontakt"
}

export interface NewsArticle {
  slug: string;
  title: Bilingual;
  date: string;
  coverImage: string;
  excerpt: Bilingual;
  body: Bilingual;
}
