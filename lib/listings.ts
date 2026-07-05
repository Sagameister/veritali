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
  const titleDe = unit.title?.value || unit.name || "Immobilie";
  const titleEn = unit.custom_fields?.title_en || titleDe;

  const descDe = unit.description_note?.value || "";
  const descEn = unit.custom_fields?.description_en || descDe;

  const slug = unit.custom_fields?.slug || slugify(titleDe);

  const roomsVal = typeof unit.number_of_rooms === "object" ? unit.number_of_rooms?.value : unit.number_of_rooms;
  const rooms = roomsVal ? `${roomsVal} Zimmer` : "";

  const spaceVal = typeof unit.living_space === "object" ? unit.living_space?.value : unit.living_space;
  const space = spaceVal ? `${Math.round(spaceVal)} m²` : "";

  const paramsArray = [rooms, space].filter(Boolean);

  let status: ListingStatus = "available";
  const statusName = unit.property_status?.name;
  if (statusName === "Reserviert" || statusName === "reserved") {
    status = "reserved";
  } else if (
    statusName === "Abgeschlossen" ||
    statusName === "sold" ||
    statusName === "offline" ||
    statusName === "Verkauft"
  ) {
    status = "sold";
  }

  const sections: ListingSection[] = [];
  if (descDe) {
    sections.push({
      title: { de: "Beschreibung", en: "Description" },
      body: { de: descDe, en: descEn },
    });
  }

  const locDe = unit.location_note?.value || "";
  const locEn = unit.custom_fields?.location_en || locDe;
  if (locDe) {
    sections.push({
      title: { de: "Lage", en: "Location" },
      body: { de: locDe, en: locEn },
    });
  }

  const furnDe = unit.furnishing_note?.value || "";
  const furnEn = unit.custom_fields?.furnishing_en || furnDe;
  if (furnDe) {
    sections.push({
      title: { de: "Ausstattung", en: "Furnishing" },
      body: { de: furnDe, en: furnEn },
    });
  }

  const gallery = (unit.images || []).map((img: any) => ({
    // For slider displays and lightboxes, use the high-quality but compressed big_url (fallback to original url)
    src: img.big_url || img.url,
    label: {
      de: img.description || img.title || "Ansicht",
      en: img.description || img.title || "View",
    },
  }));

  // For grid thumbnails, use the medium_url (fallback to big_url or original url)
  const mainImage =
    unit.title_image?.medium_url ||
    unit.title_image?.url ||
    unit.images?.[0]?.medium_url ||
    gallery[0]?.src ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop";

  const yearVal = typeof unit.construction_year === "object" ? unit.construction_year?.value : unit.construction_year;
  const year = yearVal ? String(yearVal) : "2026";

  const priceVal = typeof unit.price === "object" ? unit.price?.value : unit.price;

  return {
    slug,
    status,
    category: {
      de: "STUDIO MANDAT",
      en: "STUDIO MANDATE",
    },
    title: { de: titleDe, en: titleEn },
    location: unit.city ? `${unit.city}${unit.zip_code ? `, ${unit.zip_code}` : ""}` : "Baden-Württemberg",
    year,
    parameters: paramsArray.join(" | ") || "Studio Mandat",
    price: formatPrice(priceVal),
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
  // If running in the browser (client-side), query our secure API route
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/listings");
      if (!res.ok) throw new Error(`API route failed with status ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error("Client fetch from /api/listings failed, falling back to static:", error);
      return mockListings;
    }
  }

  // If running on the server (during build or in the API route itself), fetch from Propstack directly
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

    return units.filter((unit: any) => unit.title?.value).map(mapPropstackUnitToListing);
  } catch (error) {
    console.error("Failed to fetch listings from Propstack API, using fallback:", error);
    return mockListings;
  }
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const listings = await getListings();
  return listings.find((item) => item.slug === slug) || null;
}
