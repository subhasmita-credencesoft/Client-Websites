import type { Metadata } from 'next';
import PackagesView from '@/features/packages/PackagesView';

export const metadata: Metadata = {
  title: 'Resort Packages & Offers | Malhar Baug Resort Alibaug',
  description:
    'View stay packages and special offers at Malhar Baug Resort, Alibaug — family packages, couple getaways, group bookings, corporate outings and celebration deals near Nagaon Beach. Book direct for the best rates.',
  alternates: { canonical: '/packages/' },
  keywords: [
    'resort packages alibaug',
    'family package nagaon beach',
    'couple package alibaug',
    'group booking resort alibaug',
    'corporate offsite package alibaug',
    'weekend getaway near mumbai',
    'malhar baug offers',
  ],
  openGraph: {
    title: 'Resort Packages & Offers | Malhar Baug Resort Alibaug',
    description:
      'Family packages, couple retreats, group deals and seasonal offers at Malhar Baug Resort near Nagaon Beach, Alibaug. Book direct for best rates.',
    images: [{ url: '/hero3.jpeg', width: 1200, height: 630, alt: 'Resort stay packages at Malhar Baug Resort Alibaug' }],
  },
};

export default function PackagesPage() {
  return <PackagesView />;
}
