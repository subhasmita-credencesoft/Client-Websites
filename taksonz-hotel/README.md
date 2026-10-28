# Hotel The Taksonz — Website

A static Next.js site that does not need a Node.js server after export. The browser can call TheHotelMate APIs for room data and enquiries; those external services must be available for the related live features.
Next.js 15 · TypeScript (strict) · SCSS modules · Framer Motion · Zod.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # writes the finished site to ./out
npx serve out        # preview the build
```

The production build writes the deployable static site to `out/`.

## Hostinger deployment (static export)

This project uses Next.js App Router with `output: "export"`. No Next.js server process is required after the build.

```bash
npm ci
npm run build
```

In hPanel, open the **specific `hoteltaksonz.com` website** and confirm its document root. Upload the **contents** of `out/` into that domain's document root so `index.html`, `.htaccess`, `_next/`, `robots.txt`, and `sitemap.xml` are directly inside the root. Do not upload the project source, `.next/`, or the `out/` folder itself as a nested directory. This project does not configure `krishnapalacehotel.com` or `hotelsitararesidency.com`.

Before replacing existing document-root files, make a backup and verify they belong to this domain. Confirm that the deployed root has this build's `index.html`. If an `index.php` or old `index.html` is present, inspect and back it up first; `.htaccess` sets `DirectoryIndex index.html` so the exported homepage takes precedence once this configuration is active. The `.htaccess` file also redirects HTTP and `www` requests to `https://hoteltaksonz.com` and serves the exported directory-index routes on refresh. Enable/confirm SSL for the domain in hPanel.

After upload, open `https://hoteltaksonz.com/`, refresh a nested route such as `/rooms/twin-bed/`, and check `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and browser DevTools Network for missing `/_next/` assets or images.

## Where to edit things — everything is in `/data`

| File | What it controls |
|---|---|
| `data/site.ts` | Hotel name, phone, email, address, map, social links, live domain |
| `data/images.ts` | **Every image** (Unsplash photo IDs). Replace any value with `/images/your-photo.jpg` (put the file in `public/images/`) |
| `data/rooms.ts` | Rooms: names, rates, beds, sizes, amenities, rules, gallery |
| `data/dining.ts` | Restaurant details, venues, specialities, prices |
| `data/venues.ts` | Banquet halls and meeting rooms |
| `data/gallery.ts` | Gallery images and categories |
| `data/faqs.ts` | FAQ questions and answers |
| `data/content.ts` | Wording for the home, about, banquets, meetings, etc. |
| `data/pages.ts` | SEO title/description and hero text for every page |
| `data/legal.ts` | Privacy, terms and cancellation text (drafts) |
| `data/navigation.ts` | Header and footer links |

## How forms and booking work (no backend)
- Contact, event, meeting and booking-request forms validate in the browser, then **open the guest's email app** with the message pre-filled and addressed to `site.email`. Nothing is stored by the website.
- Booking: guests choose dates (validated for India time), pick a room and send a **booking request**. The site never shows live availability, takes payment, or issues confirmations — the hotel confirms by email/phone.

## Hero video & animation
- The home hero plays a looping background video (`heroVideo` in `data/images.ts`) over an Unsplash poster image. **Unsplash has no free video**, so the clip is a free Mixkit one ("Luxury hotel room panning shot", Mixkit License). To use your own footage, put an `.mp4` in `public/videos/` and list it first in `heroVideo.sources`.
- If the video can't load, or the visitor prefers reduced motion or has data-saver on, the poster image is shown instead. A pause/play button is provided.
- Motion: word-by-word headline reveals, scroll-linked image parallax, curtain-reveal images, a scroll-progress bar, a scrolling word band, hero zoom/fade on scroll, and soft page fades. Everything switches off for reduced-motion users.

## Images
All photos are free Unsplash stock images loaded from Unsplash's CDN (needs internet). They are **not photographs of the hotel**. Swap in real photos in `data/images.ts` before launch. Replace the typographic logo in `components/ui/Logo.tsx` with the approved logo.

## Before launch
1. Set the real domain in `data/site.ts` (`url`) — used for canonical links and the sitemap.
2. Confirm every `PLACEHOLDER` value in `data/` (address, phone, email, rates, hours, capacities, About-page numbers).
3. Set `verified: true` in `data/site.ts` to turn on Hotel and FAQ structured data.
4. Have the legal pages reviewed.
5. Run Lighthouse and an accessibility audit.

## Checks run
TypeScript strict · static build (26 pages) · all 19 routes load with no console errors · no horizontal overflow at 390px and 1440px · booking panel validation · booking flow end to end · form validation and email hand-off · gallery lightbox · mobile menu.
Not run: Lighthouse / Core Web Vitals, axe audit, screen-reader and real-device testing; Unsplash images were checked by URL format only (the build environment cannot reach Unsplash).
