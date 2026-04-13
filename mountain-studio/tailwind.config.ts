import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px"
      },
      colors: {
        gold: {
          DEFAULT: "var(--gold)",
          light: "var(--gold-light)",
          dark: "var(--gold-dark)"
        },
        dark: {
          DEFAULT: "var(--dark)",
          2: "var(--dark-2)",
          3: "var(--dark-3)"
        },
        ivory: {
          DEFAULT: "var(--ivory)",
          dim: "var(--ivory-dim)"
        },
        taupe: "var(--taupe)",
        muted: "var(--text-muted)"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"]
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-140%) skewX(-18deg)" },
          "100%": { transform: "translateX(240%) skewX(-18deg)" }
        },
        kenburns: {
          "0%": { transform: "scale(1) translate3d(0, 0, 0)" },
          "100%": { transform: "scale(1.08) translate3d(0, -1.5%, 0)" }
        },
        fadeup: {
          "0%": { opacity: "0", transform: "translate3d(0, 30px, 0)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0)" }
        },
        floatin: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" }
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "30%": { transform: "translate(3%, -15%)" },
          "50%": { transform: "translate(12%, 9%)" },
          "70%": { transform: "translate(9%, 4%)" },
          "90%": { transform: "translate(-1%, 7%)" }
        },
        "reveal-clip": {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0 0 0)" }
        }
      },
      animation: {
        shimmer: "shimmer 1.8s ease-in-out infinite",
        kenburns: "kenburns 12s ease-in-out infinite alternate",
        fadeup: "fadeup 0.9s ease forwards",
        floatin: "floatin 5s ease-in-out infinite",
        grain: "grain 8s steps(10) infinite",
        "reveal-clip": "reveal-clip 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards"
      },
      backgroundImage: {
        "gold-radial":
          "radial-gradient(circle at center, rgba(201, 168, 76, 0.24), rgba(201, 168, 76, 0) 68%)"
      },
      boxShadow: {
        glow: "0 0 30px rgba(201, 168, 76, 0.22)"
      },
      letterSpacing: {
        widestPlus: "0.45em"
      }
    }
  },
  plugins: []
};

export default config;
