"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DateRangeField } from "@/components/ui/date-range-field";
import { MessageCircle, MapPin, Users, Search } from "lucide-react";
import { addDays, format, parse, isValid, startOfDay } from "date-fns";
import type { DateRange } from "react-day-picker";
import { siteImages } from "@/lib/site-images";
import { homePageData } from "@/data/home";
import { propertySourceBySlug } from "@/data/property-sources";
import { siteContact } from "@/data/site";
import { buildBookingEngineUrl } from "@/lib/booking-engine";

export function Hero() {
  const { hero } = homePageData;
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [mounted, setMounted] = useState(false);
  const [destination, setDestination] = useState(hero.destinations[0] ?? "All Locations");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guestCount, setGuestCount] = useState(2);
  
  const locationId = useMemo(() => getLocationIdFromDestination(destination), [destination]);
  const propertyOptions = useMemo(() => getPropertiesForLocation(locationId), [locationId]);
  const [selectedPropertyLink, setSelectedPropertyLink] = useState(propertyOptions[0]?.link ?? "");

  useEffect(() => {
    const checkInStr = searchParams.get("checkIn") || searchParams.get("checkin");
    const checkOutStr = searchParams.get("checkOut") || searchParams.get("checkout");
    const guestStr = searchParams.get("guests") || searchParams.get("adults");
    const destStr = searchParams.get("destination");

    if (checkInStr) {
      const from = parseDate(checkInStr);
      if (isValid(from)) {
        const to = checkOutStr ? parseDate(checkOutStr) : addDays(from, 1);
        setDateRange({ from, to: isValid(to) ? to : addDays(from, 1) });
      }
    }

    if (guestStr) {
      const g = parseInt(guestStr, 10);
      if (!isNaN(g)) setGuestCount(g);
    }

    if (destStr) setDestination(destStr);
    
    setMounted(true);
  }, [searchParams]);

  useEffect(() => {
    if (mounted) {
      if (!selectedPropertyLink || !propertyOptions.some(p => p.link === selectedPropertyLink)) {
        setSelectedPropertyLink(propertyOptions[0]?.link ?? "");
      }
    }
  }, [propertyOptions, mounted]);

  const handleSearch = () => {
    const checkInDate = dateRange?.from ? startOfDay(dateRange.from) : startOfDay(new Date());
    const checkOutDate = dateRange?.to ? startOfDay(dateRange.to) : addDays(checkInDate, 1);
    
    const selectedSlug = getSlugFromPropertyLink(selectedPropertyLink);
    const propertySource = selectedSlug ? propertySourceBySlug[selectedSlug.toLowerCase()] : null;

    if (propertySource?.bookingPath) {
      const bookingUrl = buildBookingEngineUrl({
        baseUrl: `https://bookone.io/${propertySource.bookingPath}`,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        adults: guestCount,
        children: 0,
        rooms: 1,
      });

      // ✅ FIXED: open in new tab so BookOne always initializes fresh with new dates
      window.open(bookingUrl, "_blank", "noopener,noreferrer");
      return;
    }

    const params = new URLSearchParams({
      checkIn: format(checkInDate, "yyyy-MM-dd"),
      checkOut: format(checkOutDate, "yyyy-MM-dd"),
      guests: guestCount.toString(),
      destination,
      ...(locationId ? { location: locationId } : {}),
    });

    const targetPath = selectedPropertyLink ? selectedPropertyLink.replace("/property/", "/") : "/properties";
    router.push(`${targetPath}${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <div className="relative min-h-[820px] md:min-h-[90vh] w-full overflow-visible flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src={siteImages.hero}
          alt="Luxury villa pool at night"
          fill
          priority
          sizes="100vw"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center text-white flex flex-col items-center justify-center h-full pt-24 md:pt-20 pb-10 md:pb-0">
        <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4 text-primary animate-in fade-in slide-in-from-bottom-4 duration-700 bg-white/10 backdrop-blur-md py-2 px-4 rounded-full border border-white/20">
          {hero.badge}
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 drop-shadow-lg">
          {hero.title}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 drop-shadow-md px-2 sm:px-0">
          {hero.description}
        </p>

        <div className="relative z-[100] w-full max-w-5xl bg-white rounded-lg shadow-2xl p-2 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300 flex flex-col md:flex-row gap-2">
          {!mounted ? (
            <div className="w-full h-20 bg-gray-50 flex items-center justify-center text-gray-400 font-medium">
              Initializing search bar...
            </div>
          ) : (
            <>
              <div className="flex-1 bg-gray-50 rounded-md px-4 py-3 flex items-center gap-3 border border-transparent focus-within:border-primary/50 transition-colors min-w-0">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <div className="text-left flex-1 min-w-0">
                  <label className="block text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider">Destination</label>
                  <select
                    value={destination}
                    onChange={(event) => setDestination(event.target.value)}
                    className="w-full bg-transparent text-gray-900 font-bold text-sm focus:outline-none appearance-none cursor-pointer truncate"
                  >
                    {hero.destinations.map((destinationOption) => (
                      <option key={destinationOption}>{destinationOption}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex-1 bg-gray-50 rounded-md px-4 py-3 flex items-center gap-3 border border-transparent focus-within:border-primary/50 transition-colors min-w-0">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <div className="text-left flex-1 min-w-0">
                  <label className="block text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider">Property</label>
                  <select
                    value={selectedPropertyLink}
                    onChange={(event) => setSelectedPropertyLink(event.target.value)}
                    className="w-full bg-transparent text-gray-900 font-bold text-sm focus:outline-none appearance-none cursor-pointer truncate"
                  >
                    {propertyOptions.map((propertyOption) => (
                      <option key={propertyOption.link} value={propertyOption.link}>
                        {propertyOption.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <DateRangeField value={dateRange} onChange={setDateRange} />

              <div className="flex-1 bg-gray-50 rounded-md px-4 py-3 flex items-center gap-3 border border-transparent focus-within:border-primary/50 transition-colors min-w-0">
                <Users className="w-5 h-5 text-primary shrink-0" />
                <div className="text-left flex-1 min-w-0">
                  <label className="block text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider">Guests</label>
                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setGuestCount((current) => Math.max(1, current - 1))}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-base font-bold text-primary transition-colors hover:border-primary hover:bg-primary/5"
                    >
                      -
                    </button>
                    <div className="min-w-0 flex-1 text-center text-gray-900 font-bold text-sm truncate">
                      {guestCount}
                    </div>
                    <button
                      type="button"
                      onClick={() => setGuestCount((current) => Math.min(20, current + 1))}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-base font-bold text-primary transition-colors hover:border-primary hover:bg-primary/5"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 w-full md:w-auto md:self-stretch">
                <Button
                  type="button"
                  onClick={handleSearch}
                  className="flex-1 md:flex-none h-full min-h-[3.5rem] bg-primary hover:bg-primary/90 text-white font-bold px-6 md:px-8 rounded-md text-sm uppercase tracking-wide"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Button asChild className="flex-1 md:flex-none h-full min-h-[3.5rem] bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold px-6 rounded-md text-sm uppercase tracking-wide">
                  <a href={siteContact.whatsappHref} target="_blank" rel="noreferrer">
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function parseDate(dateStr: string) {
  const formats = ["yyyy-MM-dd", "dd-MM-yyyy", "MMM d, yyyy", "yyyy/MM/dd", "dd/MM/yyyy"];
  for (const f of formats) {
    try {
      const p = parse(dateStr, f, new Date());
      if (isValid(p)) return startOfDay(p);
    } catch { continue; }
  }
  const d = new Date(dateStr);
  return isValid(d) ? startOfDay(d) : new Date(NaN);
}

function getLocationIdFromDestination(destination: string) {
  const normalizedDestination = destination.trim().toLowerCase();
  if (normalizedDestination === "all locations") return "near-pune";
  const locationMatch = homePageData.locationHighlights.locations.find((location) =>
    normalizedDestination.includes(location.name.trim().toLowerCase()),
  );
  return locationMatch?.id ?? "near-pune";
}

function getPropertiesForLocation(locationId: string) {
  return homePageData.locationHighlights.propertiesByLocation[
    locationId as keyof typeof homePageData.locationHighlights.propertiesByLocation
  ] ?? homePageData.locationHighlights.propertiesByLocation["near-pune"];
}

function getSlugFromPropertyLink(link: string) {
  if (link.startsWith("/property/")) return link.replace("/property/", "");
  if (link.startsWith("/") && !link.slice(1).includes("/")) return link.slice(1);
  return null;
}