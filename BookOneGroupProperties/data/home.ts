import { Waves, Dumbbell, Flower2, Wine, Sparkles, Wallet, ShieldCheck, CheckCircle2 } from "lucide-react";
import { siteImages } from "@/lib/site-images";

export const homePageData = {
  hero: {
    badge: "The Best Place On Vacation",
    title: "Tripdip",
    description:
      "Escape the city and unwind in nature’s comfort. Discover serene stays, refreshing vibes, and moments that stay with you forever.",
    whatsappHint: "Or book directly via WhatsApp for best rates",
    searchTargetLink: "/shalom-maple-leaf",
    destinations: [
      "All Locations",
      "Alibaug, Maharashtra",
    ],
    guests: ["2 Guests", "4 Guests", "6+ Guests"],
  },
  locationHighlights: {
    title: "Explore by All properties",
    description: "Discover curated stays in our most popular destinations.",
    locations: [
      { id: "near-pune", name: "Alibaug", count: "5 Properties" },
    ],
    propertiesByLocation: {
      "near-pune": [
        {
          id: "a1",
          title: "Shalom Maple Leaf",
          image: siteImages.luxuryVillaSunset,
          location: "Near Pune, Maharashtra, India",
          price: 0,
          rating: "-",
          type: "Stay",
          features: "Comfortable Stay",
          link: "/shalom-maple-leaf",
        },
        {
          id: "a2",
          title: "Cherry Blossom",
          image: siteImages.santoriniVilla,
          location: "Near Pune, Maharashtra, India",
          price: 0,
          rating: "-",
          type: "Stay",
          features: "Comfortable Stay",
          link: "/cherry-blossom",
        },
        {
          id: "a3",
          title: "Pool And Pause",
          image: siteImages.resortPool,
          location: "Near Pune, Maharashtra, India",
          price: 0,
          rating: "-",
          type: "Stay",
          features: "Pool Stay, Comfortable Stay",
          link: "/pool-and-pause",
        },
        {
          id: "a4",
          title: "Shirke Holiday Home",
          image: siteImages.modernTropicalVilla,
          location: "Near Pune, Maharashtra, India",
          price: 0,
          rating: "-",
          type: "Holiday Home",
          features: "Holiday Home, Group Stay",
          link: "/shirke-holiday-home",
        },
        {
          id: "a5",
          title: "Green-Didi-S-Cottage",
          image: siteImages.mountainChalet,
          location: "Near Pune, Maharashtra, India",
          price: 0,
          rating: "-",
          type: "Cottage",
          features: "Cottage Stay, Nature Stay",
          link: "/green-didi-s-cottage",
        },
      ],
    },
  },
  whyTripDip: {
    title: "Why Tripdip?",
    description:
      "Discover the difference of staying with a brand that puts your experience first.",
    reasons: [
      {
        title: "Enhanced Guest Experience",
        description:
          "From personalized welcome drinks to 24/7 concierge support, we ensure every moment of your stay is curated for perfection. Our local staff is trained to anticipate your needs before you even ask.",
        icon: Sparkles,
        image: siteImages.luxuryVillaSunset,
      },
      {
        title: "Cost Effective Luxury",
        description:
          "Experience 5-star amenities without the 5-star price tag. By partnering directly with property owners, we cut out the middlemen to pass the savings directly to you.",
        icon: Wallet,
        image: siteImages.santoriniVilla,
      },
      {
        title: "Verified Excellence",
        description:
          "Every Tripdip property undergoes a rigorous 150-point inspection checklist. We don't just list properties; we verify experiences to ensure safety, hygiene, and comfort.",
        icon: ShieldCheck,
        image: siteImages.resortPool,
      },
    ],
  },
  featured: {
    title: "Featured Stays",
  },
  propertyOwnerCta: {
    badge: "For Property Owners",
    title: "Let Tripdip Manage Your Property",
    description:
      "Unlock the full potential of your villa or hotel. We handle marketing, guest services, maintenance, and booking management so you can enjoy the returns without the stress.",
    benefits: [
      "Guaranteed Occupancy Growth",
      "Professional Property Maintenance",
      "24/7 Guest Support Team",
    ],
    image: siteImages.propertyOwner,
    benefitIcon: CheckCircle2,
  },
  services: {
    title: "Our Services",
    description:
      "Our Services are designed to elevate your stay. Enjoy a sparkling infinity pool, a fully equipped fitness center, and a serene spa for ultimate relaxation. Dine at our exquisite multi-cuisine restaurant, unwind at the beachside bar, and revel in curated activities for all ages.",
    image: siteImages.resortPool,
    images: [
      siteImages.luxuryVillaSunset,
      siteImages.mountainChalet,
    ],
    items: [
      { icon: Waves, label: "Infinity Pool" },
      { icon: Dumbbell, label: "Fitness Centre" },
      { icon: Flower2, label: "Serene Spa" },
      { icon: Wine, label: "Beach Side Bar" },
    ],
  },
  gallery: {
    title: "Views",
    subtitle: "Where Every Moment Feels Like a Vacation.",
    images: [
      siteImages.luxuryVillaSunset,
      siteImages.santoriniVilla,
      siteImages.resortPool,
      siteImages.modernTropicalVilla,
      siteImages.mountainChalet,
      siteImages.modernHotelRestaurant,
    ],
  },
};
