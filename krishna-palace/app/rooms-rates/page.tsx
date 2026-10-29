import type { Metadata } from 'next';
import PageHero from '@/components/hero/PageHero';
import CinematicRoomsShowcase from '@/components/rooms/CinematicRoomsShowcase';
import StayInclusions from '@/components/rooms/StayInclusions';
import RoomsLocation from '@/components/sections/rooms-rates/RoomsLocation';
import FaqSection from '@/components/common/FaqSection';
import CalloutCTA from '@/components/sections/shared/CalloutCTA';
import JsonLd from '@/components/seo/JsonLd';
import { roomsFaqs } from '@/data/faqs';
import { hotel } from '@/data/site';
import { getBreadcrumbSchema, getFaqSchema, getRoomsCatalogSchema } from '@/lib/schema';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Hotel Rooms & Suites in Hospet | Krishna Palace',
  description:
    'Explore executive rooms and mini suites at Hotel Krishna Palace in Hosapete. View published tariffs, room inclusions, breakfast options and direct booking.',
  path: '/rooms-rates/',
  image: '/DSC_2597.avif',
  imageAlt: 'Comfortable guest room with warm wood furnishings at Hotel Krishna Palace, Hosapete',
});

export default function RoomsPage() {
  return (
    <>
      <JsonLd
        schema={[
          getBreadcrumbSchema([
            { name: 'Home', url: 'https://krishnapalacehotel.com/' },
            { name: 'Rooms & Rates', url: 'https://krishnapalacehotel.com/rooms-rates/' },
          ]),
          getRoomsCatalogSchema(),
          getFaqSchema(roomsFaqs),
        ]}
      />

      <PageHero
        title="Hotel Rooms & Suites in Hospet"
        eyebrow="Rooms & Rates"
        description="A comfortable base in Hosapete, made for slow mornings and days spent discovering the heritage of Hampi."
        image="/DSC_2597.avif"
        alt="Comfortable guest room with warm wood furnishings at Hotel Krishna Palace"
        secondImage="/FOC00586_converted.jpg"
        secondAlt="Luxurious guest room interior at Hotel Krishna Palace"
        secondTitle="Wake up near a world of stories."
        secondDescription="Live availability and published tariffs synchronized directly with our booking desk."
      />

      <CinematicRoomsShowcase />

      <StayInclusions />

      <RoomsLocation />

      <FaqSection
        eyebrow="Accommodation FAQs"
        title="Rooms, tariffs & policies."
        body="Clear answers regarding room amenities, occupancy, check-in schedules, and tariff details."
        items={roomsFaqs}
      />

      <CalloutCTA
        eyebrow="Ready to Reserve?"
        title="Let your journey begin."
        body="Book directly online through our secure booking engine, or get in touch for personal assistance."
        actions={[
          { href: hotel.bookingUrl, label: 'Book now', external: true },
          { href: `mailto:${hotel.reservationEmail}`, label: 'Email reservations', outline: true },
        ]}
      />
    </>
  );
}
