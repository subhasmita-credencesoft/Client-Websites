import type { Metadata } from 'next';
import PageHero from '@/components/hero/PageHero';
import BanquetIntro from '@/components/sections/banquet/BanquetIntro';
import BanquetShowcases from '@/components/sections/banquet/BanquetShowcases';
import BanquetOccasions from '@/components/sections/banquet/BanquetOccasions';
import BanquetPillars from '@/components/sections/banquet/BanquetPillars';
import BanquetGallery from '@/components/sections/banquet/BanquetGallery';
import EditorialQuote from '@/components/sections/shared/EditorialQuote';
import FaqSection from '@/components/common/FaqSection';
import CalloutCTA from '@/components/sections/shared/CalloutCTA';
import JsonLd from '@/components/seo/JsonLd';
import { banquetFaqs } from '@/data/faqs';
import { hotel } from '@/data/site';
import { getBanquetSchema, getBreadcrumbSchema, getFaqSchema } from '@/lib/schema';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Banquet Hall in Hospet | Krishna Palace Hotel',
  description:
    'Host corporate conferences, business meets, product launches, galas and weddings in Hosapete. Multipurpose banquet hall with 300+ guest capacity and catering.',
  path: '/banquet/',
  image: '/images/05-kp-hosapete-16.jpg',
  imageAlt: 'Banquet hall arranged for an event at Hotel Krishna Palace, Hosapete',
});

export default function BanquetPage() {
  return (
    <>
      <JsonLd
        schema={[
          getBreadcrumbSchema([
            { name: 'Home', url: 'https://krishnapalacehotel.com/' },
            { name: 'Banquets & Celebrations', url: 'https://krishnapalacehotel.com/banquet/' },
          ]),
          getBanquetSchema(),
          getFaqSchema(banquetFaqs),
        ]}
      />

      <PageHero
        title="Banquet Hall in Hospet"
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

      <FaqSection
        eyebrow="Event Planning FAQs"
        title="Banquet & conference details."
        body="Answers to help you plan corporate conventions, launches, weddings, and private social events in Hosapete."
        items={banquetFaqs}
      />

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
