import { MapPin } from "lucide-react";
import { contactSectionData } from "@/data/footer";
import { siteImages } from "@/lib/site-images";

export const pageContent = {
  properties: {
    eyebrow: "Our Properties",
    title: "Find Your Perfect Stay",
    description:
      "Explore our curated collection of villas, resorts, cottages, and boutique stays across the most loved destinations.",
  },
  restaurant: {
    eyebrow: "Restaurant",
    title: "Dine In Style At Our Signature Restaurant",
    description:
      "Enjoy elegant interiors, curated menus, and a warm dining experience crafted for family meals, romantic evenings, and special celebrations.",
    image: siteImages.modernHotelRestaurant,
    highlights: [
      {
        title: "Multi-Cuisine Dining",
        description: "Freshly prepared Indian, coastal, and global favourites served all day.",
      },
      {
        title: "Ambient Evenings",
        description: "A refined indoor setting ideal for dinner dates, family dining, and group gatherings.",
      },
      {
        title: "Curated Experiences",
        description: "Chef specials, festive menus, and private dining moments designed around your stay.",
      },
    ],
  },
  gallery: {
    eyebrow: "Guest Gallery",
    title: "Moments From Our Stays",
    description:
      "Browse snapshots of our stays, spaces, and experiences from across the The pune resort collection.",
  },
  contact: {
    eyebrow: "Contact Us",
    title: "Plan Your Next Stay With Us",
    description:
      "Reach out for bookings, property questions, or partnership inquiries. We are happy to help.",
    cards: [
      ...contactSectionData,
      {
        title: "Locations",
        value: "Nagaon, Alibaug, Akshi and more hospitality destinations.",
        icon: MapPin,
      },
    ],
  },
  notFound: {
    title: "404 Page Not Found",
    description: "Did you forget to add the page to the router?",
  },
};
