# Diamond Jubilee Hotel Management Services – Website

Next.js 15 (App Router) · React 19 · TypeScript (strict) · SCSS Modules · Lucide icons.
Multi-page marketing site built from the supplied mockup. Routes: `/` (Home overview), `/about`, `/services`, `/properties`, `/careers` (open positions + application form), `/contact` (enquiry form + map), plus `/privacy`, `/terms`, `/cookies`. Each inner page has its own banner, breadcrumb, SEO title/description and sitemap entry.

## Run
```bash
npm install
cp .env.example .env.local   # fill in SMTP + site URL
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run typecheck
```

## Before launch (TODO checklist)
1. **Photos** – real hospitality photography from Unsplash (free for commercial use, no attribution required: https://unsplash.com/license). Each photo's ID was taken from its Unsplash page; the slots and what each shows are in `src/data/site.ts` (`images`, `services[].image`). To change one, replace the ID after `photo-` with any other Unsplash photo ID. Photos load in the visitor's browser directly from Unsplash's CDN; if one cannot load, `public/images/fallback.jpg` (neutral navy/gold) is shown. For the client's own photography, put files in `public/images/` and use paths like `/images/hero.jpg` instead of `unsplash(...)`.
2. **Logo** – `src/components/ui/Logo.tsx` is an SVG/HTML rebuild from the mockup. Swap in the official artwork (and replace `src/app/icon.png`).
3. **Contact facts** (`src/data/site.ts`): the phone `+91 9892912289` is a mockup placeholder; confirm `info@djhms.in`. The mockup said "818 Sagar Tech Plaza" but Hotel Maharana's site and GST records say **819**, which is used. Social links are generic root URLs – replace with real profiles. The old Chembur address is listed as permanently closed and is intentionally not used.
4. **Careers positions** and **enquiry types** are editable lists in `site.ts`.
5. **Email delivery** – forms POST to `/api/contact` and `/api/careers`, which send via SMTP (nodemailer) using `.env` values. Without SMTP, production returns a friendly error (dev just logs). Resume uploads are checked for type, size (5 MB) and file signature. Rate limiting is in-memory; use Redis/Upstash on serverless hosts.
6. **Legal pages** are starter text – have them reviewed.
7. Set `NEXT_PUBLIC_SITE_URL` for canonical URLs, sitemap and Open Graph.

## Motion & effects
Cinematic hero (pointer + scroll parallax, Ken-Burns zoom, vignette, film grain), light sweep and gold-dust particles, staggered headline entrance, scroll-reveal on every section (`ui/Reveal`), header shrink + gold scroll-progress bar, image hover zoom, button light sweep. All motion is disabled under `prefers-reduced-motion`.

## Structure
```
src/app            layout, home page, about/ services/ properties/ careers/ contact/ routes, api routes, legal pages, sitemap/robots
src/components     layout/ (TopBar, Header, MobileNavigation, Footer), sections/, forms/, ui/
src/data/site.ts   all content + config
src/styles         _variables, _mixins (design tokens, breakpoints)
src/lib            validation, mailer, rate limit, active-section hook
```
Fonts (Inter, Playfair Display) are self-hosted via @fontsource – no Google font requests at runtime.

## Design tokens (from mockup)
Navy `#0b2a55` / deep `#06224a`, gold `#d9ae50`, cream `#f8f6f0`, light-blue `#f3f6fb`. Container 1240px; breakpoints 640/768/1024/1280.
