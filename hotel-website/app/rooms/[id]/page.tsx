import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { format, addDays } from "date-fns";
import RoomDetailClient from "../../../components/sections/RoomDetailClient";
import { createPageMetadata } from "../../../lib/metadata";
import {
  fetchPropertyById,
  fetchPropertyAvailability,
  DEFAULT_PROPERTY_ID,
} from "../../../lib/services/propertyService";
import roomsData from "../../../data/rooms";

type RoomDetailPageProps = {
  params: Promise<{ id: string }> | { id: string };
};

/**
 * Generate build-time metadata using ONLY static room data.
 * API-sourced rooms get generic metadata — real data loads client-side.
 * No API calls here prevents NEXT_STATIC_GEN_BAILOUT.
 */
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const staticRoom = roomsData.find((item) => item.id === id || item.slug === id);
  if (staticRoom) {
    return createPageMetadata({
      title: staticRoom.name,
      description: staticRoom.summary || staticRoom.description,
      path: `/rooms/${id}`,
      image: staticRoom.image,
    });
  }

  return createPageMetadata({
    title: "Luxury Room | UK's Resort Khopoli",
    description:
      "Impeccably designed suites combining comfort with beautiful scenic views at UK's Resort Khopoli.",
    path: `/rooms/${id}`,
    image: "https://bookonelocal.in/cdn/3.png",
  });
}

// Server component — just renders the client component with the room ID
export default async function RoomDetailPage({ params }: any) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  if (!id) {
    notFound();
  }

  const staticRoom = roomsData.find((item) => item.id === id || item.slug === id);
  const productSchema = staticRoom
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: staticRoom.name,
        description: staticRoom.summary || staticRoom.description,
        image: staticRoom.image.startsWith("http")
          ? staticRoom.image
          : `https://www.uksresort.com${staticRoom.image}`,
        offers: {
          "@type": "Offer",
          price: staticRoom.pricePerNight,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: `https://www.uksresort.com/rooms/${id}`,
        },
      }
    : null;

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      <RoomDetailClient id={id} />
    </>
  );
}

/**
 * Pre-generate static paths for ALL rooms (static + API).
 *
 * Strategy:
 *  1. Static local room IDs (always available, no network)
 *  2. fetchPropertyById — returns room IDs from property config (force-cache, no bailout)
 *  3. fetchPropertyAvailability — returns room IDs used by the grid/availability engine
 *     (these can be DIFFERENT numeric IDs from findById — e.g. 8357 vs 1)
 *
 * Both API calls use force-cache to prevent revalidate:0 and NEXT_STATIC_GEN_BAILOUT.
 * If availability fails, we skip it gracefully (IDs from findById are still included).
 */
export async function generateStaticParams() {
  const idSet = new Set<string>();

  // 1. Static local room IDs
  roomsData.forEach((room) => {
    if (room.id) idSet.add(room.id);
    if (room.slug && room.slug !== room.id) idSet.add(room.slug);
  });

  // 2. fetchPropertyById — property-config room IDs
  try {
    const data = await fetchPropertyById(DEFAULT_PROPERTY_ID, {
      cache: "force-cache",
    });
    data?.roomList?.forEach((room) => {
      if (room.id != null) idSet.add(String(room.id));
    });
  } catch (e) {
    console.error("[generateStaticParams] fetchPropertyById failed:", e);
  }

  // 3. fetchPropertyAvailability — availability-engine room IDs (e.g. 8357, 8358 …)
  //    These are the IDs the RoomsGrid actually navigates to.
  try {
    const todayStr = format(new Date(), "yyyy-MM-dd");
    const tomorrowStr = format(addDays(new Date(), 1), "yyyy-MM-dd");
    const data = await fetchPropertyAvailability(
      { fromDate: todayStr, toDate: tomorrowStr, noOfPersons: 1, noOfRooms: 1 },
      DEFAULT_PROPERTY_ID,
      { cache: "force-cache" },
    );
    data?.roomList?.forEach((room) => {
      if (room.id != null) idSet.add(String(room.id));
    });
  } catch (e) {
    console.error("[generateStaticParams] fetchPropertyAvailability failed:", e);
  }

  return Array.from(idSet).map((id) => ({ id }));
}
