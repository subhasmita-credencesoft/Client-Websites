export type EventsZoneAtlasCard = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  tags: string[];
};

export const EVENTS_ZONE_ATLAS_INTRO = {
  kicker: "Activity Zones",
  titleLineOne: "Every group finds",
  titleLineTwo: "its own event rhythm",
  description:
    "The events page now maps the resort into clearer experience zones, so families, kids, school groups, and corporate teams can immediately understand where the day comes alive.",
};

export const EVENTS_ZONE_ATLAS_PILLS = [
  "Kids Play Area",
  "Corporate Event Lawns",
  "Water Attractions",
  "Outdoor Adventure",
] as const;

export const EVENTS_ZONE_ATLAS_CARDS: EventsZoneAtlasCard[] = [
  {
    eyebrow: "Kids Zone",
    title: "Play areas built for younger guests",
    description:
      "Dedicated kids spaces, open play movement, and family-friendly layouts help the page speak more clearly to parents planning a full day out.",
    image: "https://bookonelocal.in/cdn/kids3.JPG",
    alt: "Kids play area at UK's Resort",
    tags: ["Safe movement", "Family comfort", "All-day play"],
  },
  {
    eyebrow: "Corporate Space",
    title: "Corporate event areas with room to gather",
    description:
      "Open grounds and flexible venue space support team outings, retreats, launches, and activity-driven corporate celebrations without losing the resort feel.",
    image: "https://bookonelocal.in/cdn/conference3-1.jpg",
    alt: "Corporate event venue area at the resort",
    tags: ["Team offsites", "Launches", "Group coordination"],
  },
  {
    eyebrow: "Outdoor Action",
    title: "Adventure lawns and game-ready open zones",
    description:
      "Cricket, football, throw ball, and energetic group activities fit naturally into these larger open areas, making the page feel more active and destination-led.",
    image: "https://bookonelocal.in/cdn/outdoor-image.jpg",
    alt: "Adventure lawns and sports grounds",
    tags: ["Cricket", "Football", "Group games"],
  },
  {
    eyebrow: "Water Energy",
    title: "Water play moments that lift the whole day",
    description:
      "Rain dance, splash time, and water attractions create the strongest visual excitement on the page and give guests a clearer sense of a full outing experience.",
    image: "https://bookonelocal.in/cdn/Copy+of+IMG_4035.JPG",
    alt: "Water activity area at the resort",
    tags: ["Rain dance", "Splash zones", "High energy"],
  },
] as const;
