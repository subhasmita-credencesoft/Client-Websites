import { cache } from "react";
import { propertySourceBySlug, type PropertySource } from "@/lib/properties/sources";
import { homePageData } from "@/data/home";
import { propertyDetailsBySlug } from "@/data/property-details";
import { HOTELMATE_CHECK_AVAILABILITY_BASE } from "@/lib/api/hotelmate/urls";
import type { PropertyDetails } from "@/lib/properties/types";
import { extractCardRating, mapHotelMatePropertyToDetails, slugToTitle } from "@/lib/properties/mapping";
import { formatApiDate } from "@/lib/utils/date";

const FIND_BY_ID_BASE = "https://api.thehotelmate.co/api/thm/findById";
const FIND_BY_SEO_BASE = "https://api.thehotelmate.co/api/thm/findByPropertyBySEOFriendlyName";
const PROPERTY_DETAIL_GUESTS = 20;

type LocationCard = {
  id: string;
  title: string;
  image: string;
  location: string;
  price: number;
  rating: string | number;
  type: string;
  features: string;
  link: string;
};

type FeaturedCard = {
  id: string;
  slug: string;
  title: string;
  location: string;
  amenity: string;
  price: string;
  image: string;
};

const featuredPropertySlugs = [
  "shalom-maple-leaf",
  "cherry-blossom",
  "pool-and-pause",
  "shirke-holiday-home",
  "green-didi-s-cottage",
] as const;

async function fetchJson(url: string) {
  const response = await fetch(url, {
    next: { revalidate: 60 },
    headers: { "Accept": "application/json" },
  });
  if (!response.ok) throw new Error(`Failed to fetch property data: ${response.statusText}`);
  return response.json();
}

async function fetchPropertyData(source: PropertySource) {
  const { fromDate, toDate } = getDefaultAvailabilityDateRange();
  const availabilityParams = new URLSearchParams({
    fromDate,
    toDate,
    noOfRooms: "1",
    noOfPersons: String(PROPERTY_DETAIL_GUESTS),
  });
  const urls = [
    `${HOTELMATE_CHECK_AVAILABILITY_BASE}/${source.propertyId}?${availabilityParams.toString()}`,
    `${FIND_BY_SEO_BASE}/${source.bookingPath}`,
    `${FIND_BY_ID_BASE}/${source.propertyId}`,
  ];

  let lastError: unknown;
  for (const url of urls) {
    try {
      return await fetchJson(url);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Failed to fetch property data");
}

export const getDynamicPropertyBySlug = cache(async (slug: string): Promise<PropertyDetails | null> => {
  const normalizedSlug = slug.toLowerCase();
  const source = propertySourceBySlug[normalizedSlug];

  if (!source) {
    return propertyDetailsBySlug[normalizedSlug] ?? null;
  }

  try {
    const payload = await fetchPropertyData(source);

    if (!payload) {
      const curatedProperty = propertyDetailsBySlug[normalizedSlug];
      return curatedProperty
        ? withSourceBookingFallback(curatedProperty, source)
        : buildMinimalPropertyFromSource(source, normalizedSlug);
    }

    try {
      const dynamicProperty = mapHotelMatePropertyToDetails(payload, normalizedSlug, source.fallbackImage);
      return mergeCuratedPropertyDetails(dynamicProperty, propertyDetailsBySlug[normalizedSlug], source);
    } catch (mappingError) {
      console.error(`Error mapping property ${normalizedSlug}:`, mappingError);
      const curatedProperty = propertyDetailsBySlug[normalizedSlug];
      return curatedProperty
        ? withSourceBookingFallback(curatedProperty, source)
        : buildMinimalPropertyFromSource(source, normalizedSlug);
    }
  } catch (fetchError) {
    console.error(`Error fetching property ${normalizedSlug}:`, fetchError);
    const curatedProperty = propertyDetailsBySlug[normalizedSlug];
    return curatedProperty
      ? withSourceBookingFallback(curatedProperty, source)
      : buildMinimalPropertyFromSource(source, normalizedSlug);
  }
});

function mergeCuratedPropertyDetails(
  dynamicProperty: PropertyDetails,
  curatedProperty: PropertyDetails | undefined,
  source: PropertySource,
): PropertyDetails {
  if (!curatedProperty) {
    return withSourceBookingFallback(dynamicProperty, source);
  }

  const mergedRooms = curatedProperty.rooms.length
    ? curatedProperty.rooms.map((curatedRoom, index) => {
        const dynamicRoom = findMatchingDynamicRoom(
          curatedRoom,
          index,
          dynamicProperty.rooms,
          curatedProperty.rooms
        );
        return {
          ...curatedRoom,
          price: dynamicRoom && dynamicRoom.price > 0 ? dynamicRoom.price : curatedRoom.price,
          available: dynamicRoom ? dynamicRoom.available : curatedRoom.available,
        };
      })
    : dynamicProperty.rooms;

  const merged: PropertyDetails = {
    ...dynamicProperty,
    ...curatedProperty,
    slug: dynamicProperty.slug,
    images: curatedProperty.images.length ? curatedProperty.images : dynamicProperty.images,
    amenities: curatedProperty.amenities.length ? curatedProperty.amenities : dynamicProperty.amenities,
    rooms: mergedRooms,
    packages: curatedProperty.packages.length ? curatedProperty.packages : dynamicProperty.packages,
    reviews: curatedProperty.reviews.length ? curatedProperty.reviews : dynamicProperty.reviews,
    propertyDetailsSection: curatedProperty.propertyDetailsSection ?? dynamicProperty.propertyDetailsSection,
    oneDayTripSection: curatedProperty.oneDayTripSection ?? dynamicProperty.oneDayTripSection,
    policiesSection: curatedProperty.policiesSection ?? dynamicProperty.policiesSection,
    booking: {
      ...dynamicProperty.booking,
      ...curatedProperty.booking,
      basePrice: dynamicProperty.booking.basePrice || curatedProperty.booking.basePrice || 0,
      guests: curatedProperty.booking.guests.length ? curatedProperty.booking.guests : dynamicProperty.booking.guests,
    },
  };

  return withSourceBookingFallback(merged, source);
}

function withSourceBookingFallback(
  property: PropertyDetails,
  source: PropertySource,
): PropertyDetails {
  return {
    ...property,
    booking: {
      ...property.booking,
      availabilityApiUrl: property.booking.availabilityApiUrl ?? `${HOTELMATE_CHECK_AVAILABILITY_BASE}/${source.propertyId}`,
      externalBookingUrl: property.booking.externalBookingUrl ?? `https://bookone.io/${source.bookingPath}`,
    },
  };
}

function buildMinimalPropertyFromSource(source: PropertySource, slug: string): PropertyDetails {
  const title = slugToTitle(slug);
  const price = 0;
  return {
    slug,
    title,
    location: "Location details available on booking confirmation.",
    ratingLabel: "- (0 Reviews)",
    typeBadge: "Stay",
    description: `${title} is a property available for booking. Please contact us or use the booking engine to check availability and rates.`,
    tags: [],
    images: [source.fallbackImage],
    amenities: [{ icon: "star", label: "Comfortable Stay" }],
    rooms: [
      {
        id: 1,
        name: "Standard Stay",
        size: "1 Unit",
        bed: "Guests on request",
        view: "Property View",
        price,
        image: source.fallbackImage,
        features: ["Comfortable accommodation"],
      },
    ],
    packages: [
      {
        id: 1,
        title: "Standard Stay",
        price,
        image: source.fallbackImage,
        description: "Accommodation package available for booking.",
      },
    ],
    appPromo: {
      badge: "Book Now",
      title: `Stay At ${title}`,
      description: `${title} is available for booking. Contact us for the latest rates and availability.`,
      image: source.fallbackImage,
    },
    reviews: [],
    propertyDetailsSection: {
      title: "Property Details",
      lines: [`Property: ${title}`, "Contact us for rates and availability."],
      activities: [],
      address: "Location details available on booking confirmation.",
    },
    oneDayTripSection: {
      title: "Stay Information",
      time: "Please confirm timing before booking.",
      includes: ["Accommodation as per selected option"],
      notes: ["Please contact us to confirm availability before booking."],
    },
    policiesSection: {
      title: "Policies",
      accommodation: ["Please contact us for full details on accommodation policies."],
      cancellation: ["Please confirm cancellation policy at time of booking."],
      dayOuting: ["Day-use packages available on request."],
      extra: [],
    },
    booking: {
      basePrice: price,
      availability: "Contact for Availability",
      checkIn: "Oct 18, 2025",
      checkOut: "Oct 20, 2025",
      guests: ["2 Guests", "4 Guests", "6 Guests"],
      availabilityApiUrl: `${HOTELMATE_CHECK_AVAILABILITY_BASE}/${source.propertyId}`,
      externalBookingUrl: `https://bookone.io/${source.bookingPath}?bookingEngine=true`,
      couponHint: "BOOKNOW",
      couponDiscount: 100,
      secureLabel: "Secure Booking",
    },
  };
}

export async function getLocationHighlightsData() {
  const base = homePageData.locationHighlights;
  const entries = await Promise.all(
    Object.entries(base.propertiesByLocation).map(async ([locationKey, properties]) => {
      const resolved = await Promise.all(
        properties.map(async (property) => {
          const slug = getSlugFromLink(property.link);

          if (!slug || !propertySourceBySlug[slug]) {
            return property;
          }

          try {
            const dynamicProperty = await getDynamicPropertyBySlug(slug);

            if (!dynamicProperty) {
              return property;
            }

            return {
              ...property,
              title: dynamicProperty.title,
              image: dynamicProperty.images[0] ?? property.image,
              location: dynamicProperty.location,
              price: dynamicProperty.booking.basePrice ?? 0,
              rating: extractCardRating(dynamicProperty.ratingLabel),
              type: dynamicProperty.typeBadge,
              features: dynamicProperty.rooms.map((room) => room.name).join(", ") || property.features,
              link: `/${dynamicProperty.slug}`,
            } satisfies LocationCard;
          } catch {
            return property;
          }
        }),
      );

      return [locationKey, resolved] as const;
    }),
  );

  return {
    ...base,
    propertiesByLocation: Object.fromEntries(entries),
  };
}

export async function getFeaturedPropertiesData(): Promise<FeaturedCard[]> {
  const fallbackImage = (homePageData.locationHighlights.propertiesByLocation["alibaug"]?.[0]?.image) ?? 
                        (Object.values(homePageData.locationHighlights.propertiesByLocation)[0]?.[0]?.image) ?? "";

  return Promise.all(
    featuredPropertySlugs.map(async (slug, index) => {
      const dynamicProperty = await getDynamicPropertyBySlug(slug);
      const source = propertySourceBySlug[slug];

      if (!dynamicProperty) {
        return {
          id: `featured-${index + 1}`,
          slug,
          title: slugToTitle(slug),
          location: "Location details available on booking confirmation.",
          amenity: "Comfortable Stay",
          price: "Rs. 0/ night",
          image: source?.fallbackImage ?? fallbackImage,
        } satisfies FeaturedCard;
      }

      return {
        id: `featured-${index + 1}`,
        slug: dynamicProperty.slug,
        title: dynamicProperty.title,
        location: dynamicProperty.location,
        amenity: dynamicProperty.amenities[0]?.label ?? dynamicProperty.typeBadge,
        price: `Rs. ${dynamicProperty.booking.basePrice}/ night`,
        image: dynamicProperty.images[0] ?? source?.fallbackImage ?? fallbackImage,
      } satisfies FeaturedCard;
    }),
  );
}

export async function getPropertyGalleryImages() {
  const locationHighlightsData = await getLocationHighlightsData();
  const propertyCards = Object.values(locationHighlightsData.propertiesByLocation).flat();
  const imageGroups = await Promise.all(
    propertyCards.map(async (property) => {
      const slug = getSlugFromLink(property.link);

      if (!slug || !propertySourceBySlug[slug]) {
        return property.image ? [property.image] : [];
      }

      try {
        const dynamicProperty = await getDynamicPropertyBySlug(slug);
        return dynamicProperty?.images?.length ? dynamicProperty.images : property.image ? [property.image] : [];
      } catch {
        return property.image ? [property.image] : [];
      }
    }),
  );

  return imageGroups
    .flat()
    .filter((image, index, images) => Boolean(image) && images.indexOf(image) === index);
}

function getDefaultAvailabilityDateRange() {
  const from = new Date();
  const to = new Date(from);
  to.setDate(from.getDate() + 1);

  return {
    fromDate: formatApiDate(from),
    toDate: formatApiDate(to),
  };
}

function findMatchingDynamicRoom(
  curatedRoom: PropertyDetails["rooms"][number],
  curatedIndex: number,
  dynamicRooms: PropertyDetails["rooms"],
  curatedRooms: PropertyDetails["rooms"]
): PropertyDetails["rooms"][number] | null {
  if (!dynamicRooms || dynamicRooms.length === 0) return null;
  
  // 1. Match by exact ID
  const curatedIdStr = String(curatedRoom.id);
  const matchById = dynamicRooms.find((r) => r && String(r.id) === curatedIdStr);
  if (matchById) return matchById;

  // 2. Match by exact name (case-insensitive, trimmed)
  const curatedNameClean = curatedRoom.name?.trim().toLowerCase();
  if (curatedNameClean) {
    const matchByName = dynamicRooms.find((r) => r?.name?.trim().toLowerCase() === curatedNameClean);
    if (matchByName) return matchByName;
  }

  // 3. Match by normalized name (removing spaces, non-alphanumeric, and strip common filler words)
  const normalize = (name?: string | null) => {
    if (!name) return "";
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .replace(/private|luxury|standard|room|villa|stay|cottage|suite|home|unit|person|guest/g, "");
  };
  
  const curatedNorm = normalize(curatedRoom.name);
  if (curatedNorm) {
    const matchByNormName = dynamicRooms.find((r) => normalize(r?.name) === curatedNorm);
    if (matchByNormName) return matchByNormName;
  }

  // 4. Match by index if the lengths are identical, or if both have exactly 1 room
  if (dynamicRooms.length === curatedRooms.length) {
    return dynamicRooms[curatedIndex] ?? null;
  }
  if (curatedRooms.length === 1 && dynamicRooms.length === 1) {
    return dynamicRooms[0] ?? null;
  }

  return null;
}

function getSlugFromLink(link?: string) {
  if (!link) return null;
  if (link.startsWith("/property/")) {
    return link.replace("/property/", "").trim();
  }
  // For root-level links, ensure it's a single slug
  if (link.startsWith("/") && !link.slice(1).includes("/")) {
    return link.slice(1).trim();
  }
  return null;
}