export const FONTS = {
  serif: "var(--font-cormorant), Georgia, Garamond, serif",
  sans: 'var(--font-manrope), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  mono: '"Courier New", monospace',
} as const;

export const TYPOGRAPHY = {
  h1: {
    size: "56px",
    weight: 700,
    lineHeight: 1.2,
    letterSpacing: "-1.5px",
    font: FONTS.serif,
  },
  h2: {
    size: "44px",
    weight: 700,
    lineHeight: 1.25,
    letterSpacing: "-0.5px",
    font: FONTS.serif,
  },
  h3: {
    size: "32px",
    weight: 600,
    lineHeight: 1.3,
    letterSpacing: "0px",
    font: FONTS.serif,
  },
  h4: {
    size: "24px",
    weight: 600,
    lineHeight: 1.4,
    letterSpacing: "0px",
    font: FONTS.sans,
  },
  h5: {
    size: "18px",
    weight: 600,
    lineHeight: 1.5,
    letterSpacing: "0.5px",
    font: FONTS.sans,
  },
  bodyLg: {
    size: "18px",
    weight: 400,
    lineHeight: 1.7,
    letterSpacing: "0.3px",
    font: FONTS.sans,
  },
  bodyBase: {
    size: "16px",
    weight: 400,
    lineHeight: 1.6,
    letterSpacing: "0.2px",
    font: FONTS.sans,
  },
  bodySm: {
    size: "14px",
    weight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.1px",
    font: FONTS.sans,
  },
  caption: {
    size: "12px",
    weight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.5px",
    font: FONTS.sans,
  },
  sectionHeader: {
    size: "14px",
    weight: 600,
    lineHeight: 1.4,
    letterSpacing: "2px",
    font: FONTS.sans,
  },
} as const;
