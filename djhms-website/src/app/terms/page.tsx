import type { Metadata } from 'next';
import { site } from '@/data/site';
import { LegalPage } from '@/components/ui/LegalPage';

export const metadata: Metadata = { title: 'Terms of Use', alternates: { canonical: '/terms' } };

// NOTE: starter text – have it reviewed by legal counsel before launch.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <p>By using this website you agree to these terms. The site is operated by {site.name}.</p>
      <h2>Use of content</h2>
      <p>Content on this site is provided for general information about our services. All branding and imagery remain the property of their owners.</p>
      <h2>Bookings</h2>
      <p>Room bookings for Hotel Maharana Inn are made through the hotel&rsquo;s own website, which has its own terms.</p>
      <h2>Liability</h2>
      <p>We make reasonable efforts to keep information accurate but provide it without warranty.</p>
      <h2>Contact</h2>
      <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
    </LegalPage>
  );
}
