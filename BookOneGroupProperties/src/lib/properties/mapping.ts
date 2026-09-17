import { propertySourceBySlug } from "@/lib/properties/sources";
import { propertyDetailsBySlug } from "@/data/property-details";
import { HOTELMATE_CHECK_AVAILABILITY_BASE } from "@/lib/api/hotelmate/urls";
import type { AmenityIconKey, PropertyDetails } from "@/lib/properties/types";
import type {
  HotelMateAddress,
  HotelMateImage,
  HotelMateProperty,
  HotelMateRoom,
  HotelMateService,
} from "@/lib/api/hotelmate/types";

export function mapHotelMatePropertyToDetails(
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
  const cleanedDescription = htmlToText(property.businessDescription) || `${title} offers a comfortable stay experience.`;
  const detailLines = buildDetailLines(property, cleanedDescription);
  const activities = buildActivities(property);
  // Use resolved rooms (API or static) for occupancy + pricing
  const guestOptions = buildGuestOptions(property);
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
      availabilityApiUrl: property.id ? `${HOTELMATE_CHECK_AVAILABILITY_BASE}/${property.id}` : undefined,
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

function buildGuestOptions(property: HotelMateProperty) {
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

export function extractCardRating(ratingLabel: string) {
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

export function slugToTitle(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
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