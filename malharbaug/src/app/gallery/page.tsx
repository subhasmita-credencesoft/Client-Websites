import type { Metadata } from 'next';
import GalleryView from '@/features/gallery/GalleryView';

export const metadata: Metadata = {
  title: 'Gallery | Malhar Baug Resort Alibaug',
  description:
    'Browse photos of Malhar Baug Resort Alibaug – rooms, villas, swimming pool, garden, dining and events near Nagaon Beach.',
  alternates: { canonical: '/gallery/' },
};

export default function GalleryPage() {
  return <GalleryView />;
}
