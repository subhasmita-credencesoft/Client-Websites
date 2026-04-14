export const SPACING = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px",
  "4xl": "80px",
  "5xl": "96px",
} as const;

export const TYPOGRAPHY = {
  h1: { size: "48px", weight: 700, lineHeight: 1.08, letterSpacing: "-0.04em" },
  h2: { size: "36px", weight: 600, lineHeight: 1.1, letterSpacing: "-0.03em" },
  h3: { size: "28px", weight: 600, lineHeight: 1.16, letterSpacing: "-0.02em" },
  h4: { size: "24px", weight: 600, lineHeight: 1.2, letterSpacing: "-0.01em" },
  h5: { size: "20px", weight: 600, lineHeight: 1.3, letterSpacing: "0em" },
  bodyLg: { size: "18px", weight: 400, lineHeight: 1.7 },
  bodyBase: { size: "16px", weight: 400, lineHeight: 1.65 },
  bodySm: { size: "14px", weight: 400, lineHeight: 1.55 },
  caption: { size: "12px", weight: 600, lineHeight: 1.4, letterSpacing: "0.24em" },
} as const;

export const COLORS = {
  primary: {
    50: "#f8f2e7",
    100: "#efdfc4",
    300: "#d7b57c",
    500: "#c89a55",
    600: "#b88948",
    700: "#966d39",
    900: "#2b2118",
  },
  neutral: {
    0: "#ffffff",
    50: "#f6ead8",
    100: "#eadcc8",
    200: "#c7b7a1",
    400: "#a89680",
    500: "#857462",
    600: "#6d5d4d",
    700: "#41362d",
    800: "#1b1712",
    900: "#0c0a08",
  },
  surface: {
    page: "#0c0a08",
    section: "#15110e",
    sectionAlt: "#182920",
    card: "#1f3329",
    cardSoft: "#243b31",
  },
  text: {
    primary: "#f6ead8",
    secondary: "rgba(246, 234, 216, 0.82)",
    muted: "rgba(246, 234, 216, 0.68)",
    inverse: "#0c0a08",
  },
} as const;
