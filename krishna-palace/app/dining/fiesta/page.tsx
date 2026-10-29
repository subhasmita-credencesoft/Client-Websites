import type { Metadata } from 'next';
import PageHero from '@/components/hero/PageHero';
import FiestaIntro from '@/components/sections/fiesta/FiestaIntro';
import FiestaHighlights from '@/components/sections/fiesta/FiestaHighlights';
import OtherOutlets from '@/components/sections/shared/OtherOutlets';
import CalloutCTA from '@/components/sections/shared/CalloutCTA';
import JsonLd from '@/components/seo/JsonLd';
import { hotel } from '@/data/site';
import { getBreadcrumbSchema, getRestaurantSchema } from '@/lib/schema';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Fiesta All-Day Dining | Hotel Krishna Palace Hosapete',
  description:
    'Fiesta is the all-day dining restaurant at Hotel Krishna Palace in Hosapete, serving Indian, South Indian breakfasts and multi-cuisine dishes for breakfast, lunch and dinner.',
  path: '/dining/fiesta/',
  image: '/images/22-kp-hosapete-9.jpg',
  imageAlt: 'Fiesta all-day dining room at Hotel Krishna Palace, Hosapete',
});

export default function FiestaPage() {
  return (
    <>
      <JsonLd
        schema={[
          getBreadcrumbSchema([
            { name: 'Home', url: 'https://krishnapalacehotel.com/' },
            { name: 'Dining & Bar', url: 'https://krishnapalacehotel.com/dining/' },
            { name: 'Fiesta All-Day Dining', url: 'https://krishnapalacehotel.com/dining/fiesta/' },
          ]),
          getRestaurantSchema(),
        ]}
      />

      <PageHero
        title="Fiesta · All Day Dining"
        description="A welcoming all-day dining destination serving a variety of flavours in a relaxed hotel setting, perfect for breakfast, lunch and dinner."
        image="/FOC00348.avif"
        alt="Spacious dining hall at Fiesta restaurant"
        secondImage="/FOC00383.avif"
        secondAlt="Fresh breads and refreshments prepared at Fiesta"
        secondTitle="From morning to evening."
        secondDescription="Comforting Indian specialties, South Indian breakfast classics and versatile multi-cuisine dining."
      />

      <FiestaIntro />
      <FiestaHighlights />

      <OtherOutlets exclude="fiesta" body="Explore our dedicated bar and fine dining lounge." />

      <CalloutCTA
        eyebrow="Fiesta Reservations"
        title="Join us at the table."
        body="Whether stopping in for breakfast before visiting Hampi or reserving a family dinner, our team is ready to welcome you."
        actions={[
          { href: `tel:${hotel.phoneHref}`, label: <>Call {hotel.phoneDisplay}</> },
          {
            href: `mailto:${hotel.reservationEmail}?subject=Fiesta%20Dining%20Enquiry`,
            label: 'Email enquiry',
            outline: true,
          },
        ]}
      />
    </>
  );
}
