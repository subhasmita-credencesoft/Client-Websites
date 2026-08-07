export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  span?: 'main' | 'default';
}

export interface PolicyItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  tripName: string;
}

export interface NavChildLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavChildLink[];
}

export interface BookingSearchState {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface RoomCategory {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  overview: string;
  idealFor: string;
  beds: string;
  size: string;
  capacity: string;
  price: number;
  priceUnit: string;
  amenities: string[];
  perks: string[];
  image: string;
  gallery: GalleryImage[];
  ctaLabel: string;
  ctaHref: string;
}

export type VenueType = 'Indoor Banquet' | 'Outdoor Lawn' | 'Conference Room';

export interface Venue {
  id: string;
  slug: string;
  name: string;
  venueType: VenueType;
  area: string;
  ceilingHeight?: string;
  seatedCapacity: number;
  floatingCapacity: number;
  idealFor: string;
  description: string;
  features: string[];
  layouts: { name: string; value: string }[];
  image: string;
}

export interface Distance {
  destination: string;
  distance: string;
  drivingTime: string;
}

export type GalleryCategory = 'Rooms' | 'Weddings' | 'Corporate' | 'Dining' | 'Lawns';

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
}

export interface DiningHighlight {
  title: string;
  description: string;
}

export interface CateringOption {
  title: string;
  description: string;
}

export interface Facility {
  icon: string;
  title: string;
  description: string;
  image: string;
}

export interface Attraction {
  name: string;
  distance: string;
  drivingTime: string;
  description: string;
}

export interface Landmark {
  name: string;
  distance: string;
  drivingTime: string;
}

export interface LandmarkCluster {
  id: string;
  icon: string;
  title: string;
  description: string;
  landmarks: Landmark[];
}

export type OfferCategory = 'Wedding & Events' | 'Seasonal Stay';

export interface Offer {
  id: string;
  title: string;
  category: OfferCategory;
  tagline: string;
  description: string;
  includes: string[];
  price?: string;
  ctaLabel: string;
  ctaHref: string;
}
