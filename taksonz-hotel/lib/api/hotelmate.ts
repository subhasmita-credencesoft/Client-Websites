import type { Room, RoomCategory, RoomRatePlan, RoomFacility } from "@/data/rooms";

export const HOTELMATE_PROPERTY_ID = 3538;
export const HOTELMATE_API_URL = "https://api.thehotelmate.co/api/thm/checkAvailability/3538";

/** Raw room shape from TheHotelMate / BookOne API */
export interface ApiRoom {
  id: number;
  name: string;
  description: string;
  roomOnlyPrice: number;
  minimumOccupancy: number;
  maximumOccupancy: number;
  noOfRooms: number;
  imageList: { id: number | null; name: string; url: string; orderNumber?: number }[];
  roomFacilities: { id: number; name: string; description: string; imageUrl?: string; logoUrl?: string }[];
  ratesAndAvailabilityDtos?: {
    id: number;
    price: number;
    noOfAvailable: number;
    totalNoRooms: number;
    roomRatePlans?: {
      code: string;
      name: string;
      amount: number;
      currencyCode: string;
      extraChargePerPerson?: number;
      extraChargePerChild?: number;
      status?: string;
    }[];
  }[];
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const cleanDesc = (s?: string) =>
  s ? s.replace(/<[^>]*>/g, "").replace(/dÃ©cor/g, "décor").trim() : "";

const bedsMap: Record<string, string> = {
  "deluxe-room": "King Bed",
  "business-class": "King Bed & Dedicated Desk",
  "executive-suite": "King Bed & Living Area",
  "family-suite": "King Bed + Twin Beds",
  "twin-bed": "Twin Single Beds",
};

const taglinesMap: Record<string, string> = {
  "deluxe-room": "Comfort. Style. Elegance.",
  "business-class": "Tailored for the modern professional.",
  "executive-suite": "Space to work, rest and unwind.",
  "family-suite": "Generous comfort for the whole family.",
  "twin-bed": "Spacious comfort with twin beds.",
};

const sizesMap: Record<string, number> = {
  "deluxe-room": 28,
  "business-class": 34,
  "executive-suite": 48,
  "family-suite": 62,
  "twin-bed": 28,
};

/** Transform raw TheHotelMate API rooms into typed Room models with ALL rate plans */
export function transformApiRooms(rawRooms: ApiRoom[]): Room[] {
  return rawRooms.map((r) => {
    const name = r.name.trim();
    const slug = slugify(name);
    const isSuite = name.toLowerCase().includes("suite");
    const isPremium = name.toLowerCase().includes("business");
    const category: RoomCategory = isSuite ? "Suites" : isPremium ? "Premium Rooms" : "Deluxe Rooms";

    const dto = r.ratesAndAvailabilityDtos && r.ratesAndAvailabilityDtos[0];
    const availableRooms = dto ? dto.noOfAvailable : r.noOfRooms;
    const totalRooms = dto ? dto.totalNoRooms : r.noOfRooms;

    // Build complete rate plans list from API
    const ratePlans: RoomRatePlan[] = [];

    // 1. Add specific rate plans from the channel manager
    const apiPlans = dto?.roomRatePlans || [];
    apiPlans.forEach((rp) => {
      const isBreakfast = rp.name.toLowerCase().includes("breakfast");
      ratePlans.push({
        code: rp.code,
        name: rp.name,
        amount: rp.amount,
        currencyCode: rp.currencyCode || "INR",
        extraChargePerPerson: rp.extraChargePerPerson,
        extraChargePerChild: rp.extraChargePerChild,
        status: rp.status || "Open",
        isBreakfastIncluded: isBreakfast,
      });
    });

    // 2. Add standard room-only price if distinct
    const roomOnlyPrice = r.roomOnlyPrice || dto?.price || 2250;
    const hasRoomOnlyPlan = ratePlans.some(
      (p) => p.amount === roomOnlyPrice || p.name.toLowerCase().includes("room only")
    );
    if (!hasRoomOnlyPlan && roomOnlyPrice > 0) {
      ratePlans.push({
        code: "STD-EP",
        name: "Standard Room Only",
        amount: roomOnlyPrice,
        currencyCode: "INR",
        isBreakfastIncluded: false,
        status: "Open",
      });
    }

    // Sort rate plans by amount ascending so lowest price shows first
    ratePlans.sort((a, b) => a.amount - b.amount);

    // fromRate is the lowest available rate plan amount
    const fromRate = ratePlans[0]?.amount ?? roomOnlyPrice;

    // Detailed facilities with CDN icons
    const facilities: RoomFacility[] = (r.roomFacilities || []).map((f) => ({
      id: f.id,
      name: f.name.trim(),
      imageUrl: f.imageUrl ? encodeURI(decodeURI(f.imageUrl.trim())) : undefined,
    }));

    const amenities =
      facilities.length > 0
        ? facilities.map((f) => f.name)
        : ["Wifi", "Flat TV", "Room Service", "Geyser", "24 Hours Room Service", "Hand Sanitizer"];

    const images = (r.imageList || []).map((img, i) => ({
      src: encodeURI(decodeURI(img.url.trim())),
      alt: `${name} interior - photo ${i + 1}`,
    }));

    return {
      id: r.id,
      slug,
      name,
      category,
      tagline: taglinesMap[slug] || "Comfortable and contemporary stay.",
      description: cleanDesc(r.description),
      bed: bedsMap[slug] || "King Bed",
      maxGuests: r.maximumOccupancy || 4,
      minGuests: r.minimumOccupancy || 2,
      sizeSqm: sizesMap[slug] || 30,
      view: "City view",
      fromRate,
      roomOnlyPrice,
      availableRooms,
      totalRooms,
      ratePlans,
      facilities,
      amenities,
      inclusions: ["High-Speed Wi-Fi", "Daily Housekeeping", "24/7 Room Service Support"],
      rules: [
        "Check-in: 12:00 PM · Check-out: 11:00 AM",
        "Government-issued photo ID required for all adult guests at check-in",
        "Children and extra bed policies apply as per hotel guidelines",
      ],
      images: images.length > 0 ? images : [{ src: "/images/placeholder-room.jpg", alt: name }],
    };
  });
}

/** Pre-seeded real hotel rooms retrieved directly from TheHotelMate API with complete rate plans */
export const apiRooms: Room[] = [
  {
    id: 8629,
    slug: "deluxe-room",
    name: "Deluxe Room",
    category: "Deluxe Rooms",
    tagline: "Comfort. Style. Elegance.",
    description: "Comfortable room with air-conditioning, private bathroom, work desk, TV, and wardrobe, ensuring a pleasant stay.",
    bed: "King Bed",
    maxGuests: 4,
    minGuests: 2,
    sizeSqm: 28,
    view: "City view",
    fromRate: 1800,
    roomOnlyPrice: 2250,
    availableRooms: 30,
    totalRooms: 36,
    ratePlans: [
      {
        code: "GHC",
        name: "Economy Plan",
        amount: 1800,
        currencyCode: "INR",
        extraChargePerPerson: 600,
        extraChargePerChild: 0,
        status: "Open",
        isBreakfastIncluded: false,
      },
      {
        code: "STD-EP",
        name: "Standard Room Only",
        amount: 2250,
        currencyCode: "INR",
        extraChargePerPerson: 600,
        extraChargePerChild: 0,
        status: "Open",
        isBreakfastIncluded: false,
      },
    ],
    facilities: [
      { id: 1001, name: "Wifi", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103124170-wifi.png" },
      { id: 1010, name: "Flat TV", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103615009-flattv.png" },
      { id: 1005, name: "Room Service", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103311486-roomservice.png" },
      { id: 1019, name: "Geyser", imageUrl: "https://bookonelocal.in/cdn/2021-11-27-045429157-3260813.png" },
      { id: 1016, name: "24 Hours Room Service", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103817694-24hrsservice.png" },
      { id: 1008, name: "Hand Sanitizer", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103453725-handsanitizer.png" },
    ],
    amenities: ["Wifi", "Flat TV", "Room Service", "Geyser", "24 Hours Room Service", "Hand Sanitizer"],
    inclusions: ["High-Speed Wi-Fi", "Daily Housekeeping", "24/7 Room Service Support"],
    rules: [
      "Check-in: 12:00 PM · Check-out: 11:00 AM",
      "Government-issued photo ID required for all adult guests at check-in",
      "Children and extra bed policies apply as per hotel guidelines",
    ],
    images: [
      {
        src: "https://bookonelocal.in/cdn/2026-04-22-074327432-WhatsApp%20Image%202026-04-16%20at%2011.46.21%20(1).jpg",
        alt: "Deluxe Room interior - photo 1",
      },
      {
        src: "https://bookonelocal.in/cdn/2026-04-22-074331897-WhatsApp%20Image%202026-04-16%20at%2011.46.22%20(1).jpg",
        alt: "Deluxe Room interior - photo 2",
      },
      {
        src: "https://bookonelocal.in/cdn/2026-04-22-074335750-WhatsApp%20Image%202026-04-16%20at%2011.46.22.jpg",
        alt: "Deluxe Room interior - photo 3",
      },
      {
        src: "https://bookonelocal.in/cdn/2026-04-22-074340031-WhatsApp%20Image%202026-04-16%20at%2011.46.22%20(1).jpg",
        alt: "Deluxe Room interior - photo 4",
      },
    ],
  },
  {
    id: 8630,
    slug: "business-class",
    name: "Business Class",
    category: "Premium Rooms",
    tagline: "Tailored for the modern professional.",
    description: "Modern Business Class room designed for professionals, featuring high-speed WiFi, dedicated workspace, comfortable bedding, smart TV, and all essential amenities for a productive and relaxing stay.",
    bed: "King Bed & Dedicated Desk",
    maxGuests: 4,
    minGuests: 2,
    sizeSqm: 34,
    view: "City view",
    fromRate: 2720,
    roomOnlyPrice: 4000,
    availableRooms: 8,
    totalRooms: 13,
    ratePlans: [
      {
        code: "BC-1",
        name: "Room Only Plan (EP)",
        amount: 2720,
        currencyCode: "INR",
        extraChargePerPerson: 600,
        extraChargePerChild: 0,
        status: "Open",
        isBreakfastIncluded: false,
      },
      {
        code: "02",
        name: "Room With Breakfast",
        amount: 3300,
        currencyCode: "INR",
        extraChargePerPerson: 600,
        extraChargePerChild: 0,
        status: "Open",
        isBreakfastIncluded: true,
      },
      {
        code: "STD-EP",
        name: "Standard Rate",
        amount: 4000,
        currencyCode: "INR",
        extraChargePerPerson: 600,
        extraChargePerChild: 0,
        status: "Open",
        isBreakfastIncluded: false,
      },
    ],
    facilities: [
      { id: 1001, name: "Wifi", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103124170-wifi.png" },
      { id: 1010, name: "Flat TV", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103615009-flattv.png" },
      { id: 1005, name: "Room Service", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103311486-roomservice.png" },
      { id: 1019, name: "Geyser", imageUrl: "https://bookonelocal.in/cdn/2021-11-27-045429157-3260813.png" },
      { id: 1016, name: "24 Hours Room Service", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103817694-24hrsservice.png" },
      { id: 1008, name: "Hand Sanitizer", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103453725-handsanitizer.png" },
    ],
    amenities: ["Wifi", "Flat TV", "Room Service", "Geyser", "24 Hours Room Service", "Hand Sanitizer"],
    inclusions: ["High-Speed Wi-Fi", "Daily Housekeeping", "24/7 Room Service Support"],
    rules: [
      "Check-in: 12:00 PM · Check-out: 11:00 AM",
      "Government-issued photo ID required for all adult guests at check-in",
      "Children and extra bed policies apply as per hotel guidelines",
    ],
    images: [
      {
        src: "https://bookonelocal.in/cdn/2026-04-22-074447425-WhatsApp%20Image%202026-04-16%20at%2011.52.02.jpg",
        alt: "Business Class interior - photo 1",
      },
      {
        src: "https://bookonelocal.in/cdn/2026-04-22-074450255-WhatsApp%20Image%202026-04-16%20at%2011.52.03.jpg",
        alt: "Business Class interior - photo 2",
      },
    ],
  },
  {
    id: 8631,
    slug: "executive-suite",
    name: "Executive Suite",
    category: "Suites",
    tagline: "Space to work, rest and unwind.",
    description: "Spacious Executive Suite offering separate living area, premium furnishings, king-size bed, elegant interiors, enhanced amenities, and a luxurious environment ideal for both business and leisure travelers.",
    bed: "King Bed & Living Area",
    maxGuests: 4,
    minGuests: 2,
    sizeSqm: 48,
    view: "City view",
    fromRate: 2800,
    roomOnlyPrice: 4000,
    availableRooms: 1,
    totalRooms: 2,
    ratePlans: [
      {
        code: "02",
        name: "Room With Breakfast",
        amount: 2800,
        currencyCode: "INR",
        extraChargePerPerson: 600,
        extraChargePerChild: 0,
        status: "Open",
        isBreakfastIncluded: true,
      },
      {
        code: "STD-EP",
        name: "Standard Rate",
        amount: 4000,
        currencyCode: "INR",
        extraChargePerPerson: 600,
        extraChargePerChild: 0,
        status: "Open",
        isBreakfastIncluded: false,
      },
    ],
    facilities: [
      { id: 1001, name: "Wifi", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103124170-wifi.png" },
      { id: 1010, name: "Flat TV", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103615009-flattv.png" },
      { id: 1005, name: "Room Service", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103311486-roomservice.png" },
      { id: 1019, name: "Geyser", imageUrl: "https://bookonelocal.in/cdn/2021-11-27-045429157-3260813.png" },
      { id: 1016, name: "24 Hours Room Service", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103817694-24hrsservice.png" },
      { id: 1008, name: "Hand Sanitizer", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103453725-handsanitizer.png" },
    ],
    amenities: ["Wifi", "Flat TV", "Room Service", "Geyser", "24 Hours Room Service", "Hand Sanitizer"],
    inclusions: ["High-Speed Wi-Fi", "Daily Housekeeping", "24/7 Room Service Support"],
    rules: [
      "Check-in: 12:00 PM · Check-out: 11:00 AM",
      "Government-issued photo ID required for all adult guests at check-in",
      "Children and extra bed policies apply as per hotel guidelines",
    ],
    images: [
      {
        src: "https://bookonelocal.in/cdn/2026-04-22-074714314-WhatsApp%20Image%202026-04-16%20at%2011.52.46%20(3).jpg",
        alt: "Executive Suite interior - photo 1",
      },
      {
        src: "https://bookonelocal.in/cdn/2026-04-22-074717903-WhatsApp%20Image%202026-04-16%20at%2011.52.46%20(1).jpg",
        alt: "Executive Suite interior - photo 2",
      },
      {
        src: "https://bookonelocal.in/cdn/2026-04-22-074724092-WhatsApp%20Image%202026-04-16%20at%2011.52.46%20(2).jpg",
        alt: "Executive Suite interior - photo 3",
      },
      {
        src: "https://bookonelocal.in/cdn/2026-04-22-074728274-WhatsApp%20Image%202026-04-16%20at%2011.52.46.jpg",
        alt: "Executive Suite interior - photo 4",
      },
    ],
  },
  {
    id: 8632,
    slug: "family-suite",
    name: "Family Suite",
    category: "Suites",
    tagline: "Generous comfort for the whole family.",
    description: "Large Family Suite designed for comfort, offering multiple beds, spacious living area, modern amenities, and a welcoming ambiance, ideal for families seeking relaxation and convenience together.",
    bed: "King Bed + Twin Beds",
    maxGuests: 4,
    minGuests: 2,
    sizeSqm: 62,
    view: "City view",
    fromRate: 2600,
    roomOnlyPrice: 4000,
    availableRooms: 1,
    totalRooms: 1,
    ratePlans: [
      {
        code: "FS-1",
        name: "Room Only Plan (EP)",
        amount: 2600,
        currencyCode: "INR",
        extraChargePerPerson: 600,
        extraChargePerChild: 0,
        status: "Open",
        isBreakfastIncluded: false,
      },
      {
        code: "02",
        name: "Room With Breakfast",
        amount: 2600,
        currencyCode: "INR",
        extraChargePerPerson: 500,
        extraChargePerChild: 0,
        status: "Open",
        isBreakfastIncluded: true,
      },
      {
        code: "STD-EP",
        name: "Standard Rate",
        amount: 4000,
        currencyCode: "INR",
        extraChargePerPerson: 600,
        extraChargePerChild: 0,
        status: "Open",
        isBreakfastIncluded: false,
      },
    ],
    facilities: [
      { id: 1001, name: "Wifi", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103124170-wifi.png" },
      { id: 1010, name: "Flat TV", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103615009-flattv.png" },
      { id: 1005, name: "Room Service", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103311486-roomservice.png" },
      { id: 1019, name: "Geyser", imageUrl: "https://bookonelocal.in/cdn/2021-11-27-045429157-3260813.png" },
      { id: 1016, name: "24 Hours Room Service", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103817694-24hrsservice.png" },
      { id: 1008, name: "Hand Sanitizer", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103453725-handsanitizer.png" },
    ],
    amenities: ["Wifi", "Flat TV", "Room Service", "Geyser", "24 Hours Room Service", "Hand Sanitizer"],
    inclusions: ["High-Speed Wi-Fi", "Daily Housekeeping", "24/7 Room Service Support"],
    rules: [
      "Check-in: 12:00 PM · Check-out: 11:00 AM",
      "Government-issued photo ID required for all adult guests at check-in",
      "Children and extra bed policies apply as per hotel guidelines",
    ],
    images: [
      {
        src: "https://bookonelocal.in/cdn/2026-04-22-102642520-WhatsApp%20Image%202026-04-22%20at%2013.51.18%20(3).jpg",
        alt: "Family Suite interior - photo 1",
      },
      {
        src: "https://bookonelocal.in/cdn/2026-04-22-102647018-WhatsApp%20Image%202026-04-22%20at%2013.51.18%20(2).jpg",
        alt: "Family Suite interior - photo 2",
      },
      {
        src: "https://bookonelocal.in/cdn/2026-04-22-102651319-WhatsApp%20Image%202026-04-22%20at%2013.51.18%20(1).jpg",
        alt: "Family Suite interior - photo 3",
      },
      {
        src: "https://bookonelocal.in/cdn/2026-04-22-102654566-WhatsApp%20Image%202026-04-22%20at%2013.51.18.jpg",
        alt: "Family Suite interior - photo 4",
      },
      {
        src: "https://bookonelocal.in/cdn/2026-04-22-102657634-WhatsApp%20Image%202026-04-22%20at%2013.51.17.jpg",
        alt: "Family Suite interior - photo 5",
      },
    ],
  },
  {
    id: 8633,
    slug: "twin-bed",
    name: "Twin Bed",
    category: "Deluxe Rooms",
    tagline: "Spacious comfort with twin beds.",
    description: "Comfortable Twin Bed room featuring two single beds, modern décor, ample space, work desk, high-speed WiFi, and essential amenities, perfect for friends, colleagues, or shared stays.",
    bed: "Twin Single Beds",
    maxGuests: 4,
    minGuests: 2,
    sizeSqm: 28,
    view: "City view",
    fromRate: 2000,
    roomOnlyPrice: 4000,
    availableRooms: 3,
    totalRooms: 4,
    ratePlans: [
      {
        code: "TB-01",
        name: "Room Only Plan (EP)",
        amount: 2000,
        currencyCode: "INR",
        extraChargePerPerson: 600,
        extraChargePerChild: 0,
        status: "Open",
        isBreakfastIncluded: false,
      },
      {
        code: "02",
        name: "Room With Breakfast",
        amount: 2300,
        currencyCode: "INR",
        extraChargePerPerson: 600,
        extraChargePerChild: 0,
        status: "Open",
        isBreakfastIncluded: true,
      },
      {
        code: "STD-EP",
        name: "Standard Rate",
        amount: 4000,
        currencyCode: "INR",
        extraChargePerPerson: 600,
        extraChargePerChild: 0,
        status: "Open",
        isBreakfastIncluded: false,
      },
    ],
    facilities: [
      { id: 1001, name: "Wifi", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103124170-wifi.png" },
      { id: 1010, name: "Flat TV", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103615009-flattv.png" },
      { id: 1005, name: "Room Service", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103311486-roomservice.png" },
      { id: 1019, name: "Geyser", imageUrl: "https://bookonelocal.in/cdn/2021-11-27-045429157-3260813.png" },
      { id: 1016, name: "24 Hours Room Service", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103817694-24hrsservice.png" },
      { id: 1008, name: "Hand Sanitizer", imageUrl: "https://bookonelocal.in/cdn/2021-06-22-103453725-handsanitizer.png" },
    ],
    amenities: ["Wifi", "Flat TV", "Room Service", "Geyser", "24 Hours Room Service", "Hand Sanitizer"],
    inclusions: ["High-Speed Wi-Fi", "Daily Housekeeping", "24/7 Room Service Support"],
    rules: [
      "Check-in: 12:00 PM · Check-out: 11:00 AM",
      "Government-issued photo ID required for all adult guests at check-in",
      "Children and extra bed policies apply as per hotel guidelines",
    ],
    images: [
      {
        src: "https://bookonelocal.in/cdn/2026-04-22-074905099-WhatsApp%20Image%202026-04-16%20at%2011.50.48%20(1).jpg",
        alt: "Twin Bed interior - photo 1",
      },
      {
        src: "https://bookonelocal.in/cdn/2026-04-22-074909457-WhatsApp%20Image%202026-04-16%20at%2011.50.48.jpg",
        alt: "Twin Bed interior - photo 2",
      },
      {
        src: "https://bookonelocal.in/cdn/2026-04-22-074916645-WhatsApp%20Image%202026-04-16%20at%2011.50.48%20(2).jpg",
        alt: "Twin Bed interior - photo 3",
      },
    ],
  },
];

/**
 * Live API fetcher to retrieve real-time availability and rates from TheHotelMate.
 */
export async function fetchLiveRooms(
  fromDate?: string,
  toDate?: string,
  noOfRooms = 1,
  noOfPersons = 1
): Promise<Room[]> {
  try {
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    const from = fromDate || today;
    const to = toDate || tomorrow;

    const url = `${HOTELMATE_API_URL}?fromDate=${from}&toDate=${to}&noOfRooms=${noOfRooms}&noOfPersons=${noOfPersons}`;
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      throw new Error(`TheHotelMate API returned HTTP ${res.status}`);
    }

    const data = await res.json();
    if (data?.roomList && Array.isArray(data.roomList) && data.roomList.length > 0) {
      return transformApiRooms(data.roomList);
    }
    return apiRooms;
  } catch (error) {
    console.warn("Could not retrieve live rooms from TheHotelMate API, falling back to cached API data", error);
    return apiRooms;
  }
}
