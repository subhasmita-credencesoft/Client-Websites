import type { GetStaticProps, NextPage } from 'next';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import GalleryFilters from '@/components/sections/GalleryFilters';
import FaqSection from '@/components/sections/FaqSection';
import { GALLERY_FAQS } from '@/data/faqs';
import { GALLERY_ITEMS } from '@/data/gallery';
import { GalleryItem } from '@/types';

interface GalleryPageProps {
  items: GalleryItem[];
}

const GalleryPage: NextPage<GalleryPageProps> = ({ items }) => {
  return (
    <>
      <Seo
        title="Photo Gallery — Rooms, Weddings & Events at Baibhab Resorts"
        description="Photos and video highlights of rooms, weddings, corporate events, dining and lawns at Baibhab Resorts & Conventions."
        path="/gallery"
      />
      <InnerHero
        image="/newedit/collage.avif"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Gallery & Media' },
        ]}
        eyebrow="Gallery & Media"
        title="Moments from Baibhab"
        subtitle="Filter by Rooms or our open-air Lawns and grounds."
      />

      <div className="container" style={{ marginTop: 48, marginBottom: 96 }}>
        <GalleryFilters items={items} />
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
