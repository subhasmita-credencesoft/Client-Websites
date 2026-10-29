import type { Metadata } from 'next';
import PageHero from '@/components/hero/PageHero';
import TourismRoute from '@/components/sections/tourism/TourismRoute';
import HampiFeature from '@/components/sections/tourism/HampiFeature';
import FaqSection from '@/components/common/FaqSection';
import CalloutCTA from '@/components/sections/shared/CalloutCTA';
import JsonLd from '@/components/seo/JsonLd';
import { tourismFaqs } from '@/data/faqs';
import { hotel } from '@/data/site';
import { getBreadcrumbSchema, getFaqSchema } from '@/lib/schema';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Places to Visit Near Hampi | Krishna Palace',
  description:
    'Plan your Hampi trip from Hosapete. Discover nearby heritage destinations including Hampi ruins, Anegundi, Badami Caves, Aihole, Pattadakal and Tungabhadra Dam.',
  path: '/tourism/',
  image: '/images/32-tourism-1.jpg',
  imageAlt: 'The stone chariot of Hampi near Hotel Krishna Palace, Hosapete',
});

export default function TourismPage() {
  return (
    <>
      <JsonLd
        schema={[
          getBreadcrumbSchema([
            { name: 'Home', url: 'https://krishnapalacehotel.com/' },
            { name: 'Explore Hampi', url: 'https://krishnapalacehotel.com/tourism/' },
          ]),
          getFaqSchema(tourismFaqs),
        ]}
      />

      <PageHero
        title="Places to Visit Near Hampi"
        eyebrow="Explore the region"
        description="Begin in Hampi, then let the heritage trails of Karnataka lead you further—through ancient temples, dramatic stone and wide-open horizons."
        image="/images/32-tourism-1.jpg"
        alt="The celebrated stone chariot of Hampi against an evening sky"
        secondImage="/images/30-tourism-4.jpg"
        secondAlt="Rock-cut temples at Badami in red sandstone"
        secondTitle="Follow the old roads."
        secondDescription="From Hampi to Aihole, Badami and beyond, Karnataka’s heritage unfolds one stop at a time."
      />

      <TourismRoute />
      <HampiFeature />

      <FaqSection
        eyebrow="Hampi Travel & Sightseeing"
        title="Visiting Hampi & the region."
        body="Practical travel guidance, distances, top monuments, and seasonal advice for visitors to Hosapete."
        items={tourismFaqs}
      />

      <CalloutCTA
        eyebrow="Start Your Journey"
        title="Experience Hampi with us."
        body="Reserve your comfortable stay in Hosapete and let Karnataka’s extraordinary history unfold."
        actions={[
          { href: hotel.bookingUrl, label: 'Book your stay', external: true },
          { href: '/contact/#contact-details', label: 'Contact front desk', outline: true },
        ]}
      />
    </>
  );
}
