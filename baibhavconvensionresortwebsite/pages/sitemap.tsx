import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Seo from '@/components/seo/Seo';
import PageHeader from '@/components/ui/PageHeader';
import Breadcrumb from '@/components/ui/Breadcrumb';
import styles from '@/styles/UtilityPage.module.scss';
import { ROOMS } from '@/data/rooms';
import { VENUES } from '@/data/venues';
import { createBreadcrumbSchema } from '@/lib/schema';
import { fetchBlogsFromApi } from '@/lib/blog-api';

interface SitemapLink {
  label: string;
  href: string;
}

interface SitemapPageProps {
  blogLinks: SitemapLink[];
}

const GROUPS: { title: string; links: SitemapLink[] }[] = [
  {
    title: 'Main',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Stay & Accommodations', href: '/stay' },
      { label: 'Weddings & Events', href: '/events' },
      { label: 'Dining & Catering', href: '/dining' },
      { label: 'The Baibhab Kitchen', href: '/dining/baibhab-kitchen' },
      { label: 'Resort & Amenities', href: '/amenities' },
      { label: 'Gallery & Media', href: '/gallery' },
      { label: 'Offers & Packages', href: '/offers' },
      { label: 'Location & Local Guide', href: '/location' },
      { label: 'Contact & Inquiries', href: '/contact' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Stay & Rooms',
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
    title: 'Legal & Info',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Cancellation & Refund Policy', href: '/cancellation-policy' },
      { label: 'XML Sitemap (sitemap.xml)', href: '/sitemap.xml' },
      { label: 'AI Knowledge Base (llms.txt)', href: '/llms.txt' },
    ],
  },
  {
    title: 'Blog',
    links: [
      { label: 'All Posts Index', href: '/blog' },
    ],
  },
];

const SitemapPage: NextPage<SitemapPageProps> = ({ blogLinks }) => {
  const groups = GROUPS.map((group) =>
    group.title === 'Blog'
      ? { ...group, links: [...group.links, ...blogLinks] }
      : group
  );

  const jsonLd = [
    createBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Sitemap', url: '/sitemap' },
    ]),
  ];

  return (
    <>
      <Seo
        title="HTML Sitemap — Complete Page Directory"
        description="Browse every page, room category, event venue, and blog article on the Baibhab Resorts & Conventions website."
        path="/sitemap"
        jsonLd={jsonLd}
      />
      <div className="container" style={{ paddingTop: 96 }}>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Sitemap' },
          ]}
        />
      </div>

      <div className="container">
        <PageHeader eyebrow="Sitemap" title="Browse the website" subtitle="Every page, grouped for quick access and search engine indexing." />
      </div>

      <div className="container" style={{ marginTop: 48, marginBottom: 96 }}>
        <div className={styles.sitemapGrid}>
          {groups.map((group) => (
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

export const getStaticProps: GetStaticProps<SitemapPageProps> = async () => {
  const blogs = await fetchBlogsFromApi();
  return {
    props: {
      blogLinks: blogs.map((post) => ({ label: post.title, href: `/blog/${post.slug}` })),
    },
  };
};

export default SitemapPage;
