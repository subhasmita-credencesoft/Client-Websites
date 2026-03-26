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

export const quotationPageData: MountainInfoPageData = {
  slug: "quotation",
  hero: {
    title: "Quotation & Final Estimate",
    subtitle: "Selected package, guest count, dates, and stay duration determine the final quotation at The Mountain, Karjat.",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2200&q=80",
  },
  intro: {
    eyebrow: "Quotation Summary",
    title: "Plan your destination wedding quotation with the right package, dates, and guest count",
    body:
      "The final quotation is prepared based on event type, venue selection, booking dates, selected package, total guests, weekday or weekend booking, and the stay required for the celebration.",
  },
  cards: [
    {
      label: "QUOTATION",
      title: "Selected Package & Event Type",
      description: "Event type: Wedding. Venue: The Mountain, Karjat. Final costing depends on whether the selected package is Classic, Signature, or Premium Luxo.",
      image: "https://images.unsplash.com/photo-1602002418672-43121356c3a9?auto=format&fit=crop&w=1600&q=80",
    },
    {
      label: "QUOTATION",
      title: "Dates, Guests & Stay",
      description: "Dates, total guests, weekday or weekend booking, and the total stay required all directly influence the final quotation estimate.",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80",
    },
    {
      label: "QUOTATION",
      title: "Billing Basis",
      description: "Packages are calculated per person per day, inclusive of stay, meals, services, lawn access, and venue usage, with final billing based on the confirmed headcount.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
    },
    {
      label: "QUOTATION",
      title: "Booking Note",
      description: "50% advance is required to block dates. Remaining payment terms, headcount confirmation, and schedule alignment are finalized before check-in.",
      image: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=1600&q=80",
    },
  ],
  highlights: {
    title: "Quotation Includes",
    items: [
      "Event type and venue selection",
      "Selected package and package tier",
      "Dates and weekday or weekend booking",
      "Total guest count and final headcount",
      "Required stay duration",
      "Per person per day package basis",
    ],
  },
  extraSections: [
    {
      title: "How the final estimate is prepared",
      body:
        "The final quotation at The Mountain is prepared after confirming the package type, total guests, event schedule, stay duration, and whether the celebration falls on weekday or weekend dates.",
    },
    {
      title: "What is included in package costing",
      body:
        "Package costing is calculated per person per day and may include stay, meals, services, lawn access, venue usage, and package-specific hospitality features depending on the selected plan.",
    },
  ],
  checklist: {
    title: "Quotation details to confirm",
    items: [
      "Event type: Wedding",
      "Venue: The Mountain, Karjat",
      "Selected package: Classic / Signature / Premium Luxo",
      "Dates of celebration",
      "Total guests",
      "Weekday or weekend booking",
      "Total stay required",
      "Tentative total package estimate",
    ],
  },
  summary: {
    title: "Need a final custom estimate?",
    body: "Share your dates, package choice, and expected guest count with The Mountain team to prepare the final quotation for your celebration.",
  },
  contact: {
    title: "Quotation Contact",
    lines: [
      "+91 9833866655",
      "9892011179",
      "instagram.com/themountain.karjat",
      "www.themountainresorts.com",
    ],
  },
};

export const keyAdvantagesPageData: MountainInfoPageData = {
  slug: "key-advantages",
  hero: {
    title: "Key Advantages",
    subtitle:
      "Unlimited music, full venue control, 24x7 pool access, total privacy, and wedding-ready celebration spaces at The Mountain, Karjat.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=2200&q=80",
  },
  intro: {
    eyebrow: "Key Advantages",
    title: "Everything needed for a private destination wedding under one roof",
    body:
      "The Mountain, Karjat is designed for destination weddings with unlimited music hours, 24x7 pool access, zero sound license requirement, full venue access, private estate privacy, and celebration zones that work beautifully for haldi, mehendi, sangeet, cocktails, receptions, and staycation weddings.",
  },
  cards: [
    {
      label: "ADVANTAGE",
      title: "Unlimited Music Hours",
      description: "Enjoy music anytime on the lawn with no sound restrictions, giving every wedding function more freedom, energy, and celebration flow.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80",
    },
    {
      label: "ADVANTAGE",
      title: "24x7 Pool Access",
      description: "Take a dip or unwind whenever you like, with round-the-clock pool access adding relaxation and fun to the full wedding stay experience.",
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=80",
    },
    {
      label: "ADVANTAGE",
      title: "Zero Sound License Required",
      description: "No additional sound permits or extra fees are needed, helping you plan music-led events more easily and with fewer approval hurdles.",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80",
    },
    {
      label: "ADVANTAGE",
      title: "Full Venue Access",
      description: "The entire property is exclusively yours for the event, supporting smooth movement, event planning flexibility, and complete celebration control.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
    },
    {
      label: "ADVANTAGE",
      title: "Private Estate",
      description: "Absolute privacy with no outsider interference, making the venue feel secure, exclusive, and more comfortable for all wedding guests.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    },
    {
      label: "ADVANTAGE",
      title: "Perfect For All Wedding Events",
      description: "Ideal for sangeet, haldi, mehendi, cocktails, receptions, and staycation weddings with a natural destination setting.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80",
    },
    {
      label: "ADVANTAGE",
      title: "Pool + Rain Dance Zone",
      description: "Celebrate against a stunning mountain and lake view backdrop with poolside and rain dance moments that feel memorable and photogenic.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80",
    },
  ],
  highlights: {
    title: "Why guests choose The Mountain",
    items: [
      "Unlimited music hours on the lawn with no sound restrictions",
      "24x7 pool access for wedding groups and stay guests",
      "Zero sound license required with no added permit fees",
      "Full venue access with exclusive control of the property",
      "Private estate comfort with no outsider interference",
      "Perfect for sangeet, haldi, mehendi, cocktails, receptions, and staycation weddings",
      "Pool and rain dance zone with mountain and lake view backdrop",
    ],
  },
  summary: {
    title: "Built for destination celebrations",
    body:
      "The Mountain combines venue control, privacy, poolside leisure, music freedom, and function-ready spaces so every celebration can flow smoothly from welcome events to the final reception.",
  },
};

export const rulesPageData: MountainInfoPageData = {
  slug: "rules",
  hero: {
    title: "Rules & Regulations",
    subtitle: "Guest ID, vendor approval, property limits, and responsible usage guidelines for event stays.",
    image: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=2200&q=80",
  },
  intro: {
    eyebrow: "Rules",
    title: "Important guidelines for stays, vendors, music, and property usage",
    body:
      "Government ID is mandatory for staying guests, outside catering is not allowed in package bookings, property damage is chargeable, vendors require prior approval, loud music must remain within property limits, smoking is allowed only in designated areas, and lost belongings remain the guest's responsibility.",
  },
  cards: [
    {
      label: "RULES",
      title: "Guest & Vendor Policy",
      description: "Staying guests require valid ID, outside catering is not allowed in package bookings, and decorators or vendors need prior property approval before execution.",
      image: "https://images.unsplash.com/photo-1578808534343-171f6908071a?auto=format&fit=crop&w=1600&q=80",
    },
    {
      label: "RULES",
      title: "Property Terms",
      description: "Property damage is chargeable, loud music must remain within limits, smoking is only in designated areas, and guest belongings remain under guest responsibility.",
      image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&w=1600&q=80",
    },
  ],
  highlights: {
    title: "Rules overview",
    items: [
      "Government ID mandatory for staying guests",
      "Outside catering not allowed in package bookings",
      "Property damage is chargeable",
      "Decorators and vendors require approval",
      "Loud music only within property limits",
      "Smoking only in designated areas",
      "Lost belongings remain guest responsibility",
    ],
  },
  summary: {
    title: "Respectful celebrations work best",
    body: "Following the venue rules helps keep the property safe, the event smooth, and the destination wedding experience enjoyable for everyone.",
  },
};

export const checkInPageData: MountainInfoPageData = {
  slug: "check-in",
  hero: {
    title: "Check-In / Payment Terms",
    subtitle: "50% advance to block dates with check-in, check-out, and headcount-based billing terms.",
    image: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=2200&q=80",
  },
  intro: {
    eyebrow: "Check-In",
    title: "Booking terms, arrival timing, and payment schedule for confirmed events",
    body:
      "Check-in time is 2 PM, check-out time is 11 AM, 50% advance is required to block dates, the remaining 50% is due before check-in, final billing depends on headcount, and date changes remain subject to availability.",
  },
  cards: [
    {
      label: "TERMS",
      title: "Check-In Details",
      description: "Check-in starts at 2 PM and check-out is at 11 AM to support smooth operational planning during multi-day destination events.",
      image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1600&q=80",
    },
    {
      label: "TERMS",
      title: "Advance & Billing",
      description: "50% advance blocks the date, remaining payment is due before check-in, final billing depends on headcount, and date changes remain subject to availability.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
    },
  ],
  highlights: {
    title: "Payment terms overview",
    items: [
      "Check-in time: 2 PM",
      "Check-out time: 11 AM",
      "50% advance required to block dates",
      "Remaining payment due before check-in",
      "Final package based on headcount",
      "Date reschedule subject to availability",
    ],
  },
  summary: {
    title: "Confirm dates with confidence",
    body: "The Mountain team aligns booking, check-in, payment, and final guest-count planning before arrival so destination events can run smoothly.",
  },
};

export const contactPageData: MountainInfoPageData = {
  slug: "contact",
  hero: {
    title: "Contact The Mountain, Karjat",
    subtitle: "Reach our team for wedding packages, quotation details, stay planning, and venue booking support.",
    image: "/images/DSC08849.avif",
  },
  intro: {
    eyebrow: "Contact",
    title: "Wedding enquiry, location details, and official contact information",
    body:
      "Reach The Mountain team for wedding package details, venue booking support, stay planning, and final quotation guidance through the enquiry form and our official contact channels.",
  },
  cards: [
    {
      label: "PHONE",
      title: "+91 9833866655",
      description: "Primary wedding and quotation contact number for package enquiries, availability, and event planning coordination.",
      image: "/images/DSC08846.avif",
    },
    {
      label: "ALTERNATE",
      title: "9892011179",
      description: "Alternate contact number for booking support, destination wedding discussions, and guest stay planning.",
      image: "/images/DSC08831.avif",
    },
    {
      label: "INSTAGRAM",
      title: "themountain.karjat",
      description: "View recent updates, destination wedding visuals, and venue moments on Instagram: instagram.com/themountain.karjat.",
      image: "/images/DSC08853.avif",
    },
    {
      label: "WEBSITE",
      title: "www.themountainresorts.com",
      description: "Browse venue information, package direction, and enquiry details through the official Mountain Resorts website.",
      image: "/images/DSC08769.avif",
    },
  ],
  highlights: {
    title: "How we help you plan faster",
    items: [
      "Wedding package discussions",
      "Weekday and weekend quotation guidance",
      "Stay and accommodation planning",
      "Venue availability checks",
      "Final quotation coordination",
      "Direct booking enquiry support",
    ],
  },
  extraSections: [
    {
      title: "Venue location",
      body: "The Mountain, Karjat is a destination wedding and event venue designed for celebrations, guest stays, scenic photography, and private function planning in a scenic Karjat setting.",
    },
    {
      title: "Best way to reach out",
      body: "For the fastest response, submit the enquiry form with your dates and guest count, then use the contact numbers for immediate follow-up on pricing, availability, and booking discussions.",
    },
  ],
  summary: {
    title: "Ready to plan your celebration?",
    body: "Share your dates, guest count, and preferred package with The Mountain team to receive the right guidance for your event and final booking process.",
  },
  locationDetails: {
    title: "Location",
    venue: "The Mountain, Karjat",
    description: "Destination wedding and event venue in Karjat, Maharashtra, designed for celebrations, scenic stays, and private function planning.",
    mapLabel: "Karjat, Maharashtra, India",
    mapHref:
      "https://www.google.com/maps?sca_esv=43fa2c2a8874a904&biw=1536&bih=695&output=search&q=the+mount+mountain+resort+karjat&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpaEWjvZ2Py1XXV8d8KvlI3j2nXl-YQ05KjnWz5SrU93H7yjmEhUi5AUSwdCoCuNwie-czyxQMvTuWSlT3BPO9ef57Df0akpAmTwATVmYkh_LvFLiGrWovKNbNsupwPLOpHC3eODG_KMmmQ47LgFx7GlH3Y2J_dRy3N72Y_pxwdxrk0xjsYtPBmAKirvLCw8R11fqAIg&entry=mc&ved=1t:200715&ictx=111",
    embedSrc: "https://maps.google.com/maps?q=the%20mount%20mountain%20resort%20karjat&z=13&output=embed",
    travelNotes: [
      {
        title: "From Mumbai",
        items: [
          "Approx. 2 to 3 hours by road depending on traffic and pickup point.",
          "Convenient for guests arriving from Mumbai, Navi Mumbai, and nearby wedding groups.",
          "Best shared through Google Maps with the venue name before travel.",
        ],
      },
      {
        title: "From Pune",
        items: [
          "Approx. 2 to 2.5 hours by road depending on travel timing.",
          "Suitable for guests, vendors, and planners travelling from Pune for destination events.",
        ],
      },
      {
        title: "Planning Note",
        items: [
          "Please call before arrival for the best route guidance, check-in coordination, and venue access support.",
        ],
      },
    ],
  },
  officialAddress: {
    title: "Official Address",
    lines: [
      "The Mountain, Karjat",
      "Karjat, Maharashtra, India",
    ],
    note: "For exact navigation assistance and booking support, call before arrival so our team can guide you directly to the venue.",
  },
  contact: {
    title: "Direct Contact Details",
    lines: [
      "+91 9833866655",
      "9892011179",
      "instagram.com/themountain.karjat",
      "www.themountainresorts.com",
      "The Mountain, Karjat",
    ],
  },
  form: {
    eyebrow: "Enquiry Form",
    title: "Send Your Wedding Enquiry",
    description:
      "Share your preferred dates, guest count, and package requirement. The Mountain team will get back to you for quotation and booking support.",
    fields: {
      name: "Your Name",
      email: "Email Address",
      phone: "Phone Number",
      eventDate: "Event Date",
      guestCount: "Guest Count",
      message: "Tell us about your event",
    },
    submitLabel: "SEND ENQUIRY",
  },
};
