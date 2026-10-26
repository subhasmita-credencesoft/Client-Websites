# Architecture

Hotel Sitara Residency — Next.js 16 (App Router), React 19, TypeScript, Tailwind v4.

The codebase follows a **layered, feature-sliced** architecture. Dependencies point
**inward only**: `app → features → shared → core`. A lower layer must never import
from a higher one.

```
app  →  features  →  shared  →  core
        (domain)    (generic)  (kernel)
```

## Layers

### `src/app/` — Routing
Next.js App Router. Route files (`page.tsx`, `layout.tsx`, `sitemap.ts`, `robots.ts`,
`error.tsx`, `not-found.tsx`) only compose feature components and fetch data. No
business logic, no styling decisions, no reusable components.

### `src/core/` — Kernel
Framework-agnostic, foundational building blocks. Depends on NO other layer.

- `types/` — core contract types (`business.ts`, `nav.ts`, `content.ts`, `hotelmate.ts`).
- `config/` — `business.ts` (brand + contact constants), `env.ts` (validated env via zod),
  `hotelmate.ts` (booking-engine API constants + room slug maps).
- `constants/` — `nav.ts` (site navigation + footer groups), `routes.ts` (canonical path
  map + typed builders like `ROUTES.bedroom(slug)`).
- `lib/` — pure helpers (`utils.ts`, e.g. `cn`).

### `src/shared/` — Generic UI + types + hooks
Presentation and cross-cutting primitives with **no domain business logic**, reused across features.

- `ui/` — atoms/molecules: `button-link`, `card`, `info-tile`, `image-callout`.
- `layout/` — chrome: `header`, `footer`, `cookie-panel`, `newsletter`.
- `hooks/` — reusable client hooks: `use-scrolled`, `use-scroll-lock`, `use-escape-key`.
- `types/` — domain contracts re-exported from `@/core/types`.

### `src/features/` — Domain slices
Each feature owns its components, data, and (where relevant) API/model. This is where
the product lives.

```
features/
  booking/      api/hotelmate.ts (engine client), model/room-data.ts (mappers), components/, index.ts
  rooms/        components/ (room-specific only), data/rooms.ts, index.ts
  home/         components/, data/{home,offers}.ts, index.ts
  dining/       data/dining.ts, index.ts
  blog/         data/blog.ts, index.ts
  things-to-do/ data/things-to-do.ts, index.ts
  contact/      components/, data/contact.ts, index.ts
  gallery/      components/, index.ts
  search/       components/, data/search.ts, index.ts
  common/       components/ (catalog, listing, detail views, CTAs), data/, index.ts
```

Rules:
- Components live in `components/`; data/copy in `data/`.
- A feature's `index.ts` barrel is the public surface. Cross-feature imports must go
  through the barrel (`@/features/rooms`, `@/features/common`) rather than reaching into deep `.../components/...`.
- Generic catalog, listing, and detail views (`CatalogGrid`, `CatalogHero`, `CatalogIntro`, `ListingView`, `DetailView`) live in `features/common/` and are reused by content slices (`blog`, `dining`, `things-to-do`).
- Navigational paths come from `@/core/constants/routes` (`ROUTES`) rather than string literals.

### `src/styles/` — CSS layers
`globals.css` is the **entry** and only imports ordered layers:

```
globals.css
  @import 'tailwindcss'
  tokens.css            # @theme design tokens + :root font stacks
  base.css              # @layer base / components / utilities
  sections/nav.css      # navigation, drawer, footer shell
  sections/home.css     # home + editorial sections
  sections/rooms.css    # rooms design system
  sections/listing.css  # bedrooms listing page
  sections/responsive.css  # unified responsive system
```

Keep section-level rules in the relevant `sections/*.css`. `globals.css` should never
accumulate rules.

## Path aliases

Defined in `tsconfig.json`:

| Alias | Target |
| --- | --- |
| `@/*` | `src/*` |
| `@/core/*` | `src/core/*` |
| `@/shared/*` | `src/shared/*` |
| `@/features/*` | `src/features/*` |

## Import rules (enforced by review)

1. `app` → may import from `features`, `shared`, `core`.
2. `features` → may import from `shared`, `core`, and other features' **barrels**.
3. `shared` → may import from `core` only.
4. `core` → imports nothing from `src` except other `core` modules.
5. No deep cross-feature imports (`@/features/x/components/...` from another feature).
6. Within a feature, import data through its own `data/` barrel where one exists.

## Error handling

Because `output: 'export'` prerenders every route, `loading.tsx` is inert and intentionally
omitted. Client error boundaries are provided by `app/error.tsx` (route-level) and
`app/global-error.tsx` (root-layout failures), both rendering the shared `ErrorNotice`.

## Data flow

- **Live room inventory** comes from the HotelMate booking engine via
  `features/booking/api/hotelmate.ts` (server-side fetch, cached).
- `features/booking/model/room-data.ts` maps API responses into view models
  (`CardItem`, `DetailContent`), merging curated copy from `features/rooms/data/rooms.ts`.
- Static marketing copy lives in each feature's `data/` module and is imported by pages.

## Commands

```bash
# Lint
npm run lint

# Type-check
node node_modules/typescript/bin/tsc --noEmit

# Build (static export to out/)
node node_modules/next/dist/bin/next build

# Serve the static export
npx serve -s out
```

> `output: 'export'` is enabled — `next start` does not apply. Serve `out/` instead.
