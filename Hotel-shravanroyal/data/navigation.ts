import { SECTION_IDS } from "@/lib/constants";
import type { NavItem } from "@/types";

export const navigationItems: NavItem[] = [
  { label: "Home", href: `/#${SECTION_IDS.home}`, matchPath: "/" },
  { label: "About", href: "/about", matchPath: "/about" },
  { label: "Rooms", href: "/rooms", matchPath: "/rooms" },
  { label: "Amenities", href: "/amenities", matchPath: "/amenities" },
  { label: "Gallery", href: "/gallery", matchPath: "/gallery" },
  { label: "Reviews", href: "/reviews", matchPath: "/reviews" },
  { label: "Location", href: "/location", matchPath: "/location" },
  { label: "Contact", href: "/contact", matchPath: "/contact" },
];
