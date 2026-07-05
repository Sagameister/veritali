import { defineType, defineField } from "sanity";

export const bilingualText = defineType({
  name: "bilingualText",
  title: "Bilingual Text",
  type: "object",
  fields: [
    defineField({
      name: "de",
      title: "German (Deutsch)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 4,
    }),
  ],
});
