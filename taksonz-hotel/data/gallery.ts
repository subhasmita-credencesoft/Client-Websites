import { img } from "./images";

export type GalleryCategory = "Rooms" | "Dining" | "Banquets" | "Exterior";

export interface GalleryImage {
  src: string;
  alt: string;
  category: GalleryCategory;
}

export const galleryImages: GalleryImage[] = [
  { src: img("room-deluxe-1"), alt: "Hotel The Taksonz Deluxe Room", category: "Rooms" },
  { src: img("dining-restaurant"), alt: "The Taksonz Restaurant & Dining Hall", category: "Dining" },
  { src: img("room-executive-1"), alt: "Hotel The Taksonz Executive Suite", category: "Rooms" },
  { src: img("banquet-royal"), alt: "Conference & Banquet Hall at The Taksonz", category: "Banquets" },
  { src: img("property-exterior"), alt: "Hotel The Taksonz Building & Exterior Facade", category: "Exterior" },
  { src: img("banquet-grand"), alt: "Grand Celebration & Banquet Hall", category: "Banquets" },
  { src: img("dining-bar"), alt: "Dining & Drinks at The Taksonz", category: "Dining" },
  { src: img("room-premium-2"), alt: "Hotel The Taksonz Premium Room", category: "Rooms" },
  { src: img("about-lobby"), alt: "Hotel Reception & Guest Welcome Desk", category: "Exterior" },
];

export const galleryCategories: ("All" | GalleryCategory)[] = ["All", "Rooms", "Dining", "Banquets", "Exterior"];
