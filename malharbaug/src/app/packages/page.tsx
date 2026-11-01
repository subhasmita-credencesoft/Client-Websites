import type { Metadata } from 'next';
import PackagesView from '@/features/packages/PackagesView';

export const metadata: Metadata = {
  title: 'Resort Packages & Offers',
  description:
    'View stay packages and offers at Malhar Baug Resort, Alibaug — family packages, group bookings, corporate outings and celebration deals near Nagaon Beach. Book direct for best rates.',
  alternates: { canonical: '/packages/' },
};

export default function PackagesPage() {
  return <PackagesView />;
}
