import { defineType, defineField } from "sanity";

export const listing = defineType({
  name: "listing",
  title: "Property Listing",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug / URL Identifier",
      type: "slug",
      options: {
        source: "title.de",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Listing Status",
      type: "string",
      options: {
        list: [
          { title: "Available / Verfügbar", value: "available" },
          { title: "Reserved / Reserviert", value: "reserved" },
          { title: "Sold / Vermarktet", value: "sold" },
        ],
        layout: "radio",
      },
      initialValue: "available",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category Eyebrow",
      type: "bilingual",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Listing Title",
      type: "bilingual",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location Details (e.g. Heidelberg Weststadt &mdash; 2026)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      initialValue: "2026",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "parameters",
      title: "Listing Parameters (e.g. 4.5 Zimmer | 1 Bad | 95 m²)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Pricing (e.g. €599.000 or Reserviert)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Editorial Card Summary",
      type: "bilingualText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Primary Display Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Detail Page Gallery Images",
      type: "array",
      of: [
        {
          type: "object",
          name: "galleryImage",
          title: "Gallery Image",
          fields: [
            {
              name: "image",
              title: "Image File",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "label",
              title: "Bilingual Room Label (e.g. Wohnbereich / Living area)",
              type: "bilingual",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "size",
      title: "Display Size",
      type: "string",
      options: {
        list: [
          { title: "Large (Landscape / Symmetrical)", value: "large" },
          { title: "Small (Tall / Portrait)", value: "small" },
        ],
        layout: "radio",
      },
      initialValue: "large",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "detail",
      title: "Exposé Detail Content",
      type: "object",
      fields: [
        defineField({
          name: "lead",
          title: "Bold Opening Lead Paragraph",
          type: "bilingualText",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "sections",
          title: "Detail Prose Sections",
          type: "array",
          of: [
            {
              type: "object",
              name: "section",
              title: "Detail Section",
              fields: [
                {
                  name: "title",
                  title: "Section Title",
                  type: "bilingual",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "body",
                  title: "Section Body",
                  type: "bilingualText",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "bullets",
                  title: "Bullet Points (Optional)",
                  type: "array",
                  of: [{ type: "bilingual" }],
                },
              ],
            },
          ],
        }),
        defineField({
          name: "quote",
          title: "Editorial Pull Quote (Optional)",
          type: "bilingualText",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title.de",
      subtitle: "location",
      media: "image",
    },
  },
});
