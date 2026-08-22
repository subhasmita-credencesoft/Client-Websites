import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Restaurant & Dining',
  description:
    'Dine at Malhar Baug Resort, Alibaug — authentic Konkan and Maharashtrian thalis, fresh seafood, Chinese and Continental dishes served in our garden restaurant near Nagaon Beach.',
  alternates: { canonical: '/restaurant' },
};

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  return children;
}
