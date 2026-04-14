import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "var(--accent-gold)",
          surface: "var(--section-dark)",
          surfaceSoft: "var(--section-dark-soft)",
          paper: "var(--mist)",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "serif"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
        34: "8.5rem",
      },
      boxShadow: {
        luxury: "0 24px 50px rgba(10, 18, 12, 0.24)",
      },
    },
  },
};

export default config;
