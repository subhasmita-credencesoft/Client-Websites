"use client";

import type { ComponentType, SVGProps } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Star,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  Check,
  Wifi,
  Wind,
  Coffee,
  Car,
  Utensils,
  Droplets,
  Monitor,
  Minus,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AmenityIconKey, PropertyDetails } from "@/data/property-details";
import { propertySourceBySlug } from "@/data/property-sources";
import { buildBookingEngineUrl } from "@/lib/booking-engine";
import { buildHotelMateCheckAvailabilityUrl, parseHotelMatePropertyIdFromUrl } from "@/lib/hotelmate-availability";
import { formatCurrency } from "@/lib/currency";
import { addDays, format, parse, isValid, startOfDay } from "date-fns";
import { useToast } from "@/lib/hooks/use-toast";

const amenityIconMap: Record<AmenityIconKey, ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  wind: Wind,
  coffee: Coffee,
  car: Car,
  utensils: Utensils,
  droplets: Droplets,
  monitor: Monitor,
  star: Star,
};

type PropertyDetailsPageProps = {
  property: PropertyDetails;
};

export function PropertyDetailsPage({ property }: PropertyDetailsPageProps) {
  const [mounted, setMounted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();

  // State initialized with neutral/safe values to prevent hydration mismatch
  const [checkInDate, setCheckInDate] = useState<Date>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date>(addDays(new Date(), 1));
  const [guestCount, setGuestCount] = useState(2);
  const [availabilityLabel, setAvailabilityLabel] = useState(property.booking.availability);

  // Initialize all date-dependent and param-dependent state after mount
  useEffect(() => {
    const searchCheckIn = searchParams.get("checkIn") || searchParams.get("checkin") || null;
    const searchCheckOut = searchParams.get("checkOut") || searchParams.get("checkout") || null;
    const searchGuests = searchParams.get("guests") || searchParams.get("adults") || null;

    const initialCheckIn = getInitialDate(searchCheckIn ?? property.booking.checkIn, 0);
    const initialCheckOut = getInitialCheckoutDate(searchCheckOut ?? property.booking.checkOut, initialCheckIn);
    const initialGuests = getInitialGuestCount(searchGuests, property.booking.guests);

    setCheckInDate(initialCheckIn);
    setCheckOutDate(initialCheckOut);
    setGuestCount(initialGuests);
    setMounted(true);
  }, [searchParams, property.booking.checkIn, property.booking.checkOut, property.booking.guests]);

  const nextImage = () => setActiveImage((prev) => (prev + 1) % property.images.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + property.images.length) % property.images.length);

  const checkInValue = format(checkInDate, "yyyy-MM-dd");
  const checkOutValue = format(checkOutDate, "yyyy-MM-dd");

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Shared",
        description: "Property link copied to clipboard.",
      });
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: !isLiked ? "Property Liked" : "Removed from Liked",
      description: !isLiked ? "Saved to your favorites." : "Property removed from favorites.",
    });
  };

  // Availability: HotelMate contract — /checkAvailability/{propertyId}?fromDate&toDate&noOfRooms&noOfPersons
  useEffect(() => {
    if (!mounted) return;

    const propertyId = resolveHotelMatePropertyId(property);
    if (propertyId == null) return;

    const controller = new AbortController();
    const availabilityUrl = buildHotelMateCheckAvailabilityUrl(propertyId, {
      fromDate: checkInValue,
      toDate: checkOutValue,
      noOfRooms: 1,
      noOfPersons: guestCount,
    });

    setAvailabilityLabel("Checking Availability");

    fetch(availabilityUrl, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Availability request failed: ${response.status}`);
        const data = await response.json();
        setAvailabilityLabel(getAvailabilityLabel(data, property.booking.availability));
      })
      .catch((error) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setAvailabilityLabel(property.booking.availability);
      });

    return () => controller.abort();
  }, [
    checkInValue,
    checkOutValue,
    guestCount,
    mounted,
    property.booking.availability,
    property.slug,
  ]);

  // To perfectly prevent hydration mismatch, we render a minimal shell until mounted
  if (!mounted) {
    return <div className="min-h-screen bg-background" aria-hidden="true" />;
  }

  return (
    <main className="relative min-h-screen bg-background font-sans">
      <div className="group relative h-[45vh] min-h-[420px] w-full overflow-hidden md:h-[58vh] lg:h-[62vh]">
        <div className="absolute inset-0">
          <Image
            src={property.images[activeImage]}
            alt={property.title}
            fill
            priority
            sizes="100vw"
            className="h-full w-full object-cover object-center transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
        <button onClick={prevImage} className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-md transition-all hover:bg-white/40 md:left-4 md:p-3 md:opacity-0 md:group-hover:opacity-100">
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>
        <button onClick={nextImage} className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-md transition-all hover:bg-white/40 md:right-4 md:p-3 md:opacity-0 md:group-hover:opacity-100">
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        <div className="container absolute bottom-5 left-0 right-0 z-20 mx-auto flex flex-col gap-2.5 px-6 text-white md:bottom-8 md:flex-row md:items-end md:justify-between md:gap-4">
          <div>
            <div className="mb-1.5 flex w-fit items-center gap-1.5 rounded-full bg-primary/80 px-2.5 py-0.5 text-[0.75rem] font-medium backdrop-blur-sm sm:px-3 sm:py-1 sm:text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{property.ratingLabel}</span>
            </div>
            <h1 className="mb-2 text-xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">{property.title}</h1>
            <div className="flex items-center gap-2 text-[0.8rem] text-white/90 sm:text-base">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="line-clamp-2">{property.location}</span>
            </div>
            {property.tags?.length ? (
              <div className="mt-2.5 flex flex-wrap gap-2 sm:mt-4">
                {property.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/15 px-2.5 py-0.5 text-[0.65rem] font-bold backdrop-blur-sm sm:px-3 sm:py-1 sm:text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="absolute bottom-4 right-4 z-30 flex flex-col items-end gap-3">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
              className="rounded-full border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black active:scale-95"
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleLike}
              className={`rounded-full border-white/20 backdrop-blur-md transition-all active:scale-95 ${isLiked ? "bg-white text-red-500 border-white" : "bg-black/40 text-white hover:bg-white hover:text-red-500"
                }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500" : ""}`} />
            </Button>
          </div>
          <div className="hidden gap-2 lg:flex">
            {property.images.slice(0, 4).map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`relative h-10 w-14 overflow-hidden rounded-md border-2 transition-all xl:h-12 xl:w-16 ${activeImage === index ? "scale-105 border-primary" : "border-white/50 opacity-70 hover:opacity-100"
                  }`}
              >
                <Image src={image} alt={`Thumbnail ${index + 1}`} fill sizes="64px" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 sm:px-6 md:py-12">
        <div className="flex flex-col gap-10 md:gap-12 lg:flex-row">
          <div className="space-y-12 md:space-y-16 lg:w-2/3">
            <section>
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">About</h2>
                <Badge variant="outline" className="w-fit border-primary text-primary">
                  {property.typeBadge}
                </Badge>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{property.description}</p>
            </section>

            <section className="rounded-2xl bg-secondary/20 p-5 sm:p-6 md:p-8">
              <h2 className="mb-6 text-2xl font-bold text-foreground">Packages / Tariff</h2>
              <div className="space-y-6">
                {property.rooms.map((room) => (
                  <div key={`room-${room.id}`} className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-64 md:h-auto md:w-2/5">
                        <Image src={room.image} alt={room.name} fill sizes="(max-width: 768px) 100vw, 40vw" className="h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between gap-5 p-5 md:p-6">
                        <div>
                          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <h3 className="text-xl font-bold">{room.name}</h3>
                            <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/20">{room.size}</Badge>
                          </div>
                          <ul className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <li className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Check className="h-3 w-3 shrink-0 text-green-500" /> Occupancy: {room.bed}
                            </li>
                            <li className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Check className="h-3 w-3 shrink-0 text-green-500" /> View: {room.view}
                            </li>
                            {room.available ? (
                              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Check className="h-3 w-3 shrink-0 text-green-500" /> Available: {room.available}
                              </li>
                            ) : null}
                            {room.features.map((feature) => (
                              <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Check className="h-3 w-3 shrink-0 text-green-500" /> {feature}
                              </li>
                            ))}
                          </ul>
                          {room.description ? <p className="text-sm leading-relaxed text-muted-foreground">{room.description}</p> : null}
                        </div>

                        <div className="mt-2 flex flex-col gap-4 border-t border-border/50 pt-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <span className="text-2xl font-bold text-primary">{formatCurrency(room.price)}</span>
                            <span className="text-sm text-muted-foreground"> / unit</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-6 text-2xl font-bold text-foreground">
                {property.propertyDetailsSection?.title ?? "Property Details"}
              </h2>
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <ul className="space-y-3">
                  {property.propertyDetailsSection?.lines
                    .filter((line) => !line.includes("Property ID:"))
                    .map((line) => (
                      <li key={line} className="flex items-start gap-3 text-sm text-muted-foreground sm:text-base">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                        <span>{line}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </section>

            {property.policiesSection ? (
              <section>
                <h2 className="mb-6 text-2xl font-bold text-foreground">{property.policiesSection.title}</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <PolicyCard title="Accommodation" items={property.policiesSection.accommodation} />
                  <PolicyCard title="Refund & Cancellation Policy" items={property.policiesSection.cancellation} />
                  <PolicyCard title="Day Outing" items={property.policiesSection.dayOuting} />
                </div>
              </section>
            ) : null}
          </div>

          <div className="lg:w-1/3">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xl md:p-6 lg:sticky lg:top-24">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="text-3xl font-bold text-primary">{formatCurrency(property.booking.basePrice)}</span>
                  <span className="text-muted-foreground"> / night</span>
                </div>
                <div className="flex w-fit items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-bold text-green-600">
                  <Check className="h-3 w-3" /> {availabilityLabel}
                </div>
              </div>

              <div className="mb-6 space-y-4">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div className="rounded-lg border p-3 transition-colors hover:border-primary">
                    <label className="mb-1 block text-[10px] font-bold uppercase text-gray-400">Check-in</label>
                    <input
                      type="date"
                      value={checkInValue}
                      min={format(new Date(), "yyyy-MM-dd")}
                      onChange={(event) => {
                        const nextDate = new Date(event.target.value);
                        if (!isValid(nextDate)) return;
                        setCheckInDate(nextDate);
                        if (nextDate >= checkOutDate) setCheckOutDate(addDays(nextDate, 1));
                      }}
                      className="w-full bg-transparent text-sm font-bold outline-none"
                    />
                  </div>
                  <div className="rounded-lg border p-3 transition-colors hover:border-primary">
                    <label className="mb-1 block text-[10px] font-bold uppercase text-gray-400">Check-out</label>
                    <input
                      type="date"
                      value={checkOutValue}
                      min={format(addDays(checkInDate, 1), "yyyy-MM-dd")}
                      onChange={(event) => {
                        const nextDate = new Date(event.target.value);
                        if (!isValid(nextDate)) return;
                        if (nextDate <= checkInDate) {
                          setCheckOutDate(addDays(checkInDate, 1));
                          return;
                        }
                        setCheckOutDate(nextDate);
                      }}
                      className="w-full bg-transparent text-sm font-bold outline-none"
                    />
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <label className="mb-1 block text-[10px] font-bold uppercase text-gray-400">Guests</label>
                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setGuestCount((count) => Math.max(1, count - 1))}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-primary transition-colors hover:border-primary hover:bg-primary/5"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">{guestCount}</div>
                      <div className="text-xs text-muted-foreground">{guestCount === 1 ? "Guest" : "Guests"}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setGuestCount((count) => Math.min(20, count + 1))}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-primary transition-colors hover:border-primary hover:bg-primary/5"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  asChild
                  className="h-12 w-full bg-primary text-base font-bold shadow-lg shadow-primary/20 hover:bg-primary/90"
                >
                  <a
                    href={buildBookingEngineUrl({
                      baseUrl: property.booking.externalBookingUrl ?? `https://bookone.io/${property.slug}`,
                      checkIn: checkInDate,
                      checkOut: checkOutDate,
                      adults: guestCount,
                      children: 0,
                      rooms: 1,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book Now
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-12 w-full border-primary text-base font-bold text-primary hover:bg-primary/5">
                  <Link href="/contact">Contact Host</Link>
                </Button>
              </div>

              <div className="mt-6 border-t border-gray-100 pt-6 text-center text-xs text-muted-foreground">
                <p className="flex items-center justify-center gap-2">
                  <ShieldCheckIcon className="h-4 w-4 text-green-500" /> {property.booking.secureLabel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function resolveHotelMatePropertyId(property: PropertyDetails): number | null {
  const slug = property.slug?.toLowerCase();
  const registered = slug ? propertySourceBySlug[slug]?.propertyId : undefined;
  if (typeof registered === "number" && Number.isFinite(registered)) {
    return registered;
  }
  return parseHotelMatePropertyIdFromUrl(property.booking.availabilityApiUrl);
}

function PolicyCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-foreground">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
            <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function getInitialDate(value: string, fallbackDays: number) {
  const today = startOfDay(new Date());
  if (!value) return addDays(today, fallbackDays);
  const formats = ["yyyy-MM-dd", "dd-MM-yyyy", "MMM d, yyyy", "yyyy/MM/dd", "dd/MM/yyyy"];
  for (const formatStr of formats) {
    try {
      const parsed = parse(value, formatStr, new Date());
      if (isValid(parsed)) return parsed >= today ? parsed : addDays(today, fallbackDays);
    } catch { continue; }
  }
  const nativeParsed = new Date(value);
  if (isValid(nativeParsed)) {
    const localDate = startOfDay(nativeParsed);
    return localDate >= today ? localDate : addDays(today, fallbackDays);
  }
  return addDays(today, fallbackDays);
}

function getInitialCheckoutDate(value: string, checkInDate: Date) {
  const parsedDate = getInitialDate(value, 1);
  return parsedDate > checkInDate ? parsedDate : addDays(checkInDate, 1);
}

function getInitialGuestCount(guestQuery: string | null | undefined, guests: string[]) {
  const parsedQueryCount = Number.parseInt(guestQuery ?? "", 10);
  if (!Number.isNaN(parsedQueryCount) && parsedQueryCount > 0) return parsedQueryCount;
  const firstGuestOption = guests[0] ?? "2 Guests";
  const parsedCount = Number.parseInt(firstGuestOption, 10);
  return Number.isNaN(parsedCount) ? 2 : parsedCount;
}

function getAvailabilityLabel(data: unknown, fallback: string) {
  if (!data || typeof data !== "object") return fallback;
  const record = data as Record<string, unknown>;
  const directLabel = getStringValue(record.availability) ?? getStringValue(record.message) ?? getStringValue(record.status);
  if (directLabel) return directLabel;
  const availableRooms = getNumberValue(record.availableRooms) ?? getNumberValue(record.noOfRooms) ?? getNumberValue(record.roomsAvailable) ?? getNumberValue(record.available);
  if (availableRooms !== null) return availableRooms > 0 ? `${availableRooms} Room${availableRooms === 1 ? "" : "s"} Available` : "Sold Out";
  const successFlag = getBooleanValue(record.success) ?? getBooleanValue(record.availableStatus);
  if (successFlag !== null) return successFlag ? "Available" : "Unavailable";
  return fallback;
}

function getStringValue(value: unknown) { return typeof value === "string" && value.trim() ? value.trim() : null; }
function getNumberValue(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    return Number.isNaN(parsed) ? null : parsed;
  }
  return null;
}
function getBooleanValue(value: unknown) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
  }
  return null;
}

function ShieldCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
