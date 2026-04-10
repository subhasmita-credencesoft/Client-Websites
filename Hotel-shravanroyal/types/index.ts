export interface NavItem {
  label: string;
  href: string;
  matchPath?: string;
}

export interface HotelInfo {
  name: string;
  shortName: string;
  description: string;
  heroHeadline: string;
  heroSubheadline: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  directionsUrl: string;
  bookingUrl: string;
  websiteUrl: string;
  contactEmail: string;
  contactPhone: string;
  about: string[];
  highlights: string[];
  trustBadges: string[];
  seoKeywords: string[];
}

export interface Room {
  id: string;
  name: string;
  description: string;
  occupancy: string;
  features: string[];
  image: string;
  imagePosition?: string;
  alt: string;
  ctaLabel: string;
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  image: string;
  alt: string;
}

export interface ContactFormValues {
  name: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  message: string;
}
