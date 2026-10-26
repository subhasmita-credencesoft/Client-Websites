import { apiRooms } from "@/lib/api/hotelmate";

export type RoomCategory = "Deluxe Rooms" | "Premium Rooms" | "Suites";

export interface RoomRatePlan {
  code: string;
  name: string;
  amount: number;
  currencyCode: string;
  extraChargePerPerson?: number;
  extraChargePerChild?: number;
  status?: string;
  isBreakfastIncluded?: boolean;
}

export interface RoomFacility {
  id: number;
  name: string;
  imageUrl?: string;
}

export interface Room {
  id?: number;
  slug: string;
  name: string;
  category: RoomCategory;
  tagline: string;
  description: string;
  bed: string;
  maxGuests: number;
  minGuests?: number;
  sizeSqm: number;
  view: string;
  /** Lowest starting nightly rate in INR from any plan */
  fromRate: number;
  /** Standard room-only nightly rate */
  roomOnlyPrice: number;
  /** Live available rooms count from the API */
  availableRooms?: number;
  /** Total room count */
  totalRooms?: number;
  /** All available rate plans for this room (e.g., Room Only, Breakfast, Economy) */
  ratePlans: RoomRatePlan[];
  /** Detailed facilities with CDN icons */
  facilities?: RoomFacility[];
  amenities: string[];
  inclusions: string[];
  rules: string[];
  images: { src: string; alt: string }[];
}

/**
 * All room data sourced from TheHotelMate / BookOne Live Availability API.
 * Endpoint: https://api.thehotelmate.co/api/thm/checkAvailability/3538
 */
export const rooms: Room[] = apiRooms;

export const roomCategories: ("All Rooms" | RoomCategory)[] = [
  "All Rooms",
  "Deluxe Rooms",
  "Premium Rooms",
  "Suites",
];

export const getRoom = (slug: string) => rooms.find((r) => r.slug === slug);
export const getRelatedRooms = (slug: string, count = 2) =>
  rooms.filter((r) => r.slug !== slug).slice(0, count);

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
