import type { Metadata } from 'next';
import PageHero from '@/components/hero/PageHero';
import DiningIntro from '@/components/sections/dining/DiningIntro';
import DiningShowcases from '@/components/sections/dining/DiningShowcases';
import DiningTimeline from '@/components/sections/dining/DiningTimeline';
import DiningPillars from '@/components/sections/dining/DiningPillars';
import EditorialQuote from '@/components/sections/shared/EditorialQuote';
import CalloutCTA from '@/components/sections/shared/CalloutCTA';
import { hotel } from '@/data/site';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Dining & Bar | Fiesta & Madira The Bar',
  description: 'Discover the dining and bar destinations at Hotel Krishna Palace, Hosapete: Fiesta All-Day Dining and Madira The Bar & Lounge.',
  path: '/dining/',
  image: '/compressed_FOC00707_converted.jpg',
  imageAlt: 'Madira The Bar at Hotel Krishna Palace, Hosapete',
});

export default function DiningOverviewPage() {
  return (
    <>
      <PageHero
        title="Flavours shaped by time."
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
