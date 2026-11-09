import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import GalleryFilters from '@/components/sections/GalleryFilters';
import FaqSection from '@/components/sections/FaqSection';
import { GALLERY_FAQS } from '@/data/faqs';
import { GALLERY_ITEMS } from '@/data/gallery';
import { SITE } from '@/data/site';
import { createBreadcrumbSchema, createFaqSchema } from '@/lib/schema';
import { GalleryItem } from '@/types';

interface GalleryPageProps {
  items: GalleryItem[];
}

const GalleryPage: NextPage<GalleryPageProps> = ({ items }) => {
  const jsonLd = [
    createBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Gallery & Media', url: '/gallery' },
    ]),
    createFaqSchema(GALLERY_FAQS),
    {
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: 'Baibhab Resorts & Conventions Photo Gallery',
      url: `${SITE.domain}/gallery`,
      description: 'Photos and architectural views of rooms, banquet halls, wedding lawns, dining, and nighttime illumination.',
      image: items.map((item) => ({
        '@type': 'ImageObject',
        contentUrl: `${SITE.domain}${item.src}`,
        caption: item.alt,
      })),
    },
  ];

  return (
    <>
      <Seo
        title="Photo Gallery — Real Photos of Rooms, Weddings & Lawns"
        description="Browse authentic photographs of luxury rooms, banquet halls, wedding lawns, dining areas, and nighttime illuminations at Baibhab Resorts & Conventions in Phulnakhara."
        path="/gallery"
        keywords="resort photos bhubaneswar, banquet hall pictures phulnakhara, wedding lawn images odisha, luxury hotel rooms gallery nh16, baibhab resorts photos"
        jsonLd={jsonLd}
      />
      <InnerHero
        image="/newedit/collage.avif"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Gallery & Media' },
        ]}
        eyebrow="Gallery & Media"
        title="Moments from Baibhab"
        subtitle="Explore genuine photography of our rooms, banquet halls, and open-air lawns on the Bhubaneswar–Cuttack corridor."
      />

      <div className="container" style={{ marginTop: 48, marginBottom: 48 }}>
        <GalleryFilters items={items} />
      </div>

      <div className="container" style={{ marginBottom: 64 }} data-reveal>
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e7e7e7',
          borderRadius: 16,
          padding: '40px 32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
        }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#111111', marginBottom: 6 }}>
              Prefer an In-Person Site Visit?
            </h3>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: 0 , lineHeight: 1.6 }}>
              Schedule a guided walkthrough with our property managers to inspect hall layouts, bridal suites, and guest rooms.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/contact" className="btn btn-primary">
              Schedule Site Visit
            </Link>
            <Link href="/events/venues" className="btn btn-outline">
              Venue Matrix
            </Link>
          </div>
        </div>
      </div>

      <FaqSection
        items={GALLERY_FAQS}
        eyebrow="Gallery FAQs"
        title="Gallery Questions"
        subtitle="About our real photos, site visits and recent event coverage."
      />
    </>
  );
};

export const getStaticProps: GetStaticProps<GalleryPageProps> = async () => {
  return {
    props: {
      items: GALLERY_ITEMS,
    },
  };
};

export default GalleryPage;
