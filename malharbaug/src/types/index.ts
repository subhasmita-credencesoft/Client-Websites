export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Room {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  price: string;
  capacity: string;
  image: string;
  amenities: string[];
  images: string[];
}

export interface Amenity {
  slug: string;
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseItem {
  icon: string;
  title: string;
  description: string;
}

export interface DiningItem {
  title: string;
  description: string;
  image: string;
}

export interface MenuCategory {
  title: string;
  items: string[];
}

export interface EventCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
}

export interface GalleryCategory {
  id: string;
  title: string;
  images: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface NearbyAttraction {
  id: string;
  name: string;
  distance: string;
  description: string;
  image: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Package {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  price: string;
  duration: string;
  includes: string[];
  image: string;
}

export interface Offer {
  id: string;
  title: string;
  slug: string;
  description: string;
  validity: string;
  code?: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
}

export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  tags: string[];
  sections: GuideSection[];
}

export interface TravelGuide {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  sections: GuideSection[];
}
