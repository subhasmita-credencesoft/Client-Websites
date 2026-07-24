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

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  category: string;
  categorySlug: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  featuredImage: string;
  featuredImageAlt: string;
  featuredImageWidth: number;
  featuredImageHeight: number;
  excerpt: string;
  toc: Array<{ id: string; label: string; children?: Array<{ id: string; label: string }> }>;
  content: string;
  faqs: BlogFAQ[];
  relatedSlugs: string[];
  internalLinks: Array<{ label: string; href: string; anchor?: string }>;
}
