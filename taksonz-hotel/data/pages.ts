import { img, type ImageKey } from "./images";
import { site } from "./site";

export interface PageMeta {
  path: string;
  /** <title> and breadcrumb label */
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle?: string;
  heroImage: ImageKey;
}

const city = site.address.city;

export const pages = {
  rooms: {
    path: "/rooms",
    title: "Rooms & Suites",
    description: `Deluxe rooms, premium rooms and suites at ${site.name}, ${city}. Compare room types and book your stay.`,
    heroTitle: "Rooms & Suites",
    heroSubtitle: "Where comfort meets elegance.",
    heroImage: "hero-rooms",
  },
  dining: {
    path: "/dining",
    title: "Dining & Bar",
    description: `Local and international cuisine at The Taksonz Restaurant, ${city}. Restaurant, bar and room service.`,
    heroTitle: "Dining & Bar",
    heroSubtitle: "A culinary journey awaits.",
    heroImage: "hero-dining",
  },
  banquets: {
    path: "/banquets",
    title: "Banquets & Meetings",
    description: `Banquet halls and meeting spaces for weddings, celebrations and corporate events at ${site.name}, ${city}.`,
    heroTitle: "Banquets & Meetings",
    heroSubtitle: "Celebrate. Connect. Create.",
    heroImage: "hero-banquets",
  },
  meetings: {
    path: "/meetings",
    title: "Meetings & Corporate Events",
    description: `Meeting rooms and event spaces for corporate gatherings at ${site.name}, ${city}.`,
    heroTitle: "Meetings & Corporate Events",
    heroSubtitle: "Space to focus, present and decide.",
    heroImage: "hero-meetings",
  },
  about: {
    path: "/about",
    title: "About the Hotel",
    description: `${site.name} is a premium hotel in ${city}, offering modern amenities and a warm, welcoming atmosphere.`,
    heroTitle: "About Us",
    heroSubtitle: "Hospitality with heart.",
    heroImage: "hero-about",
  },
  gallery: {
    path: "/gallery",
    title: "Gallery",
    description: `Rooms, dining, banquet halls and exterior views of ${site.name}, ${city}.`,
    heroTitle: "Gallery",
    heroSubtitle: "Moments that stay with you.",
    heroImage: "hero-gallery",
  },
  location: {
    path: "/location",
    title: "Location & Directions",
    description: `Find ${site.name} on ${site.address.street}, ${city}. Address, map and contact details.`,
    heroTitle: "Location & Directions",
    heroSubtitle: "We're here to help.",
    heroImage: "hero-location",
  },
  contact: {
    path: "/contact",
    title: "Contact",
    description: `Contact ${site.name} in ${city} — phone, email, address and an enquiry form.`,
    heroTitle: "Contact",
    heroSubtitle: "We're here to help.",
    heroImage: "hero-location",
  },
  faq: {
    path: "/faq",
    title: "Frequently Asked Questions",
    description: `Answers about booking, rooms, dining and events at ${site.name}, ${city}.`,
    heroTitle: "Questions, answered.",
    heroSubtitle: "Everything you may want to know before you stay.",
    heroImage: "hero-about",
  },
  privacy: {
    path: "/privacy-policy",
    title: "Privacy Policy",
    description: `How ${site.name} handles personal information submitted through this website.`,
    heroTitle: "Privacy Policy",
    heroImage: "hero-about",
  },
  terms: {
    path: "/terms-and-conditions",
    title: "Terms & Conditions",
    description: `Terms for using the ${site.name} website and making enquiries or booking requests.`,
    heroTitle: "Terms & Conditions",
    heroImage: "hero-about",
  },
  cancellation: {
    path: "/cancellation-policy",
    title: "Cancellation & Refund Policy",
    description: `Cancellation and refund terms for stays and events at ${site.name}.`,
    heroTitle: "Cancellation & Refund Policy",
    heroImage: "hero-about",
  },
} satisfies Record<string, PageMeta>;

export const heroUrl = (p: PageMeta) => img(p.heroImage);
