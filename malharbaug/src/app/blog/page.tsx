import type { Metadata } from 'next';
import BlogListView from '@/features/blog/BlogListView';

export const metadata: Metadata = {
  title: 'Blog | Malhar Baug Resort Alibaug',
  description:
    'The Malhar Baug Resort blog – planning guides for family stays, group bookings, corporate offsites and celebrations at our Alibaug resort near Nagaon Beach.',
  alternates: { canonical: '/blog/' },
};

export default function BlogPage() {
  return <BlogListView />;
}
