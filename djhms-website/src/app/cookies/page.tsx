import type { Metadata } from 'next';
import { site } from '@/data/site';
import { LegalPage } from '@/components/ui/LegalPage';

export const metadata: Metadata = { title: 'Cookie Policy', alternates: { canonical: '/cookies' } };

// NOTE: starter text – update if analytics or marketing cookies are added.
export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy">
      <p>This website does not set advertising or analytics cookies of its own.</p>
      <h2>Third-party content</h2>
      <p>The embedded Google Map on the Contact section may set cookies according to Google&rsquo;s policies when it loads.</p>
      <h2>Questions</h2>
      <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
    </LegalPage>
  );
}
