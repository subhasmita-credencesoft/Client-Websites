import type { Metadata } from 'next';
import { site } from '@/data/site';
import { LegalPage } from '@/components/ui/LegalPage';

export const metadata: Metadata = { title: 'Privacy Policy', alternates: { canonical: '/privacy' } };

// NOTE: starter text – have it reviewed by legal counsel before launch.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>This policy explains how {site.name} (&ldquo;DJHMS&rdquo;) handles personal information submitted through this website.</p>
      <h2>Information we collect</h2>
      <ul>
        <li>Enquiry form: name, email, phone number, enquiry type and message.</li>
        <li>Career form: name, email, mobile number, position and the CV/resume you upload.</li>
      </ul>
      <h2>How we use it</h2>
      <p>We use this information only to respond to enquiries and to assess job applications. We do not sell personal information.</p>
      <h2>Retention and your rights</h2>
      <p>
        We keep submissions only as long as needed for these purposes. To request access, correction or deletion, email{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <h2>Contact</h2>
      <p>{site.address.street}, {site.address.city} {site.address.postalCode}.</p>
    </LegalPage>
  );
}
