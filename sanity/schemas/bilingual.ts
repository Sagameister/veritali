import { defineType, defineField } from "sanity";

export const bilingual = defineType({
  name: "bilingual",
  title: "Bilingual String",
  type: "object",
  fields: [
    defineField({
      name: "de",
      title: "German (Deutsch)",
      type: "string",
    }),
    defineField({
      name: "en",
      title: "English",
      type: "string",
    }),
  ],
});
