import { listings as mockListings } from "../data/content";
import type { Listing, ListingStatus, ListingSection } from "../types";

const PROPSTACK_API_KEY = process.env.PROPSTACK_API_KEY;
const API_URL = "https://api.propstack.de/v1/units?expand=1";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

function formatPrice(value?: number): string {
  if (!value) return "Preis auf Anfrage";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

// Maps Propstack Unit structure to Veritali Listing interface
function mapPropstackUnitToListing(unit: any): Listing {
  const titleDe = unit.title || "Immobilie";
  const titleEn = unit.custom_fields?.title_en || titleDe;

  const descDe = unit.description_note || "";
  const descEn = unit.custom_fields?.description_en || descDe;

  const slug = unit.custom_fields?.slug || slugify(titleDe);

  const rooms = unit.rooms ? `${unit.rooms} Zimmer` : "";
  const space = unit.space?.living_space ? `${Math.round(unit.space.living_space)} m²` : "";
  const paramsArray = [rooms, space].filter(Boolean);

  let status: ListingStatus = "available";
  const statusName = typeof unit.status === "object" ? unit.status.name : unit.status;
  if (statusName === "reserved") {
    status = "reserved";
  } else if (statusName === "sold" || statusName === "offline") {
    status = "sold";
  }

  const sections: ListingSection[] = [];
  if (descDe) {
    sections.push({
      title: { de: "Beschreibung", en: "Description" },
      body: { de: descDe, en: descEn },
    });
  }
  if (unit.location_note) {
    sections.push({
      title: { de: "Lage", en: "Location" },
      body: { de: unit.location_note, en: unit.custom_fields?.location_en || unit.location_note },
    });
  }
  if (unit.furnishing_note) {
    sections.push({
      title: { de: "Ausstattung", en: "Furnishing" },
      body: { de: unit.furnishing_note, en: unit.custom_fields?.furnishing_en || unit.furnishing_note },
    });
  }

  const gallery = (unit.images || []).map((img: any) => ({
    src: img.url,
    label: {
      de: img.description || "Ansicht",
      en: img.description || "View",
    },
  }));

  const mainImage =
    unit.title_image?.url ||
    gallery[0]?.src ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop";

  return {
    slug,
    status,
    category: {
      de: "STUDIO MANDAT",
      en: "STUDIO MANDATE",
    },
    title: { de: titleDe, en: titleEn },
    location: unit.city ? `${unit.city}${unit.zip_code ? `, ${unit.zip_code}` : ""}` : "Baden-Württemberg",
    year: unit.construction_year ? String(unit.construction_year) : "2026",
    parameters: paramsArray.join(" | ") || "Studio Mandat",
    price: formatPrice(unit.price?.value),
    summary: {
      de: descDe.substring(0, 180) + (descDe.length > 180 ? "..." : ""),
      en: descEn.substring(0, 180) + (descEn.length > 180 ? "..." : ""),
    },
    image: mainImage,
    gallery,
    size: "large",
    detail: {
      lead: {
        de: descDe.substring(0, 240) + (descDe.length > 240 ? "..." : ""),
        en: descEn.substring(0, 240) + (descEn.length > 240 ? "..." : ""),
      },
      sections,
    },
  };
}

export async function getListings(): Promise<Listing[]> {
  if (!PROPSTACK_API_KEY) {
    console.log("Propstack API Key is not set, using static mock listings.");
    return mockListings;
  }

  try {
    const res = await fetch(API_URL, {
      headers: {
        "X-API-KEY": PROPSTACK_API_KEY,
        Accept: "application/json",
      },
      next: { revalidate: 60 }, // Cache listings for 1 minute
    });

    if (!res.ok) {
      throw new Error(`Propstack API responded with status ${res.status}`);
    }

    const data = await res.json();
    const units = Array.isArray(data) ? data : data?.data || [];

    if (!units || units.length === 0) {
      return mockListings;
    }

    return units.filter((unit: any) => unit.title).map(mapPropstackUnitToListing);
  } catch (error) {
    console.error("Failed to fetch listings from Propstack API, using fallback:", error);
    return mockListings;
  }
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const listings = await getListings();
  return listings.find((item) => item.slug === slug) || null;
}
