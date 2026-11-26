// Domain Type Definitions for Tarangan Resort Architecture

export interface AmenityItem {
  icon: string;
  label: string;
}

export interface Room {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Cottage' | 'Deluxe' | 'Suite' | 'Family';
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  sizeSqFt: number;
  maxGuests: number;
  maxAdults: number;
  maxChildren: number;
  bedType: string;
  view: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  features: string[];
  amenities: AmenityItem[];
  isFeatured?: boolean;
  inventoryCount: number;
}

export interface BookingPlace {
  id: string;
  name: string;
  category: 'cottage' | 'beach' | 'attraction' | 'transit';
  categoryLabel: string;
  tag: string;
  distanceOrPrice: string;
  icon: 'cottage' | 'pool' | 'garden' | 'beach' | 'fort' | 'ferry' | 'resort';
  roomId?: string;
}

export interface BookingAddons {
  dinnerThali: boolean;
  eveningBonfire: boolean;
  earlyCheckIn: boolean;
  petCare: boolean;
}

export interface GuestDetails {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  specialRequests?: string;
}

export interface BookingReservation {
  referenceId: string;
  roomId: string;
  roomTitle: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  adults: number;
  children: number;
  addons: BookingAddons;
  pricing: {
    baseRate: number;
    roomTotal: number;
    extraGuestsTotal: number;
    addonsTotal: number;
    subTotal: number;
    gstAmount: number;
    grandTotal: number;
  };
  guest: GuestDetails;
  createdAt: string;
  status: 'PENDING_CONFIRMATION' | 'CONFIRMED' | 'CANCELLED';
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  content: string;
  avatar: string;
  stayType: string;
  platform: 'Google' | 'Tripadvisor' | 'MakeMyTrip';
}

export interface DiningItem {
  id: string;
  name: string;
  marathiName?: string;
  description: string;
  category: 'Seafood' | 'Konkani' | 'Vegetarian' | 'Breakfast' | 'Beverages';
  price: number;
  isSpecialty?: boolean;
  image: string;
  spiceLevel: 'Mild' | 'Medium' | 'Spicy';
  tags: string[];
}

export interface FacilityItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  image: string;
  timing: string;
  features: string[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Water Sports' | 'Beaches' | 'Heritage' | 'Nature' | 'Food Trail';
  distance: string;
  timeFromResort: string;
  description: string;
  image: string;
  highlights: string[];
  bestTime: string;
}

export interface FAQItem {
  id: string;
  category: 'General' | 'Booking & Policies' | 'Rooms & Stay' | 'Dining' | 'Pool & Activities';
  question: string;
  answer: string;
}
