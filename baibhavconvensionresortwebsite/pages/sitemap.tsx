import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Seo from '@/components/seo/Seo';
import PageHeader from '@/components/ui/PageHeader';
import Breadcrumb from '@/components/ui/Breadcrumb';
import styles from '@/styles/UtilityPage.module.scss';
import { ROOMS } from '@/data/rooms';
import { VENUES } from '@/data/venues';
import { BLOG_POSTS } from '@/data/blog';

interface SitemapLink {
  label: string;
  href: string;
}

const GROUPS: { title: string; links: SitemapLink[] }[] = [
  {
    title: 'Main',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Stay & Accommodations', href: '/stay' },
      { label: 'Weddings & Events', href: '/events' },
      { label: 'Dining & Catering', href: '/dining' },
      { label: 'Resort & Amenities', href: '/amenities' },
      { label: 'Gallery & Media', href: '/gallery' },
      { label: 'Offers & Packages', href: '/offers' },
      { label: 'Location & Local Guide', href: '/location' },
      { label: 'Contact & Inquiries', href: '/contact' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Stay',
    links: ROOMS.map((room) => ({ label: room.name, href: `/stay/${room.slug}` })),
  },
  {
    title: 'Weddings & Events',
    links: [
      { label: 'Weddings & Social Celebrations', href: '/events/weddings' },
      { label: 'Corporate Conferences & MICE', href: '/events/corporate' },
      { label: 'Venue Spaces & Capacity Matrix', href: '/events/venues' },
      { label: 'Event Inquiry', href: '/contact?inquiry=Banquets+%2F+Events' },
      ...VENUES.map((venue) => ({ label: `${venue.name} (${venue.venueType})`, href: `/events/venues#${venue.slug}` })),
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Cancellation & Refund Policy', href: '/cancellation-policy' },
      { label: 'Sitemap (XML)', href: '/sitemap.xml' },
    ],
  },
  {
    title: 'Blog',
    links: [
      { label: 'All Posts', href: '/blog' },
      ...BLOG_POSTS.map((post) => ({ label: post.title, href: `/blog/${post.slug}` })),
    ],
  },
];

const SitemapPage: NextPage = () => {
  return (
    <>
      <Seo title="Sitemap" description="Browse every page on the Baibhab Resorts & Conventions website." path="/sitemap" />
      <div className="container" style={{ paddingTop: 96 }}>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Sitemap' },
          ]}
        />
      </div>

      <div className="container">
        <PageHeader eyebrow="Sitemap" title="Browse the website" subtitle="Every page, grouped for quick access." />
      </div>

      <div className="container" style={{ marginTop: 48, marginBottom: 96 }}>
        <div className={styles.sitemapGrid}>
          {GROUPS.map((group) => (
            <div key={group.title}>
              <h2 className={styles.sitemapGroupTitle}>{group.title}</h2>
              <ul className={styles.sitemapList}>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.sitemapLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default SitemapPage;
