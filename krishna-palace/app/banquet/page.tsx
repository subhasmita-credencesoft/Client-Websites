import type { Metadata } from 'next';
import PageHero from '@/components/hero/PageHero';
import BanquetIntro from '@/components/sections/banquet/BanquetIntro';
import BanquetShowcases from '@/components/sections/banquet/BanquetShowcases';
import BanquetOccasions from '@/components/sections/banquet/BanquetOccasions';
import BanquetPillars from '@/components/sections/banquet/BanquetPillars';
import BanquetGallery from '@/components/sections/banquet/BanquetGallery';
import EditorialQuote from '@/components/sections/shared/EditorialQuote';
import CalloutCTA from '@/components/sections/shared/CalloutCTA';
import { hotel } from '@/data/site';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Banquet & Events | Grand Celebrations & Conferences at Hotel Krishna Palace',
  description:
    'Host corporate conferences, product launches, fashion galas, cocktail dinners, and weddings in Hosapete. Up to 300+ guests with catering and audiovisual support.',
  path: '/banquet/',
  image: '/images/05-kp-hosapete-16.jpg',
  imageAlt: 'Banquet hall arranged for an event at Hotel Krishna Palace, Hosapete',
});

export default function BanquetPage() {
  return (
    <>
      <PageHero
        title="Hosapete’s Place to Gather."
        eyebrow="Banquets & Celebrations"
        description="A contemporary multipurpose venue designed for prestigious corporate conferences, weddings, fashion galas, and festive cocktail dinners for 300+ guests."
        image="/images/05-kp-hosapete-16.jpg"
        alt="Banquet hall set in theatre seating at Hotel Krishna Palace"
        secondImage="/krishnapalacebanquet.png"
        secondAlt="Banquet hall celebration setting at Hotel Krishna Palace"
        secondTitle="Every milestone, elevated."
        secondDescription="Station Road · 300+ Capacity · Dedicated Catering & Audiovisual Production"
      />

      <BanquetIntro />

      <EditorialQuote
        quote="“Grand occasions require more than just space — they demand flawless coordination, refined cuisine, and genuine gracious hospitality.”"
        cite="Events at Hotel Krishna Palace · Hosapete"
      />

      <BanquetShowcases />
      <BanquetOccasions />
      <BanquetPillars />
      <BanquetGallery />

      <CalloutCTA
        id="reserve"
        eyebrow="Reserve Your Date"
        title="Let us host your defining moment."
        body="Contact our specialized banqueting coordinator directly to schedule a walkthrough, check date availability, and receive a customized event proposal."
        actions={[
          { href: `tel:${hotel.phoneHref}`, label: <>Call Event Desk: {hotel.phoneDisplay}</> },
          {
            href: `mailto:${hotel.reservationEmail}?subject=Banquet%20Venue%20Inquiry%20-%20Hotel%20Krishna%20Palace`,
            label: 'Email event enquiry',
            outline: true,
          },
        ]}
      />
    </>
  );
}
