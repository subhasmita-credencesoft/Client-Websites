import type { Metadata } from 'next';
import BlogListView from '@/features/blog/BlogListView';

export const metadata: Metadata = {
  title: 'Alibaug Resort Blog – Planning Guides & Travel Tips | Malhar Baug',
  description:
    'The Malhar Baug Resort blog — practical planning guides for family stays, group bookings, corporate offsites, birthday celebrations and weekend getaways at our Alibaug resort near Nagaon Beach.',
  alternates: { canonical: '/blog/' },
  keywords: [
    'Alibaug travel tips',
    'family vacation alibaug',
    'weekend getaway near Mumbai',
    'corporate offsite alibaug',
    'alibaug resort blog',
    'nagaon beach travel guide',
  ],
  openGraph: {
    title: 'Alibaug Resort Blog – Planning Guides & Travel Tips | Malhar Baug',
    description:
      'Practical planning guides for Alibaug trips — family stays, group villas, birthdays and corporate offsites by Malhar Baug Resort.',
    images: [{ url: '/heroimg3.jpeg', width: 1200, height: 630, alt: 'Malhar Baug Resort blog – Alibaug travel guides' }],
  },
};

export default function BlogPage() {
  return <BlogListView />;
}
