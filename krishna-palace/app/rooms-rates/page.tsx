import type { Metadata } from 'next';
import PageHero from '@/components/hero/PageHero';
import CinematicRoomsShowcase from '@/components/rooms/CinematicRoomsShowcase';
import StayInclusions from '@/components/rooms/StayInclusions';
import RoomsLocation from '@/components/sections/rooms-rates/RoomsLocation';
import CalloutCTA from '@/components/sections/shared/CalloutCTA';
import { hotel } from '@/data/site';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Rooms & Rates | Hotel Krishna Palace Hosapete',
  description:
    'Live room tariffs, availability and published inclusions directly synchronized with Hotel Krishna Palace in Hosapete, near the heritage of Hampi.',
  path: '/rooms-rates/',
  image: '/images/13-kp-hosapete-suit-room-1.jpg',
  imageAlt: 'Guest room at Hotel Krishna Palace, Hosapete',
});

export default function RoomsPage() {
  return (
    <>
      <PageHero
        title="Rest easy. Roam far."
        eyebrow="Rooms & Rates"
        description="A comfortable base in Hosapete, made for slow mornings and days spent discovering the heritage of Hampi."
        image="/DSC_2597.avif"
        alt="Comfortable guest room with warm wood furnishings"
        secondImage="/FOC00586_converted.jpg"
        secondAlt="Luxurious guest room interior at Hotel Krishna Palace"
        secondTitle="Wake up near a world of stories."
        secondDescription="Live availability and published tariffs synchronized directly with our booking desk."
      />

      <CinematicRoomsShowcase />

      <StayInclusions />

      <RoomsLocation />

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
