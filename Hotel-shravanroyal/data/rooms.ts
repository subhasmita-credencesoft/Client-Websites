import type { Room } from "@/types";

export const rooms: Room[] = [
  {
    id: "deluxe-room",
    name: "Deluxe Room",
    description:
      "A warm and well-appointed room designed for travelers who want a balanced blend of comfort, simplicity, and polished detail.",
    occupancy: "Up to 2 guests",
    features: ["Plush bedding", "Air-conditioned comfort", "Work-friendly corner"],
    image: "/images/WhatsApp Image 2026-03-10 at 14.59.13 (1).jpeg",
    alt: "Deluxe room interior at Hotel Shravan Royal Inn",
    ctaLabel: "Enquire Now",
  },
  {
    id: "executive-room",
    name: "Executive Room",
    description:
      "A refined stay option suited to professionals and couples looking for a more elevated room atmosphere with practical convenience.",
    occupancy: "Up to 2 guests",
    features: ["Elegant furnishing", "Comfort seating", "Ideal for business travel"],
    image: "/images/WhatsApp Image 2026-03-10 at 14.59.16 (1).jpeg",
    imagePosition: "center 82%",
    alt: "Executive room with elegant seating area",
    ctaLabel: "Explore Stay",
  },
  {
    id: "family-suite",
    name: "Family Suite",
    description:
      "A more spacious accommodation choice created for guests traveling together and seeking ease, comfort, and flexible room utility.",
    occupancy: "Up to 4 guests",
    features: ["Spacious layout", "Family-friendly comfort", "Relaxed stay setup"],
    image: "/images/WhatsApp Image 2026-03-10 at 14.59.15 (1).jpeg",
    alt: "Family suite styled for a comfortable group stay",
    ctaLabel: "Plan Your Stay",
  },
];