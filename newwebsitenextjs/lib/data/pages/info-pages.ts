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
    title: "Wedding Proposal & Availability",
    subtitle: "A refined quotation begins with the right dates, guest count, stay plan, and package direction.",
    image: "https://bookonelocal.in/cdn/DSC08836.avif",
  },
  intro: {
    eyebrow: "Proposal Planning",
    title: "Share the essentials clearly and we can shape a more accurate wedding proposal from the very first conversation",
    body:
      "At The Mountain Resort in Karjat , By Redwings, every proposal is shaped around how your celebration will actually unfold, from preferred dates and stay duration to guest count, package tier, and whether you are planning a weekday or weekend wedding.",
  },
  cards: [
    {
        label: "PROPOSAL",
      title: "Selected Package & Event Type",
      description: "Your event format and selected package tier help define the structure of the proposal, whether you are planning an intimate gathering, a destination wedding weekend, or a larger multi-function celebration.",
      image: "https://bookonelocal.in/cdn/DSC08849.avif",
    },
    {
        label: "PROPOSAL",
      title: "Dates, Guests & Stay",
      description: "Preferred dates, guest count, weekday or weekend selection, and the stay requirement directly influence both availability and the most suitable package direction for your family.",
      image: "https://bookonelocal.in/cdn/DSC08831.avif",
    },
    {
        label: "PROPOSAL",
      title: "Billing Basis",
      description: "Packages are calculated per person per day and include stay, meals, services, lawn access, and venue usage, with final billing aligned to the confirmed headcount before check-in.",
      image: "https://bookonelocal.in/cdn/DSC08837.avif",
    },
    {
        label: "PROPOSAL",
      title: "Advance & Date Blocking",
      description: "A 50% advance secures your dates. The remaining balance is completed before check-in after headcount confirmation and final proposal alignment.",
      image: "https://bookonelocal.in/cdn/DSC08846.avif",
    },
  ],
  highlights: {
    title: "What shapes your proposal",
    items: [
      "Event type and celebration format",
      "Venue and package selection",
      "Selected package tier: Classic, Signature, or Premium Luxe",
      "Dates and weekday or weekend booking",
      "Total guest count and final confirmed headcount",
      "Total stay required and guest hosting requirement",
      "Tentative total package estimate",
    ],
  },
  extraSections: [
    {
      title: "How the final estimate is prepared",
      body:
        "The final quotation at The Mountain is prepared after confirming the package tier, total guests, event schedule, stay duration, and whether the celebration falls on weekday or weekend dates.",
    },
    {
      title: "What is included in package costing",
      body:
        "Package costing is calculated per person per day and includes stay, meals, services, lawn access, venue usage, and package-specific hospitality features depending on the selected plan.",
    },
    {
      title: "Why bundled wedding quotations help families plan better",
      body:
        "Because stay, meals, venue usage, and hospitality are considered together, the quotation becomes easier for families to understand than managing separate room, food, and venue costs across different vendors.",
    },
    {
      title: "What to share for a faster quotation response",
      body:
        "Share your preferred dates, event type, estimated guest count, selected package direction, and stay requirement. That helps our team respond with clearer package guidance and availability support.",
    },
  ],
  checklist: {
    title: "Quotation details to confirm",
    items: [
      "Event Type",
      "Venue",
      "Dates",
      "Selected Package",
      "Total Guests",
      "Weekend / Weekday",
      "Total Stay Required",
      "Tentative Total Package Estimate",
    ],
  },
  summary: {
    title: "Ready for a more accurate wedding proposal?",
    body: "Share your dates, guest count, package preference, and stay requirement so our team can guide availability and shape the right proposal for your celebration.",
  },
  contact: {
    title: "Availability & Dates Contact",
    lines: [
      "+91 9833866655",
      "+91 9892011179",
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
      "Unlimited music, full venue control, 24x7 pool access, total privacy, and wedding-ready celebration spaces at The Mountain Resort in Karjat , By Redwings.",
    image: "https://bookonelocal.in/cdn/DSC08853.avif",
  },
  intro: {
    eyebrow: "Key Advantages",
    title: "Everything needed for a private destination wedding and premium hosted stay in one estate",
    body:
      "The Mountain Resort in Karjat , By Redwings is designed for destination weddings with unlimited music hours, 24x7 pool access, zero sound license requirement, full venue access, private estate privacy, and celebration zones that work beautifully for Haldi, Mehendi, Sangeet, Cocktail Night, Reception, and staycation-style wedding weekends.",
  },
  cards: [
    {
      label: "ADVANTAGE",
      title: "Unlimited Music Hours",
      description: "Enjoy music across the celebration with greater freedom, giving every wedding function more energy and a smoother destination rhythm.",
      image: "https://bookonelocal.in/cdn/DSC08717.avif",
    },
    {
      label: "ADVANTAGE",
      title: "24x7 Pool Access",
      description: "Take a dip or unwind whenever you like, with round-the-clock pool access adding relaxation and destination charm to the full stay experience.",
      image: "https://bookonelocal.in/cdn/DSC08720.avif",
    },
    {
      label: "ADVANTAGE",
      title: "Zero Sound License Required",
      description: "No additional sound permits or extra fees are needed, helping you plan music-led events more easily and with fewer approval hurdles.",
      image: "https://bookonelocal.in/cdn/DSC08758.avif",
    },
    {
      label: "ADVANTAGE",
      title: "Full Venue Access",
      description: "The entire property is exclusively yours for the event, supporting smooth movement, event planning flexibility, and complete celebration control.",
      image: "https://bookonelocal.in/cdn/DSC08759.avif",
    },
    {
      label: "ADVANTAGE",
      title: "Private Estate",
      description: "Private-estate exclusivity keeps the venue feeling secure, exclusive, and more comfortable for couples, families, and wedding guests.",
      image: "https://bookonelocal.in/cdn/DSC08763.avif",
    },
    {
      label: "ADVANTAGE",
      title: "Perfect For All Wedding Events",
      description: "Ideal for Sangeet, Haldi, Mehendi, Cocktail Night, Reception, and staycation-style wedding celebrations with a natural destination setting.",
      image: "https://bookonelocal.in/cdn/DSC08769.avif",
    },
    {
      label: "ADVANTAGE",
      title: "Pool + Rain Dance Zone",
      description: "Celebrate against a striking mountain backdrop with poolside and rain dance moments that feel memorable, playful, and photogenic.",
      image: "https://bookonelocal.in/cdn/DSC08801.avif",
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
    title: "Booking Terms & Venue Guidelines",
    subtitle: "Clear, guest-friendly booking terms help celebrations feel smooth, respectful, and well-managed from arrival to departure.",
    image: "https://bookonelocal.in/cdn/DSC08802.avif",
  },
  intro: {
    eyebrow: "Booking Terms",
    title: "A few essential guidelines help us host your wedding or stay with more comfort, clarity, and care",
    body:
      "To keep the experience comfortable for every family and guest, we ask that staying guests carry valid ID, vendors be approved in advance, and all celebrations follow the propertyâ€™s simple hosting guidelines.",
  },
  cards: [
    {
      label: "RULES",
      title: "Guest & Vendor Policy",
      description: "Staying guests are required to present valid ID at check-in, outside catering is not permitted with package bookings, and decorators or other vendors need prior venue approval.",
      image: "https://bookonelocal.in/cdn/DSC08807.avif",
    },
    {
      label: "RULES",
      title: "Property Terms",
      description: "Property damage is chargeable, music should remain within venue limits, smoking is permitted only in designated areas, and personal belongings remain the responsibility of the guest.",
      image: "https://bookonelocal.in/cdn/DSC08812.avif",
    },
  ],
  highlights: {
    title: "Important terms at a glance",
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
    title: "Well-guided celebrations always feel easier",
    body: "Following the venue terms helps keep the property protected, the event well-managed, and the overall destination experience enjoyable for everyone staying on-site.",
  },
};

export const checkInPageData: MountainInfoPageData = {
  slug: "check-in",
  hero: {
    title: "Arrival, Stay & Payment Terms",
    subtitle: "Understand the arrival schedule, payment flow, and booking confirmation process before your celebration begins.",
    image: "https://bookonelocal.in/cdn/DSC08820.avif",
  },
  intro: {
    eyebrow: "Check-In",
    title: "Everything your family should know before arrival, from check-in timing to payment completion",
    body:
      "Check-in is from 2:00 PM and check-out is at 11:00 AM. Date blocking requires a 50% advance, the remaining balance is completed before check-in, and final billing is aligned to the confirmed headcount.",
  },
  cards: [
    {
      label: "TERMS",
      title: "Check-In Details",
      description: "Check-in begins at 2:00 PM and check-out is at 11:00 AM, allowing the estate to prepare rooms and event spaces smoothly for multi-day destination stays.",
      image: "https://bookonelocal.in/cdn/DSC08836.avif",
    },
    {
      label: "TERMS",
      title: "Advance & Billing",
      description: "A 50% advance secures your booking, the remaining balance is due before check-in, final billing is based on confirmed headcount, and date changes remain subject to availability.",
      image: "https://bookonelocal.in/cdn/DSC08849.avif",
    },
  ],
  highlights: {
    title: "Arrival and payment essentials",
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
    title: "Arrive with everything clearly aligned",
    body: "Our team coordinates booking, arrival timing, payment completion, and final guest-count planning before check-in so your stay begins with clarity and confidence.",
  },
};

export const contactPageData: MountainInfoPageData = {
  slug: "contact",
  hero: {
    title: "Contact The Mountain Resort in Karjat , By Redwings",
    subtitle: "Speak directly with our team for wedding dates, room reservations, package guidance, and booking support.",
    image: "https://bookonelocal.in/cdn/DSC08849.avif",
  },
  intro: {
    eyebrow: "Contact",
    title: "Wedding enquiries, stay planning, and direct booking support in one place",
    body:
      "Reach The Mountain team for destination wedding planning, room reservations, package guidance, final proposal support, and direct help with choosing the right dates and stay format.",
  },
  cards: [
    {
      label: "PHONE",
      title: "+91 9833866655",
      description: "Primary wedding and quotation contact number for package enquiries, availability, and event planning coordination.",
      image: "https://bookonelocal.in/cdn/DSC08846.avif",
    },
    {
      label: "ALTERNATE",
      title: "+91 9892011179",
      description: "Alternate contact number for booking support, destination wedding discussions, and guest stay planning.",
      image: "https://bookonelocal.in/cdn/DSC08831.avif",
    },
    {
      label: "INSTAGRAM",
      title: "themountain.karjat",
      description: "View recent updates, destination wedding visuals, and venue moments on Instagram: instagram.com/themountain.karjat.",
      image: "https://bookonelocal.in/cdn/DSC08853.avif",
    },
    {
      label: "WEBSITE",
      title: "www.themountainresorts.com",
      description: "Browse venue information, package direction, and enquiry details through the official Mountain Resorts website.",
      image: "https://bookonelocal.in/cdn/DSC08769.avif",
    },
  ],
  highlights: {
    title: "How we help you plan faster",
    items: [
      "Wedding package discussions",
      "Weekday and weekend quotation guidance",
      "Package-led planning support for wedding families",
      "Stay and accommodation planning",
      "Venue availability checks",
      "Final quotation coordination",
      "Direct booking enquiry support",
    ],
  },
  extraSections: [
    {
      title: "Venue location",
      body: "The Mountain Resort in Karjat , By Redwings is a private destination venue for weddings, guest stays, scenic celebrations, and multi-day hosted events in a beautifully connected Karjat setting.",
    },
    {
      title: "Best way to reach out",
      body: "For the fastest response, share your preferred dates, guest count, and celebration type through the enquiry form, then use the contact numbers for immediate follow-up on availability and booking guidance.",
    },
  ],
  summary: {
    title: "Ready to begin planning?",
    body: "Share your dates, guest count, and package direction with The Mountain team to receive the right guidance for your event, stay, and final booking journey.",
  },
  locationDetails: {
    title: "Location",
    venue: "The Mountain Resort in Karjat , By Redwings",
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
      "The Mountain Resort in Karjat , By Redwings",
      "Karjat, Maharashtra, India",
    ],
    note: "For exact navigation assistance and booking support, call before arrival so our team can guide you directly to the venue.",
  },
  contact: {
    title: "Direct Contact Details",
    lines: [
      "+91 9833866655",
      "+91 9892011179",
      "instagram.com/themountain.karjat",
      "www.themountainresorts.com",
      "The Mountain Resort in Karjat , By Redwings",
    ],
  },
  form: {
    eyebrow: "Enquiry Form",
    title: "Send Your Booking Enquiry",
    description:
      "Share your preferred dates, guest count, and celebration requirements. Our team will guide you on availability, package fit, and the next step toward confirming your booking.",
    fields: {
      name: "Your Name",
      email: "Email Address",
      phone: "Phone Number",
      eventDate: "Preferred Dates",
      guestCount: "Number of Guests",
      message: "Tell us about your celebration, event type, and package direction",
    },
    submitLabel: "SEND ENQUIRY",
  },
};

export const mediaAwardsPageData: MountainInfoPageData = {
  slug: "media-awards",
  hero: {
    title: "Media & Awards",
    subtitle: "A closer look at the visual character, trust signals, and editorial appeal that make The Mountain Resort in Karjat , By Redwings stand out as a wedding destination.",
    image: "https://bookonelocal.in/cdn/DSC08853.avif",
  },
  intro: {
    eyebrow: "Brand Story",
    title: "Visual appeal, planning confidence, and destination atmosphere matter long before the first guest arrives",
    body:
      "The Mountain Resort in Karjat , By Redwings is designed to feel strong both on-site and on-screen. Scenic backdrops, private-estate flow, open celebration spaces, and wedding-ready hospitality make the venue naturally suited for cinematic presentation, family trust, and premium event storytelling.",
  },
  cards: [
    {
      label: "MEDIA",
      title: "Editorial-Style Landscapes",
      description: "Mountain views, open lawns, poolside scenes, and green estate corners give the property a naturally cinematic visual quality for wedding storytelling and destination-led content.",
      image: "https://bookonelocal.in/cdn/DSC08831.avif",
    },
    {
      label: "MEDIA",
      title: "Photography & Video Appeal",
      description: "From pre-function portraits to ceremony frames and evening reception visuals, the venue supports imagery that feels premium, warm, and celebration-led.",
      image: "https://bookonelocal.in/cdn/DSC08846.avif",
    },
    {
      label: "TRUST",
      title: "Clear Planning Terms",
      description: "Families gain confidence through clear package structure, 50% advance terms, headcount-based billing, and a more transparent bundled planning process.",
      image: "https://bookonelocal.in/cdn/DSC08849.avif",
    },
    {
      label: "TRUST",
      title: "A Venue That Presents Well Across Every Page",
      description: "The Mountain is not positioned as a generic resort listing. It is presented as one private estate where families can stay, dine, and celebrate together in one destination.",
      image: "https://bookonelocal.in/cdn/DSC08837.avif",
    },
  ],
  highlights: {
    title: "What this page helps communicate",
    items: [
      "Scenic mountain and lawn visuals",
      "Strong wedding photography potential",
      "Private-estate destination feel",
      "Clear package and policy trust signals",
      "Premium but warm brand presentation",
      "A venue built for multiple celebrations in one place",
    ],
  },
  extraSections: [
    {
      title: "Why visual identity matters for destination weddings",
      body:
        "Families often choose destination venues not only for capacity and pricing, but for how the place feels. The Mountain is designed to communicate beauty, privacy, and togetherness before the inquiry even begins.",
    },
    {
      title: "Why trust-building details matter just as much as visuals",
      body:
        "A beautiful venue still needs clear package direction, honest policy information, and confidence-building planning language. That balance helps couples and families enquire with more clarity and less confusion.",
    },
  ],
  summary: {
    title: "A destination wedding brand should feel as strong in story as it does in space",
    body: "The Mountain Resort in Karjat , By Redwings combines scenic presentation, wedding-ready planning clarity, and a private-estate atmosphere that makes the venue feel memorable long before the event day arrives.",
  },
};


