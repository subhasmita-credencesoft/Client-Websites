import type { Metadata } from 'next';
import AboutView from '@/features/about/AboutView';

export const metadata: Metadata = {
  title: 'About Malhar Baug Resort | Family Resort in Alibaug',
  description:
    'Learn about Malhar Baug Resort — a family-run garden resort in Nagaon, Palhe, Alibaug offering comfortable rooms, private villas, swimming pool and warm Konkan hospitality since day one.',
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  return <AboutView />;
}
