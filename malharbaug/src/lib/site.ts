/**
 * Static site identity (name, canonical URL, SEO copy).
 *
 * Contact details (phone, WhatsApp, email, address, geo) are NOT hardcoded here:
 * they are fetched at build time from the booking API — see `src/lib/api.ts`
 * (`getContact()`) and `src/components/providers/PropertyProvider.tsx`.
 */
export const siteConfig = {
  name: 'Malhar Baug Resort',
  legalName: 'Malhar Baug Resort, Alibaug',
  url: 'https://www.malharbaugresort.com',
  tagline: 'Family Resort in Alibaug Near Nagaon Beach',
  description:
    'Malhar Baug Resort in Nagaon, Alibaug — a family-friendly resort with luxury rooms, private villas, swimming pool, lush gardens and home-style Konkan dining, just 2 km from Nagaon Beach.',
} as const;
