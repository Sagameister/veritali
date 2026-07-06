import React from "react";
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
      description: React.createElement(
        "div",
        { style: { marginTop: "6px", lineHeight: "1.6", fontSize: "12px" } },
        React.createElement(
          "strong",
          { style: { color: "#DDBE8B", display: "block", marginBottom: "6px" } },
          "💡 FORMATIERUNGS-TIPS / EDITING GUIDELINES:"
        ),
        React.createElement(
          "ul",
          { style: { paddingLeft: "15px", listStyleType: "disc", display: "flex", flexDirection: "column", gap: "4px" } },
          React.createElement(
            "li",
            {},
            React.createElement("strong", {}, "Fett / Bold:"),
            " Nutzen Sie ",
            React.createElement("code", { style: { background: "rgba(255,255,255,0.1)", padding: "1px 5px", borderRadius: "3px" } }, "**text**")
          ),
          React.createElement(
            "li",
            {},
            React.createElement("strong", {}, "Kursiv / Italic:"),
            " Nutzen Sie ",
            React.createElement("code", { style: { background: "rgba(255,255,255,0.1)", padding: "1px 5px", borderRadius: "3px" } }, "*text*")
          ),
          React.createElement(
            "li",
            {},
            React.createElement("strong", {}, "Überschriften / Subheadings:"),
            " Starten Sie eine Zeile mit ",
            React.createElement("code", { style: { background: "rgba(255,255,255,0.1)", padding: "1px 5px", borderRadius: "3px" } }, "## Meine Überschrift")
          ),
          React.createElement(
            "li",
            {},
            React.createElement("strong", {}, "Bild einbetten / Inline Image:"),
            " Eigene Zeile mit ",
            React.createElement("code", { style: { background: "rgba(255,255,255,0.1)", padding: "1px 5px", borderRadius: "3px" } }, "[image: 0]"),
            " (0 für das 1. Galeriebild, 1 für das 2. Bild usw.)"
          ),
          React.createElement(
            "li",
            {},
            React.createElement("strong", {}, "Absätze / Paragraphs:"),
            " Nutzen Sie doppelte Zeilenumbrüche (2x Enter) für neue Absätze."
          )
        )
      ),
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
