import { groq } from "next-sanity";

export const listingsQuery = groq`
  *[_type == "listing"] | order(_createdAt desc) {
    "slug": slug.current,
    status,
    category,
    title,
    location,
    year,
    parameters,
    price,
    summary,
    "image": image.asset->url,
    gallery[]{
      "src": image.asset->url,
      label
    },
    size,
    detail {
      lead,
      sections[]{
        title,
        body,
        bullets
      },
      quote
    }
  }
`;

export const listingBySlugQuery = groq`
  *[_type == "listing" && slug.current == $slug][0] {
    "slug": slug.current,
    status,
    category,
    title,
    location,
    year,
    parameters,
    price,
    summary,
    "image": image.asset->url,
    gallery[]{
      "src": image.asset->url,
      label
    },
    size,
    detail {
      lead,
      sections[]{
        title,
        body,
        bullets
      },
      quote
    }
  }
`;

export const newsQuery = groq`
  *[_type == "news"] | order(date desc) {
    "slug": slug.current,
    title,
    date,
    "coverImage": coverImage.asset->url,
    excerpt,
    body,
    gallery[]{
      "src": image.asset->url,
      caption
    }
  }
`;

export const newsBySlugQuery = groq`
  *[_type == "news" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    date,
    "coverImage": coverImage.asset->url,
    excerpt,
    body,
    gallery[]{
      "src": image.asset->url,
      caption
    }
  }
`;
