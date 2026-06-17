"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { usePropertyData } from "../providers/PropertyDataProvider";
import { fetchPropertyAvailability } from "../../lib/services/propertyService";
import { buildBookingEngineUrl, getWhatsappShareUrl } from "../../lib/booking/bookingEngine";
import { getRoomDisplayImage } from "../../lib/roomImages";
import { formatPrice } from "../../lib/format";
import { htmlToText } from "../../lib/sanitizeHtml";
import Container from "../ui/Container";
import Button from "../ui/Button";
import roomsData from "../../data/rooms";
import type { RoomItem } from "../../types/property";
import { Coffee, ShieldCheck, Sparkles, Wind, Tv, Wifi, Utensils } from "lucide-react";

type RoomDetailClientProps = {
  id: string;
};

// Facility icon helper mapping
function getFacilityIcon(name: string) {
  const norm = name.toLowerCase();
  if (norm.includes("wifi") || norm.includes("internet")) return Wifi;
  if (norm.includes("service")) return Utensils;
  if (norm.includes("tv") || norm.includes("television")) return Tv;
  if (norm.includes("ac") || norm.includes("air condition") || norm.includes("split a/c")) return Wind;
  if (norm.includes("breakfast") || norm.includes("tea") || norm.includes("water")) return Coffee;
  if (norm.includes("toiletries") || norm.includes("hot water") || norm.includes("laundry")) return Sparkles;
  return ShieldCheck;
}

export default function RoomDetailClient({ id }: RoomDetailClientProps) {
  const { property, isLoading: propertyLoading } = usePropertyData();
  const [apiRooms, setApiRooms] = useState<RoomItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>("");
  const [checkIn] = useState<Date>(() => new Date());
  const [checkOut] = useState<Date>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });

  // Load live availability to fetch api rooms list if context doesn't have it
  useEffect(() => {
    let mounted = true;
    async function loadLiveRooms() {
      if (property?.roomList?.length) {
        setApiRooms(property.roomList);
        setLoading(false);
        return;
      }
      try {
        const todayStr = format(new Date(), "yyyy-MM-dd");
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = format(tomorrow, "yyyy-MM-dd");

        const data = await fetchPropertyAvailability({
          fromDate: todayStr,
          toDate: tomorrowStr,
          noOfPersons: 1,
          noOfRooms: 1,
        });

        if (mounted && data?.roomList) {
          setApiRooms(data.roomList);
        }
      } catch (err) {
        console.error("Failed to load room details via availability API:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    void loadLiveRooms();
    return () => {
      mounted = false;
    };
  }, [property]);

  // Find room in either API list or mock fallback database
  const resolvedRoom = useMemo(() => {
    // 1. Search API list
    if (apiRooms?.length) {
      const match = apiRooms.find((r) => String(r.id) === id);
      if (match) {
        const firstImage = getRoomDisplayImage(
          match.name || "",
          match.imageList,
          "/images/room_3.jpg"
        );
        const description = htmlToText(match.description) || "Impeccably designed room with standard luxury and comfort.";
        const minOcc = Number(match.minimumOccupancy ?? 1) || 1;
        const maxOcc = Number(match.maximumOccupancy ?? minOcc) || minOcc;
        const price = Number(match.roomOnlyPrice ?? match.ratesAndAvailabilityDtos?.[0]?.price ?? match.pricePerNight ?? 250);
        const size = match.size || "40 sqm";
        const bedType = maxOcc > 3 ? "King + Twin Bed" : "King Bed";
        const floor = (Number(match.id ?? 1) % 3) + 1; // Systematic mock floor allocation
        const images = match.imageList?.map((img) => img.url).filter(Boolean) as string[] || [];
        if (!images.includes(firstImage) && firstImage) {
          images.unshift(firstImage);
        }

        return {
          isApi: true,
          id: String(match.id),
          name: match.name || "Resort Room",
          description,
          pricePerNight: price,
          capacity: maxOcc,
          minOccupancy: minOcc,
          size,
          bedType,
          floor: `${floor === 1 ? "Ground" : floor === 2 ? "1st" : "2nd"} Floor`,
          facilities: match.roomFacilities?.map((f) => f.name || "").filter(Boolean) || ["Air Conditioning", "WiFi", "Room Service"],
          images: images.length > 0 ? images : ["/images/room_3.jpg"],
          noOfRooms: match.noOfRooms ?? 4,
          availableCount: match.ratesAndAvailabilityDtos?.[0]?.noOfAvailable ?? match.noOfRooms ?? 2,
        };
      }
    }

    // 2. Search mock fallback database
    const staticMatch = roomsData.find((r) => r.id === id || r.slug === id);
    if (staticMatch) {
      const facilities = staticMatch.facilities?.map((f) => f.label) || [];
      return {
        isApi: false,
        id: staticMatch.id,
        name: staticMatch.name,
        description: staticMatch.description,
        pricePerNight: staticMatch.pricePerNight,
        capacity: staticMatch.capacity,
        minOccupancy: 2,
        size: staticMatch.size,
        bedType: staticMatch.bedType,
        floor: "1st Floor",
        facilities: facilities.length > 0 ? facilities : staticMatch.amenities,
        images: [staticMatch.image, "/images/room_3.jpg", "/images/room_4.jpg"],
        noOfRooms: 4,
        availableCount: 4,
      };
    }

    return null;
  }, [apiRooms, id]);

  // Set initial image when room resolves
  useEffect(() => {
    if (resolvedRoom?.images?.[0]) {
      setActiveImage(resolvedRoom.images[0]);
    }
  }, [resolvedRoom]);

  const bookingUrl = useMemo(() => {
    if (!resolvedRoom) return "";
    return buildBookingEngineUrl({
      checkIn,
      checkOut,
      adults: resolvedRoom.capacity,
      children: 0,
      rooms: 1,
    });
  }, [resolvedRoom, checkIn, checkOut]);

  const whatsappUrl = useMemo(() => {
    if (!property) return "https://wa.me/919822012343";
    return getWhatsappShareUrl(property, false);
  }, [property]);

  if (loading || propertyLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#f3efe8] text-[#1f3c44]">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#c67a3a] border-t-transparent" />
          <p className="mt-4 font-serif text-lg font-light">Loading room details...</p>
        </div>
      </div>
    );
  }

  if (!resolvedRoom) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#f3efe8] text-[#1f3c44]">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-light text-red-800">Room Not Found</h2>
          <p className="mt-3 text-sm text-[#1f3c44]/70">The room code you requested could not be loaded.</p>
          <div className="mt-6">
            <Button href="/rooms">Back to Rooms</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[#f3efe8] py-12 text-[#1f3c44] sm:py-16 md:py-20">
      <Container>
        <div className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1f3c44]/60">
          <Link href="/" className="hover:text-[#c67a3a]">Home</Link>
          <span>/</span>
          <Link href="/rooms" className="hover:text-[#c67a3a]">Rooms</Link>
          <span>/</span>
          <span className="text-[#c67a3a]">{resolvedRoom.name}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
          {/* Left Column: Image Gallery, Description, Amenities */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-black/5 shadow-sm">
                {activeImage && (
                  <Image
                    src={activeImage}
                    alt={resolvedRoom.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover transition-all duration-700"
                    priority
                    unoptimized={activeImage.startsWith("http")}
                  />
                )}
              </div>

              {/* Thumbnails */}
              {resolvedRoom.images.length > 1 && (
                <div className="flex flex-wrap gap-3">
                  {resolvedRoom.images.map((imgUrl, i) => (
                    <button
                      key={imgUrl + i}
                      type="button"
                      onClick={() => setActiveImage(imgUrl)}
                      className={`relative h-16 w-24 overflow-hidden rounded-xl border-2 transition ${
                        activeImage === imgUrl ? "border-[#c67a3a] scale-102 shadow-sm" : "border-transparent opacity-75 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={imgUrl}
                        alt={`Room View ${i + 1}`}
                        fill
                        sizes="96px"
                        className="object-cover"
                        unoptimized={imgUrl.startsWith("http")}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Room Header Info */}
            <div className="border-b border-[#1f3c44]/10 pb-6">
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.3em] text-[#c67a3a]">
                Room {resolvedRoom.id.length > 5 ? `#${resolvedRoom.id.slice(-4)}` : `#${resolvedRoom.id}`}
              </span>
              <h1 className="mt-2 font-serif text-[2.4rem] leading-none tracking-tight sm:text-[3.2rem]">
                {resolvedRoom.name}
              </h1>
              <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1f3c44]/70">
                <span>{resolvedRoom.size}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#1f3c44]/30" />
                <span>{resolvedRoom.bedType}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#1f3c44]/30" />
                <span>{resolvedRoom.floor}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#1f3c44]/30" />
                <span>Max {resolvedRoom.capacity} Guests</span>
              </p>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-light">The Stay Experience</h2>
              <p className="text-[0.98rem] leading-relaxed text-[#1f3c44]/85">
                {resolvedRoom.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-5 border-t border-[#1f3c44]/10 pt-8">
              <h2 className="font-serif text-2xl font-light">Room Amenities & Facilities</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {resolvedRoom.facilities.map((facility) => {
                  const IconComp = getFacilityIcon(facility);
                  return (
                    <div
                      key={facility}
                      className="flex items-center gap-3.5 rounded-2xl border border-[#1f3c44]/8 bg-white/40 p-4 transition hover:bg-white"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c67a3a]/10 text-[#c67a3a]">
                        <IconComp className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-medium leading-tight text-[#1f3c44]/85">
                        {facility}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-[#1f3c44]/10 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-baseline justify-between border-b border-[#1f3c44]/10 pb-5">
                <div>
                  <span className="text-[1.8rem] font-bold text-[#c67a3a]">
                    {formatPrice(resolvedRoom.pricePerNight)}
                  </span>
                  <span className="ml-1 text-xs text-[#1f3c44]/60">per night</span>
                </div>
                {resolvedRoom.availableCount > 0 ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-emerald-800 border border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    Available
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-rose-800 border border-rose-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
                    Filled
                  </span>
                )}
              </div>

              {/* Specifications List */}
              <div className="mt-5 space-y-3.5 text-sm text-[#1f3c44]/80">
                <div className="flex justify-between">
                  <span className="font-medium">Stay Size:</span>
                  <span className="font-semibold text-[#1f3c44]">{resolvedRoom.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Capacity:</span>
                  <span className="font-semibold text-[#1f3c44]">Up to {resolvedRoom.capacity} Guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Bed Setup:</span>
                  <span className="font-semibold text-[#1f3c44]">{resolvedRoom.bedType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Location:</span>
                  <span className="font-semibold text-[#1f3c44]">{resolvedRoom.floor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Available Units:</span>
                  <span className="font-semibold text-[#1f3c44]">{resolvedRoom.availableCount} suites</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#df984e] text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#cf8841] shadow-sm"
                >
                  Book Now
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-[#d8d4ca] bg-white text-xs font-bold uppercase tracking-[0.14em] text-[#1f3c44] transition hover:bg-[#efeee9]"
                >
                  Enquire via WhatsApp
                </a>
              </div>

              <div className="mt-6 border-t border-[#1f3c44]/8 pt-5 text-center">
                <Link
                  href="/rooms"
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c67a3a] hover:underline"
                >
                  ← View all suites
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
