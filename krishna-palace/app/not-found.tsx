import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/layout/SiteHeader';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader solid />
      <main className="callout not-found">
        <span className="eyebrow">404 · Page not found</span>
        <h1>We couldn’t find that page.</h1>
        <p>The address may have changed. Return to the hotel homepage or explore rooms and rates.</p>
        <div className="hero-actions">
          <Link className="button" href="/">Back to the hotel</Link>
          <Link className="button button--outline" href="/rooms-rates/">Rooms &amp; rates</Link>
        </div>
      </main>
    </>
  );
}
