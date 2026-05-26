import { cache } from "react";
import { propertySourceBySlug } from "@/data/property-sources";
import { homePageData } from "@/data/home";
import { propertyDetailsBySlug } from "@/data/property-details";
import type { PropertyDetails, AmenityIconKey } from "@/data/property-details";

const FIND_BY_ID_BASE = "https://api.thehotelmate.co/api/thm/findById";
const FIND_BY_SEO_BASE = "https://api.thehotelmate.co/api/thm/findByPropertyBySEOFriendlyName";
const CHECK_AVAILABILITY_BASE = "https://api.thehotelmate.co/api/thm/checkAvailability";
const PROPERTY_DETAIL_GUESTS = 20;

async function fetchJson(url: string) {
  const response = await fetch(url, {
    next: { revalidate: 60 },
    headers: { "Accept": "application/json" },
  });
  if (!response.ok) throw new Error(`Failed to fetch property data: ${response.statusText}`);
  return response.json();
}

async function fetchPropertyData(source: import("@/data/property-sources").PropertySource) {
  const { fromDate, toDate } = getDefaultAvailabilityDateRange();
  const availabilityParams = new URLSearchParams({
    fromDate,
    toDate,
    noOfRooms: "1",
    noOfPersons: String(PROPERTY_DETAIL_GUESTS),
  });
  const urls = [
    `${CHECK_AVAILABILITY_BASE}/${source.propertyId}?${availabilityParams.toString()}`,
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

type HotelMateAddress = {
  country?: string | null;
  postcode?: string | null;
  streetNumber?: string | null;
  streetName?: string | null;
  suburb?: string | null;
  city?: string | null;
  state?: string | null;
  locality?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
};

type HotelMateImage = {
  url?: string | null;
  mainImage?: boolean | null;
};

type HotelMateFacility = {
  name?: string | null;
  description?: string | null;
};

type HotelMateRoom = {
  id?: number | null;
  name?: string | null;
  description?: string | null;
  roomOnlyPrice?: number | null;
  minimumOccupancy?: number | null;
  maximumOccupancy?: number | null;
  noOfRooms?: number | null;
  imageList?: HotelMateImage[] | null;
  roomFacilities?: HotelMateFacility[] | null;
  dayTrip?: boolean | null;
  ratesAndAvailabilityDtos?: HotelMateRateAvailability[] | null;
};

type HotelMateRateAvailability = {
  price?: number | null;
  noOfAvailable?: number | null;
  totalNoRooms?: number | null;
  noOfBooked?: number | null;
  date?: string | null;
  status?: string | null;
  roomRatePlans?: HotelMateRoomRatePlan[] | null;
};

type HotelMateRoomRatePlan = {
  name?: string | null;
  amount?: number | string | null;
  minimumOccupancy?: number | null;
  maximumOccupancy?: number | null;
};

type HotelMateService = {
  name?: string | null;
  description?: string | null;
  servicePrice?: number | null;
};

type HotelMateProperty = {
  id?: number | null;
  name?: string | null;
  seoFriendlyName?: string | null;
  email?: string | null;
  mobile?: string | null;
  whatsApp?: string | null;
  slogan?: string | null;
  website?: string | null;
  managerFirstName?: string | null;
  managerLastName?: string | null;
  managerContactNo?: string | null;
  managerEmailAddress?: string | null;
  address?: HotelMateAddress | null;
  businessSubtype?: string | null;
  businessType?: string | null;
  businessDescription?: string | null;
  pricePerNight?: number | null;
  minimumRoooPrice?: number | null;
  maximumOccupancy?: number | null;
  minimumOccupancy?: number | null;
  verified?: boolean | null;
  noOfBookOneReview?: number | null;
  bookOneRating?: number | null;
  imageList?: HotelMateImage[] | null;
  roomList?: HotelMateRoom[] | null;
  propertyServicesList?: HotelMateService[] | null;
};

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
  source: import("@/data/property-sources").PropertySource,
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
  source: import("@/data/property-sources").PropertySource,
): PropertyDetails {
  return {
    ...property,
    booking: {
      ...property.booking,
      availabilityApiUrl: property.booking.availabilityApiUrl ?? `${CHECK_AVAILABILITY_BASE}/${source.propertyId}`,
      externalBookingUrl: property.booking.externalBookingUrl ?? `https://bookone.io/${source.bookingPath}`,
    },
  };
}

function buildMinimalPropertyFromSource(source: import("@/data/property-sources").PropertySource, slug: string): PropertyDetails {
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
      availabilityApiUrl: `${CHECK_AVAILABILITY_BASE}/${source.propertyId}`,
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

function mapHotelMatePropertyToDetails(
  property: HotelMateProperty,
  slug: string,
  fallbackImage: string,
): PropertyDetails {
  let title = property.name?.trim() || slugToTitle(slug);
  // Fix the capitalization/hyphenation if the API returns it weirdly
  if (title === "Green Didi'S Cottage" || slug === "green-didi-s-cottage") {
    title = "Green-Didi-S-Cottage";
  }

  const location = formatAddress(property.address);
  const images = prioritizePrimaryImage(getImageUrls(property.imageList, fallbackImage), slug, fallbackImage);
  // Rooms from live HotelMate API
  const apiRooms = mapRooms(property, images[0] ?? fallbackImage);
  // When the API returns an empty roomList (some properties store accommodation as
  // services rather than rooms), fall back to the static definitions in
  // property-details.ts so the Rooms section is never blank.
  const curatedRooms = propertyDetailsBySlug[slug]?.rooms ?? [];
  const rooms = apiRooms.length > 0
    ? apiRooms
    : curatedRooms.length > 0
      ? curatedRooms
      : buildFallbackRooms(property, title, images[0] ?? fallbackImage);
  const services = property.propertyServicesList ?? [];
  const roomNames = rooms.map((room) => room.name).filter(Boolean);
  const cleanedDescription = htmlToText(property.businessDescription) || `${title} offers a comfortable stay experience.`;
  const detailLines = buildDetailLines(property, cleanedDescription);
  const activities = buildActivities(property);
  // Use resolved rooms (API or static) for occupancy + pricing
  const guestOptions = buildGuestOptions(property, rooms);
  const basePrice = getBasePrice(property, rooms);

  return {
    slug,
    title,
    location,
    ratingLabel: buildRatingLabel(property),
    typeBadge: normalizePropertyType(property.businessSubtype || property.businessType),
    description: cleanedDescription,
    tags: buildTags(property, title),
    images,
    amenities: buildAmenities(property),
    rooms,
    packages: buildPackages(property, images[0] ?? fallbackImage, slug),
    appPromo: {
      badge: property.slogan?.trim() || normalizePropertyType(property.businessSubtype || property.businessType),
      title: `Stay At ${title}`,
      description: cleanedDescription,
      image: images[0] ?? fallbackImage,
    },
    reviews: [],
    propertyDetailsSection: {
      title: "Property Details",
      lines: detailLines,
      activities,
      address: location,
    },
    oneDayTripSection: {
      title: hasDayUseRooms(property) ? "One Day Trip" : "Stay Information",
      time: extractStayTime(property) ?? "Please confirm stay timing before booking.",
      includes: buildIncludes(property),
      notes: buildNotes(property),
    },
    policiesSection: {
      title: "Policies",
      accommodation: buildAccommodationPolicies(property, rooms),
      cancellation: [
        "Live availability is checked through the HotelMate booking API for this property.",
        "Rates and booking confirmation depend on final availability and selected dates.",
      ],
      dayOuting: hasDayUseRooms(property)
        ? ["Day-use and activity products are subject to the property's package availability."]
        : ["This property is configured primarily as a stay-focused listing."],
      extra: buildExtraPolicies(services),
    },
    booking: {
      basePrice,
      availability: "Available Now",
      checkIn: "Oct 18, 2025",
      checkOut: "Oct 20, 2025",
      guests: guestOptions.length > 0 ? guestOptions : ["2 Guests", "4 Guests", "6 Guests"],
      availabilityApiUrl: property.id ? `${CHECK_AVAILABILITY_BASE}/${property.id}` : undefined,
      externalBookingUrl: buildExternalBookingUrl(property.seoFriendlyName, slug),
      couponHint: "BOOKNOW",
      couponDiscount: Math.max(100, Math.round(basePrice * 0.05 / 100) * 100),
      secureLabel: "Secure Booking",
    },
  };
}

function mapRooms(property: HotelMateProperty, fallbackImage: string): PropertyDetails["rooms"] {
  return (property.roomList ?? []).map((room, index) => {
    const images = getImageUrls(room.imageList, fallbackImage);
    return {
      id: room.id || index + 1,
      name: room.name?.trim() || `Room ${index + 1}`,
      size: room.noOfRooms ? `${room.noOfRooms} ${room.noOfRooms === 1 ? "Unit" : "Units"}` : "Stay Option",
      bed: formatOccupancy(room.minimumOccupancy, room.maximumOccupancy),
      view: "Property View",
      price: getRoomPrice(room, property),
      image: images[0] ?? fallbackImage,
      features: (room.roomFacilities ?? []).map(f => f.name || "").filter(Boolean) || ["Comfortable Stay"],
      available: getRoomAvailability(room),
      description: htmlToText(room.description) || "Comfortable accommodation.",
    };
  });
}

function buildFallbackRooms(
  property: HotelMateProperty,
  title: string,
  fallbackImage: string,
): PropertyDetails["rooms"] {
  return [
    {
      id: property.id ?? 1,
      name: normalizePropertyType(property.businessSubtype || property.businessType) || `${title} Stay`,
      size: "Stay Option",
      bed: formatOccupancy(property.minimumOccupancy, property.maximumOccupancy),
      view: "Property View",
      price: property.minimumRoooPrice ?? property.pricePerNight ?? 0,
      image: fallbackImage,
      features: buildActivities(property).slice(0, 6),
      description: htmlToText(property.businessDescription) || `Comfortable accommodation at ${title}.`,
    },
  ];
}

function buildPackages(
  property: HotelMateProperty,
  fallbackImage: string,
  slug: string,
): PropertyDetails["packages"] {
  // Always prefer the hand-crafted static packages from property-details.ts.
  // API propertyServicesList often contains generic food add-ons (Lunch, Hi-Tea,
  // Dinner, Breakfast) which are not meaningful as Package / Tariff listings.
  // Static packages are intentional and property-specific.
  const staticPackages = propertyDetailsBySlug[slug]?.packages;
  if (staticPackages && staticPackages.length > 0) {
    return staticPackages;
  }

  // Fall back to API service packages only when no static packages are defined.
  // Rooms are rendered separately via property.rooms and must NOT appear here.
  return (property.propertyServicesList ?? [])
    .filter((service) => typeof service.servicePrice === "number" && service.servicePrice > 0)
    .map((service, index) => ({
      id: index + 100,
      title: service.name?.trim() || `Service ${index + 1}`,
      price: service.servicePrice ?? 0,
      image: fallbackImage,
      description: service.description?.trim() || "Additional service available with the property.",
    }));
}

function buildAmenities(property: HotelMateProperty): PropertyDetails["amenities"] {
  const labels = [
    ...(property.roomList ?? []).flatMap((room) =>
      (room.roomFacilities ?? [])
        .map((facility) => facility.name?.trim())
        .filter((value): value is string => Boolean(value)),
    ),
    ...(property.propertyServicesList ?? [])
      .map((service) => service.name?.trim())
      .filter((value): value is string => Boolean(value)),
  ];

  const uniqueLabels = Array.from(new Set(labels)).slice(0, 7);

  if (!uniqueLabels.length) {
    return [
      { icon: "car", label: "Guest Access" },
      { icon: "coffee", label: "Comfortable Stay" },
      { icon: "star", label: "Property Amenities" },
    ];
  }

  return uniqueLabels.map((label) => ({
    icon: inferAmenityIcon(label),
    label,
  }));
}

function buildDetailLines(property: HotelMateProperty, cleanedDescription: string) {
  const descriptionLines = cleanedDescription
    .split(".")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 6);

  const lines = [
    // property.id ? `Property ID: ${property.id}` : null,
    property.slogan?.trim() || null,
    ...descriptionLines,
    property.mobile ? `Contact: ${property.mobile}` : null,
    property.whatsApp ? `WhatsApp: ${property.whatsApp}` : null,
    property.email ? `Email: ${property.email}` : null,
    buildManagerLabel(property),
    property.website ? `Website: ${property.website}` : null,
  ];

  return lines.filter((value): value is string => Boolean(value));
}

function buildActivities(property: HotelMateProperty) {
  return Array.from(
    new Set(
      [
        ...(property.roomList ?? []).flatMap((room) =>
          (room.roomFacilities ?? [])
            .map((facility) => facility.name?.trim())
            .filter((value): value is string => Boolean(value)),
        ),
        ...(property.propertyServicesList ?? [])
          .map((service) => service.name?.trim())
          .filter((value): value is string => Boolean(value)),
      ].slice(0, 10),
    ),
  );
}

function buildIncludes(property: HotelMateProperty) {
  const roomNames = (property.roomList ?? [])
    .map((room) => room.name?.trim())
    .filter((value): value is string => Boolean(value))
    .slice(0, 4);

  return roomNames.length ? roomNames : ["Stay option details are confirmed at booking time."];
}

function buildNotes(property: HotelMateProperty) {
  const serviceNotes = (property.propertyServicesList ?? [])
    .slice(0, 4)
    .map((service) => {
      const name = service.name?.trim();
      const price = service.servicePrice;
      if (!name) return null;
      return typeof price === "number" && price > 0 ? `${name}: ${price}` : name;
    })
    .filter((value): value is string => Boolean(value));

  return serviceNotes.length ? serviceNotes : ["Please confirm package inclusions with the property before booking."];
}

function buildAccommodationPolicies(
  property: HotelMateProperty,
  rooms: PropertyDetails["rooms"],
) {
  const minOccupancy = property.minimumOccupancy ?? rooms.length;
  const maxOccupancy = property.maximumOccupancy ?? minOccupancy;

  return [
    `Minimum occupancy starts at ${minOccupancy} guests and maximum occupancy goes up to ${maxOccupancy} guests.`,
    "Stay timing and room allocation depend on the selected package and final booking confirmation.",
    rooms.length ? `Available stay options include ${rooms.map((room) => room.name).join(", ")}.` : "Room options are shared at booking time.",
  ];
}

function buildExtraPolicies(services: HotelMateService[]) {
  const paidServices = services
    .filter((service) => typeof service.servicePrice === "number" && service.servicePrice > 0)
    .slice(0, 4)
    .map((service) => `${service.name}: ${service.servicePrice}`);

  return paidServices.length ? paidServices : ["Additional services may be available depending on the property."];
}

function extractStayTime(property: HotelMateProperty) {
  const text = [
    property.businessDescription ?? "",
    ...(property.roomList ?? []).map((room) => room.description ?? ""),
  ]
    .map(htmlToText)
    .join(" ");

  const match = text.match(/check\s*in[^.:\n]*[:\-]?\s*([0-9]{1,2}\s*(?:AM|PM)).*?check\s*out[^.:\n]*[:\-]?\s*([0-9]{1,2}\s*(?:AM|PM))/i);

  if (!match) {
    return null;
  }

  return `Check in ${match[1]} and Check out ${match[2]}`;
}

function hasDayUseRooms(property: HotelMateProperty) {
  return (property.roomList ?? []).some((room) => Boolean(room.dayTrip));
}

function getBasePrice(property: HotelMateProperty, rooms: PropertyDetails["rooms"]) {
  const prices = rooms.map((room) => room.price).filter((price) => price > 0);
  return prices.length ? Math.min(...prices) : property.minimumRoooPrice ?? property.pricePerNight ?? 0;
}

function getRoomPrice(room: HotelMateRoom, property: HotelMateProperty) {
  return getPrimaryRoomRatePlanAmount(room)
    ?? room.roomOnlyPrice
    ?? getPrimaryRateAvailability(room)?.price
    ?? property.minimumRoooPrice
    ?? property.pricePerNight
    ?? 0;
}

function getRoomAvailability(room: HotelMateRoom) {
  const rateAvailability = getPrimaryRateAvailability(room);
  if (rateAvailability?.noOfAvailable != null) return rateAvailability.noOfAvailable.toString();
  if (room.noOfRooms != null) return room.noOfRooms.toString();
  return undefined;
}

function getPrimaryRateAvailability(room: HotelMateRoom) {
  return room.ratesAndAvailabilityDtos?.find((rate) => rate?.status !== "Closed") ?? room.ratesAndAvailabilityDtos?.[0] ?? null;
}

function getPrimaryRoomRatePlanAmount(room: HotelMateRoom) {
  const rateAvailability = getPrimaryRateAvailability(room);
  const ratePlans = rateAvailability?.roomRatePlans ?? [];
  const planWithAmount = ratePlans.find((plan) => getPositiveNumber(plan?.amount) !== null);
  return getPositiveNumber(planWithAmount?.amount);
}

function getPositiveNumber(value: number | string | null | undefined) {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) return value;
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
  }
  return null;
}

function buildGuestOptions(property: HotelMateProperty, rooms: PropertyDetails["rooms"]) {
  const values = new Set<number>();

  if (property.minimumOccupancy && property.minimumOccupancy > 0) {
    values.add(property.minimumOccupancy);
  }

  if (property.maximumOccupancy && property.maximumOccupancy > 0) {
    values.add(property.maximumOccupancy);
  }

  for (const room of property.roomList ?? []) {
    if (room.minimumOccupancy && room.minimumOccupancy > 0) values.add(room.minimumOccupancy);
    if (room.maximumOccupancy && room.maximumOccupancy > 0) values.add(room.maximumOccupancy);
  }

  const sorted = Array.from(values).sort((a, b) => a - b);
  const limited = sorted.length > 3 ? [sorted[0], sorted[Math.floor(sorted.length / 2)], sorted[sorted.length - 1]] : sorted;

  return limited.map((value) => `${value} Guests`);
}

function extractCardRating(ratingLabel: string) {
  const match = ratingLabel.match(/^([0-9.]+)/);
  return match ? match[1] : "-";
}

function buildRatingLabel(property: HotelMateProperty) {
  if (property.bookOneRating && property.noOfBookOneReview) {
    return `${property.bookOneRating} (${property.noOfBookOneReview} Reviews)`;
  }

  return "- (0 Reviews)";
}

function formatAddress(address?: HotelMateAddress | null) {
  const values = [
    address?.streetNumber,
    address?.streetName,
    address?.suburb,
    address?.city,
    address?.state,
    address?.postcode,
    address?.country,
  ]
    .map((value) => value?.trim())
    .filter((value): value is string => Boolean(value));

  return values.join(", ") || "Location details available on booking confirmation.";
}

function getImageUrls(images: HotelMateImage[] | null | undefined, fallbackImage: string) {
  const urls = (images ?? [])
    .map((image) => image.url?.trim())
    .filter((value): value is string => Boolean(value));

  return urls.length ? urls.slice(0, 6) : [fallbackImage];
}

function prioritizePrimaryImage(images: string[], slug: string, fallbackImage: string) {
  if (!["rajgad-water-park-resort", "ruturang-agro-resort", "4-bhk-bhor", "peacock-hills-resort-pune"].includes(slug)) {
    return images;
  }

  return [fallbackImage, ...images.filter((image) => image !== fallbackImage)].slice(0, 6);
}

function buildTags(property: HotelMateProperty, title: string) {
  const tags = [
    normalizePropertyType(property.businessSubtype || property.businessType),
    title,
    property.address?.city,
  ]
    .map((value) => value?.trim())
    .filter((value): value is string => Boolean(value))
    .slice(0, 3);

  return tags.map((value) => `#${value.replace(/\s+/g, "_")}`);
}

function buildManagerLabel(property: HotelMateProperty) {
  const managerName = [property.managerFirstName, property.managerLastName]
    .map((value) => value?.trim())
    .filter(Boolean)
    .join(" ");

  return managerName ? `Manager: ${managerName}` : null;
}

function normalizePropertyType(value?: string | null) {
  const normalized = value?.trim();

  if (!normalized) return "Stay";
  if (normalized === "Villas") return "Villa";
  if (normalized === "Resorts") return "Resort";
  if (normalized === "Hotels") return "Hotel";
  if (normalized === "Homestays") return "Homestay";

  return normalized;
}

function inferAmenityIcon(label: string): AmenityIconKey {
  const value = label.toLowerCase();

  if (value.includes("wifi")) return "wifi";
  if (value.includes("ac") || value.includes("fan") || value.includes("cooler")) return "wind";
  if (value.includes("breakfast") || value.includes("tea") || value.includes("coffee")) return "coffee";
  if (value.includes("parking") || value.includes("car")) return "car";
  if (value.includes("kitchen") || value.includes("restaurant") || value.includes("bbq") || value.includes("meal")) return "utensils";
  if (value.includes("pool") || value.includes("water") || value.includes("rain")) return "droplets";
  if (value.includes("tv") || value.includes("speaker") || value.includes("music")) return "monitor";

  return "star";
}

function formatOccupancy(minimum?: number | null, maximum?: number | null) {
  if (minimum && maximum) {
    return `${minimum} to ${maximum} Guests`;
  }

  if (maximum) {
    return `Up to ${maximum} Guests`;
  }

  if (minimum) {
    return `${minimum} Guests`;
  }

  return "Guests on request";
}

function htmlToText(value?: string | null) {
  if (!value) return "";

  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+\n/g, "\n")
    .replace(/\n\s+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
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

function slugToTitle(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
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

function formatApiDate(date: Date) {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function buildExternalBookingUrl(seoFriendlyName?: string | null, slug?: string) {
  if (slug) {
    const source = propertySourceBySlug[slug.toLowerCase()];
    if (source?.bookingPath) {
      return `https://bookone.io/${source.bookingPath}`;
    }
  }
  const path = seoFriendlyName?.trim() || slugToTitle(slug ?? "").replace(/\s+/g, "-");
  return path ? `https://bookone.io/${path}` : undefined;
}

/** Returns the next Saturday from today (or today if it is Saturday). */
function getDefaultCheckInDate(): string {
  const today = new Date();
  const daysUntilSaturday = (6 - today.getDay() + 7) % 7 || 7;
  const checkIn = new Date(today);
  checkIn.setDate(today.getDate() + daysUntilSaturday);
  return checkIn.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/** Returns the Sunday after the default check-in date. */
function getDefaultCheckOutDate(): string {
  const today = new Date();
  const daysUntilSunday = (7 - today.getDay() + 7) % 7 || 7;
  const checkOut = new Date(today);
  checkOut.setDate(today.getDate() + daysUntilSunday);
  return checkOut.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function findMatchingDynamicRoom(
  curatedRoom: any,
  curatedIndex: number,
  dynamicRooms: any[],
  curatedRooms: any[]
): any | null {
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
  const normalize = (name: string) => {
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
