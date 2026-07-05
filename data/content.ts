// ============================================================================
// BILINGUAL CONTENT LAYER (Rule 4: Multi-Language Readiness)
// All visible text lives HERE, not inside components. Every string is a
// { de, en } pair. Components read via t(bilingual, lang). Default: German.
// Copy source: content.md (verbatim). Services copy: drafted (not in deck).
// ============================================================================

import type {
  Achievement,
  Bilingual,
  ClientStory,
  Collaborator,
  Gateway,
  Language,
  Listing,
  Pillar,
  Service,
} from "../types";

export const DEFAULT_LANGUAGE: Language = "de";

/** Pick the right language out of a bilingual string pair. */
export function t(field: Bilingual, lang: Language = DEFAULT_LANGUAGE): string {
  return field[lang];
}

// ---------------------------------------------------------------------------
// SECTION 1 — Hero (Primary Slogan Panel)
// ---------------------------------------------------------------------------
export const hero = {
  eyebrow: {
    de: "KREATIVITÄT • INTEGRITÄT • WERTBESTÄNDIGKEIT",
    en: "INTENT • INTEGRITY • LASTING VALUE",
  },
  title: {
    de: "Immobilien mit Verstand, Integrität und Herz. Geformt um Ihr Leben",
    en: "Properties with clarity, integrity, and heart. Shaped around your life",
  },
  body: {
    de: "Ein eigentümergeführtes Boutique-Maklerbüro, das jedes Objekt mit einem Maximum an Professionalität, persönlichem Engagement und architektonischem Verstand bis zum erfolgreichen Übergang begleitet. Wir glauben, dass ein Zuhause mehr ist als nur Stein und Mörtel. Es ist ein maßgeschneiderter Raum für Ihre Zukunft.",
    en: "An owner-managed boutique real estate studio that guides every property with absolute professionalism, personal dedication, and architectural insight. We believe a home is more than bricks and mortar—it is a carefully crafted space designed for your future.",
  },
  // Full-bleed background media (Halston uses a video here — swap this
  // for your movie clip later; the component has a ready-made <video> slot).
  heroImage:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2400&auto=format&fit=crop",
};

// ---- Halston-style hero furniture ----------------------------------------
// The small satellite elements that float around the big headline.

export const heroFeatured = {
  label: { de: "AKTUELLES OBJEKT", en: "FEATURED" },
  title: { de: "Reiheneckhaus Walldorf", en: "Walldorf Corner Residence" },
  href: "#portfolio",
};

// Quick discipline links along the bottom (Halston: Architecture /
// Interior Design / Renovation, each with "Explore").
export const heroDisciplines = [
  { label: { de: "Wohnimmobilien", en: "Residential" }, href: "/services" },
  { label: { de: "Interior & Staging", en: "Interior & Staging" }, href: "/services" },
  { label: { de: "Sanierung", en: "Renovation" }, href: "/services" },
];

// Recognition list (Halston: DAM Preis, Architizer, Mies van der Rohe).
export const heroRecognition = {
  label: { de: "VERTRAUEN", en: "RECOGNITION" },
  items: [
    { de: "100% Empfehlungsrate", en: "100% recommendation rate" },
    { de: "4.8 / 5.0 Kundenbewertung", en: "4.8 / 5.0 client rating" },
    { de: "ImmoScout24 verifiziert", en: "Verified on ImmoScout24" },
  ],
};

export const heroCta = { de: "Gespräch vereinbaren", en: "Consultation" };

// ---------------------------------------------------------------------------
// LOCAL SEO — Veritali is based in Heidelberg; these strings put the
// location into visible page text (search engines weigh visible copy most).
// ---------------------------------------------------------------------------
export const seo = {
  // The classic local-SEO line, restyled for the editorial layout.
  tagline: {
    de: "Ihr kompetenter und fairer Immobilienmakler in Heidelberg — nur 1,5% Provision",
    en: "Your trusted, fair real estate agent in Heidelberg — just 1.5% commission",
  },
  regionsLabel: { de: "REGIONEN", en: "REGIONS" },
  regions: [
    "Heidelberg",
    "Mannheim",
    "Bergstraße",
    "Stuttgart",
    "Frankfurt",
    "Berlin",
  ],
};

// ---------------------------------------------------------------------------
// SECTION 1.2 — The Deliberate Capacity Manifesto (Philosophy intro)
// ---------------------------------------------------------------------------
export const manifesto = {
  title: {
    de: "Das Prinzip der bewussten Kapazität",
    en: "The Principle of Deliberate Capacity",
  },
  body: {
    de: "Einzigartigkeit entsteht durch ungeteilte Aufmerksamkeit. Um sicherzustellen, dass jedes Haus, jede Wohnung und jede Denkmalimmobilie die Zeit, den Fokus und die meisterhafte Präsentation erhält, die sie verdient, limitieren wir die Anzahl unserer aktiven Mandate bewusst. Wir verzichten auf teure Agenturstrukturen und unpersönlichen Massenvertrieb. Durch diese konsequente Reduktion unnötiger Kosten konzentrieren wir unsere Energie auf das Wesentliche: eine maßgeschneiderte Begleitung Ihres Verkaufs bei einer außergewöhnlich fairen Provision von lediglich 1,5 % (zzgl. MwSt.).",
    en: "Excellence is born from undivided attention. To guarantee that every residence, penthouse, and heritage property receives the time, deep focus, and artistic representation it truly deserves, we intentionally limit the number of active listings we represent. We choose to bypass bloated agency overheads and impersonal high-volume marketing. By stripping away administrative waste, we focus our entire energy on what truly matters: delivering custom, high-touch support for your sale at an exceptionally fair fee of just 1.5% (plus VAT).",
  },
};

// Short excerpt of the manifesto for the homepage teaser panel
// (the full text lives on /philosophie).
export const manifestoExcerpt = {
  de: "Einzigartigkeit entsteht durch ungeteilte Aufmerksamkeit. Deshalb limitieren wir die Anzahl unserer aktiven Mandate bewusst — für maßgeschneiderte Begleitung bei einer fairen Provision von nur 1,5 %.",
  en: "Excellence is born from undivided attention. That is why we deliberately limit our active mandates — custom, high-touch support at a fair fee of just 1.5%.",
};

// 'Considered, Crafted, Lasting' — the 3-column brand philosophy pillars.
export const pillars: Pillar[] = [
  {
    title: { de: "Durchdacht", en: "Considered" },
    body: {
      de: "Jedes Mandat beginnt mit ungeteilter Aufmerksamkeit. Wir limitieren unsere aktiven Objekte bewusst, damit jede Immobilie den Fokus erhält, den sie verdient.",
      en: "Every mandate begins with undivided attention. We deliberately limit our active listings so each property receives the focus it deserves.",
    },
  },
  {
    title: { de: "Gefertigt", en: "Crafted" },
    body: {
      de: "Von der Lichtführung der Fotografie bis zur Komposition des Exposés: Jedes Detail wird mit architektonischem Gespür von Hand inszeniert.",
      en: "From the light in each photograph to the composition of the dossier: every detail is staged by hand with an architectural eye.",
    },
  },
  {
    title: { de: "Beständig", en: "Lasting" },
    body: {
      de: "Faire 1,5 % Provision, ehrliche Marktanalysen und ein Beitrag von 3 % an unser Kongo-Hilfsprojekt: Werte, die über den Verkauf hinaus wirken.",
      en: "A fair 1.5% fee, honest market analysis, and 3% of revenue funding our Congo initiative: values that outlast the transaction.",
    },
  },
];

// ---------------------------------------------------------------------------
// SECTION 2 — The Typographical Achievements Grid (5 columns)
// ---------------------------------------------------------------------------
export const achievementsHeading = {
  // Three-part header row, exactly like Halston's
  // "Halston / Architecture and interior design studio / Achievements"
  brand: "Veritali",
  studioLine: {
    de: "Eigentümergeführtes Boutique-Immobilienstudio",
    en: "Owner-managed boutique real estate studio",
  },
  eyebrow: { de: "Leistung in Zahlen", en: "Achievements" },
};

export const achievements: Achievement[] = [
  {
    metric: "100%",
    tone: "brass",
    label: { de: "Empfehlungen", en: "Recommendation" },
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=640&auto=format&fit=crop",
    description: {
      de: "Makellose Kundenzufriedenheit und eine lückenlose Weiterempfehlungsrate durch verifizierte Verkäufer und Käufer auf ImmoScout24.",
      en: "Perfect satisfaction scores with a 100% recommendation rate from verified property owners and seekers on major European platforms.",
    },
  },
  {
    metric: "4.8",
    tone: "brass",
    label: { de: "Bewertung", en: "Rating" },
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=640&auto=format&fit=crop",
    description: {
      de: "Ausgezeichnete Bewertung für exzellente Beratungskompetenz, ständige Erreichbarkeit und detailgetreue Präsentation der Objekte.",
      en: "Rated “Excellent” for professional consulting expertise, continuous accessibility, and highly curated, artistic property presentations.",
    },
  },
  {
    metric: "1.5%",
    tone: "terracotta",
    label: { de: "Provision", en: "Fee" },
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=640&auto=format&fit=crop",
    description: {
      de: "Eine transparente, faire Provision für Verkäufer. Bewusste Kostenminimierung ermöglicht erstklassigen Service zu halbierten Konditionen.",
      en: "A highly transparent, fair fee structure for sellers. Stripping away unnecessary overhead to split the savings directly with you.",
    },
  },
  {
    metric: "5K+",
    tone: "brass",
    label: { de: "Aufrufe", en: "Views" },
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=640&auto=format&fit=crop",
    description: {
      de: "Über fünftausend gezielte Exposé-Aufrufe pro Objekt durch eine liebevolle, maßgeschneiderte und hochgradig visuelle Marketingstrategie.",
      en: "Over five thousand highly targeted page interactions per property, driven by a bespoke, artistic, and emotionally resonant listing style.",
    },
  },
  {
    metric: "3%",
    tone: "terracotta",
    label: { de: "Purpose", en: "Purpose" },
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=640&auto=format&fit=crop",
    description: {
      de: "Drei Prozent unserer Nettoprovision fließen direkt in ein selbst initiiertes, persönlich betreutes humanitäres Hilfsprojekt im Kongo.",
      en: "Three percent of our net revenue is donated directly to fund a self-managed, long-term humanitarian development project in the Congo.",
    },
  },
];

// ---------------------------------------------------------------------------
// SERVICES — drafted copy (no services section exists in content.md)
// ---------------------------------------------------------------------------
export const servicesHeading = {
  eyebrow: { de: "LEISTUNGEN", en: "SERVICES" },
  title: { de: "Begleitung in jeder Dimension", en: "Guidance in every dimension" },
};

export const services: Service[] = [
  {
    index: "01",
    title: { de: "Wohnimmobilien", en: "Residential" },
    description: {
      de: "Diskrete Vermarktung von Häusern, Wohnungen und Denkmalimmobilien — vom ersten Gespräch bis zur notariellen Übergabe.",
      en: "Discreet marketing of houses, apartments, and heritage properties — from the first conversation to notarized handover.",
    },
    discipline: { de: "Vermarktung", en: "Brokerage" },
    metric: { de: "100% Empfehlungen", en: "100% referrals" },
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    index: "02",
    title: { de: "Interior & Inszenierung", en: "Interior" },
    description: {
      de: "Architektonisch komponierte Raumbilder, die die Seele, das Licht und die handwerklichen Details Ihres Objekts einfangen.",
      en: "Architecturally composed interiors that capture the soul, light, and crafted details of your property.",
    },
    discipline: { de: "Interior Design", en: "Interior Design" },
    metric: { de: "5K+ Aufrufe pro Exposé", en: "5K+ views per listing" },
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    index: "03",
    title: { de: "Sanierung & Energie", en: "Renovation" },
    description: {
      de: "Fundierte Sanierungsberatung und energetische Analysen mit unseren Ingenieurpartnern für zukunftsfähige Wertbeständigkeit.",
      en: "Grounded renovation advisory and energy analysis with our engineering partners for future-proof value.",
    },
    discipline: { de: "Beratung", en: "Advisory" },
    metric: { de: "Zertifizierte Partner", en: "Certified partners" },
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    index: "04",
    title: { de: "Home Staging", en: "Home Staging" },
    description: {
      de: "Kuratierte Möblierung und Styling in Zusammenarbeit mit führenden Interior-Stylisten, damit Räume ihre Geschichte erzählen.",
      en: "Curated furnishing and styling with leading interior stylists, letting each room tell its story.",
    },
    discipline: { de: "Interior Design", en: "Interior Design" },
    metric: { de: "Ø 5 Tage", en: "Avg. 5 days" },
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
  },
  {
    index: "05",
    title: { de: "Wertermittlung", en: "Valuation" },
    description: {
      de: "Ehrliche, datenbasierte Ersteinschätzungen ohne Verkaufsdruck — kostenfrei, diskret und unverbindlich.",
      en: "Honest, data-driven first valuations without sales pressure — complimentary, discreet, and non-binding.",
    },
    discipline: { de: "Analyse", en: "Analysis" },
    metric: { de: "Kostenfrei & diskret", en: "Complimentary & discreet" },
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
  },
];

// ---------------------------------------------------------------------------
// SERVICES PAGE (/services) — Halston services-page structure
// ---------------------------------------------------------------------------
export const servicesPage = {
  eyebrow: { de: "Unsere", en: "Our" },
  title: { de: "Leistungen", en: "Services" },
  detailsCta: { de: "Details anfragen", en: "Service details" },
  metaDiscipline: { de: "Disziplin", en: "Discipline" },
  metaMetric: { de: "Kennzahl", en: "Metric" },
  // Big editorial statement with a photo (Halston: "Whether you are...")
  statement: {
    de: "Ob Verkauf eines Familienerbes, Suche nach dem nächsten Zuhause oder die Aufbereitung einer Immobilie für den Markt — es gibt einen klaren Weg zu beginnen. Jedes Mandat wird von der Studioleitung persönlich geführt und um Ihre Geschichte herum geformt.",
    en: "Whether you are selling a family estate, searching for your next home, or preparing a property for market — there is a clear way to begin. Every engagement is led personally by the principal and shaped around your story.",
  },
  statementImage:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1800&auto=format&fit=crop",
  // Scrolling ticker text (Halston: "Get in touch with us")
  marquee: { de: "Kontaktieren Sie uns", en: "Get in touch with us" },
  // Consultation form labels
  form: {
    eyebrow: { de: "FORMULAR", en: "FORM" },
    heading: { de: "Anfrage senden", en: "Get in touch" },
    name: { de: "Name", en: "Name" },
    location: { de: "Ort", en: "Location" },
    phone: { de: "Telefon", en: "Phone" },
    email: { de: "E-Mail", en: "Email" },
    message: { de: "Nachricht", en: "Message" },
    serviceType: { de: "Leistung", en: "Service type" },
    serviceOptions: [
      { de: "Verkauf", en: "Selling" },
      { de: "Suche", en: "Searching" },
      { de: "Bewertung", en: "Valuation" },
    ],
    consent: {
      de: "Ich stimme der Verarbeitung meiner personenbezogenen Daten zu.",
      en: "I agree to the processing of my personal data.",
    },
    submit: { de: "Absenden", en: "Submit" },
    success: {
      de: "Vielen Dank! Ihre Anfrage ist eingegangen.",
      en: "Thank you! Your submission has been received.",
    },
  },
};

// ---------------------------------------------------------------------------
// SECTION 3 — Portfolio (Bespoke Exposés) — asymmetric masonry
// ---------------------------------------------------------------------------
export const portfolioHeading = {
  eyebrow: { de: "AUSGEWÄHLTE OBJEKTE", en: "SELECTED WORKS" },
  title: { de: "Bespoke Exposés", en: "Bespoke Exposés" },
};

// Badge labels for the listing status (CMS-controlled per listing later).
export const statusLabels: Record<string, Bilingual> = {
  available: { de: "Verfügbar", en: "Available" },
  reserved: { de: "Reserviert", en: "Reserved" },
  sold: { de: "Verkauft", en: "Sold" },
};

export const listings: Listing[] = [
  {
    slug: "reiheneckhaus-walldorf",
    status: "available",
    category: {
      de: "REHABILITATION & ENERGETIC ARCHITECTURE",
      en: "REHABILITATION & ENERGETIC ARCHITECTURE",
    },
    title: {
      de: "Stilvoll kernsaniertes Reiheneckhaus mit modernster Energietechnologie",
      en: "A fully renovated corner residence with cutting-edge energy technology",
    },
    location: "Walldorf, Baden-Württemberg",
    year: "2026",
    parameters: "4.5 Zimmer | 1 Bad | 95 m² | Privater Garten",
    price: "€599.000",
    summary: {
      de: "Dieses anspruchsvoll kernsanierte Juwel vereint den einladenden Charakter eines klassischen Reiheneckhauses mit zukunftsweisenden Energiestandards. Ein großzügiger, liebevoll gestalteter Garten umgibt das lichtdurchflutete Gebäude.",
      en: "This thoughtfully fully-renovated architectural gem seamlessly bridges the cozy charm of a corner residence with cutting-edge green building technology. A generous, manicured private garden wraps around light-filled interiors.",
    },
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop",
        label: { de: "Wohnzimmer", en: "Living room" },
      },
      {
        src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop",
        label: { de: "Küche", en: "Kitchen" },
      },
      {
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
        label: { de: "Garten", en: "Garden" },
      },
      {
        src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop",
        label: { de: "Schlafzimmer", en: "Bedroom" },
      },
    ],
    size: "large",
    detail: {
      lead: {
        de: "Ein klassisches Reiheneckhaus, in mehrjähriger Sorgfalt kernsaniert und energetisch auf den neuesten Stand gebracht — für eine Familie, die gewachsenen Charme und zukunftssichere Technik nicht gegeneinander abwägen möchte.",
        en: "A classic corner terraced house, fully renovated with multi-year care and brought to the latest energy standard — for a family unwilling to trade grown charm against future-proof technology.",
      },
      sections: [
        {
          title: { de: "Energetisches Konzept", en: "Energy concept" },
          body: {
            de: "Die Sanierung folgt einem ganzheitlichen energetischen Konzept: neue Gebäudehülle, moderne Haustechnik und intelligente Steuerung senken die Betriebskosten dauerhaft.",
            en: "The renovation follows a holistic energy concept: a new building envelope, modern systems, and intelligent controls permanently lower running costs.",
          },
          bullets: [
            {
              de: "Wärmepumpe mit Flächenheizung in allen Wohnräumen",
              en: "Heat pump with underfloor heating in all living areas",
            },
            {
              de: "Dreifachverglasung und vollständig gedämmte Gebäudehülle",
              en: "Triple glazing and a fully insulated building envelope",
            },
            {
              de: "Vorbereitung für Photovoltaik und Wallbox",
              en: "Pre-fitted for photovoltaics and an EV wallbox",
            },
          ],
        },
        {
          title: { de: "Raum & Garten", en: "Space & garden" },
          body: {
            de: "Der modernisierte Grundriss verbindet gemütliche Rückzugsorte mit offenen, lichtdurchfluteten Wohnbereichen. Der großzügige Eckgarten umschließt das Haus an zwei Seiten und verlängert den Wohnraum ins Freie.",
            en: "The modernized floor plan pairs cozy retreats with open, light-filled living areas. The generous corner garden wraps the house on two sides, extending the living space outdoors.",
          },
          bullets: [
            {
              de: "4,5 Zimmer auf 95 m² mit flexiblem Arbeitszimmer",
              en: "4.5 rooms across 95 m² with a flexible study",
            },
            {
              de: "Süd-West-Garten mit altem Baumbestand",
              en: "South-west garden with mature trees",
            },
          ],
        },
      ],
      quote: {
        de: "Ein Zuhause, das seinen Charakter behalten hat — und trotzdem in der Zukunft angekommen ist.",
        en: "A home that kept its character — and still arrived in the future.",
      },
    },
  },
  {
    category: {
      de: "URBAN REFUGIUM & LANDSCAPE INTEGRATION",
      en: "URBAN REFUGIUM & LANDSCAPE INTEGRATION",
    },
    title: {
      de: "Einmalige Terrassenwohnung mit Garten an der Neckarpromenade",
      en: "A rare garden terrace residence on the Neckarpromenade",
    },
    location: "Mannheim, Baden-Württemberg",
    year: "2026",
    slug: "terrassenwohnung-mannheim",
    status: "available",
    parameters: "2.5 Zimmer | 1 Bad | 88 m² | Privater Gartenanteil",
    price: "€299.000",
    summary: {
      de: "Seltene Gelegenheit an der Mannheimer Neckarpromenade: Ein urbanes Refugium mit fließendem Übergang von den repräsentativen Wohnräumen in den eigenen Garten. Großzügige Glasflächen fangen das wechselnde Licht des Flusses ein.",
      en: "A rare riverside offering along the Mannheim Neckarpromenade. This light-flooded garden residence captures quiet luxury through a seamless transition from sophisticated living rooms to a private landscaped backyard.",
    },
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1600&auto=format&fit=crop",
        label: { de: "Wohnbereich", en: "Living area" },
      },
      {
        src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop",
        label: { de: "Terrasse", en: "Terrace" },
      },
      {
        src: "https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=1600&auto=format&fit=crop",
        label: { de: "Küche", en: "Kitchen" },
      },
      {
        src: "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1600&auto=format&fit=crop",
        label: { de: "Badezimmer", en: "Bathroom" },
      },
    ],
    size: "small",
    detail: {
      lead: {
        de: "Direkt an der Neckarpromenade gelegen, verbindet diese Terrassenwohnung urbanes Leben mit einem seltenen Luxus: einem eigenen Garten am Fluss.",
        en: "Set directly on the Neckarpromenade, this terrace residence pairs urban living with a rare luxury: a private garden by the river.",
      },
      sections: [
        {
          title: { de: "Lage am Fluss", en: "Riverside setting" },
          body: {
            de: "Die Promenade vor der Tür, die Innenstadt in Gehweite: Die Lage vereint Ruhe am Wasser mit der Nähe zur Metropolregion Rhein-Neckar.",
            en: "The promenade at the doorstep, the city center within walking distance: the location combines calm by the water with the Rhine-Neckar metropolitan region close by.",
          },
          bullets: [
            {
              de: "Unverbaubarer Blick auf den Neckar",
              en: "Unobstructable view of the Neckar",
            },
            {
              de: "Straßenbahn und Innenstadt in wenigen Minuten",
              en: "Tram and city center within minutes",
            },
          ],
        },
        {
          title: { de: "Fließender Übergang", en: "Seamless transition" },
          body: {
            de: "Großzügige Glasflächen öffnen die Wohnräume zum Garten und holen das wechselnde Licht des Flusses ins Innere. Terrasse und Gartenanteil verlängern den Wohnraum nach draußen.",
            en: "Generous glazing opens the living spaces to the garden, drawing the river's changing light inside. Terrace and private garden extend the living area outdoors.",
          },
          bullets: [
            {
              de: "88 m² mit durchdachtem 2,5-Zimmer-Grundriss",
              en: "88 m² with a considered 2.5-room layout",
            },
            {
              de: "Privater Gartenanteil mit Bewässerung",
              en: "Private garden share with irrigation",
            },
          ],
        },
      ],
    },
  },
  {
    category: {
      de: "HERITAGE PRESERVATION & HISTORIC INTERIORS",
      en: "HERITAGE PRESERVATION & HISTORIC INTERIORS",
    },
    title: {
      de: "Charmante Dachgeschosswohnung im Jugendstil-Altbau",
      en: "A charming attic loft in a classic Art Nouveau building",
    },
    location: "Heidelberg Weststadt",
    year: "2025",
    slug: "jugendstil-loft-heidelberg",
    status: "reserved",
    parameters: "2 Zimmer | 1 Bad | 44 m² | Historisches Loft-Layout",
    price: "Reserviert",
    summary: {
      de: "Eingebettet in die historische Kulisse der Heidelberger Weststadt verkörpert diese Mansardenwohnung die zeitlose Eleganz des klassischen Jugendstils. Hohe Dachschrägen und handwerkliche Holzelemente prägen den Loft-Charakter.",
      en: "Nestled in the historic architecture of Heidelberg's Weststadt, this attic loft captures the timeless elegance of classic German Jugendstil. Vaulted ceilings and hand-finished wooden elements lend it an artistic studio personality.",
    },
    image:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1600&auto=format&fit=crop",
        label: { de: "Wohnraum", en: "Living space" },
      },
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
        label: { de: "Schlafbereich", en: "Sleeping area" },
      },
      {
        src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1600&auto=format&fit=crop",
        label: { de: "Arbeitsplatz", en: "Workspace" },
      },
      {
        src: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1600&auto=format&fit=crop",
        label: { de: "Dachschräge", en: "Attic detail" },
      },
    ],
    size: "small",
    detail: {
      lead: {
        de: "Unter dem Dach eines Jugendstil-Altbaus in der Heidelberger Weststadt: ein intimes Loft mit künstlerischer Seele, hohen Schrägen und handwerklichen Details.",
        en: "Beneath the roof of a Jugendstil building in Heidelberg's Weststadt: an intimate loft with an artistic soul, tall pitched ceilings, and handcrafted details.",
      },
      sections: [
        {
          title: { de: "Jugendstil-Charakter", en: "Jugendstil character" },
          body: {
            de: "Die Weststadt gehört zu den am besten erhaltenen Gründerzeit-Quartieren Deutschlands. Das Haus bewahrt originale Details vom Treppenhaus bis zu den Holzfenstern.",
            en: "The Weststadt is among Germany's best-preserved late-19th-century quarters. The building keeps original details from the stairwell to the timber windows.",
          },
          bullets: [
            {
              de: "Denkmalgeschützte Fassade und Treppenhaus",
              en: "Listed façade and stairwell",
            },
            {
              de: "Originale Holzelemente, sorgfältig aufgearbeitet",
              en: "Original wooden elements, carefully restored",
            },
          ],
        },
        {
          title: { de: "Der Loft-Grundriss", en: "The loft layout" },
          body: {
            de: "Der offene Grundriss folgt den Dachschrägen und schafft überraschend großzügige Raumwirkung auf 44 m² — ein Rückzugsort mit Atelier-Atmosphäre.",
            en: "The open layout follows the roof pitch, creating a surprisingly generous feel across 44 m² — a retreat with studio atmosphere.",
          },
        },
      ],
    },
  },
  {
    category: {
      de: "CLASSICAL APARTMENT SHOWCASE",
      en: "CLASSICAL APARTMENT SHOWCASE",
    },
    title: {
      de: "Stilvolle 3-Zimmer-Altbauwohnung mit zwei Balkonen",
      en: "An elegant three-room period apartment with two balconies",
    },
    location: "Wiesbaden, Rheingauviertel",
    year: "2026",
    slug: "altbauwohnung-wiesbaden",
    status: "available",
    parameters: "3 Zimmer | 1 Bad | 80 m² | Zwei private Freisitze",
    price: "€249.000",
    summary: {
      de: "Ein Paradebeispiel für die großbürgerliche Architektur Wiesbadens. Hohe Stuckdecken, aufgearbeiteter Dielenboden und zwei sonnige Balkone verbinden urbanen Komfort mit dem Charme der Jahrhundertwende.",
      en: "A refined showcase of Wiesbaden's classical grand apartment architecture. Soaring ornate plaster ceilings, polished timber floorboards, and two sun-drenched balconies in the historic Rheingau quarter.",
    },
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop",
        label: { de: "Salon", en: "Salon" },
      },
      {
        src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop",
        label: { de: "Schlafzimmer", en: "Bedroom" },
      },
      {
        src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop",
        label: { de: "Balkon", en: "Balcony" },
      },
      {
        src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
        label: { de: "Flur", en: "Hallway" },
      },
    ],
    size: "large",
    detail: {
      lead: {
        de: "Großbürgerliche Architektur im Rheingauviertel: hohe Stuckdecken, aufgearbeitete Dielen und zwei sonnige Balkone — Jahrhundertwende-Charme mit urbanem Komfort.",
        en: "Grand bourgeois architecture in the Rheingau quarter: tall stucco ceilings, restored floorboards, and two sunny balconies — turn-of-the-century charm with urban comfort.",
      },
      sections: [
        {
          title: { de: "Gründerzeit-Architektur", en: "Period architecture" },
          body: {
            de: "Das Rheingauviertel zählt zu Wiesbadens gefragtesten Altbaulagen. Die Wohnung bewahrt die Eleganz ihrer Epoche — behutsam modernisiert, wo es dem Wohnkomfort dient.",
            en: "The Rheingau quarter is among Wiesbaden's most sought-after period locations. The apartment preserves the elegance of its era — gently modernized where comfort demands it.",
          },
          bullets: [
            {
              de: "Über 3,20 m Deckenhöhe mit originalem Stuck",
              en: "Ceilings above 3.20 m with original stucco",
            },
            {
              de: "Aufgearbeiteter Dielenboden in allen Zimmern",
              en: "Restored timber floorboards in every room",
            },
          ],
        },
        {
          title: { de: "Zwei Freisitze", en: "Two balconies" },
          body: {
            de: "Zwei Balkone zu unterschiedlichen Tageszeiten besonnt: morgens Kaffee zur Hofseite, abends der Blick über die Dächer des Viertels.",
            en: "Two balconies catching sun at different hours: morning coffee on the courtyard side, evenings overlooking the quarter's rooftops.",
          },
        },
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// SECTION 4 — Client Story: Dr. Volker T. (horizontal scroll chapters)
// ---------------------------------------------------------------------------
export const volkerStory: ClientStory = {
  clientName: "Dr. Volker T.",
  projectMeta: { de: "Der künstlerische Blick", en: "The Artistic Eye" },
  chapters: [
    {
      label: { de: "DER SUCHAUFTRAG", en: "THE BRIEF" },
      title: {
        de: "Die Suche nach barrierefreiem Lebensraum",
        en: "The search for barrier-free living space",
      },
      body: {
        de: "Unsere Reise begann als Suchende auf dem Heidelberger Markt. Wir suchten nach einer großzügigen, barrierefreien Eigentumswohnung, die nicht nur funktionale Anforderungen erfüllt, sondern architektonische Seele besitzt. Bei dieser ersten Begegnung erlebten wir eine Beratung, die weit über das übliche Makler-Maß hinausging – geprägt von tiefer fachlicher Kompetenz, menschlicher Wärme und unaufdringlichem Charme.",
        en: "Our journey began as buyers looking for a generous, barrier-free residence in the Heidelberg market—a home that was highly functional yet retained its architectural soul. In this initial meeting, we experienced a level of care that went far beyond typical real estate sales: grounded in deep professional competence, social intelligence, and unpretentious charm.",
      },
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      label: { de: "DER ROLLENWECHSEL", en: "THE TRUST" },
      title: {
        de: "Vom Käufer zum Partner",
        en: "From buyer to partner",
      },
      body: {
        de: "Beeindruckt von der Professionalität und der sozialen Sensibilität fiel uns die Entscheidung leicht: Kurze Zeit später beauftragten wir dasselbe eigentümergeführte Studio mit dem exklusiven Verkauf unseres bisherigen Domizils. Aus einer einfachen geschäftlichen Vermittlung entwickelte sich eine vertrauensvolle, partnerschaftliche Zusammenarbeit auf Augenhöhe, die keine starren Bürozeiten kannte.",
        en: "Deeply impressed by this rare mix of analytical precision and social warmth, our next step was obvious: shortly after, we entrusted the same boutique studio with the exclusive listing of our previous family residence. What began as a routine business transaction blossomed into a trusted partnership on equal footing, completely free of rigid agency hours.",
      },
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    },
    {
      label: { de: "DIE ÄSTHETISCHE INSZENIERUNG", en: "THE CRAFT" },
      title: {
        de: "Das architektonische Gespür für Licht und Bild",
        en: "An architectural sense for light and image",
      },
      body: {
        de: "Wahre Qualität zeigt sich im Detail. Mit einem außergewöhnlichen künstlerischen und architektonischen Gespür inszenierte die Studioleitung unsere Immobilie. Jedes Foto wurde sorgfältig komponiert, um die Seele des Raumes, das natürliche Lichtspiel und die handwerklichen Details optimal einzufangen. Das Ergebnis war kein simpler Online-Eintrag, sondern ein exquisites, visuelles Exposé.",
        en: "True quality reveals itself in the details. Utilizing a rare artistic eye and architectural sense of composition, the principal personally styled and staged our home. Each photograph was meticulously framed to capture the flow of spaces, natural daylight, and crafted materials. The outcome was not a standard listing, but an exquisite, editorial portfolio.",
      },
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
    },
    {
      label: { de: "DER GLOBALE BEITRAG", en: "THE PURPOSE" },
      title: {
        de: "Ein fairer Preis, der Gutes bewirkt",
        en: "A fair price that does good",
      },
      body: {
        de: "Der Verkaufsabschluss übertraf all unsere Erwartungen. Zu unserer großen Freude lag die Provision bei der Hälfte des üblichen Satzes – und das mit gutem Gewissen. Denn ein Teil dieser Courtage floss direkt an eine selbst initiierte Bildungsinitiative in Afrika. Ein Beweis dafür, dass professionelles Handeln und globaler Purpose Hand in Hand gehen können.",
        en: "The successful sale exceeded our highest expectations. To our delight, the commission was half of the typical market rate—and it came with a clean conscience. A direct percentage of our fee was instantly wired to fund a grassroots education project in Africa. Proof that premium, honest business and global philanthropy can seamlessly coexist.",
      },
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    },
  ],
};

// ---------------------------------------------------------------------------
// SECTION 4.2 — Client Story: Oliver S. (The Seamless Process)
// ---------------------------------------------------------------------------
export const oliverStory: ClientStory = {
  clientName: "Oliver S.",
  projectMeta: { de: "Der nahtlose Prozess", en: "The Seamless Process" },
  chapters: [
    {
      label: { de: "DIE ERSTE ANALYSE", en: "THE INQUIRY" },
      title: {
        de: "Die Entscheidung für absolute Integrität",
        en: "Choosing absolute integrity",
      },
      body: {
        de: "Der Verkauf einer geschätzten Immobilie ist immer ein emotionaler Schritt. Von der ersten unverbindlichen Wertermittlung an stand das Versprechen von absoluter Diskretion und Transparenz im Raum. Kein aggressiver Verkaufsdruck, sondern eine ehrliche, fundierte Marktanalyse bildete das solide Fundament unserer Partnerschaft.",
        en: "Selling a cherished family asset is always an emotional milestone. From the moment of our first valuation inquiry, we were met with a promise of absolute discretion and professional transparency. No high-pressure sales tactics—just an honest, data-driven market analysis that laid a solid foundation for our partnership.",
      },
    },
    {
      label: { de: "DIE NAHTLOSE ABWICKLUNG", en: "THE EXECUTION" },
      title: {
        de: "Reibungslos, engagiert, immer erreichbar",
        en: "Seamless, dedicated, always reachable",
      },
      body: {
        de: "Im gesamten Verkaufsprozess beeindruckte uns die ständige Erreichbarkeit und das außergewöhnliche persönliche Engagement der Studioleitung. Jede Frage wurde kompetent beantwortet, Hürden wurden vorausschauend gelöst und der gesamte bürokratische Ablauf verlief im Hintergrund vollkommen reibungslos, effizient und professionell.",
        en: "Throughout the listing process, we were blown away by the constant accessibility and tireless dedication of the principal. Every inquiry was answered with technical expertise, potential friction points were resolved proactively, and the entire bureaucratic transition executed seamlessly in the background with absolute efficiency.",
      },
    },
    {
      label: { de: "DIE ERFOLGREICHE ÜBERGABE", en: "THE RESULT" },
      title: {
        de: "Ein unkomplizierter Erfolg auf allen Ebenen",
        en: "An effortless success on every level",
      },
      body: {
        de: "Dank der hervorragenden Marktkenntnis und der liebevollen Aufbereitung des Exposés wurde der Übergang viel schneller und unkomplizierter abgeschlossen als wir je für möglich gehalten hätten. Ein erstklassiges Ergebnis, abgewickelt zu erstklassigen, fairen Konditionen und getragen von tiefer menschlicher Integrität.",
        en: "Driven by stellar local market intelligence and a beautifully composed dossier, the property transition was completed far quicker and smoother than we ever deemed possible. A premier outcome, executed at highly competitive, fair terms, and guided by profound human integrity.",
      },
    },
  ],
};

// Header copy for the testimonial masonry section
export const storiesHeading = {
  titlePre: { de: "Was Kunden mit Veritali", en: "What clients" },
  titleItalic: { de: "erleben", en: "experience" },
  titlePost: { de: "", en: " with Veritali" },
  description: {
    de: "Vom ersten Suchauftrag bis zur notariellen Übergabe: Echte Stimmen unserer Verkäufer und Käufer — und wie sie den Unterschied beschreiben.",
    en: "From the first brief to the notarized handover: real voices of our sellers and buyers — and how they describe the difference.",
  },
};

// ---------------------------------------------------------------------------
// SECTION 5 — Partners & Collaborators
// ---------------------------------------------------------------------------
export const collaboratorsHeading = {
  eyebrow: { de: "VERTRAUTE PARTNER", en: "TRUSTED COLLABORATORS" },
  title: { de: "Ein Netzwerk mit Haltung", en: "A network with conviction" },
};

export const collaborators: Collaborator[] = [
  {
    name: "Studio Lichtspiel & Raum",
    metadata: {
      de: "ARCHITECTURAL PHOTOGRAPHY & VISUAL STAGING",
      en: "ARCHITECTURAL PHOTOGRAPHY & VISUAL STAGING",
    },
    body: {
      de: "In enger Zusammenarbeit mit führenden Architekturfotografen und Interior-Stylisten inszenieren wir die räumliche Seele und das natürliche Lichtspiel Ihres Objekts.",
      en: "Working in close collaboration with elite local architectural photographers and interior designers to meticulously frame the volume, light, and material details of your home.",
    },
  },
  {
    name: "Ingenieurbüro Heidelberg Energie",
    metadata: {
      de: "ENERGY CONSULTING & STRUCTURAL INTEGRITY",
      en: "ENERGY CONSULTING & STRUCTURAL INTEGRITY",
    },
    body: {
      de: "Umfassende energetische Analysen, detaillierte Energieausweise und zukunftsweisende Sanierungsberatung sichern die Wertbeständigkeit Ihrer Immobilie.",
      en: "Executing exhaustive structural evaluations, high-end energy certificate auditing, and sustainable modern retrofitting advisory to guarantee future-proof real estate investments.",
    },
  },
  {
    name: "ARW — Afrikas Renaissance und Wiederaufbau e.V.",
    metadata: {
      de: "HUMANITARIAN PARTNER & ETHICAL FUNDING",
      en: "HUMANITARIAN PARTNER & ETHICAL FUNDING",
    },
    body: {
      de: "Unsere Partnerorganisation für das VERITA-Schulprojekt im Kongo. Der gemeinnützige Verein aus Greifswald ermöglicht seit über 20 Jahren Bildungschancen für junge Menschen aus der DR Kongo.",
      en: "Our partner organization for the VERITA school project in the Congo. The Greifswald-based non-profit has created educational opportunities for young people from the DR Congo for over 20 years.",
    },
  },
];

// ---------------------------------------------------------------------------
// CTA Gateways — valuation + consultation
// ---------------------------------------------------------------------------
export const valuationGateway: Gateway = {
  title: {
    de: "Welchen Wert hat Ihre Geschichte?",
    en: "What is the value of your story?",
  },
  body: {
    de: "Eine Immobilie ist keine bloße Nummer auf einem Bewertungsportal. Ihr wahrer Wert liegt in ihrer Lage, ihrer Bauqualität, ihrer Historie und dem Leben, das sie beherbergt. Nutzen Sie unser unkompliziertes, diskretes Werkzeug für eine fundierte und ehrliche Ersteinschätzung — kostenfrei und unverbindlich.",
    en: "A home is never just a numerical value on a cold estimation tool. Its true worth is anchored in its geographic location, structural craftsmanship, unique history, and the life it shapes. Request an intimate, highly discreet, and honest first valuation — entirely complimentary and without obligation.",
  },
  cta: {
    de: "Ersteinschätzung anfordern",
    en: "Start complimentary valuation",
  },
  image:
    "https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=1800&auto=format&fit=crop",
};

export const consultationGateway: Gateway = {
  title: { de: "Lassen Sie uns sprechen", en: "Let us start a conversation" },
  body: {
    de: "Wir glauben an Gespräche auf Augenhöhe, ohne Zeitdruck. Ob Sie den Verkauf eines Erbes planen, nach Ihrem nächsten architektonischen Meilenstein suchen oder mehr über unser Kongo-Hilfsprojekt erfahren möchten — unsere Tür steht Ihnen jederzeit offen.",
    en: "We believe in honest dialogue on equal footing, free from high-pressure sales timelines. Whether you are navigating the sale of an estate, searching for your next architectural sanctuary, or seeking details about our humanitarian efforts — our doors are open.",
  },
  cta: { de: "Gespräch vereinbaren", en: "Arrange an inquiry" },
  subLabel: {
    de: "ODER DIREKT PER TELEFON: +49 176 21015298",
    en: "OR DIRECT BY PHONE: +49 176 21015298",
  },
  image:
    "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1800&auto=format&fit=crop",
};

// ---------------------------------------------------------------------------
// Navigation & Footer
// ---------------------------------------------------------------------------
// Hrefs start with "/" so they work from ANY page, not just the homepage.
// "/services" is its own page; the rest jump to homepage sections.
export const navLinks: { label: Bilingual; href: string }[] = [
  { label: { de: "Objekte", en: "Portfolio" }, href: "/objekte" },
  { label: { de: "Leistungen", en: "Services" }, href: "/services" },
  { label: { de: "Unternehmen", en: "Company" }, href: "/unternehmen" },
  { label: { de: "Hilfsprojekte", en: "Aid Projects" }, href: "/hilfsprojekte" },
];

export const footerContent = {
  tagline: {
    de: "Eigentümergeführtes Boutique-Maklerbüro — Rhein-Neckar & Rhein-Main.",
    en: "Owner-managed boutique real estate studio — Rhein-Neckar & Rhein-Main.",
  },
  columns: [
    {
      heading: { de: "Studio", en: "Studio" },
      links: [
        { label: { de: "Objekte", en: "Portfolio" }, href: "/objekte" },
        { label: { de: "Leistungen", en: "Services" }, href: "/services" },
        { label: { de: "Unternehmen", en: "Company" }, href: "/unternehmen" },
        { label: { de: "Hilfsprojekte", en: "Aid Projects" }, href: "/hilfsprojekte" },
      ],
    },
    {
      heading: { de: "Rechtliches", en: "Legal" },
      links: [
        { label: { de: "Impressum", en: "Imprint" }, href: "/impressum" },
        { label: { de: "Datenschutz", en: "Privacy" }, href: "/datenschutz" },
      ],
    },
  ],
  contact: {
    phone: "+49 176 21015298",
    email: "kontakt@veritali.de",
  },
  // Office addresses shown in the footer's brand column.
  offices: [
    {
      label: { de: "Büro Heidelberg", en: "Heidelberg Office" },
      lines: ["Langer Anger 7-9", "69115 Heidelberg"],
    },
    {
      label: { de: "Büro Stuttgart", en: "Stuttgart Office" },
      lines: ["Martin-Luther-Str. 25", "70825 Korntal"],
    },
  ],
};
