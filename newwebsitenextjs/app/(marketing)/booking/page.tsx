"use client";

import Image from "next/image";
import { Suspense, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { stayCardsPrimary, stayCardsSecondary } from "@/lib/data/content/mountain-content";
import {
  buildRedwingsAvailabilityUrl,
  buildRedwingsRoomPlanUrl,
  mapRedwingsAvailabilityToRoomCards,
  type HotelMatePropertyAvailability,
  type HotelMateRoomPlan,
  type LiveRoomCard,
} from "@/lib/hotelmate/redwings-availability";

type RoomPlanCard = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  amount: number | null;
  currencyCode: string;
  ratePlanCode: string;
  minimumOccupancy: number;
  maximumOccupancy: number;
  extraChargePerPerson: number | null;
};

const fallbackPackageCatalog: RoomPlanCard[] = [
  {
    title: "Comfort Plan",
    subtitle: "A practical stay direction for guests who want dependable comfort and value.",
    description:
      "Best suited to Standard Room and Deluxe Room bookings for short stays, transit travel, and budget-conscious visits.",
    image: "https://bookonelocal.in/cdn/2025-06-24-095047456-30.jpg",
    amount: null,
    currencyCode: "INR",
    ratePlanCode: "",
    minimumOccupancy: 1,
    maximumOccupancy: 2,
    extraChargePerPerson: null,
  },
  {
    title: "Premium Plan",
    subtitle: "A stronger room-comfort direction for guests who want more polish.",
    description:
      "Built around Luxury Room and Supreme Room stays for travelers who want an upgraded hotel experience in Panvel.",
    image: "https://bookonelocal.in/cdn/2025-06-24-094924878-18.jpg",
    amount: null,
    currencyCode: "INR",
    ratePlanCode: "",
    minimumOccupancy: 1,
    maximumOccupancy: 4,
    extraChargePerPerson: null,
  },
  {
    title: "Royal Suite Plan",
    subtitle: "The most elevated stay direction available in the property.",
    description:
      "Designed for guests considering the Maharaja Suite Room and looking for the hotel's top-category room comfort.",
    image: "https://bookonelocal.in/cdn/2025-06-24-095002532-20.jpg",
    amount: null,
    currencyCode: "INR",
    ratePlanCode: "",
    minimumOccupancy: 1,
    maximumOccupancy: 4,
    extraChargePerPerson: 1100,
  },
];

const BOOKONE_REDWINGS_BASE_URL = "https://bookone.io/Hotel-Redwings-Castle";

function formatCurrency(amount?: number | null) {
  if (typeof amount !== "number" || Number.isNaN(amount)) return "On request";
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}

function toSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function mapRoomPlansToCards(roomPlans: HotelMateRoomPlan[], roomImage: string): RoomPlanCard[] {
  return roomPlans.map((plan) => {
    const minimumOccupancy = Math.max(1, plan.minimumOccupancy ?? 1);
    const maximumOccupancy = Math.max(minimumOccupancy, plan.maximumOccupancy ?? minimumOccupancy);
    const lengthText =
      plan.minimumLengthOfStay && plan.maximumLengthOfStay
        ? `Stay ${plan.minimumLengthOfStay}-${plan.maximumLengthOfStay} nights`
        : "Flexible stay duration";

    return {
      title: plan.name || "Room Plan",
      subtitle: `${formatCurrency(plan.amount)} | ${minimumOccupancy}-${maximumOccupancy} guests`,
      description:
        plan.description ||
        `${lengthText} | ${plan.status || "Open"} | ${plan.restriction || "No restrictions"}`,
      image: roomImage,
      amount: plan.amount ?? null,
      currencyCode: plan.currencyCode || "INR",
      ratePlanCode: plan.code || "",
      minimumOccupancy,
      maximumOccupancy,
      extraChargePerPerson: plan.extraChargePerPerson ?? null,
    };
  });
}

function buildBookOneBookingUrl(args: {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomTitle: string;
  packageTitle: string;
  liveRoomCard: LiveRoomCard | null;
  selectedPlan: RoomPlanCard | null;
}) {
  const [checkInYear, checkInMonth, checkInDay] = args.checkIn.split("-").map(Number);
  const [checkOutYear, checkOutMonth, checkOutDay] = args.checkOut.split("-").map(Number);
  const checkInDate = new Date(checkInYear, checkInMonth - 1, checkInDay);
  const checkOutDate = new Date(checkOutYear, checkOutMonth - 1, checkOutDay);
  const safeGuestCount = Math.max(1, args.guests);
  const nights = Math.max(
    1,
    Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)),
  );
  const params = new URLSearchParams();
  params.set("bookingEngine", "true");
  params.set("checkinDay", String(checkInDay));
  params.set("checkinMonth", String(checkInMonth));
  params.set("checkinYear", String(checkInYear));
  params.set("checkoutDay", String(checkOutDay));
  params.set("checkoutMonth", String(checkOutMonth));
  params.set("checkoutYear", String(checkOutYear));
  params.set("checkIn", args.checkIn);
  params.set("checkin", args.checkIn);
  params.set("checkOut", args.checkOut);
  params.set("checkout", args.checkOut);
  params.set("fromDate", args.checkIn);
  params.set("toDate", args.checkOut);
  params.set("date_to", args.checkOut);
  params.set("nights", String(nights));
  params.set("guests", String(safeGuestCount));
  params.set("numGuests", String(safeGuestCount));
  params.set("adults", String(safeGuestCount));
  params.set("numAdults", String(safeGuestCount));
  const room = args.liveRoomCard;
  const planTitle = args.selectedPlan?.title || room?.ratePlanName || args.packageTitle;
  const roomTitle = room?.roomName || args.roomTitle;
  const roomSlug = toSlug(roomTitle);

  params.set("children", "0");
  params.set("Children", "0");
  params.set("rooms", "1");
  params.set("numRooms", "1");
  params.set("roomCount", "1");
  params.set("noOfRooms", "1");
  params.set("noOfPersons", String(safeGuestCount));
  params.set("room", roomSlug);
  params.set("roomSlug", roomSlug);
  params.set("roomType", roomTitle);

  params.set("plan", planTitle);
  params.set("package", planTitle);
  params.set("planName", planTitle);
  params.set("roomPlanName", planTitle);
  params.set("selectedPlan", planTitle);

  if (room?.propertyId) params.set("propertyId", String(room.propertyId));
  if (room?.propertyName) params.set("propertyName", room.propertyName);
  if (room?.roomId) params.set("roomId", String(room.roomId));
  if (roomTitle) {
    params.set("roomName", roomTitle);
    params.set("selectedRoom", roomSlug);
  }
  if (args.selectedPlan?.ratePlanCode || room?.ratePlanCode) {
    const ratePlanCode = args.selectedPlan?.ratePlanCode || room?.ratePlanCode || "";
    params.set("ratePlanCode", ratePlanCode);
    params.set("planCode", ratePlanCode);
    params.set("roomPlanCode", ratePlanCode);
  }
  if (args.selectedPlan?.title || room?.ratePlanName) {
    const ratePlanName = args.selectedPlan?.title || room?.ratePlanName || "";
    params.set("ratePlanName", ratePlanName);
    params.set("selectedRatePlan", ratePlanName);
  }
  if (args.selectedPlan?.currencyCode || room?.currencyCode) {
    params.set("currencyCode", args.selectedPlan?.currencyCode || room?.currencyCode || "INR");
  }
  if (typeof args.selectedPlan?.amount === "number") {
    params.set("price", String(args.selectedPlan.amount));
  } else if (typeof room?.price === "number") {
    params.set("price", String(room.price));
  }
  if (typeof room?.availableRooms === "number") params.set("availableRooms", String(room.availableRooms));
  if (typeof room?.totalRooms === "number") params.set("totalRooms", String(room.totalRooms));
  if (typeof args.selectedPlan?.maximumOccupancy === "number") {
    params.set("maxOccupancy", String(args.selectedPlan.maximumOccupancy));
  } else if (typeof room?.maxOccupancy === "number") {
    params.set("maxOccupancy", String(room.maxOccupancy));
  }
  if (typeof args.selectedPlan?.extraChargePerPerson === "number") {
    params.set("extraChargePerPerson", String(args.selectedPlan.extraChargePerPerson));
  } else if (typeof room?.extraChargePerPerson === "number") {
    params.set("extraChargePerPerson", String(room.extraChargePerPerson));
  }

  return `${BOOKONE_REDWINGS_BASE_URL}?${params.toString()}`;
}

function getTodayDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(dateString: string, days: number) {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function BookingPageContent() {
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const searchParams = useSearchParams();
  const roomCatalog = useMemo(() => [...stayCardsPrimary, ...stayCardsSecondary], []);
  const selectedRoomFromQuery = searchParams.get("room") ?? "";
  const selectedPackageFromQuery = searchParams.get("package") ?? "";
  const initialRoomValue = roomCatalog.some((room) => room.title === selectedRoomFromQuery) ? selectedRoomFromQuery : "";
  const initialPackageValue = fallbackPackageCatalog.some((pkg) => pkg.title === selectedPackageFromQuery)
    ? selectedPackageFromQuery
    : "";
  const todayDate = getTodayDateString();
  const tomorrowDate = addDays(todayDate, 1);

  const [checkIn, setCheckIn] = useState(todayDate);
  const [checkOut, setCheckOut] = useState(tomorrowDate);
  const [guestCount, setGuestCount] = useState(1);
  const [roomValue, setRoomValue] = useState(initialRoomValue);
  const [packageValue, setPackageValue] = useState(initialPackageValue);
  const [roomFilterQuery, setRoomFilterQuery] = useState("");
  const [packageFilterQuery, setPackageFilterQuery] = useState("");
  const [liveRooms, setLiveRooms] = useState<typeof roomCatalog>([]);
  const [liveRoomPlans, setLiveRoomPlans] = useState<RoomPlanCard[]>([]);
  const [livePropertyName, setLivePropertyName] = useState("Hotel Redwings Castle");
  const [availabilityError, setAvailabilityError] = useState("");
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [roomPlansLoading, setRoomPlansLoading] = useState(false);

  const activeRoomCatalog = liveRooms.length > 0 ? liveRooms : roomCatalog;
  const activePackageCatalog = liveRoomPlans.length > 0 ? liveRoomPlans : fallbackPackageCatalog;

  const selectedRoomCard = useMemo(
    () => activeRoomCatalog.find((room) => room.title === roomValue) ?? null,
    [activeRoomCatalog, roomValue],
  );
  const selectedPackageCard = useMemo(
    () => activePackageCatalog.find((pkg) => pkg.title === packageValue) ?? null,
    [activePackageCatalog, packageValue],
  );

  const activeRoomCard = selectedRoomCard ?? activeRoomCatalog[0] ?? null;
  const activePackageCard = selectedPackageCard ?? activePackageCatalog[0] ?? null;
  const fallbackAvailabilityImage = useMemo(
    () => activeRoomCard?.image ?? roomCatalog[0]?.image ?? "https://bookonelocal.in/cdn/2025-06-24-095348564-6.jpg",
    [activeRoomCard?.image, roomCatalog],
  );
  const filteredRooms = useMemo(() => {
    const query = roomFilterQuery.trim().toLowerCase();
    if (!query) return activeRoomCatalog;
    return activeRoomCatalog.filter((room) =>
      `${room.title} ${room.description} ${room.tariff} ${room.packagePrice}`.toLowerCase().includes(query),
    );
  }, [activeRoomCatalog, roomFilterQuery]);
  const filteredPackages = useMemo(() => {
    const query = packageFilterQuery.trim().toLowerCase();
    if (!query) return activePackageCatalog;
    return activePackageCatalog.filter((pkg) =>
      `${pkg.title} ${pkg.subtitle} ${pkg.description}`.toLowerCase().includes(query),
    );
  }, [activePackageCatalog, packageFilterQuery]);
  const decrementGuestCount = () => {
    setGuestCount((current) => Math.max(1, current - 1));
  };
  const incrementGuestCount = () => {
    setGuestCount((current) => current + 1);
  };

  useEffect(() => {
    if (!checkIn || !checkOut) return;

    const abortController = new AbortController();

    async function loadAvailability() {
      try {
        setAvailabilityLoading(true);
        setAvailabilityError("");

        const response = await fetch(
          buildRedwingsAvailabilityUrl(checkIn, checkOut, guestCount),
          {
            signal: abortController.signal,
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error(`Availability request failed with ${response.status}`);
        }

        const payload = (await response.json()) as HotelMatePropertyAvailability;
        const mappedRooms = mapRedwingsAvailabilityToRoomCards(
          payload,
          fallbackAvailabilityImage,
        );

        setLiveRooms(mappedRooms);
        setLivePropertyName(payload.name || "Hotel Redwings Castle");
        if (mappedRooms.length > 0 && !mappedRooms.some((room) => room.title === roomValue)) {
          setRoomValue(mappedRooms[0].title);
        }
      } catch {
        if (abortController.signal.aborted) return;
        setAvailabilityError("Live room availability could not be loaded right now. Showing the hotel stay catalog instead.");
        setLiveRooms([]);
      } finally {
        if (!abortController.signal.aborted) {
          setAvailabilityLoading(false);
        }
      }
    }

    void loadAvailability();

    return () => abortController.abort();
  }, [checkIn, checkOut, guestCount, fallbackAvailabilityImage, roomCatalog, roomValue]);

  useEffect(() => {
    if (!activeRoomCard?.propertyId || !activeRoomCard?.roomId) {
      setLiveRoomPlans([]);
      return;
    }

    const abortController = new AbortController();

    async function loadRoomPlans() {
      try {
        setRoomPlansLoading(true);
        const response = await fetch(
          buildRedwingsRoomPlanUrl(activeRoomCard.propertyId, activeRoomCard.roomId),
          {
            signal: abortController.signal,
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error(`Room plan request failed with ${response.status}`);
        }

        const payload = (await response.json()) as HotelMateRoomPlan[];
        const mappedPlans = mapRoomPlansToCards(payload, activeRoomCard.image);
        setLiveRoomPlans(mappedPlans);

        if (mappedPlans.length > 0 && !mappedPlans.some((plan) => plan.title === packageValue)) {
          setPackageValue(mappedPlans[0].title);
        }
      } catch {
        if (abortController.signal.aborted) return;
        setLiveRoomPlans([]);
      } finally {
        if (!abortController.signal.aborted) {
          setRoomPlansLoading(false);
        }
      }
    }

    void loadRoomPlans();

    return () => abortController.abort();
  }, [activeRoomCard?.image, activeRoomCard?.propertyId, activeRoomCard?.roomId, packageValue]);

  useEffect(() => {
    if (!packageValue && activePackageCatalog[0]) {
      setPackageValue(activePackageCatalog[0].title);
    }
  }, [activePackageCatalog, packageValue]);

  const handleCheckInChange = (value: string) => {
    setCheckIn(value);
    if (!checkOut || checkOut <= value) {
      setCheckOut(addDays(value, 1));
    }
  };

  const handlePlannerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const redirectUrl = buildBookOneBookingUrl({
      checkIn,
      checkOut,
      guests: guestCount,
      roomTitle: activeRoomCard?.title ?? roomValue ?? "Hotel Room",
      packageTitle: activePackageCard?.title ?? packageValue ?? "Room Plan",
      liveRoomCard: activeRoomCard,
      selectedPlan: activePackageCard,
    });
    window.location.assign(redirectUrl);
  };

  if (!isMounted) {
    return <BookingPageFallback />;
  }

  return (
    <main className="relative bg-[#2d4a3e] text-white">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="noise-overlay" />
      </div>
      <SiteHeader />
      <section
        className="relative min-h-[72svh] overflow-hidden pt-40 md:pt-44"
        data-section-id="booking-hero"
      >
        <div className="absolute inset-0">
          <Image
            src={activeRoomCard?.image ?? "/images/DSC08717.avif"}
            alt={activeRoomCard?.title ?? "Hotel Redwings Castle booking support"}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.44)_40%,rgba(0,0,0,0.76)_100%)]" />
        <div className="absolute inset-x-[8%] top-28 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[72svh] max-w-[96rem] items-end px-6 pb-12 md:px-12 md:pb-16">
          <div className="max-w-4xl" data-reveal>
            <p
              className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d6b07a]"
              data-reveal-child
            >
              Hotel Booking
            </p>
            <h1
              className="mt-4 text-balance text-[clamp(40px,5vw,74px)] leading-[0.96] text-[#f6ead8]"
              data-section-title
            >
              {activeRoomCard?.title ?? "Plan Your Hotel Stay"}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/88 md:text-xl" data-reveal-child>
              {activeRoomCard?.description ??
                "Share your preferred dates, guest count, room plan, and stay preference. The Hotel Redwings Castle team will guide room fit and availability support for your visit."}
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[96rem] px-6 py-10 md:px-12 md:py-14">
        <div className="grid gap-8 xl:grid-cols-[minmax(22rem,0.76fr)_minmax(0,1.24fr)] xl:items-start">
          <div className="xl:sticky xl:top-28 xl:self-start">
            <form
              onSubmit={handlePlannerSubmit}
              className="glass-panel rounded-[1.75rem] border border-[#c9a46e]/20 p-5 shadow-[0_18px_36px_rgba(8,16,11,0.14)] md:p-6"
            >
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a46e]">
                  Stay Planner
                </p>
                <h2 className="mt-2 text-[1.8rem] text-[#f4eee2] md:text-[2rem]">Plan your hotel stay</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/72">
                  Choose your dates, guest count, stay option, and room plan. Availability is checked automatically
                  for your selected stay.
                </p>
                {availabilityError ? (
                  <div className="mt-4 rounded-[1rem] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-relaxed text-white/82">
                    {availabilityError}
                  </div>
                ) : null}
              </div>

              <div className="grid gap-3.5 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">
                    Preferred check-in
                  </span>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => handleCheckInChange(e.target.value)}
                    className="rounded-[1.05rem] border border-white/10 bg-black/20 px-4 py-3 text-[0.95rem] text-white outline-none transition-colors focus:border-[#c9a46e]/50"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">
                    Preferred check-out
                  </span>
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={addDays(checkIn, 1)}
                    className="rounded-[1.05rem] border border-white/10 bg-black/20 px-4 py-3 text-[0.95rem] text-white outline-none transition-colors focus:border-[#c9a46e]/50"
                  />
                </label>
                <div className="grid gap-2">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">
                    Total guests
                  </span>
                  <div className="flex items-center rounded-[1.05rem] border border-white/10 bg-black/20 px-2 py-2">
                    <button
                      type="button"
                      onClick={decrementGuestCount}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-lg text-white transition-colors hover:border-[#c9a46e]/40 hover:text-[#f6ead8] disabled:cursor-not-allowed disabled:opacity-40"
                      disabled={guestCount === 1}
                      aria-label="Decrease guest count"
                    >
                      -
                    </button>
                    <div className="flex-1 text-center">
                      <p className="text-[1.05rem] font-semibold text-white">{guestCount}</p>
                      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-white/45">Guests</p>
                    </div>
                    <button
                      type="button"
                      onClick={incrementGuestCount}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-lg text-white transition-colors hover:border-[#c9a46e]/40 hover:text-[#f6ead8]"
                      aria-label="Increase guest count"
                    >
                      +
                    </button>
                  </div>
                </div>
                <label className="grid gap-2">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">
                    Stay option
                  </span>
                  <select
                    required
                    value={roomValue}
                    onChange={(e) => setRoomValue(e.target.value)}
                    className="rounded-[1.05rem] border border-white/10 bg-black/20 px-4 py-3 text-[0.95rem] text-white outline-none transition-colors focus:border-[#c9a46e]/50"
                  >
                    <option value="" disabled>
                      Select stay option
                    </option>
                    {activeRoomCatalog.map((room) => (
                      <option key={room.title} value={room.title} className="text-black">
                        {room.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 md:col-span-2">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">
                    Room plan
                  </span>
                  <select
                    required
                    value={packageValue}
                    onChange={(e) => setPackageValue(e.target.value)}
                    className="rounded-[1.05rem] border border-white/10 bg-black/20 px-4 py-3 text-[0.95rem] text-white outline-none transition-colors focus:border-[#c9a46e]/50"
                  >
                    <option value="" disabled>
                      Select room plan
                    </option>
                    {activePackageCatalog.map((pkg) => (
                      <option key={pkg.title} value={pkg.title} className="text-black">
                        {pkg.title}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center border border-[#c8a871] bg-[#c8a871] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black"
              >
                {availabilityLoading ? "Checking Availability..." : "Book Now"}
              </button>
            </form>
          </div>

          {/* ── RIGHT: SCROLLABLE CONTENT ────────────────────────────────── */}
          <div className="space-y-8">

            {/* Inquiry Snapshot */}
            <div className="rounded-[1.5rem] border border-[#c9a46e]/20 bg-[#1f342b] p-4 shadow-[0_18px_36px_rgba(8,16,11,0.16)] md:p-5">
              <div className="grid gap-4 xl:grid-cols-[18rem_minmax(0,1fr)] xl:items-start">
                <div className="relative overflow-hidden rounded-[1.15rem] border border-white/10 bg-[#182920] xl:sticky xl:top-28">
                  <div className="relative aspect-[4/3] min-h-[14rem] w-full md:min-h-[15rem]">
                  <Image
                    src={activeRoomCard?.image ?? "/images/DSC08717.avif"}
                    alt={activeRoomCard?.title ?? "Selected room"}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1280px) 100vw, 18rem"
                  />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">
                    Booking Snapshot
                  </p>
                  <h2 className="mt-2 text-[1.55rem] leading-tight text-[#f6ead8] md:text-[1.75rem]">
                    {activeRoomCard?.title ?? "Choose a stay option to view planning details"}
                  </h2>
                  <p className="mt-2 max-w-3xl text-[0.92rem] leading-relaxed text-white/85">
                    {activeRoomCard?.description ??
                      "Select a stay option and room plan to see tariff, rate direction, and the hotel comfort highlights for your stay."}
                  </p>

                  <div className="mt-4 rounded-[1.05rem] border border-white/10 bg-[#2d463b] px-4 py-3.5">
                    <div className="grid gap-x-6 gap-y-3 md:grid-cols-2">
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Room Tariff</p>
                        <p className="mt-1 text-[1rem] leading-snug text-white md:text-[1.1rem]">
                          {activeRoomCard?.tariff ?? "Select room"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Stay Highlights</p>
                        <p className="mt-1 text-[1rem] leading-snug text-white md:text-[1.1rem]">
                          {activeRoomCard?.packagePrice ?? "Select package"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Room Plan</p>
                        <p className="mt-1 text-[1rem] leading-snug text-white md:text-[1.1rem]">
                          {activePackageCard?.title ?? "Select package"}
                        </p>
                        <p className="mt-1 text-sm text-white/78">
                          {roomPlansLoading ? "Loading room plan..." : activePackageCard?.subtitle ?? "Plan on request"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Availability</p>
                        <p className="mt-1 text-sm text-white/86">
                          {availabilityLoading
                            ? "Checking current room stock"
                            : activeRoomCard?.packagePrice ?? "Will appear after availability check"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Guest Count</p>
                        <p className="mt-1 text-sm text-white/86">{guestCount}</p>
                      </div>
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Check-In</p>
                        <p className="mt-1 text-sm text-white/86">{checkIn || "Not selected yet"}</p>
                      </div>
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Check-Out</p>
                        <p className="mt-1 text-sm text-white/86">{checkOut || "Not selected yet"}</p>
                      </div>
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9a46e]">Hotel</p>
                        <p className="mt-1 text-sm text-white/86">{livePropertyName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stay Options */}
            <div>
              <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h3 className="text-2xl text-[#f4eee2] md:text-3xl">Stay Options For Guests</h3>
                  <p className="mt-1 text-sm uppercase tracking-[0.18em] text-[#c9a46e]">
                    {filteredRooms.length} {filteredRooms.length === 1 ? "stay option" : "stay options"} shown
                  </p>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/72 md:text-base">
                    These stay categories are designed to support business travel, family visits, transit bookings, and premium city stays.
                  </p>
                </div>
                <label className="block w-full md:max-w-xs">
                  <span className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">Filter stay options</span>
                  <input
                    type="text"
                    value={roomFilterQuery}
                    onChange={(e) => setRoomFilterQuery(e.target.value)}
                    placeholder="Search stay, tariff, guest type..."
                    className="w-full rounded-[1.05rem] border border-white/10 bg-[#20362c] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-[#c9a46e]/50"
                  />
                </label>
              </div>

              <div className="grid gap-6">
                {filteredRooms.map((room) => (
                  <article
                    key={room.title}
                    className={`grid overflow-hidden rounded-[1.8rem] border shadow-[0_18px_40px_rgba(8,16,11,0.14)] md:grid-cols-[22rem_1fr] ${
                      room.title === roomValue
                        ? "border-[#d7b17c]/55 bg-[#20362c]"
                        : "border-white/10 bg-[#182920]"
                    }`}
                  >
                    <div className="relative h-[16rem] md:h-full">
                      <Image
                        src={room.image}
                        alt={room.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 22rem"
                      />
                    </div>
                    <div className="p-6 md:p-7">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-[#c9a46e]">Stay Details</p>
                          <h4 className="mt-2 text-2xl leading-tight text-white md:text-[2rem]">
                            {room.title}
                          </h4>
                          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/82 md:text-base">
                            {room.description}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setRoomValue(room.title)}
                          className="shrink-0 rounded-full border border-[#c9a46e]/40 bg-[#2e453a] px-5 py-2 text-xs uppercase tracking-[0.18em] text-[#f6e2c0]"
                        >
                          Select Stay
                        </button>
                      </div>

                      <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <div className="rounded-[1.2rem] border border-white/10 bg-[#2d463b] px-4 py-4">
                          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#c9a46e]">Tariff</p>
                          <p className="mt-2 text-lg leading-snug text-white md:text-xl">{room.tariff}</p>
                        </div>
                        <div className="rounded-[1.2rem] border border-white/10 bg-[#2d463b] px-4 py-4">
                          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#c9a46e]">Stay + Meals</p>
                          <p className="mt-2 text-lg leading-snug text-white md:text-xl">{room.packagePrice}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
                {filteredRooms.length === 0 ? (
                  <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-[#182920] px-5 py-6 text-sm text-white/70">
                    No room options matched your filter.
                  </div>
                ) : null}
              </div>
            </div>

            {/* Package Options */}
            <div>
              <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h3 className="text-2xl text-[#f4eee2] md:text-3xl">Room Plan Options</h3>
                  <p className="mt-1 text-sm uppercase tracking-[0.18em] text-[#c9a46e]">
                    {filteredPackages.length} {filteredPackages.length === 1 ? "plan" : "plans"} shown
                  </p>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/72 md:text-base">
                    Compare the room-plan directions to understand how comfort level and room category can change across your stay choice.
                  </p>
                </div>
                <label className="block w-full md:max-w-xs">
                  <span className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">Filter plans</span>
                  <input
                    type="text"
                    value={packageFilterQuery}
                    onChange={(e) => setPackageFilterQuery(e.target.value)}
                    placeholder="Search plan, pricing, room type..."
                    className="w-full rounded-[1.05rem] border border-white/10 bg-[#20362c] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-[#c9a46e]/50"
                  />
                </label>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {filteredPackages.map((pkg) => {
                  return (
                    <article
                      key={pkg.title}
                      className={`overflow-hidden rounded-[1.8rem] border shadow-[0_18px_40px_rgba(8,16,11,0.14)] ${
                        pkg.title === packageValue
                          ? "border-[#d7b17c]/55 bg-[#20362c]"
                          : "border-white/10 bg-[#182920]"
                      }`}
                    >
                      <div className="relative h-[16rem]">
                        <Image
                          src={pkg.image}
                          alt={pkg.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="p-6">
                          <p className="text-xs uppercase tracking-[0.18em] text-[#c9a46e]">Plan Details</p>
                          <h4 className="mt-2 text-2xl leading-tight text-white md:text-[2rem]">{pkg.title}</h4>
                          <p className="mt-3 text-sm leading-relaxed text-white/82 md:text-base">
                            {pkg.description}
                          </p>

                          <div className="mt-5 space-y-3">
                            <div className="rounded-[1.1rem] border border-white/10 bg-[#2d463b] px-4 py-3">
                              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#c9a46e]">Plan Amount</p>
                              <p className="mt-1 text-base text-white md:text-lg">
                                {formatCurrency(pkg.amount)}
                              </p>
                            </div>
                            <div className="rounded-[1.1rem] border border-white/10 bg-[#2d463b] px-4 py-3">
                              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#c9a46e]">Occupancy</p>
                              <p className="mt-1 text-base text-white md:text-lg">
                                {pkg.minimumOccupancy}-{pkg.maximumOccupancy} guests
                              </p>
                            </div>
                          </div>

                          <p className="mt-4 text-sm leading-relaxed text-white/78">
                            {pkg.subtitle}
                          </p>

                        <button
                          type="button"
                          onClick={() => setPackageValue(pkg.title)}
                          className="mt-5 rounded-full border border-[#c9a46e]/40 bg-[#2e453a] px-5 py-2 text-xs uppercase tracking-[0.18em] text-[#f6e2c0]"
                        >
                          Select Plan
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
              {filteredPackages.length === 0 ? (
                <div className="mt-6 rounded-[1.5rem] border border-dashed border-white/15 bg-[#182920] px-5 py-6 text-sm text-white/70">
                  No room plans matched your filter.
                </div>
              ) : null}
            </div>

          </div>
          {/* ── END RIGHT COLUMN ─────────────────────────────────────────── */}

        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function BookingPageFallback() {
  return (
    <main className="relative bg-[#2d4a3e] text-white">
      <div className="noise-overlay" />
      <SiteHeader />
      <section className="mx-auto max-w-[96rem] px-6 pb-12 pt-44 md:px-12 md:pt-48">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">Stay Enquiry</p>
          <h1 className="mt-5 text-4xl md:text-6xl">Plan Your Hotel Stay</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl">
            Share your dates, guest count, stay preferences, and room direction. The hotel team will confirm
            availability and guide the next step toward your booking.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-[96rem] px-6 pb-20 md:px-12">
        <div className="glass-panel rounded-[2rem] p-7 text-white/75 md:p-10">Loading inquiry details...</div>
      </section>
      <SiteFooter />
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<BookingPageFallback />}>
      <BookingPageContent />
    </Suspense>
  );
}
