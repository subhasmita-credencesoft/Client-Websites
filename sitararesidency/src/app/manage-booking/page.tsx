import type { Metadata } from 'next';

import { ManageBookingSection } from '@/features/common';
import { manageBookingPage } from '@/features/common/data/pages';

export const metadata: Metadata = {
  title: manageBookingPage.title,
  description: manageBookingPage.description,
  robots: { index: false, follow: false },
};

export default function ManageBookingPage() {
  return (
    <ManageBookingSection
      eyebrow={manageBookingPage.eyebrow}
      heading={manageBookingPage.heading}
      intro={manageBookingPage.intro}
      contact={manageBookingPage.contact}
      action={manageBookingPage.action}
    />
  );
}