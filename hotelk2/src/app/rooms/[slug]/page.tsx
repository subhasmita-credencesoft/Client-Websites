import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ROOMS, getRoomBySlug } from '@/data/rooms';
import { SITE } from '@/data/site';
import { roomKeywords } from '@/data/seo';
import { Button } from '@/components/ui/Button';
import styles from './page.module.scss';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ROOMS.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) {
    return { title: `Room not found | ${SITE.name}` };
  }

  const amenitiesList = room.amenities.map((a) => a.label).join(', ');

  return {
    title: { absolute: `${room.name} in Chakradharpur | Hotel K2` },
    description: `Book ${room.name} at Hotel K2, Chakradharpur, Jharkhand. ${room.description} ${room.occupancy}. AC room with ${amenitiesList}. Near Chakradharpur Railway Station, Etwari Bazar, Station Link Road. Call +91 8709490824.`,
    keywords: roomKeywords(room.slug, room.name).join(', '),
    openGraph: {
      title: `${room.name} — Hotel K2, Chakradharpur`,
      description: `Book ${room.name} at Hotel K2, Chakradharpur. ${room.description}`,
      url: `/rooms/${slug}`,
      images: room.image
        ? [{ url: room.image, width: 800, height: 600, alt: `${room.name} — Hotel K2, Chakradharpur` }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${room.name} — Hotel K2, Chakradharpur`,
      description: `Book ${room.name} at Hotel K2, Chakradharpur. ${room.description}`,
      images: room.image ? [room.image] : [],
    },
    alternates: {
      canonical: `/rooms/${slug}`,
    },
  };
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) {
    notFound();
  }

  const roomSchema = {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: room.name,
    description: room.description,
    image: room.gallery,
    occupancy: { '@type': 'QuantitativeValue', maxValue: 4, unitText: 'guests' },
    containedInPlace: {
      '@type': 'Hotel',
      name: SITE.name,
      url: SITE.url,
    },
    offers: {
      '@type': 'Offer',
      price: room.price,
      priceCurrency: room.currency ?? 'INR',
      availability: 'https://schema.org/InStock',
      url: room.bookingUrl,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Rooms', item: `${SITE.url}rooms` },
      { '@type': 'ListItem', position: 3, name: room.name, item: `${SITE.url}rooms/${room.slug}` },
    ],
  };

  return (
    <article className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roomSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className={styles.hero}>
        <Image
          src={room.image}
          alt={`${room.name} at Hotel K2, Chakradharpur`}
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroScrim} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.breadcrumb}>
            <Link href="/">Home</Link> / <Link href="/rooms">Rooms</Link> / {room.name}
          </p>
          <h1 className={styles.heading}>{room.name}</h1>
          <p className={styles.occupancy}>{room.occupancy}</p>
          {room.price !== undefined && (
            <p className={styles.heroPrice}>
              <span className={styles.heroPriceCurrency}>{room.currency ?? 'INR'}</span>
              <span className={styles.heroPriceValue}>{room.price.toLocaleString('en-IN')}</span>
              <span className={styles.heroPriceUnit}>/night</span>
            </p>
          )}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.contentGrid}>
          <div className={styles.main}>
            <h2 className={styles.sectionHeading}>About this room</h2>
            <p className={styles.description}>{room.description}</p>

            <h2 className={styles.sectionHeading}>Amenities</h2>
            <ul className={styles.amenityList}>
              {room.amenities.map((amenity, index) => (
                <li key={`${amenity.label}-${index}`} className={styles.amenityItem}>
                  {amenity.icon && (
                    <Image src={amenity.icon} alt="" width={18} height={18} className={styles.amenityIcon} />
                  )}
                  {amenity.label}
                </li>
              ))}
            </ul>

            {room.gallery.length > 0 && (
              <>
                <h2 className={styles.sectionHeading}>Gallery</h2>
                <div className={styles.gallery}>
                  {room.gallery.map((src, index) => (
                    <div key={src} className={styles.galleryItem}>
                      <Image
                        src={src}
                        alt={`${room.name}, Hotel K2 Chakradharpur — image ${index + 1}`}
                        fill
                        sizes="(min-width: 768px) 33vw, 50vw"
                        className={styles.galleryImage}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.bookingCard}>
              <p className={styles.bookingLabel}>Ready to stay?</p>
              <p className={styles.bookingCopy}>
                Book directly with the hotel for the best available rate on {room.name.toLowerCase()}.
              </p>
              {room.price !== undefined && (
                <div className={styles.bookingPrice}>
                  <span className={styles.bookingPriceCurrency}>{room.currency ?? 'INR'}</span>
                  <span className={styles.bookingPriceValue}>{room.price.toLocaleString('en-IN')}</span>
                  <span className={styles.bookingPriceUnit}>/night</span>
                </div>
              )}
              {room.availableRooms !== undefined && room.availableRooms > 0 && (
                <p className={styles.bookingAvailability}>
                  {room.availableRooms} rooms available for your dates
                </p>
              )}
              <Button href={room.bookingUrl} variant="primary" fullWidth>
                Book Now
              </Button>
              <Button href="tel:+918709490824" variant="ghost" fullWidth>
                Call the Front Desk
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
