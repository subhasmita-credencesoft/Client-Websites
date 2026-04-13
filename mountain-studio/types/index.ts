import type { LucideIcon } from "lucide-react";

export interface Room {
  slug: string;
  name: string;
  type: "Budget Room" | "Standard Room" | "Superior Room" | "Pool Access Room" | "Pool View Room";
  size: number;
  beds: string;
  price: number;
  rating: number;
  guests: number;
  view: string;
  floor: string;
  code: string;
  badges: string[];
  description: string;
  highlights: string[];
  includes: string[];
  images: string[];
  amenities: string[];
}

export interface Amenity {
  slug: string;
  icon: LucideIcon;
  title: string;
  description: string;
  hours: string;
  image: string;
}

export interface Testimonial {
  name: string;
  country: string;
  rating: number;
  quote: string;
  avatar: string;
  flag: string;
}

export interface Offer {
  title: string;
  image: string;
  validUntil: string;
  price: string;
  badge: string;
  category: "Romantic" | "Family" | "Business" | "Seasonal";
  description: string;
}

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  course: "Starter" | "Main" | "Dessert" | "Signature";
}

export interface Restaurant {
  name: string;
  cuisine: string;
  hours: string;
  description: string;
  image: string;
  gallery: string[];
  menuItems: MenuItem[];
}

export interface Treatment {
  name: string;
  duration: string;
  price: string;
  description: string;
  image: string;
}

export interface EventPackage {
  name: string;
  description: string;
  price: string;
  features: string[];
}

export interface EventType {
  name: string;
  description: string;
  image: string;
  capacity: string;
  packages: EventPackage[];
}

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Activity {
  title: string;
  duration: string;
  image: string;
  description: string;
}

export interface PicnicPackage {
  title: string;
  subtitle: string;
  image: string;
  inclusions: string[];
}

export interface CorporateHighlight {
  title: string;
  description: string;
  stat: string;
}
