import type { Metadata } from 'next';
import GalleryView from '@/features/gallery/GalleryView';

export const metadata: Metadata = {
  title: 'Photo Gallery | Malhar Baug Resort Alibaug',
  description:
    'Browse the photo gallery of Malhar Baug Resort, Alibaug — rooms, villas, swimming pool, lush gardens, Konkan dining and event lawns near Nagaon Beach.',
  alternates: { canonical: '/gallery/' },
  openGraph: {
    title: 'Photo Gallery | Malhar Baug Resort Alibaug',
    description:
      'Visual tour of Malhar Baug Resort — luxury rooms, crystal-clear pool, sprawling gardens, Konkan dining and open event lawns near Nagaon Beach, Alibaug.',
    images: [{ url: '/heroimg2.jpeg', width: 1200, height: 630, alt: 'Photo gallery of Malhar Baug Resort Alibaug' }],
  },
};

export default function GalleryPage() {
  return <GalleryView />;
}
