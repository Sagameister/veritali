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
