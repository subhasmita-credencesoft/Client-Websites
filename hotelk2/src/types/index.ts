export interface NavLink {
  label: string;
  href: string;
}

export interface ContactDetail {
  label: string;
  value: string;
  href?: string;
}

export interface HeaderContact {
  icon: string;
  label: string;
  value: string;
  href?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface RoomAmenity {
  icon?: string;
  label: string;
}

export interface Room {
  slug: string;
  name: string;
  summary: string;
  description: string;
  occupancy: string;
  image: string;
  gallery: string[];
  amenities: RoomAmenity[];
  bookingUrl: string;
  hasDetailPage: boolean;
  /** API room ID (from thehotelmate.co) */
  apiRoomId?: number;
  /** Room price in INR */
  price?: number;
  /** Currency code */
  currency?: string;
  /** Number of available rooms */
  availableRooms?: number;
  /** Rate plan code for booking */
  ratePlanCode?: string;
}

export interface Service {
  icon: string;
  label: string;
  invert?: boolean;
}

export interface Testimonial {
  author: string;
  rating: number; // 1-5
  quote: string;
  avatar?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export type NearbyCategory = 'transport' | 'landmark' | 'nature' | 'market';

export interface NearbyPlace {
  name: string;
  distance: string;
  category: NearbyCategory;
  image: string;
  featured?: boolean;
  description?: string;
}

export type FieldStatus = 'default' | 'error' | 'success';
