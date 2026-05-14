import { MapPin } from "lucide-react";
import { contactSectionData } from "@/data/footer";
import { siteImages } from "@/lib/site-images";

export const pageContent = {
  about: {
    eyebrow: "About Us",
    title: "About Us",
    description:
      "Tripdip is an online and offline platform for providing reasonable and temporary properties and accommodations since 2018.",
    teamTitle: "Our Team",
    teamDescription: "Meet our team.",
    team: [
      {
        name: "Mr. Prathamesh V.",
        role: "Managing Director",
        location: "Pune",
        image: "/images/generated_images/prathamesh.jpg",
      },
      {
        name: "Mr. Omkar G.",
        role: "Sales & Marketing",
        location: "Pune",
        image: "/images/generated_images/omkar.jpg",
      },
      {
        name: "Mrs. Swati T.",
        role: "Domestic Expert",
        location: "Pune",
        image: "/images/generated_images/swati.jpeg",
      },
    ],
  },
  properties: {
    eyebrow: "Our Properties",
    title: "Find Your Perfect Stay",
    description:
      "Explore our curated collection of villas, resorts, cottages, and boutique stays across the most loved destinations.",
  },
  packages: {
    eyebrow: "Packages",
    resort: {
      title: "Resort Packages For Relaxed Family Getaways",
      description:
        "Choose complete resort stays designed for couples, families, and group celebrations with dining, recreation, and comfortable room experiences included.",
      image: siteImages.resortPool,
      highlights: [
        {
          title: "Stay And Dine",
          description: "Well-planned resort packages with room stay, breakfast, and add-on dining experiences for a smooth holiday.",
        },
        {
          title: "Group Friendly Options",
          description: "Ideal for family trips, corporate outings, and weekend celebrations with flexible occupancy and shared amenities.",
        },
        {
          title: "Activity Ready",
          description: "Packages can be paired with pool access, lawn spaces, music evenings, and curated local sightseeing support.",
        },
      ],
    },
    privateVilla: {
      title: "Private Villa Packages For Exclusive Stays",
      description:
        "Book private villa packages for intimate escapes, special occasions, and premium group stays with added privacy and personalized comfort.",
      image: siteImages.luxuryVillaSunset,
      highlights: [
        {
          title: "Complete Privacy",
          description: "Enjoy dedicated villa spaces for your family or group with private lounging areas and a quieter stay experience.",
        },
        {
          title: "Celebration Ready",
          description: "Perfect for birthdays, anniversaries, pre-wedding stays, and close-knit gatherings with flexible setup options.",
        },
        {
          title: "Tailored Comfort",
          description: "Add decor, meals, and guest support services to shape the villa stay around your trip plan.",
        },
      ],
    },
  },
  gallery: {
    eyebrow: "Guest Gallery",
    title: "Moments From Our Stays",
    description:
      "Browse snapshots of our stays, spaces, and experiences from across the Tripdip collection.",
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
        value: "Near Pune stay destinations.",
        icon: MapPin,
      },
    ],
  },
  notFound: {
    title: "404 Page Not Found",
    description: "Did you forget to add the page to the router?",
  },
};
