import type { Metadata } from 'next';
import PageHero from '@/components/hero/PageHero';
import DiningIntro from '@/components/sections/dining/DiningIntro';
import DiningShowcases from '@/components/sections/dining/DiningShowcases';
import DiningTimeline from '@/components/sections/dining/DiningTimeline';
import DiningPillars from '@/components/sections/dining/DiningPillars';
import EditorialQuote from '@/components/sections/shared/EditorialQuote';
import FaqSection from '@/components/common/FaqSection';
import CalloutCTA from '@/components/sections/shared/CalloutCTA';
import JsonLd from '@/components/seo/JsonLd';
import { diningFaqs } from '@/data/faqs';
import { hotel } from '@/data/site';
import { getBarSchema, getBreadcrumbSchema, getFaqSchema, getRestaurantSchema } from '@/lib/schema';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Restaurant & Dining in Hospet | Krishna Palace',
  description:
    'Experience dining in Hosapete at Hotel Krishna Palace: Fiesta all-day multi-cuisine restaurant and Madira The Bar & Lounge for cocktails and dinner.',
  path: '/dining/',
  image: '/compressed_FOC00545.jpg',
  imageAlt: 'Fiesta multi-cuisine dining hall at Hotel Krishna Palace, Hosapete',
});

export default function DiningOverviewPage() {
  return (
    <>
      <JsonLd
        schema={[
          getBreadcrumbSchema([
            { name: 'Home', url: 'https://krishnapalacehotel.com/' },
            { name: 'Dining & Bar', url: 'https://krishnapalacehotel.com/dining/' },
          ]),
          getRestaurantSchema(),
          getBarSchema(),
          getFaqSchema(diningFaqs),
        ]}
      />

      <PageHero
        title="Restaurant & Dining in Hospet"
        eyebrow="Dining & Bar"
        description="From slow morning South Indian griddles at Fiesta to wood-paneled spirits at Madira The Bar."
        image="/compressed_FOC00545.jpg"
        alt="Fiesta all-day dining room at Hotel Krishna Palace"
        secondImage="/compressed_FOC00707_converted.jpg"
        secondAlt="Madira The Bar's intimate wood-paneled lounge at Hotel Krishna Palace"
        secondTitle="Two Tables. One Elegant Experience."
        secondDescription="Fiesta All-Day Dining · Madira The Bar & Lounge."
      />

      <DiningIntro />

      <EditorialQuote
        quote="“A journey through Hampi is written in stone by day, and savoured around the table by night.”"
        cite="Hospitality at Hotel Krishna Palace · Hosapete"
      />

      <DiningShowcases />
      <DiningTimeline />
      <DiningPillars />

      <FaqSection
        eyebrow="Dining Questions & Answers"
        title="Restaurant & bar FAQs."
        body="Helpful details on menus, cuisines, bar operating hours, and table reservations."
        items={diningFaqs}
      />

      <CalloutCTA
        eyebrow="Table & Event Reservations"
        title="Reserve your table today."
        body="For private gatherings, group dining, or table reservations across Fiesta and Madira The Bar, our team is here to assist you directly."
        actions={[
          { href: `tel:${hotel.phoneHref}`, label: <>Call {hotel.phoneDisplay}</> },
          {
            href: `mailto:${hotel.reservationEmail}?subject=Dining%20Reservation%20Enquiry`,
            label: 'Email reservations team',
            outline: true,
          },
        ]}
      />
    </>
  );
}
