import type { Metadata } from 'next';
import { HeroCarousel } from '@/components/sections/HeroCarousel';
import { About } from '@/components/sections/About';
import { RoomsGrid } from '@/components/sections/RoomsGrid';
import { Services } from '@/components/sections/Services';
import { NearbyPlaces } from '@/components/sections/NearbyPlaces';
import { Testimonials } from '@/components/sections/Testimonials';
import { Gallery } from '@/components/sections/Gallery';
import { ContactSection } from '@/components/sections/ContactSection';

export const metadata: Metadata = {
  title: 'Hotel K2 — Best Hotel in Chakradharpur, Jharkhand | AC Rooms, Free Wi-Fi',
  description:
    'Hotel K2 is the best hotel in Chakradharpur, Jharkhand. Located near Chakradharpur Railway Station, Etwari Bazar, Station Link Road, near Carmel School. AC rooms with free Wi-Fi, TV, geyser, power backup. 24-hour room service, banquet hall & catering. Book now — affordable hotel booking in Chakradharpur. Hotel K2 room booking, online hotel booking Chakradharpur.',
  keywords:
    'Hotel K2 Chakradharpur, Hotel in Chakradharpur, Best hotel in Chakradharpur, Hotels in Chakradharpur, AC rooms Chakradharpur, Hotel near Chakradharpur Railway Station, Banquet hall Chakradharpur, Hotel booking Chakradharpur, Budget hotel Chakradharpur, Hotel in West Singhbhum, Best hotel in West Singhbhum, Book hotel in Chakradharpur, Online hotel booking Chakradharpur, Hotel K2 booking, Affordable hotel Chakradharpur, Hotel near Etwari Bazar, Hotel near Carmel School Chakradharpur, Hotel with free WiFi Chakradharpur, Hotel with room service Chakradharpur, Best place to stay in Chakradharpur, Hotel in Chakradharpur Jharkhand, Hotel K2 Chakradharpur Jharkhand, Chakradharpur hotel, Chakradharpur hotels, Hotel deals Chakradharpur, Best hotel deals in Chakradharpur, Hotel reservation Chakradharpur, Top hotel in Chakradharpur, Family hotel Chakradharpur, Business hotel Chakradharpur, Hotel near railway station Chakradharpur',
  openGraph: {
    title: 'Hotel K2 — Best Hotel in Chakradharpur, Jharkhand',
    description:
      'Best hotel in Chakradharpur near Railway Station. AC rooms, free Wi-Fi, TV, geyser, power backup, 24-hour room service, banquet hall & catering. Book Hotel K2, Etwari Bazar, Chakradharpur.',
    url: '/',
    images: [
      { url: '/homehero1.png', width: 1200, height: 630, alt: 'Hotel K2 — Best Hotel in Chakradharpur, Jharkhand' },
      { url: '/newimages/receptionmain.png', width: 1200, height: 630, alt: 'Hotel K2 Reception, Chakradharpur' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hotel K2 — Best Hotel in Chakradharpur, Jharkhand',
    description:
      'Best hotel in Chakradharpur near Railway Station. AC rooms, free Wi-Fi, banquet hall & 24-hour room service. Book now at Hotel K2.',
    images: ['/homehero1.png'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <>
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
