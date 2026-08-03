import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9f0',
          100: '#d9f0d9',
          200: '#b5e2b5',
          300: '#85ce85',
          400: '#52b552',
          500: '#2d8f2d',
          600: '#227722',
          700: '#1d5e1d',
          800: '#1a4b1a',
          900: '#173e17',
        },
        earth: {
          50: '#faf8f5',
          100: '#f0ece5',
          200: '#e0d7c9',
          300: '#ccbea7',
          400: '#b8a385',
          500: '#a88d6b',
          600: '#9a7b5b',
          700: '#81644b',
          800: '#6b5242',
          900: '#584438',
        },
        ocean: {
          50: '#f0f8fa',
          100: '#d9eef2',
          200: '#b7dfe6',
          300: '#84c9d5',
          400: '#49aabf',
          500: '#2d8ea5',
          600: '#27728b',
          700: '#265d72',
          800: '#274e60',
          900: '#244252',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'pulse-dot': 'pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 1s ease-out forwards',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
