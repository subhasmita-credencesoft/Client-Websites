import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { RoomDetailView } from '@/features/rooms';
import { business } from '@/core/config/business';
import { roomSlugsById } from '@/core/config/hotelmate';
import {
  defaultStayParams,
  findRoom,
  getHotelMateProperty,
  roomSlugForId,
  roomsToCards,
  roomToDetail,
} from '@/features/booking';
import type { HotelMateRoom } from '@/core/types/hotelmate';
import { JsonLdScript } from '@/shared/ui/json-ld';
import { breadcrumbSchema, pageMetadata, roomSchema, SITE_URL, webPageSchema } from '@/core/lib/seo';

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

async function loadRoom(slug: string): Promise<HotelMateRoom | undefined> {
  const property = await getHotelMateProperty(defaultStayParams());
  return findRoom(property, slug);
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const slugs = new Set<string>();

  for (const slug of Object.values(roomSlugsById)) {
    slugs.add(slug);
  }

  for (const id of Object.keys(roomSlugsById)) {
    slugs.add(id);
  }

  try {
    const property = await getHotelMateProperty(defaultStayParams());
    for (const room of property.roomList ?? []) {
      const slug = roomSlugForId(room.id) ?? `room-${room.id}`;
      slugs.add(slug);
      slugs.add(String(room.id));
    }
  } catch {
    // Graceful fallback to static mappings if API is unreachable
  }

  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = await loadRoom(slug);
  if (!room) {
    return pageMetadata({
      title: 'Room not found',
      description: `Browse rooms at ${business.name}, Kalamboli, Navi Mumbai.`,
      path: '/bedrooms',
      noIndex: true,
    });
  }

  const roomName = room.name ?? 'Room';

  return pageMetadata({
    title: `${roomName} | Hotel Sitara Residency Kalamboli`,
    description: `Book the ${roomName} at ${business.name}, Kalamboli, Navi Mumbai. Air conditioning, free Wi-Fi, 24-hour room service and best-rate direct booking.`,
    path: `/bedrooms/${slug}`,
    keywords: [`${roomName} Kalamboli`, `${roomName} Navi Mumbai`, 'hotel room booking Kalamboli'],
    image: {
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: `${roomName} at ${business.name}, Kalamboli, Navi Mumbai`,
    },
  });
}

export default async function BedroomDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const property = await getHotelMateProperty(defaultStayParams());
  const room = findRoom(property, slug);
  if (!room) notFound();

  const detail = roomToDetail(room);
  const otherRooms = roomsToCards(
    (property.roomList ?? []).filter((r) => r.id !== room.id),
  );

  return (
    <>
      <JsonLdScript
        data={[
          webPageSchema({
            name: `${room.name ?? 'Room'} | ${business.name}`,
            description: `Book the ${room.name ?? 'room'} at ${business.name}, Kalamboli, Navi Mumbai.`,
            path: `/bedrooms/${slug}`,
            type: 'ItemPage',
          }),
          breadcrumbSchema([
            { name: 'Rooms & Suites', path: '/bedrooms' },
            { name: room.name ?? 'Room', path: `/bedrooms/${slug}` },
          ]),
          roomSchema({
            name: room.name ?? 'Room',
            description: detail.intro,
            path: `/bedrooms/${slug}`,
            image: detail.image,
            occupancy: Number(room.maximumOccupancy ?? 0) || undefined,
            amenities: detail.facilities?.length ? detail.facilities : business.amenities,
          }),
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: `${room.name ?? 'Room'} — ${business.name}`,
            description: detail.intro,
            image: `${SITE_URL}${detail.image ?? '/og-image.jpg'}`,
            brand: { '@type': 'Brand', name: business.name },
            url: `${SITE_URL}/bedrooms/${slug}`,
            offers: {
              '@type': 'Offer',
              url: business.bookingUrl,
              availability: 'https://schema.org/InStock',
              priceCurrency: 'INR',
              seller: { '@id': `${SITE_URL}/#hotel` },
            },
          },
        ]}
      />
      <RoomDetailView detail={detail} otherRooms={otherRooms} />
    </>
  );
}