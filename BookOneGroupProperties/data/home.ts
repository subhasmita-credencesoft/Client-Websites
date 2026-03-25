import { Waves, Dumbbell, Flower2, Wine, Sparkles, Wallet, ShieldCheck, CheckCircle2 } from "lucide-react";
import { siteImages } from "@/lib/site-images";

export const homePageData = {
  hero: {
    badge: "The Best Place On Vacation",
    title: "The Pune Resort",
    description:
      "Escape the city and unwind in nature’s comfort. Discover serene stays, refreshing vibes, and moments that stay with you forever.",
    whatsappHint: "Or book directly via WhatsApp for best rates",
    destinations: [
      "All Locations",
      "Alibaug, Maharashtra",
      "Lonavala, Maharashtra",
      "Goa, India",
      "Udaipur, Rajasthan",
    ],
    guests: ["2 Guests", "4 Guests", "6+ Guests"],
  },
  locationHighlights: {
    title: "Explore by Location",
    description: "Discover curated stays in our most popular destinations.",
    locations: [
      { id: "alibaug", name: "Alibaug", count: "12 Properties" },
      { id: "lonavala", name: "Lonavala", count: "8 Properties" },
      { id: "goa", name: "Goa", count: "15 Properties" },
      { id: "udaipur", name: "Udaipur", count: "6 Properties" },
    ],
    propertiesByLocation: {
      alibaug: [
        {
          id: "a1",
          title: "Silver Sand Resort",
          image: siteImages.hero,
          price: 8500,
          rating: 4.8,
          type: "Resort",
          features: "Beachfront • Pool • Spa",
          link: "/property/silver-sand-resort",
        },
        {
          id: "a2",
          title: "Green Didi's Cottage",
          image: siteImages.modernTropicalVilla,
          price: 6200,
          rating: 4.6,
          type: "Cottage",
          features: "Garden • Pet Friendly • WiFi",
          link: "/property/green-didis-cottage",
        },
      ],
      lonavala: [
        {
          id: "l1",
          title: "Cloud 9 Chalet",
          image: siteImages.mountainChalet,
          price: 14000,
          rating: 4.9,
          type: "Villa",
          features: "Mountain View • Fireplace • Jacuzzi",
          link: "/property/shirke-holiday-home",
        },
        {
          id: "l2",
          title: "Valley View Hotel",
          image: siteImages.affordableLuxuryRoom,
          price: 7000,
          rating: 4.5,
          type: "Hotel",
          features: "Breakfast • Parking • AC",
          link: "/property/silver-sand-resort",
        },
      ],
      goa: [
        {
          id: "g1",
          title: "Azure Beach Villa",
          image: siteImages.luxuryVillaSunset,
          price: 25000,
          rating: 4.9,
          type: "Luxury Villa",
          features: "Infinity Pool • Private Chef • Sea View",
          link: "/property/urban-breeze-villa",
        },
        {
          id: "g2",
          title: "Casa Portuguesa",
          image: siteImages.santoriniVilla,
          price: 11000,
          rating: 4.7,
          type: "Heritage Home",
          features: "Historic • Garden • Near Beach",
          link: "/property/green-didis-cottage",
        },
      ],
      udaipur: [
        {
          id: "u1",
          title: "Lake Palace Stay",
          image: siteImages.luxuryVillaSunset,
          price: 32000,
          rating: 5,
          type: "Palace",
          features: "Lake View • Heritage • Luxury",
          link: "/property/urban-breeze-villa",
        },
      ],
    },
  },
  whyTripDip: {
    title: "Why The pune resort?",
    description:
      "Discover the difference of staying with a brand that puts your experience first.",
    reasons: [
      {
        title: "Enhanced Guest Experience",
        description:
          "From personalized welcome drinks to 24/7 concierge support, we ensure every moment of your stay is curated for perfection. Our local staff is trained to anticipate your needs before you even ask.",
        icon: Sparkles,
        image: siteImages.happyGuests,
      },
      {
        title: "Cost Effective Luxury",
        description:
          "Experience 5-star amenities without the 5-star price tag. By partnering directly with property owners, we cut out the middlemen to pass the savings directly to you.",
        icon: Wallet,
        image: siteImages.affordableLuxuryRoom,
      },
      {
        title: "Verified Excellence",
        description:
          "Every The Pune Resort property undergoes a rigorous 150-point inspection checklist. We don't just list properties; we verify experiences to ensure safety, hygiene, and comfort.",
        icon: ShieldCheck,
        image: siteImages.luxuryVillaSunset,
      },
    ],
  },
  featured: {
    title: "Visit Our Exclusive Villas",
    properties: [
      {
        id: "1",
        slug: "silver-sand-resort",
        title: "Silver Sand Resort",
        description: "Enjoy the cozy atmosphere, beachfront calm, premium stays, and thoughtful room services at Silver Sand Resort.",
        image: siteImages.modernTropicalVilla,
      },
      {
        id: "2",
        slug: "green-didis-cottage",
        title: "Green Didi's Cottage",
        description: "A rustic yet elegant escape surrounded by lush greenery, created for slow mornings, private stays, and nature-led comfort.",
        image: siteImages.mountainChalet,
      },
      {
        id: "3",
        slug: "shirke-holiday-home",
        title: "Shirke Holiday Home",
        description: "A spacious holiday home for families and groups, balancing practical comfort, shared spaces, and easy coastal access.",
        image: siteImages.santoriniVilla,
      },
      {
        id: "4",
        slug: "urban-breeze-villa",
        title: "Urban Breeze Villa",
        description: "A sleek luxury villa with premium outdoor lounging, modern design language, and a polished private-stay experience.",
        image: siteImages.luxuryVillaSunset,
      },
    ],
  },
  propertyOwnerCta: {
    badge: "For Property Owners",
    title: "Let The pune resort Manage Your Property",
    description:
      "Unlock the full potential of your villa or hotel. We handle marketing, guest services, maintenance, and booking management so you can enjoy the returns without the stress.",
    benefits: [
      "Guaranteed Occupancy Growth",
      "Professional Property Maintenance",
      "24/7 Guest Support Team",
    ],
    image: siteImages.propertyManager,
    benefitIcon: CheckCircle2,
  },
  services: {
    title: "Our Services",
    description:
      "Our Services are designed to elevate your stay. Enjoy a sparkling infinity pool, a fully equipped fitness center, and a serene spa for ultimate relaxation. Dine at our exquisite multi-cuisine restaurant, unwind at the beachside bar, and revel in curated activities for all ages.",
    image: siteImages.modernHotelRestaurant,
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
      siteImages.modernTropicalVilla,
      siteImages.mountainChalet,
      siteImages.santoriniVilla,
      siteImages.luxuryVillaSunset,
      siteImages.modernHotelRestaurant,
      siteImages.hero,
    ],
  },
};
