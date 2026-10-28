import { img } from "./images";

export type GalleryCategory = "Rooms" | "Dining" | "Banquets" | "Hotel & Lobby";

export interface GalleryImage {
  src: string;
  alt: string;
  category: GalleryCategory;
}

export const galleryImages: GalleryImage[] = [
  { src: img("dining-restaurant"), alt: "The Taksonz Restaurant & Dining Hall", category: "Dining" },
  { src: img("about-lobby"), alt: "Hotel Lobby & 24-Hour Reception Desk", category: "Hotel & Lobby" },
  { src: img("banquet-board"), alt: "Corporate Training & Conference Hall at The Taksonz", category: "Banquets" },
  { src: img("property-exterior"), alt: "Hotel The Taksonz Building & Exterior Facade", category: "Hotel & Lobby" },
  { src: img("banquet-grand"), alt: "Grand Celebration & Banquet Hall", category: "Banquets" },
  { src: img("dining-bar"), alt: "Dining & Drinks at The Taksonz", category: "Dining" },
  {
    src: "https://bookonelocal.in/cdn/Taksonz+website+video+2.mp4",
    alt: "Taksonz Hotel Background Video",
    category: "Hotel & Lobby",
  },
];

export const galleryCategories: ("All" | GalleryCategory)[] = ["All", "Rooms", "Dining", "Banquets", "Hotel & Lobby"];
