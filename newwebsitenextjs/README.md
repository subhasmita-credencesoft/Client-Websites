# Hotel Redwings Castle Frontend

Production-oriented Next.js App Router project for the Hotel Redwings Castle website.

## Structure

```text
app/                    Route entrypoints and page-level wiring
components/
  features/             Page and domain UI modules
  layout/               Global header/footer shell
  providers/            App-wide client providers
  ui/                   Reusable presentational building blocks
lib/
  data/
    content/            Shared content collections
    pages/              Route/page data models
  hotelmate/            Availability and booking integration logic
  utils/                Pure utility helpers
public/                 Static assets
store/                  Redux slices and state wiring
docs/architecture/      File-structure and boundary guidance
```

## Folder Rules

- Keep `app/` thin: pages should compose feature modules, not hold large UI systems.
- Keep `components/features/` route or domain focused.
- Keep `components/ui/` free of route-specific business knowledge.
- Keep `lib/data/` for static content and config-like data only.
- Keep `lib/hotelmate/` for booking and availability integration logic.
- Keep `store/` for shared client state only.

## Barrel Exports

The project now includes barrel files in key folders to support cleaner imports and safer scaling without moving existing files.

## Getting Started

```bash
npm run dev
```

Type-check locally with:

```bash
npx tsc --noEmit
```
