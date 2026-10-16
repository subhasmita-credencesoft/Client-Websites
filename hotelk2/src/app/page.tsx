import type { Metadata } from 'next';
import { HeroCarousel } from '@/components/sections/HeroCarousel';
import { About } from '@/components/sections/About';
import { RoomsGrid } from '@/components/sections/RoomsGrid';
import { Services } from '@/components/sections/Services';
import { NearbyPlaces } from '@/components/sections/NearbyPlaces';
import { Testimonials } from '@/components/sections/Testimonials';
import { Gallery } from '@/components/sections/Gallery';
import { ContactSection } from '@/components/sections/ContactSection';
import { SITE_KEYWORDS } from '@/data/seo';
import { FAQ_SCHEMA, NEARBY_SCHEMA } from '@/data/schema';

export const metadata: Metadata = {
  title: {
    absolute: 'Hotel in Chakradharpur | Hotel K2 — AC Rooms, Free Wi-Fi & Banquet Hall',
  },
  description:
    'Hotel K2 is a hotel in Chakradharpur, Jharkhand, near Chakradharpur Railway Station at Etwari Bazar, Station Link Road, near Carmel School. AC rooms with free Wi-Fi, TV, geyser and power backup. 24-hour room service, banquet hall, conference hall and catering. Book your stay in Chakradharpur — Hotel K2.',
  keywords: SITE_KEYWORDS.join(', '),
  openGraph: {
    title: 'Hotel in Chakradharpur | Hotel K2, Jharkhand',
    description:
      'Hotel in Chakradharpur near Railway Station. AC rooms, free Wi-Fi, TV, geyser, power backup, 24-hour room service, banquet hall & catering. Book Hotel K2, Etwari Bazar, Chakradharpur.',
    url: '/',
    images: [
      { url: '/homehero1.png', width: 1200, height: 630, alt: 'Hotel K2 — Hotel in Chakradharpur, Jharkhand' },
      { url: '/newimages/receptionmain.png', width: 1200, height: 630, alt: 'Hotel K2 Reception, Chakradharpur' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hotel in Chakradharpur | Hotel K2, Jharkhand',
    description:
      'Hotel in Chakradharpur near Railway Station. AC rooms, free Wi-Fi, banquet hall & 24-hour room service. Book now at Hotel K2.',
    images: ['/homehero1.png'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(NEARBY_SCHEMA) }}
      />
      <HeroCarousel />
      <About />
      <RoomsGrid />
      <Services />
      <NearbyPlaces />
      <Testimonials />
      <Gallery />
      <ContactSection />
    </>
  );
}
