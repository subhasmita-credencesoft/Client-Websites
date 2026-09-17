export type AmenityIconKey =
  | "wifi"
  | "wind"
  | "coffee"
  | "car"
  | "utensils"
  | "droplets"
  | "monitor"
  | "star";

export type PropertyDetails = {
  slug: string;
  title: string;
  location: string;
  ratingLabel: string;
  typeBadge: string;
  description: string;
  tags?: string[];
  images: string[];
  amenities: Array<{ icon: AmenityIconKey; label: string }>;
  rooms: Array<{
    id: number;
    name: string;
    size: string;
    bed: string;
    view: string;
    price: number;
    image: string;
    features: string[];
    available?: string;
    description?: string;
    planNote?: string;
  }>;
  packages: Array<{
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
  }>;
  appPromo: {
    badge: string;
    title: string;
    description: string;
    image: string;
  };
  reviews: Array<{
    id: number;
    user: string;
    rating: number;
    date: string;
    comment: string;
  }>;
  propertyDetailsSection?: {
    title: string;
    lines: string[];
    activities?: string[];
    address?: string;
  };
  oneDayTripSection?: {
    title: string;
    time: string;
    includes: string[];
    notes?: string[];
  };
  policiesSection?: {
    title: string;
    accommodation: string[];
    cancellation: string[];
    dayOuting: string[];
    extra?: string[];
  };
  booking: {
    basePrice: number;
    availability: string;
    checkIn: string;
    checkOut: string;
    guests: string[];
    availabilityApiUrl?: string;
    externalBookingUrl?: string;
    couponHint: string;
    couponDiscount: number;
    secureLabel: string;
  };
};