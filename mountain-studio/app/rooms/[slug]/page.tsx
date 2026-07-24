import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoomDetailClient } from "@/components/rooms/RoomDetailClient";
import { rooms } from "@/lib/data";
import {
  breadcrumbSchema,
  hotelRoomSchema,
  jsonLd,
  SITE_URL,
} from "@/lib/structured-data";

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const room = rooms.find((item) => item.slug === params.slug);
  if (!room) return {};

  return {
    title: `${room.name} in Arpora Goa | ${room.type} Near Baga Beach`,
    description: `${room.name} at Redwings Studio, Arpora, Goa — ${room.size} sqft, ${room.beds}, ${room.view}. From ₹${room.price}/night. Free Wi-Fi, pool access, near Baga Beach. ${room.description}`,
    keywords: [
      `${room.name} Goa`,
      `${room.type} Arpora`,
      `Studio Apartment Near Baga Beach`,
      `Budget Stay Arpora`,
      `Redwings Studio ${room.name}`,
      `Hotel Room Arpora Goa`,
      `Pool View Room Goa`,
      `${room.view} Room Arpora`,
    ],
    alternates: {
      canonical: `https://redwingsstudio.com/rooms/${room.slug}`,
    },
    openGraph: {
      title: `${room.name} — Redwings Studio Goa`,
      description: `${room.size} sqft ${room.type.toLowerCase()} with ${room.beds}. From ₹${room.price}/night in Arpora, Goa.`,
      url: `https://redwingsstudio.com/rooms/${room.slug}`,
      images: [
        {
          url: room.images[0],
          width: 1200,
          height: 630,
          alt: `${room.name} at Redwings Studio, Arpora, Goa`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${room.name} — Redwings Studio Goa`,
      description: `${room.size} sqft, from ₹${room.price}/night. Book directly.`,
      images: [room.images[0]],
    },
  };
}

interface RoomDetailPageProps {
  params: {
    slug: string;
  };
}

export default function RoomDetailPage({ params }: RoomDetailPageProps) {
  const room = rooms.find((item) => item.slug === params.slug);

  if (!room) {
    notFound();
  }

  const similar = rooms
    .filter((item) => item.slug !== room.slug)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            hotelRoomSchema({
              name: room.name,
              slug: room.slug,
              description: room.description,
              price: room.price,
              size: room.size,
              beds: room.beds,
              guests: room.guests,
              view: room.view,
              amenities: room.amenities,
              images: room.images,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Rooms", url: `${SITE_URL}/rooms` },
              {
                name: room.name,
                url: `${SITE_URL}/rooms/${room.slug}`,
              },
            ])
          ),
        }}
      />
      <RoomDetailClient room={room} similar={similar} />
    </>
  );
}
