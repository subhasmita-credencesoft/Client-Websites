import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoomDetailClient } from "@/components/rooms/RoomDetailClient";
import { FaqSection } from "@/components/sections/FaqSection";
import { rooms } from "@/lib/data";
import {
  breadcrumbSchema,
  faqSchema,
  hotelRoomSchema,
  jsonLd,
  SITE_URL,
} from "@/lib/structured-data";
import type { Room } from "@/types";

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

function roomFaqs(room: Room) {
  return [
    {
      question: `How much does the ${room.name} cost per night in Goa?`,
      answer: `The ${room.name} at Redwings Studio starts from ₹${room.price.toLocaleString(
        "en-IN"
      )}/night for two guests. Rates include free Wi-Fi, room service, and access to the resort swimming pool and garden lawn in Arpora, Goa.`,
    },
    {
      question: `What is included with the ${room.name}?`,
      answer: `The ${room.name} is a ${room.size} sqft ${room.type.toLowerCase()} with a ${room.beds}, ${room.view}. It includes free Wi-Fi, a flat-screen TV, room service, and geyser hot water, with direct booking support from the owner-managed team.`,
    },
    {
      question: `Is the ${room.name} good for couples?`,
      answer: `Yes, the ${room.name} is a popular choice for couples visiting North Goa. It is located within the quiet Abalone Resort estate in Arpora, just a short drive from Baga, Calangute, and Anjuna beaches.`,
    },
    {
      question: `How far is the ${room.name} from Baga Beach?`,
      answer: `Redwings Studio is just 3 km from Baga Beach — about a 10-minute drive. The Saturday Night Market in Arpora is 2 km away, and Calangute and Anjuna beaches are within 15 minutes of your room.`,
    },
    {
      question: `How do I book the ${room.name}?`,
      answer: `Book the ${room.name} directly through the online booking engine on this page for instant confirmation, or call +91-9167680996 / +91-9763988999 to reserve your stay at the best available rate.`,
    },
  ];
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(faqSchema(roomFaqs(room), `/rooms/${room.slug}`)),
        }}
      />
      <RoomDetailClient room={room} similar={similar} />
      <FaqSection
        eyebrow={`${room.name} FAQ`}
        title={`Questions about the ${room.name}, Arpora Goa`}
        description={`Everything to know before booking the ${room.name} at Redwings Studio, North Goa.`}
        faqs={roomFaqs(room)}
      />
    </>
  );
}
