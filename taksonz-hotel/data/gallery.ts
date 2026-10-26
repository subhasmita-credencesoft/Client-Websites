import { img } from "./images";

export type GalleryCategory = "Rooms" | "Dining" | "Banquets" | "Exterior";

export interface GalleryImage {
  src: string;
  alt: string;
  category: GalleryCategory;
}

export const galleryImages: GalleryImage[] = [
  { src: img("room-deluxe-1"), alt: "Bedroom with white linen and throw pillows", category: "Rooms" },
  { src: img("dining-restaurant"), alt: "Restaurant dining room with warm lighting", category: "Dining" },
  { src: img("room-executive-1"), alt: "Suite with seating area and desk", category: "Rooms" },
  { src: img("banquet-royal"), alt: "Event hall set with round tables", category: "Banquets" },
  { src: img("property-exterior"), alt: "Grand hotel entrance illuminated at night", category: "Exterior" },
  { src: img("banquet-grand"), alt: "Ballroom prepared for a formal event", category: "Banquets" },
  { src: img("dining-bar"), alt: "Dimly lit bar with bottles and glasses", category: "Dining" },
  { src: img("room-premium-2"), alt: "Bedroom with tufted headboard", category: "Rooms" },
  { src: img("about-lobby"), alt: "Hotel lobby reception desk", category: "Exterior" },
];

export const galleryCategories: ("All" | GalleryCategory)[] = ["All", "Rooms", "Dining", "Banquets", "Exterior"];
