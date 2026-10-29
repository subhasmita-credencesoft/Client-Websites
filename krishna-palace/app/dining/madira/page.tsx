import type { Metadata } from 'next';
import PageHero from '@/components/hero/PageHero';
import MadiraIntro from '@/components/sections/madira/MadiraIntro';
import MadiraDetails from '@/components/sections/madira/MadiraDetails';
import OtherOutlets from '@/components/sections/shared/OtherOutlets';
import CalloutCTA from '@/components/sections/shared/CalloutCTA';
import JsonLd from '@/components/seo/JsonLd';
import { hotel } from '@/data/site';
import { getBarSchema, getBreadcrumbSchema } from '@/lib/schema';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Madira The Bar & Lounge | Hotel Krishna Palace Hosapete',
  description:
    'Madira The Bar at Hotel Krishna Palace offers an elegant lounge atmosphere, North Indian dining favourites, fine bar service and operating hours from 10:00 AM to 11:00 PM in Hosapete.',
  path: '/dining/madira/',
  image: '/compressed_FOC00707_converted.jpg',
  imageAlt: 'Madira The Bar lounge at Hotel Krishna Palace, Hosapete',
});

export default function MadiraPage() {
  return (
    <>
      <JsonLd
        schema={[
          getBreadcrumbSchema([
            { name: 'Home', url: 'https://krishnapalacehotel.com/' },
            { name: 'Dining & Bar', url: 'https://krishnapalacehotel.com/dining/' },
            { name: 'Madira The Bar & Lounge', url: 'https://krishnapalacehotel.com/dining/madira/' },
          ]),
          getBarSchema(),
        ]}
      />

      <PageHero
        title="Madira · The Bar"
        description="An elegant bar experience at Hotel Krishna Palace, bringing together refined ambience, refreshing beverages and a selection of Indian culinary favourites."
        image="/images/21-kp-hosapete-21.jpg"
        alt="Wood-paneled bar and lounge at Madira The Bar"
        secondImage="/compressed_FOC00545.jpg"
        secondAlt="Fiesta all-day dining room at Hotel Krishna Palace"
        secondTitle="Unwind with quiet distinction."
        secondDescription="A dedicated bar and fine dining lounge established in 2008, open 10:00 AM to 11:00 PM."
      />

      <MadiraIntro />
      <MadiraDetails />

      <OtherOutlets exclude="madira" body="Explore all-day dining at Fiesta." />

      <CalloutCTA
        eyebrow="Madira The Bar"
        title="Raise a glass to Hosapete."
        body="Drop in for an evening drink or reach out in advance to reserve seating."
        actions={[
          { href: `tel:${hotel.phoneHref}`, label: <>Call {hotel.phoneDisplay}</> },
          {
            href: `mailto:${hotel.reservationEmail}?subject=Madira%20Bar%20Enquiry`,
            label: 'Email reservations',
            outline: true,
          },
        ]}
      />
    </>
  );
}
