import type { GetStaticProps, NextPage } from 'next';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import GalleryFilters from '@/components/sections/GalleryFilters';
import { GALLERY_ITEMS } from '@/data/gallery';
import { GalleryItem } from '@/types';

interface GalleryPageProps {
  items: GalleryItem[];
}

const GalleryPage: NextPage<GalleryPageProps> = ({ items }) => {
  return (
    <>
      <Seo
        title="Gallery & Media"
        description="Photos and video highlights of rooms, weddings, corporate events, dining and lawns at Baibhab Resorts & Conventions."
        path="/gallery"
      />
      <InnerHero
        image="https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Gallery & Media' },
        ]}
        eyebrow="Gallery & Media"
        title="Moments from Baibhab"
        subtitle="Filter by Rooms, Weddings, Corporate events, Dining, or our open-air Lawns."
      />

      <div className="container" style={{ marginTop: 48, marginBottom: 96 }}>
        <GalleryFilters items={items} />
      </div>
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
