import { siteImages } from "@/lib/site-images";

export type PropertySource = {
  slug: string;
  propertyId: number;        // HotelMate property ID
  restaurantId?: number;     // BookOne restaurant service ID
  bookOnePropertyId?: number; // BookOne main property ID (for room orders, POS)
  slotsWebsiteId?: number;
  fallbackImage: string;
  bookingPath: string;
  logoUrl?: string;
};

export const propertySources: PropertySource[] = [
  { 
    slug: "shalom-maple-leaf",    
    propertyId: 3268, 
    restaurantId: 2334, 
    bookOnePropertyId: 2248, 
    slotsWebsiteId: 1302, 
    fallbackImage: siteImages.maple1,      
    bookingPath: "Shalom-Maple-Leaf",
    logoUrl: "https://bookonelocal.in/cdn/2025-09-29-125417693-2024-12-17-124410063-Trip_Dip_logo_page-0001-removebg-preview-150x150.png"
  },
  { 
    slug: "cherry-blossom",       
    propertyId: 3269, 
    restaurantId: 2337, 
    bookOnePropertyId: 2249, 
    slotsWebsiteId: 1306, 
    fallbackImage: siteImages.cherry1,     
    bookingPath: "Cherry-Blossom",
    logoUrl: "https://bookonelocal.in/cdn/2025-09-29-125509234-2024-12-17-124410063-Trip_Dip_logo_page-0001-removebg-preview-150x150.png"
  },
  { 
    slug: "pool-and-pause",       
    propertyId: 3270, 
    restaurantId: 2332, 
    bookOnePropertyId: 2250, 
    slotsWebsiteId: 1372, 
    fallbackImage: siteImages.poolpause1,  
    bookingPath: "Pool-And-Pause",
    logoUrl: "https://bookonelocal.in/cdn/2025-09-29-125543387-2024-12-17-124410063-Trip_Dip_logo_page-0001-removebg-preview-150x150.png"
  },
  { 
    slug: "shirke-holiday-home",  
    propertyId: 2533, 
    restaurantId: 2150, 
    bookOnePropertyId: 1513, 
    slotsWebsiteId: 1166, 
    fallbackImage: siteImages.shrike1,     
    bookingPath: "Shirke-Holiday-Home",
    logoUrl: "https://bookonelocal.in/cdn/2023-09-26-081709371-459512369.jpg"
  },
  { 
    slug: "green-didi-s-cottage", 
    propertyId: 2514, 
    restaurantId: 2148, 
    bookOnePropertyId: 2115, 
    slotsWebsiteId: 1371, 
    fallbackImage: siteImages.green1,      
    bookingPath: "Green-Didi-S-Cottage",
    logoUrl: "https://bookonelocal.in/cdn/2025-03-11-074643717-logo.jpg"
  },
];

export const propertySourceBySlug = Object.fromEntries(
  propertySources.map((source) => [source.slug, source]),
) as Record<string, PropertySource>;
