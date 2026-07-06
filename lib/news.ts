import { client } from "../sanity/lib/client";
import { newsQuery, newsBySlugQuery } from "../sanity/lib/queries";
import type { NewsArticle } from "../types";

export const mockNews: NewsArticle[] = [
  {
    slug: "expansion-heidelberg-mannheim",
    date: "2026-07-01",
    title: {
      de: "Veritali erweitert Service-Region auf Heidelberg und Mannheim",
      en: "Veritali expands service region to Heidelberg and Mannheim"
    },
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
    excerpt: {
      de: "Wir dehnen unsere maßgeschneiderte Immobilienberatung auf die gesamte Metropolregion Rhein-Neckar aus, um Verkäufer und Käufer vor Ort noch enger zu betreuen.",
      en: "We are expanding our tailored real estate advisory services to the entire Rhine-Neckar metropolitan region, supporting local sellers and buyers with direct counsel."
    },
    body: {
      de: "Wir freuen uns, bekannt zu geben, dass Veritali ab sofort in den Wirtschafts- und Wohnregionen Heidelberg und Mannheim aktiv vertreten ist. Diese strategische Erweiterung ermöglicht es uns, anspruchsvolle Wohnimmobilien in Heidelberg (Altstadt, Weststadt, Neuenheim) sowie Mannheim (Oststadt, Neckarau, Quadrate) anzubieten.\n\nMit unserem bewährten Honorarmodell von nur 1,5 % Provision für Verkäufer und unserem diskreten, digitalisierten Vermarktungsnetzwerk bieten wir Eigentümern in der Rhein-Neckar-Region eine zeitgemäße und faire Alternative zum traditionellen Maklergeschäft.\n\nWir freuen uns auf neue Partnerschaften und außergewöhnliche Liegenschaften in dieser geschichtsträchtigen und dynamischen Metropolregion.",
      en: "We are delighted to announce that Veritali is now officially active in the residential and commercial areas of Heidelberg and Mannheim. This expansion allows us to represent high-end residential listings in Heidelberg (Altstadt, Weststadt, Neuenheim) and Mannheim (Oststadt, Neckarau, Quadrate).\n\nThrough our transparent fee model (only 1.5% commission for sellers) and our discreet, off-market matchmaking system, we offer property owners in the Rhine-Neckar region a modern and fair alternative to legacy real estate agencies.\n\nWe look forward to forging new partnerships and showcasing exceptional properties in this historic and vibrant metropolitan area."
    }
  },
  {
    slug: "schulprojekt-kongo-klassenzimmer-fortschritt",
    date: "2026-06-15",
    title: {
      de: "Veritali-Schulprojekt im Kongo: Fundament für neue Klassenräume gelegt",
      en: "Veritali School Project in Congo: Foundation laid for new classrooms"
    },
    coverImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
    excerpt: {
      de: "Dank der 3%-Provisionsspende aller erfolgreichen Verkäufe haben die Bauarbeiten für das zweite Schulgebäude des Schulprojekts im Kongo offiziell begonnen.",
      en: "Thanks to the 3% commission allocation of all successful sales, construction has officially commenced on the second classroom block in the Congo."
    },
    body: {
      de: "Es ist ein besonderer Meilenstein für uns und unsere Kunden: Das Fundament für das neue Schulgebäude in unserer Partnerschule im Kongo ist fertiggestellt. Die Mauern wachsen bereits und wir liegen voll im Zeitplan, um die neuen Räume zum kommenden Schuljahr zu eröffnen.\n\nJedes Mal, wenn ein Objekt über Veritali vermarktet wird, fließen 3 % unseres Provisionsanteils direkt in dieses Bildungsprojekt. Dadurch finanzieren wir nicht nur Baumaterialien und Löhne für lokale Handwerker, sondern sichern langfristig auch Lehrmittel und Schulgebühren für Kinder.\n\nWir danken all unseren Auftraggebern und Käufern, die diesen Erfolg durch ihr Vertrauen in unsere Arbeit möglich machen. Transparenz bedeutet für uns auch, diese Hilfe direkt vor Ort ankommen zu lassen.",
      en: "This is a meaningful milestone for us and our clients: the foundation for the new school building at our partner school in the Congo has been poured. The brickwork is rising quickly, and we are fully on track to open the classrooms for the upcoming school year.\n\nEvery time a property is successfully sold through Veritali, 3% of our commission earnings go directly to this educational project. This funding covers raw materials, wages for local builders, and long-term supplies and tuition fees for the students.\n\nWe extend our warmest thanks to all our clients who make this humanitarian support possible through their trust in our business. For us, transparency means ensuring this aid arrives directly where it is needed most."
    }
  },
  {
    slug: "zinssituation-premium-immobilienmarkt",
    date: "2026-05-20",
    title: {
      de: "Zinsstabilisierung und ihre Auswirkungen auf den Premium-Wohnungsmarkt",
      en: "Interest rate stabilization and its impact on premium residential real estate"
    },
    coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
    excerpt: {
      de: "Eine Marktanalyse zur aktuellen Zinsentwicklung und warum die Stabilisierung der Leitzinsen neue Dynamik in den Verkauf von Luxusimmobilien bringt.",
      en: "A market report on current interest rate developments and why central bank stabilization is bringing new momentum to luxury property sales."
    },
    body: {
      de: "Nach Monaten der Volatilität zeichnet sich am europäischen Zinsmarkt eine deutliche Konsolidierung ab. Die Stabilisierung der Leitzinsen gibt Käufern und Verkäufern im gehobenen Preissegment eine dringend benötigte Planungssicherheit zurück.\n\nPremium-Immobilien zeichnen sich in solchen Phasen als besonders krisenresistent aus. Sachwerte in hervorragenden Mikrolagen behalten nicht nur ihren Wert, sondern verzeichnen durch die anhaltende Nachfrage nach hochwertigem Wohnraum weiterhin stabile Wertzuwächse.\n\nEigentümer, die mit dem Gedanken spielen, ihr Objekt zu veräußern, profitieren von einem liquiden Marktumfeld und einer großen Gruppe qualifizierter, eigenkapitalstarker Suchkunden. Gerne erstellen wir für Sie eine diskrete Marktwertanalyse Ihrer Liegenschaft.",
      en: "After months of volatility, a clear consolidation is taking place on the European interest rate market. The stabilization of central bank base rates is returning much-needed planning security to buyers and sellers in the high-end property segment.\n\nPremium real estate proves exceptionally resilient during these economic cycles. Real assets in prime microlocations do not just store value — they continue to appreciate due to persistent demand for top-tier living spaces.\n\nOwners considering a sale benefit from a highly liquid market environment and a strong pool of pre-qualified, cash-rich buyers. We are happy to prepare a private market analysis of your estate."
    }
  }
];

export async function getNewsArticles(): Promise<NewsArticle[]> {
  const isSanityConfigured =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "placeholder-id";

  if (!isSanityConfigured) {
    console.log("Sanity Project ID is not configured, returning mock news fallback.");
    return mockNews;
  }

  try {
    const liveNews = await client.fetch<NewsArticle[]>(newsQuery);
    if (!liveNews || liveNews.length === 0) {
      return mockNews;
    }
    return liveNews;
  } catch (error) {
    console.error("Failed to fetch news from Sanity, falling back:", error);
    return mockNews;
  }
}

export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
  const isSanityConfigured =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "placeholder-id";

  if (!isSanityConfigured) {
    const matched = mockNews.find((item) => item.slug === slug);
    return matched || null;
  }

  try {
    const liveArticle = await client.fetch<NewsArticle | null>(newsBySlugQuery, { slug });
    if (!liveArticle) {
      // Fallback search in mock data
      return mockNews.find((item) => item.slug === slug) || null;
    }
    return liveArticle;
  } catch (error) {
    console.error(`Failed to fetch news slug "${slug}" from Sanity, falling back:`, error);
    return mockNews.find((item) => item.slug === slug) || null;
  }
}
