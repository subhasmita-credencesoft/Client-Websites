/**
 * Redwings Studio — Structured Data (JSON-LD) Library
 * All schemas follow schema.org and are validated against Google Rich Results requirements.
 */

export const SITE_URL = "https://redwingsstudio.com";
export const SITE_NAME = "Redwings Studio";
export const BOOKING_URL = "https://bookone.io/Redwings-Studio?bookingEngine=true";
export const OG_IMAGE = `${SITE_URL}/mountain-studio/hero-main.jpeg`;

// ─── Core Property Data ───────────────────────────────────────────────────────

export const propertyAddress = {
  "@type": "PostalAddress",
  streetAddress: "House No. 275/1, F30, Abalone Resort, Gorbhat",
  addressLocality: "Goa",
  addressRegion: "GA",
  postalCode: "403516",
  addressCountry: "IN",
};

export const propertyGeo = {
  "@type": "GeoCoordinates",
  latitude: "15.5506",
  longitude: "73.7515",
};

// ─── Organization Schema ──────────────────────────────────────────────────────

export const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/redwings-studio-logo.svg`,
    width: 250,
    height: 60,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-9167680996",
      contactType: "reservations",
      availableLanguage: "English",
      areaServed: "IN",
    },
    {
      "@type": "ContactPoint",
      telephone: "+91-9763988999",
      contactType: "customer service",
      availableLanguage: "English",
      areaServed: "IN",
    },
  ],
  email: "psomvanshi9@gmail.com",
  address: propertyAddress,
};

// ─── LodgingBusiness Schema ───────────────────────────────────────────────────

export const lodgingSchema = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": `${SITE_URL}/#lodging`,
  name: SITE_NAME,
  alternateName: "Redwings Studio Goa",
  url: SITE_URL,
  description:
    "Owner-managed studio apartment stays at Abalone Resort, Gorbhat, Goa. 10 rooms with direct booking support. Check-in 1:00 PM, check-out 11:00 AM.",
  telephone: "+91-9167680996",
  email: "psomvanshi9@gmail.com",
  priceRange: "₹₹",
  numberOfRooms: 10,
  checkinTime: "13:00",
  checkoutTime: "11:00",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Credit Card, UPI",
  address: propertyAddress,
  geo: propertyGeo,
  image: [
    `${SITE_URL}/mountain-studio/hero-main.jpeg`,
    `${SITE_URL}/mountain-studio/hero-secondary.jpeg`,
    `${SITE_URL}/mountain-studio/gallery-06.jpeg`,
  ],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Swimming Pool", value: true },
    { "@type": "LocationFeatureSpecification", name: "Room Service", value: true },
    { "@type": "LocationFeatureSpecification", name: "24-Hour Room Service", value: true },
    { "@type": "LocationFeatureSpecification", name: "Hot Water (Geyser)", value: true },
    { "@type": "LocationFeatureSpecification", name: "Flat Screen TV", value: true },
    { "@type": "LocationFeatureSpecification", name: "Garden Lawn", value: true },
    { "@type": "LocationFeatureSpecification", name: "Concierge Service", value: true },
  ],
  hasMap: "https://maps.google.com/?q=Abalone+Resort+Gorbhat+Goa+403516",
  isPartOf: {
    "@id": `${SITE_URL}/#organization`,
  },
};

// ─── WebSite Schema ───────────────────────────────────────────────────────────

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en-IN",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
};

// ─── LocalBusiness / ContactPage Schema ──────────────────────────────────────

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LodgingBusiness", "LocalBusiness"],
  "@id": `${SITE_URL}/contact#localbusiness`,
  name: SITE_NAME,
  url: SITE_URL,
  telephone: "+91-9167680996",
  email: "psomvanshi9@gmail.com",
  address: propertyAddress,
  geo: propertyGeo,
  openingHours: "Mo-Su 00:00-24:00",
  priceRange: "₹₹",
  image: OG_IMAGE,
  hasMap: "https://maps.google.com/?q=Abalone+Resort+Gorbhat+Goa+403516",
  currenciesAccepted: "INR",
};

// ─── BreadcrumbList ───────────────────────────────────────────────────────────

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── WebPage Schema ───────────────────────────────────────────────────────────

export function webPageSchema(opts: {
  path: string;
  name: string;
  description: string;
  type?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "WebPage",
    "@id": `${SITE_URL}${opts.path}#webpage`,
    url: `${SITE_URL}${opts.path}`,
    name: opts.name,
    description: opts.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#lodging` },
    breadcrumb: {
      "@id": `${SITE_URL}${opts.path}#breadcrumb`,
    },
  };
}

// ─── FAQPage Schema ───────────────────────────────────────────────────────────

export function faqSchema(
  faqs: Array<{ question: string; answer: string }>,
  path = "/faq"
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faqpage`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ─── HotelRoom Schema ─────────────────────────────────────────────────────────

export function hotelRoomSchema(room: {
  name: string;
  slug: string;
  description: string;
  price: number;
  size: number;
  beds: string;
  guests: number;
  view: string;
  amenities: string[];
  images: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    "@id": `${SITE_URL}/rooms/${room.slug}#room`,
    name: room.name,
    description: room.description,
    url: `${SITE_URL}/rooms/${room.slug}`,
    image: room.images,
    floorSize: {
      "@type": "QuantitativeValue",
      value: room.size,
      unitCode: "FTK",
      unitText: "sq ft",
    },
    bed: [
      {
        "@type": "BedDetails",
        typeOfBed: room.beds,
        numberOfBeds: 1,
      },
    ],
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: room.guests,
      unitText: "guests",
    },
    amenityFeature: room.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a,
      value: true,
    })),
    offers: {
      "@type": "Offer",
      price: room.price,
      priceCurrency: "INR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: room.price,
        priceCurrency: "INR",
        unitText: "NIGHT",
      },
      availability: "https://schema.org/InStock",
      url: BOOKING_URL,
      seller: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
    containedInPlace: {
      "@id": `${SITE_URL}/#lodging`,
    },
  };
}

// ─── Serialize helper ─────────────────────────────────────────────────────────

/** Safely stringify a schema object for use in dangerouslySetInnerHTML */
export function jsonLd(schema: object): string {
  return JSON.stringify(schema);
}
