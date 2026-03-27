export const offersPageData = {
  heroImage: "/images/DSC08807.avif",
  hero: {
    title: "PACKAGE OPTIONS",
    subtitle: "AT THE MOUNTAIN, KARJAT.",
  },
  intro: {
    breadcrumb: "Offers",
    title: "Explore weekday, weekend, and package-wise wedding pricing at The Mountain",
    description:
      "Our destination wedding packages are structured around weekday and weekend plans with Classic, Signature, and Premium Luxe options including 5 meals, stay, venue access, meal upgrades, and live counter support.",
    cta: "ENQUIRE NOW",
  },
  offers: [
    {
      id: "weekday",
      title: "WEEKDAY PACKAGE",
      image: "/images/DSC08812.avif",
      description:
        "Monday to Thursday pricing with package-wise per person costing for destination wedding celebrations.",
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
        "Friday to Sunday pricing for peak celebration dates with upgraded package-wise per person rates.",
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
        "Core wedding package covering 5 meals, stay, venue access, and essential event hospitality.",
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
        "Enhanced wedding package with the Classic base plus upgraded meal inclusions for fuller guest hospitality.",
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
        "Premium package tier for destination celebrations with Signature inclusions plus 2 live counters.",
      bullets: [
        "Signature package + 2 live counters",
        "Weekday price: Rs. 6,500 per person",
        "Weekend price: Rs. 7,500 per person",
      ],
    },
  ],
  contactLine:
    "Price per person includes lunch, hi-tea, starters, dinner, and breakfast. Additional items can be customized as per preference and are charged separately on a per-person, per-day basis.",
} as const;
