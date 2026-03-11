import type { Room } from "../types/room";

const rooms: Room[] = [
  {
    id: "room-1",
    name: "Coastal Deluxe Suite",
    slug: "coastal-deluxe-suite",
    category: "Suite",
    summary: "Soft linens, balcony seating, and spa-inspired amenities.",
    description:
      "A light-filled suite with calming tones, a private balcony, and a marble bath designed for slow mornings.",
    pricePerNight: 320,
    capacity: 2,
    size: "42 sqm",
    bedType: "King Bed",
    amenities: ["Ocean view", "Balcony", "Rain shower", "Workspace"],
    image: "/images/room_1.jpg",
  },
  {
    id: "room-2",
    name: "Garden Loft",
    slug: "garden-loft",
    category: "Deluxe",
    summary: "High ceilings and garden views with curated artisan touches.",
    description:
      "An airy loft with floor-to-ceiling windows, handcrafted decor, and a lounge nook for reading.",
    pricePerNight: 260,
    capacity: 2,
    size: "38 sqm",
    bedType: "Queen Bed",
    amenities: ["Garden view", "Coffee station", "Soaking tub"],
    image: "/images/room_2.jpg",
  },
  {
    id: "room-3",
    name: "Family Residence",
    slug: "family-residence",
    category: "Residence",
    summary: "Two-bedroom retreat with spacious living and dining.",
    description:
      "A refined residence tailored for families with separate lounge, dining area, and dual bathrooms.",
    pricePerNight: 420,
    capacity: 4,
    size: "65 sqm",
    bedType: "King + Twin",
    amenities: ["Kitchenette", "Dining area", "Private terrace"],
    image: "/images/room_3.jpg",
  },
  {
    id: "room-4",
    name: "Palm Courtyard",
    slug: "palm-courtyard",
    category: "Suite",
    summary: "Private courtyard access and serene outdoor seating.",
    description:
      "Perfect for quiet stays, featuring direct courtyard access, artisan textiles, and curated minibar.",
    pricePerNight: 290,
    capacity: 2,
    size: "40 sqm",
    bedType: "King Bed",
    amenities: ["Courtyard", "Outdoor seating", "Minibar"],
    image: "/images/room_4.jpg",
  },
];

export default rooms;
