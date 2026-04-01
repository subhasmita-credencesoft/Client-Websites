export type MountainInfoPageData = {
  slug: string;
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
  intro: {
    eyebrow: string;
    title: string;
    body: string;
  };
  cards: Array<{
    label: string;
    title: string;
    description: string;
    image: string;
  }>;
  highlights: {
    title: string;
    items: string[];
  };
  extraSections?: Array<{
    title: string;
    body: string;
  }>;
  checklist?: {
    title: string;
    items: string[];
  };
  summary: {
    title: string;
    body: string;
  };
  contact?: {
    title: string;
    lines: string[];
  };
  locationDetails?: {
    title: string;
    venue: string;
    description: string;
    mapLabel: string;
    mapHref?: string;
    embedSrc?: string;
    travelNotes?: {
      title: string;
      items: string[];
    }[];
  };
  officialAddress?: {
    title: string;
    lines: string[];
    note?: string;
  };
  form?: {
    eyebrow: string;
    title: string;
    description: string;
    fields: {
      name: string;
      email: string;
      phone: string;
      eventDate: string;
      guestCount: string;
      message: string;
    };
    submitLabel: string;
  };
};

const heroExterior = "https://bookonelocal.in/cdn/2025-06-24-092820440-5.jpg";
const hotelMap = "https://maps.google.com/?q=Hotel+Redwings+Castle+Panvel";
const hotelEmbed =
  "https://www.google.com/maps?q=Hotel%20Redwings%20Castle%20Panvel&output=embed";

export const quotationPageData: MountainInfoPageData = {
  slug: "quotation",
  hero: {
    title: "Room Tariff & Booking Overview",
    subtitle: "Compare room categories, understand stay pricing, and plan the right Hotel Redwings Castle booking before confirming your travel dates.",
    image: "https://bookonelocal.in/cdn/2025-06-24-095002532-20.jpg",
  },
  intro: {
    eyebrow: "Booking Overview",
    title: "Plan the right room booking with clear rate and stay guidance",
    body:
      "Hotel Redwings Castle offers five room categories across different comfort levels. Final booking fit depends on travel dates, guest count, preferred room type, and current availability for the selected stay period.",
  },
  cards: [
    {
      label: "BOOKING",
      title: "Room Category Selection",
      description: "Guests can choose between Standard, Deluxe, Luxury, Supreme, and Maharaja Suite room categories depending on budget and comfort needs.",
      image: "https://bookonelocal.in/cdn/2025-06-24-094924878-18.jpg",
    },
    {
      label: "BOOKING",
      title: "Tariff Range",
      description: "Current pricing ranges from Rs. 2,750 for Standard Room to Rs. 8,250 for Maharaja Suite Room, subject to availability and final confirmation.",
      image: "https://bookonelocal.in/cdn/2025-06-24-094800530-16.jpg",
    },
    {
      label: "BOOKING",
      title: "Extra Person Notes",
      description: "Some room plans can include extra person charges, with premium categories showing Rs. 1,100 where applicable.",
      image: "https://bookonelocal.in/cdn/2025-06-24-095012773-12.jpg",
    },
    {
      label: "BOOKING",
      title: "Availability Support",
      description: "The hotel team can guide the best room option after reviewing your dates, guest count, and room preference.",
      image: "https://bookonelocal.in/cdn/2025-06-24-092853092-22.jpg",
    },
  ],
  highlights: {
    title: "Booking Support Includes",
    items: [
      "Room category comparison",
      "Current tariff direction",
      "Guest count review",
      "Check-in and check-out planning",
      "Hotel contact and location guidance",
      "Availability-led room recommendation",
    ],
  },
  extraSections: [
    {
      title: "How room selection usually works",
      body: "Budget-conscious guests often start with Standard or Deluxe rooms, while guests seeking more refined interiors and comfort usually prefer Luxury, Supreme, or Maharaja Suite stays.",
    },
    {
      title: "Why tariff clarity matters",
      body: "Clear pricing across the room categories helps guests match budget with comfort level before speaking to the hotel team about final availability.",
    },
  ],
  summary: {
    title: "A clearer room comparison makes the final booking easier",
    body: "By reviewing category, pricing, guest count, and dates together, Hotel Redwings Castle can guide guests toward a stay option that fits both comfort and budget expectations.",
  },
};

export const keyAdvantagesPageData: MountainInfoPageData = {
  slug: "key-advantages",
  hero: {
    title: "Hotel Services & Stay Advantages",
    subtitle: "Useful amenities and service support that make Hotel Redwings Castle practical for Panvel stays.",
    image: "https://bookonelocal.in/cdn/2025-06-24-092831095-3.jpg",
  },
  intro: {
    eyebrow: "Why Stay Here",
    title: "Everything needed for a smoother Panvel hotel experience",
    body:
      "Hotel Redwings Castle combines room variety, service support, and accessible location to make business travel, family visits, and short city stays more comfortable and manageable.",
  },
  cards: [
    {
      label: "ADVANTAGE",
      title: "Free WiFi",
      description: "Guests can stay connected during work, transit, or leisure stays with complimentary Wi-Fi support.",
      image: "https://bookonelocal.in/cdn/2025-06-24-094832431-19.jpg",
    },
    {
      label: "ADVANTAGE",
      title: "Free Hotel Parking",
      description: "Complimentary parking helps make local travel and hotel arrival easier for guests moving by car.",
      image: "https://bookonelocal.in/cdn/2025-06-24-092904251-25.jpg",
    },
    {
      label: "ADVANTAGE",
      title: "24-hour Room Service",
      description: "Round-the-clock room service adds convenience for guests arriving late or preferring in-room support.",
      image: "https://bookonelocal.in/cdn/2025-06-24-092839204-10.jpg",
    },
    {
      label: "ADVANTAGE",
      title: "Housekeeping & Support",
      description: "Housekeeping, luggage storage, first aid, doctor on call, and power backup support a smoother overall stay.",
      image: "https://bookonelocal.in/cdn/2025-06-24-095124999-4.jpg",
    },
  ],
  highlights: {
    title: "Guest Comfort Features",
    items: [
      "Air-conditioning",
      "Room service",
      "Wi-Fi access",
      "Free parking",
      "Housekeeping",
      "Luggage storage",
      "Doctor on call",
      "Power backup",
      "CCTV in public areas",
    ],
  },
  extraSections: [
    {
      title: "Good for business and transit stays",
      body: "The hotel works well for guests who need dependable room comfort, Wi-Fi, and location access instead of a complicated resort-style setup.",
    },
    {
      title: "Good for family and couple stays",
      body: "Multiple room categories make it easier to select the right comfort level for different stay styles without leaving the same property.",
    },
  ],
  summary: {
    title: "The best hotel stays often come from useful services done well",
    body: "Hotel Redwings Castle focuses on the service details that matter most to guests: room comfort, support, convenience, and accessible location.",
  },
};

export const rulesPageData: MountainInfoPageData = {
  slug: "rules",
  hero: {
    title: "Hotel Stay Terms & Guest Guidelines",
    subtitle: "Important rules and practical notes that help guests plan a smooth stay at Hotel Redwings Castle.",
    image: "https://bookonelocal.in/cdn/2025-06-24-092839204-10.jpg",
  },
  intro: {
    eyebrow: "Guest Guidelines",
    title: "Important stay notes before check-in",
    body:
      "Following hotel guidelines helps keep the room inventory, common areas, and guest experience comfortable for everyone staying at the property.",
  },
  cards: [
    {
      label: "GUIDELINE",
      title: "Carry Valid ID",
      description: "Guests should keep valid identification ready during check-in for a smoother arrival process.",
      image: "https://bookonelocal.in/cdn/2025-06-24-094807016-15.jpg",
    },
    {
      label: "GUIDELINE",
      title: "Confirm Room Category",
      description: "Room allocation and final tariff should be confirmed with the hotel team before arrival, especially for premium categories.",
      image: "https://bookonelocal.in/cdn/2025-06-24-094939625-29.jpg",
    },
    {
      label: "GUIDELINE",
      title: "Use Services Responsibly",
      description: "Room service, housekeeping, and public amenities should be used responsibly to maintain guest comfort and property quality.",
      image: "https://bookonelocal.in/cdn/2025-06-24-095145740-23.jpg",
    },
    {
      label: "GUIDELINE",
      title: "Stay Within Property Norms",
      description: "Guests are expected to respect hotel rules, room condition, and common-area discipline during the stay.",
      image: heroExterior,
    },
  ],
  highlights: {
    title: "Helpful stay rules",
    items: [
      "Valid ID at check-in",
      "Room type subject to confirmation",
      "Respect room and public areas",
      "Coordinate special requests with the hotel team",
      "Follow hotel service timings where applicable",
    ],
  },
  summary: {
    title: "A smoother stay begins with clear expectations",
    body: "Simple hotel rules help protect room quality, guest convenience, and the overall stay experience at Hotel Redwings Castle.",
  },
};

export const checkInPageData: MountainInfoPageData = {
  slug: "check-in",
  hero: {
    title: "Check-In, Location & Contact Support",
    subtitle: "Plan your arrival with clear address, contact, and travel guidance for Hotel Redwings Castle, Panvel.",
    image: heroExterior,
  },
  intro: {
    eyebrow: "Arrival Details",
    title: "Reach the hotel with better clarity before your stay begins",
    body:
      "Hotel Redwings Castle is located in Panvel near Orion Mall, New Panvel Bridge, and the Mumbai Pune Expressway corridor, making it useful for guests traveling by road or rail.",
  },
  cards: [
    {
      label: "CONTACT",
      title: "Direct Booking Phone",
      description: "+91 9930022229 for room booking support, stay details, and arrival coordination.",
      image: "https://bookonelocal.in/cdn/2025-06-24-092828011-2.jpg",
    },
    {
      label: "LOCATION",
      title: "Panvel Location",
      description: "Near Orion Mall, New Panvel Bridge, Old Mumbai Pune Expressway, Panvel, Maharashtra 410206.",
      image: "https://bookonelocal.in/cdn/2025-06-24-092904251-25.jpg",
    },
    {
      label: "TRAVEL",
      title: "Nearby Travel Points",
      description: "Panvel Railway Station is around 1.2 km away and T2 Chhatrapati Shivaji Airport is approximately 39.9 km away.",
      image: "https://bookonelocal.in/cdn/2025-06-24-092853092-22.jpg",
    },
    {
      label: "SUPPORT",
      title: "WhatsApp Availability",
      description: "Guests can also reach the hotel team through WhatsApp on the same primary number for quick stay support.",
      image: "https://bookonelocal.in/cdn/2025-06-24-092831095-3.jpg",
    },
  ],
  highlights: {
    title: "Before You Arrive",
    items: [
      "Keep valid ID ready",
      "Confirm your room category",
      "Save the direct contact number",
      "Review location route before travel",
      "Coordinate any special requests in advance",
    ],
  },
  contact: {
    title: "Hotel Contact Details",
    lines: [
      "Phone: +91 9930022229",
      "WhatsApp: +91 9930022229",
      "Email: info@redwingscatlegmailcom",
    ],
  },
  locationDetails: {
    title: "Location",
    venue: "Hotel Redwings Castle",
    description: "A Panvel hotel with accessible road and rail connectivity for city stays, transit, and local travel convenience.",
    mapLabel: "Panvel, Maharashtra, India",
    mapHref: hotelMap,
    embedSrc: hotelEmbed,
    travelNotes: [
      {
        title: "Nearby transit points",
        items: [
          "Panvel Railway Station approximately 1.2 km",
          "Kalamboli Goods Railway Station approximately 7 km",
          "T2 Chhatrapati Shivaji Airport approximately 39.9 km",
        ],
      },
      {
        title: "Nearby places",
        items: [
          "Rock Garden approximately 14.8 km",
          "Belapur Fort approximately 14.6 km",
          "Near Orion Mall and New Panvel Bridge",
        ],
      },
    ],
  },
  officialAddress: {
    title: "Official Address",
    lines: [
      "Hotel Redwings Castle",
      "X4V8+R3, Near to Orion Mall / New Panvel Bridge",
      "Old Mumbai - Pune Expressway",
      "Panvel, Maharashtra 410206, India",
    ],
    note: "For easier arrival assistance, call or WhatsApp the hotel team before reaching the property.",
  },
  form: {
    eyebrow: "Enquiry Form",
    title: "Send your booking enquiry",
    description: "Share your dates, room interest, and guest count so the hotel team can guide the right stay option.",
    fields: {
      name: "Your name",
      email: "Your email",
      phone: "Phone number",
      eventDate: "Preferred check-in date",
      guestCount: "Total guests",
      message: "Share room preference or special request",
    },
    submitLabel: "SEND ENQUIRY",
  },
  extraSections: [
    {
      title: "Why direct contact helps",
      body: "Direct hotel contact makes it easier to confirm room category, rate direction, arrival support, and any room-specific requirement before reaching Panvel.",
    },
  ],
  summary: {
    title: "The best arrival experience starts with clear hotel contact and location guidance",
    body: "Hotel Redwings Castle is easiest to access when guests confirm the route, room type, and stay details in advance with the hotel team.",
  },
};

export const contactPageData = checkInPageData;

export const mediaAwardsPageData: MountainInfoPageData = {
  slug: "media-awards",
  hero: {
    title: "Hotel Presentation & Visual Identity",
    subtitle: "A closer look at the room visuals, hotel style, and service-led impression that define Hotel Redwings Castle.",
    image: "https://bookonelocal.in/cdn/2025-06-24-095348564-6.jpg",
  },
  intro: {
    eyebrow: "Visual Identity",
    title: "A hotel experience that communicates comfort and practical luxury",
    body:
      "Hotel Redwings Castle presents itself through clean exteriors, polished room interiors, and a room inventory that gives guests visible choice and comfort confidence before booking.",
  },
  cards: [
    {
      label: "VISUAL",
      title: "Clean Room Presentation",
      description: "Room interiors are one of the strongest trust signals for hotel bookings, especially across the premium room categories.",
      image: "https://bookonelocal.in/cdn/2025-06-24-095002532-20.jpg",
    },
    {
      label: "VISUAL",
      title: "Clear Property Identity",
      description: "The hotel presents a straightforward hospitality image that suits both work-led and leisure-oriented stays.",
      image: heroExterior,
    },
    {
      label: "VISUAL",
      title: "Premium Yet Accessible",
      description: "The property combines premium rooms with value-focused options, making the visual identity useful to a wider guest base.",
      image: "https://bookonelocal.in/cdn/2025-06-24-094924878-18.jpg",
    },
    {
      label: "VISUAL",
      title: "Comfort-Led Story",
      description: "The room mix and service features position the hotel around practical comfort rather than only decorative appeal.",
      image: "https://bookonelocal.in/cdn/2025-06-24-094800530-16.jpg",
    },
  ],
  highlights: {
    title: "What the visuals communicate",
    items: [
      "Comfortable room interiors",
      "Useful premium room categories",
      "Clear hotel identity",
      "Service-led stay positioning",
      "Panvel location convenience",
    ],
  },
  summary: {
    title: "Strong hotel presentation helps guests trust the stay before booking",
    body: "When room visuals, property tone, and practical service signals align clearly, guests can understand Hotel Redwings Castle more quickly and book with better confidence.",
  },
};
