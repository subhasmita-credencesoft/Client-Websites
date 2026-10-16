import type { Metadata } from 'next';
import PageHero from '@/components/hero/PageHero';
import RestaurantOutlets from '@/components/sections/restaurant/RestaurantOutlets';
import CalloutCTA from '@/components/sections/shared/CalloutCTA';
import { hotel } from '@/data/site';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Restaurant & Bar | Hotel Krishna Palace Hosapete',
  description: 'Hotel Krishna Palace features two distinct dining destinations in Hosapete: Fiesta All-Day Dining and Madira The Bar & Lounge.',
  path: '/restaurant/',
  image: '/images/21-kp-hosapete-21.jpg',
  imageAlt: 'Wood-paneled bar at Hotel Krishna Palace, Hosapete',
});

export default function RestaurantPage() {
  return (
    <>
      <PageHero
        title="Dining & Bar"
        description="Hotel Krishna Palace features two distinct food and beverage destinations: Fiesta All-Day Dining and Madira The Bar & Lounge."
        image="/images/22-kp-hosapete-9.jpg"
        alt="Fiesta all-day dining room at Hotel Krishna Palace"
        secondImage="/images/21-kp-hosapete-21.jpg"
        secondAlt="Wood-paneled bar at Madira"
        secondTitle="Two distinct dining destinations."
        secondDescription="Explore our dining and bar collection."
      />

      <RestaurantOutlets />

      <CalloutCTA
        eyebrow="Reservations & Dining"
        title="Reserve your table."
        body="For table bookings or enquiries across our dining destinations, reach the hotel team directly."
        actions={[
          { href: `tel:${hotel.phoneHref}`, label: <>Call {hotel.phoneDisplay}</> },
          { href: '/dining/', label: 'All dining details', outline: true },
        ]}
      />
    </>
  );
}
