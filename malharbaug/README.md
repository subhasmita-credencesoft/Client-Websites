# Acuiderm — Dermatology & Surgery Centre

Production-grade Next.js (App Router) recreation of the Acuiderm marketing site, built from
`design.md` and the accompanying build prompt.

## Stack

- **Next.js 14** (App Router, SSR/SSG by default, `next/image`, `next/font`)
- **TypeScript** (strict mode)
- **Tailwind CSS** (class-based dark mode, custom design tokens in `tailwind.config.ts`)
- **Redux Toolkit + React Redux** — global theme and UI (mobile drawer, header scroll) state
- **Iconify** (`solar:` icon set) loaded via CDN script, per the original spec

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm run start
```

## Project structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout: fonts, theme bootstrap script, Redux provider
│   ├── page.tsx           # Assembles all page sections
│   └── globals.css        # Animation classes, flex-card, marquee, scrollbar, drawer transitions
├── components/
│   ├── layout/             # Announcement, Header, ServicesDropdown, MobileDrawer, Footer
│   ├── sections/            # Hero, Services, Locations, About, InsuranceMarquee
│   └── ui/                  # ThemeToggle, ScrollAnimationObserver
├── data/                    # Static content: navigation, services, locations, insurance
├── store/                   # Redux Toolkit store, slices (theme, ui), typed hooks, provider
└── types/                   # Shared TypeScript interfaces + iconify-icon JSX typing
```

## Notes on fidelity to design.md

- **Flex-card hover**: `.flex-card` in `globals.css` expands `flex: 1 → flex: 2.5` on desktop
  (`md:` breakpoint) only; on mobile all cards stay `flex: 1` and descriptions are always visible.
- **Marquee**: duplicated provider list + `animation: marquee 40s linear infinite` +
  `linear-gradient` mask for edge fade, exactly as specified.
- **Mobile drawer**: opens via `requestAnimationFrame` (so the slide-in transition actually
  runs) and cleans up via `setTimeout` after the slide-out transition completes, matching the
  "common mistakes to avoid" notes in the prompt.
- **Dark mode**: Tailwind's `class` strategy; an inline bootstrap script in `<head>` applies the
  persisted/preferred theme before hydration to avoid a flash of incorrect theme, then Redux's
  `themeSlice` takes over for toggling.
- **Footer copyright**: fixed at "2026" per the spec.
- **Footer service links**: intentionally inherit varying (sometimes empty) `className` values
  from the shared services dropdown data, while sharing identical hover states — matching the
  "some empty, some not" quirk called out in the prompt.

## Environment

No environment variables are required for local development — all content is static/local data
in `src/data/`. Swap in a CMS or API by replacing the exports in that directory.
