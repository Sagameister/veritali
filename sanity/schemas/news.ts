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
      description: "Formatierungshilfe / Markdown Guide:\n- **fett / bold** -> **wichtiger Text**\n- *kursiv / italic* -> *kursiver Text*\n- Überschrift / Subheading -> ## Meine Überschrift\n- Bild einfügen / Inline Image -> [image: 0] (fügt das 1. Bild aus der Galerie ein, [image: 1] das 2. Bild usw.)\n- Absätze / Paragraphs -> Nutzen Sie doppelte Zeilenumbrüche (zwei Mal Enter).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Additional Gallery Images",
      type: "array",
      of: [
        {
          type: "object",
          name: "galleryImage",
          title: "Gallery Image",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "bilingual",
            }),
          ],
        },
      ],
      description: "Zusätzliche Bilder für den Artikel, die am Ende des Texts angezeigt werden.",
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
