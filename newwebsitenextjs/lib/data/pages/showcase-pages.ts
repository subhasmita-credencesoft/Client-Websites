export const offersPageData = {
  heroImage: "/images/DSC08807.avif",
  hero: {
    title: "WEDDING PACKAGES",
    subtitle: "AT THE MOUNTAIN, KARJAT.",
  },
  intro: {
    breadcrumb: "Offers",
    title: "Explore weekday, weekend, and package-wise planning options for destination wedding celebrations",
    description:
      "The packages are designed to make family planning easier: stay, meals, venue usage, and hospitality are bundled into one clearer wedding proposal with Classic, Signature, and Premium Luxe formats.",
    cta: "REQUEST A WEDDING QUOTE",
  },
  offers: [
    {
      id: "weekday",
      title: "WEEKDAY PACKAGE",
      image: "/images/DSC08812.avif",
      description:
        "Monday to Thursday pricing for families who want better bundled value without losing the full destination wedding experience.",
      bullets: [
        "Classic Package: Rs. 4,500 per person",
        "Signature Package: Rs. 5,500 per person",
        "Premium Luxe Package: Rs. 6,500 per person",
        "Classic includes 5 meals + stay + venue access",
        "Signature includes Classic package + extra 2 starters + 1 gravy extra each in lunch and dinner",
        "Premium Luxe includes Signature package + 2 live counters",
      ],
    },
    {
      id: "weekend",
      title: "WEEKEND PACKAGE",
      image: "/images/DSC08820.avif",
      description:
        "Friday to Sunday pricing for peak celebration dates, wedding weekends, and larger family-led gatherings.",
      bullets: [
        "Classic Package: Rs. 5,500 per person",
        "Signature Package: Rs. 6,500 per person",
        "Premium Luxe Package: Rs. 7,500 per person",
        "Classic includes 5 meals + stay + venue access",
        "Signature includes Classic package + extra 2 starters + 1 gravy extra each in lunch and dinner",
        "Premium Luxe includes Signature package + 2 live counters",
      ],
    },
    {
      id: "classic",
      title: "CLASSIC PACKAGE",
      image: "/images/DSC08836.avif",
      description:
        "A strong bundled starting point for destination celebrations with 5 meals, stay, venue access, and simple planning clarity.",
      bullets: [
        "5 meals + stay + venue access",
        "Weekday price: Rs. 4,500 per person",
        "Weekend price: Rs. 5,500 per person",
      ],
    },
    {
      id: "signature",
      title: "SIGNATURE PACKAGE",
      image: "/images/DSC08849.avif",
      description:
        "A richer hospitality format for families who want stronger food depth and a more generous celebration table.",
      bullets: [
        "Classic package + extra 2 starters",
        "1 gravy extra each in lunch and dinner",
        "Weekday price: Rs. 5,500 per person | Weekend price: Rs. 6,500 per person",
      ],
    },
    {
      id: "premium-luxo",
      title: "PREMIUM LUXE PACKAGE",
      image: "/images/DSC08831.avif",
      description:
        "A premium wedding-hosting package for celebrations that call for elevated hospitality, stronger presentation, and added live counters.",
      bullets: [
        "Signature package + 2 live counters",
        "Weekday price: Rs. 6,500 per person",
        "Weekend price: Rs. 7,500 per person",
      ],
    },
  ],
  contactLine:
    "Pricing is per person per day and includes stay, meals, services, lawn access, and venue usage. Additional items can be customized as per preference and are charged separately on a per-person, per-day basis.",
} as const;
