import type { Metadata } from 'next';
import { PageBanner } from '@/components/layout/PageBanner';
import { CtaSection } from '@/components/layout/CtaSection';
import { Gallery } from '@/components/sections/Gallery';
import { PAGE_KEYWORDS } from '@/data/seo';

export const metadata: Metadata = {
  title: { absolute: 'Hotel K2 Gallery | Photos of Rooms & Hotel in Chakradharpur' },
  description:
    'Hotel K2 photos — browse pictures of our rooms, reception, exterior and conference hall at Hotel K2 in Chakradharpur, Jharkhand, before you book your stay.',
  keywords: PAGE_KEYWORDS.gallery.join(', '),
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Hotel K2 Gallery | Photos of Rooms & Hotel in Chakradharpur',
    description:
      'See photos of Hotel K2 rooms, reception, exterior and conference hall in Chakradharpur, Jharkhand.',
    url: '/gallery',
    images: [{ url: '/newimages/receptionmain.png', width: 1200, height: 630, alt: 'Hotel K2 gallery — Chakradharpur' }],
  },
};

export default function GalleryPage() {
  return (
    <>
      <PageBanner
        eyebrow="Gallery"
        title="Hotel K2 Gallery — Photos of Our Hotel in Chakradharpur"
        subtitle="A look inside Hotel K2 — our rooms, reception, exterior and conference hall, all in Chakradharpur, Jharkhand."
        breadcrumbLabel="Gallery"
        path="/gallery"
      />

      <Gallery />

      <CtaSection
        title="Like what you see?"
        text="Book your stay at Hotel K2 and experience our comfortable rooms and warm hospitality in Chakradharpur for yourself."
        secondaryHref="/rooms"
        secondaryLabel="View our rooms"
      />
    </>
  );
}
