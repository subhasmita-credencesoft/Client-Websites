# Hotel Krishna Palace — design and system brief

## Product

An official, guest-facing website for Hotel Krishna Palace in Hosapete, Karnataka. The site presents accommodation, dining, events, nearby heritage destinations, and direct contact details.

## Visual direction

Use the attached KAIRO brief as a reference for its calm editorial typography, cinematic photography, and deliberate motion. Adapt that sensibility to Krishna Palace and the Hampi region: the hotel's existing orange wordmark and authentic property/heritage photographs remain the brand anchors. Do not reuse KAIRO's name, island concept, fictional copy, volcano/3D scene, or KAIRO media.

The overall experience should feel warm, established, and welcoming rather than like a generic booking template. Keep movement restrained, honor `prefers-reduced-motion`, and maintain strong contrast and clear navigation.

## Source-of-truth content

Use the official hotel website as the source for public facts:

- Address: Station Road, Hosapete, Bellary District, Karnataka, India, 583 201.
- Reservations: `reservations@krishnapalacehotel.com`
- Phone: `+919035680385`
- Mobile: `+91 90356 80385`
- Mini Suite Rooms: ₹5,500 + 12% GST.
- Executive Rooms: ₹3,500 + 12% GST for single occupancy.
- Room tariffs are subject to change. Published inclusions: 24-hour stay (12 pm to 12 pm), breakfast, Wi-Fi, room service, satellite TV, fitness center and gym.
- Restaurant: multi-cuisine dining, local specialties, bar, cocktails and mocktails.
- Banquet: event capacity stated as 300+ people; business meets, product launches, corporate events, fashion events and cocktail dinners; free parking and catering are listed on the banquet page.
- Tourism pages feature Hampi, Anegundi, Aihole, Badami Caves Temple, Daroji Sloth Bear Sanctuary, Hampi Zoo, Pattadakal, and Tungabhadra Dam.

Avoid claims not backed by these sources. Do not invent room availability, live rates, online booking, amenities, distances, review counts, or event-package prices.

## Routes

- `/` — hotel overview and main contact/room discovery.
- `/rooms-rates/` — room types, published tariffs, inclusions and tariff disclaimer.
- `/restaurant/` — multi-cuisine restaurant and bar.
- `/banquet/` — event venue, capacity and inquiry contact.
- `/tourism/` — regional heritage destinations.
- `/contact/` — address, phone, email and directions.

## System design

- Framework: Next.js App Router with TypeScript and SCSS; use static export because the site is informational and has no live inventory or user data.
- Shared shell: one accessible responsive header/navigation and footer across every route.
- Keep source facts in typed content data rather than duplicating them between pages.
- Use semantic HTML, descriptive image alternatives, keyboard-visible focus, working internal navigation, and page-specific metadata.
- Calls to action must use real `tel:` and `mailto:` destinations. Do not present a fake booking or payment flow.
- Local hotel imagery is stored under `public/images/`; use it instead of remote hotlinked media.
