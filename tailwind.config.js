/** @type {import('tailwindcss').Config} */
// This file is our "design token dictionary".
// Every color, font, and easing curve the site uses is defined ONCE here,
// so components never invent their own values (Rule: no new color tokens).
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // The v3 "Heritage-Boutique" dark-first palette (from design.md §3)
        brand: {
          bg: "#0B131E",      // Deep Navy Slate — main page background
          text: "#FBFBFA",    // Warm Linen — main text on dark canvas
          green: "#468E99",   // Teal — dividers, labels, eco accents
          accent: "#DDBE8B",  // Brushed Brass Gold — metrics, buttons, highlights
          orange: "#C27B62",  // Burnt Terracotta — hovers, CTAs, warm details
          surface: "#1E2229", // Charcoal Slate — elevated cards / dark panels
          lightbg: "#FBFBFA", // Warm Linen — light contrast panels
          muted: "#A9B2BC",   // Softened linen for secondary copy on dark
        },
      },
      fontFamily: {
        // Wired to next/font CSS variables set in app/layout.tsx
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
        display: ["var(--font-display)", "Space Grotesk", "sans-serif"],
      },
      fontSize: {
        // Typography scale tokens from design.md §2B (desktop values;
        // mobile sizes are applied responsively in components)
        "fs-display": ["5.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "fs-display-m": ["3.25rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "fs-h1": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "fs-h1-m": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "fs-h2": ["2rem", { lineHeight: "1.25" }],
        "fs-h2-m": ["1.5rem", { lineHeight: "1.3" }],
        "fs-body": ["1.125rem", { lineHeight: "1.65" }],
        "fs-body-m": ["1rem", { lineHeight: "1.6" }],
        "fs-small": ["0.875rem", { lineHeight: "1.5" }],
        // Line-height raised from 1 → 1.7 so multi-line labels (like the
        // regions strip) breathe instead of cramming together.
        "fs-label": ["0.75rem", { lineHeight: "1.7", letterSpacing: "0.18em" }],
      },
      transitionTimingFunction: {
        // THE one easing curve the whole site uses (soft deceleration).
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        "fade-in": "fadeIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
