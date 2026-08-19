# Hotel K2 — Marketing Site

Next.js 14 (App Router) + TypeScript + SCSS implementation of the Hotel K2 marketing site (Chakradharpur, West Singhbhum, Jharkhand), built from a token-driven design system. See **`DESIGN-SYSTEM.md`** for full UI guidance, accessibility acceptance criteria, and the QA checklist.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build (statically generates all room pages)
npm run start   # serve the production build
npm run typecheck
npm run lint
```

This project was built and verified with `npm run build` (10/10 pages generated, zero type errors) before packaging.

## Structure

```
src/
  app/
    layout.tsx           Root layout: <html>, Header, Footer, metadata
    page.tsx              Home page (assembles all sections)
    globals.scss          Global stylesheet entry point
    not-found.tsx          404 page
    rooms/[slug]/
      page.tsx             Room detail page (statically generated per room)
      page.module.scss
  components/
    layout/                Header, Footer
    sections/               Hero, RoomsGrid, RoomCard, Services, Testimonials,
                            Gallery, ContactSection — one section per file,
                            each with a co-located .module.scss
    ui/                     Reusable primitives: Button, TextField
  data/                    Typed content — site.ts, rooms.ts, services.ts,
                            testimonials.ts, gallery.ts — mapped from the
                            live site's real content
  styles/
    _tokens.scss            All design tokens (source of truth)
    _mixins.scss             Responsive, focus, and accessibility mixins
    _base.scss                Global element reset/defaults
  types/
    index.ts                 Shared TypeScript interfaces
```

## Design tokens

All colors, spacing, type, radius, shadow, and motion values live in `src/styles/_tokens.scss`. Component styles reference tokens only — see `DESIGN-SYSTEM.md` §2 for the full token table, including two tokens (`color.text.primary` on `surface.strong`) that were adjusted in usage because they fail WCAG AA contrast as originally paired.

## Images

Room and gallery imagery is served from the source site's own hosting (`www.hhickp.com`) but routed through this app's own image proxy at `src/app/api/image/route.ts` rather than being requested directly. The source site enforces referrer/hotlink protection that can silently reject direct cross-origin requests (including from Next.js's built-in image optimizer); the proxy fetches server-side with a matching `Referer` header and streams the result, so the browser only ever talks to this app's own origin. This is wired globally via a custom `next/image` loader (`src/lib/image-loader.ts`, configured in `next.config.js`) — every `<Image>` in the app benefits automatically. To self-host instead, download the assets into `public/` and point `src/data/*.ts` at local paths (the loader passes local paths through unchanged).

## Hero carousel

The homepage hero (`src/components/sections/HeroCarousel.tsx`) reproduces the source site's Previous/Next image slider: three rotating property/room photos, each with a caption link into a page section, autoplay (paused on hover, focus, or `prefers-reduced-motion`), and keyboard support (arrow keys, focusable Previous/Next/indicator controls). Slide content lives in `src/data/hero-slides.ts`.

## Booking

"Book Now" actions link to the hotel's existing booking engine (`hotelhariinternational.bookingjini.in`). The contact form in `ContactSection.tsx` currently simulates submission (see the `handleSubmit` comment) — wire it to a real endpoint before launch.
