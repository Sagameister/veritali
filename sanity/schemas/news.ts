import { defineType, defineField } from "sanity";

export const news = defineType({
  name: "news",
  title: "News Articles",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "bilingual",
      validation: (Rule) => Rule.required(),
    }),
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
      name: "date",
      title: "Publish Date",
      type: "date",
      options: {
        dateFormat: "DD.MM.YYYY",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Short Excerpt (Teaser)",
      type: "bilingualText",
      description: "Brief summary shown on the news overview page card.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Main Content Body",
      type: "bilingualText",
      description: "Use double-newlines to separate paragraphs.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title.de",
      date: "date",
      media: "coverImage",
    },
    prepare(selection) {
      const { title, date, media } = selection;
      return {
        title: title || "Unbenannter Artikel",
        subtitle: date ? new Date(date).toLocaleDateString("de-DE") : "Kein Datum",
        media,
      };
    },
  },
});
