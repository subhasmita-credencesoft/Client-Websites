import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description:
    'Browse photos of Malhar Baug Resort Alibaug — rooms, private villas, swimming pool, gardens, dining and events. See why families choose our resort near Nagaon Beach.',
  alternates: { canonical: '/gallery/' },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
