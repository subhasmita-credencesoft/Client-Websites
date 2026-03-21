export const WEDDINGS_CELEBRATION_MAP_LINKS = {
  weddings:
    "https://www.google.co.in/maps/place/UK'S+RESORT/@18.817145,73.3046891,3a,90y,82.75h,75.21t/data=!3m7!1e1!3m5!1sEqXPpiFcSuYAAAQvxYn65A!2e0!3e2!7i13312!8i6656!4m5!3m4!1s0x3be7fd68dbb32757:0x45a268bbfa521ef0!8m2!3d18.8171404!4d73.3046807!6m1!1e1?shorturl=1",
  picnic:
    "https://www.google.co.in/maps/@18.8171575,73.3046448,3a,90y,119.21h,85.89t/data=!3m7!1e1!3m5!1s2c65xsf3YxUAAAQvxYn66g!2e0!3e2!7i13312!8i6656!6m1!1e1?shorturl=1",
  sports:
    "https://www.google.co.in/maps/@18.8171712,73.3046889,3a,75y,204.45h,83.59t/data=!3m6!1e1!3m4!1sXJbldbTZ-54AAAQvxYVCgA!2e0!7i13312!8i6656!6m1!1e1?shorturl=1",
} as const;

export type WeddingsCelebrationBlock = {
  id: string;
  layout: "media-left" | "media-right";
  mediaImage: string;
  mediaAlt: string;
  cardImage: string;
  cardImageAlt: string;
  cardTitle: string;
  cardParagraphs: string[];
  enquiryHref: string;
  virtualTourKey: keyof typeof WEDDINGS_CELEBRATION_MAP_LINKS;
  virtualTourAriaLabel: string;
};

export const WEDDINGS_CELEBRATION_KICKER = "Enhance your celebration";
export const WEDDINGS_CELEBRATION_TITLE_LINES = ["We make every", "occasion sparkle"] as const;
export const WEDDINGS_CELEBRATION_INTRO =
  "Celebrate your special occasions like Birthdays, Get-togethers, Anniversaries, Launch Parties etc with live Music, Delicious Cuisines & varied Entertainment to make each event enjoyable & memorable for the entire family";

export const WEDDINGS_CELEBRATION_BLOCKS: WeddingsCelebrationBlock[] = [
  {
    id: "weddings",
    layout: "media-left",
    mediaImage: "https://bookonelocal.in/cdn/wedding4-1.jpg",
    mediaAlt: "Beachfront celebration setup",
    cardImage: "https://bookonelocal.in/cdn/wedding-image.jpg",
    cardImageAlt: "Couple by the sea",
    cardTitle: "Weddings & honeymoons",
    cardParagraphs: [
      "Marriage are made in heaven but created on earth and certainly knows how to make them glitter with splendor. From the moment you decide to celebrate your big day with us, we leave no stone unturned to make the occasion an unforgettable one for years to come. Be it traditional or a modern themed wedding, our wedding team understands what you need in a wedding.",
      "With warm hospitality and years of experience, our wedding team ensures the wedding arrangement right from small ceremonies, mehndi, sangeet program and extravagant reception runs out smoothly as planned.",
      "Our modern accommodation and Exquisite lawns, Pool side and water park areas gives the perfect setting to make your destination wedding a memorable one.",
    ],
    enquiryHref: "#",
    virtualTourKey: "weddings",
    virtualTourAriaLabel: "Take a virtual tour of weddings venue",
  },
  {
    id: "picnic",
    layout: "media-right",
    mediaImage: "https://bookonelocal.in/cdn/Copy of IMG_3980.avif",
    mediaAlt: "Family picnic grounds",
    cardImage: "https://bookonelocal.in/cdn/gymnium-image.JPG",
    cardImageAlt: "Family picnic setup",
    cardTitle: "Family & School Picnic",
    cardParagraphs: [
      "Arrive at UK's Resort, Khopoli after a scenic drive along the green countryside. A sumptuous buffet breakfast awaits you. Let down your hair at the Mini water park. Splash around the cool waters and swing to the latest music by the pool side. What's more, we have music, rain & masti all year round with Rain Dance. After a frolicking time in the water enjoy the renowned UK's Resort delicious unlimited buffet lunch.",
      "Make the most of the 6 acres of open space to play games with your family and friends. The little ones can make merry in the children's play park. Round up an exciting picnic with hot beverages and snacks. The unforgettable experience at UK's Resort Khopoli will have you and your family returning for more.",
    ],
    enquiryHref: "#",
    virtualTourKey: "picnic",
    virtualTourAriaLabel: "Take a virtual tour of picnic area",
  },
  {
    id: "sports",
    layout: "media-left",
    mediaImage: "https://bookonelocal.in/cdn/kids3.JPG",
    mediaAlt: "Sports activities at resort",
    cardImage: "https://bookonelocal.in/cdn/outdoor-image.jpg",
    cardImageAlt: "Sports facilities",
    cardTitle: "Sports & Activities",
    cardParagraphs: [
      "Make the most of the sprawling lawns to play games like Cricket, Football, Badminton, Throw ball etc. or enjoy an indoor game of Table Tennis / Carrom with your family.",
      "The impeccable hospitality and a variety of entertainment gives a midas touch to the event like no other.",
      "We have a spacious 5 acre open space for corporate and education institutes for orgainizing sports events.",
    ],
    enquiryHref: "#",
    virtualTourKey: "sports",
    virtualTourAriaLabel: "Take a virtual tour of sports area",
  },
];
