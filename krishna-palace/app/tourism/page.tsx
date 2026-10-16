import type { Metadata } from 'next';
import PageHero from '@/components/hero/PageHero';
import TourismRoute from '@/components/sections/tourism/TourismRoute';
import HampiFeature from '@/components/sections/tourism/HampiFeature';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Explore Hampi & the region',
  description: 'Discover Hampi, Anegundi, Aihole, Badami, Pattadakal and other heritage destinations around Hosapete.',
  path: '/tourism/',
  image: '/images/32-tourism-1.jpg',
  imageAlt: 'The stone chariot of Hampi near Hotel Krishna Palace, Hosapete',
});

export default function TourismPage() {
  return (
    <>
      <PageHero
        title="A landscape of stories."
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
    </>
  );
}
