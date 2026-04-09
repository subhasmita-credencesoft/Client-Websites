export type WeddingsImmersiveMoment = {
  title: string;
  description: string;
  image: string;
  alt: string;
  eyebrow: string;
};

export const WEDDINGS_IMMERSIVE_INTRO = {
  kicker: "Activity Atmosphere",
  titleLineOne: "Adventure, play,",
  titleLineTwo: "and day-long energy",
  description:
    "The parts of the resort that matter most for active guests: movement, water fun, play areas, social zones, and memorable one-day event moments.",
};

export const WEDDINGS_IMMERSIVE_STATS = [
  { value: "6+ Acres", label: "Open event grounds" },
  { value: "All Day", label: "Play and dining rhythm" },
  { value: "All Ages", label: "Family-friendly attraction mix" },
] as const;

export const WEDDINGS_IMMERSIVE_MOMENTS: WeddingsImmersiveMoment[] = [
  {
    eyebrow: "Water Fun",
    title: "Slides, splash zones, and rain-dance energy",
    description:
      "Water-led moments give the page a more exciting character and help guests immediately picture a day outing filled with movement and laughter.",
    image: "children7.avif",
    alt: "Guests enjoying water fun and a lively day event atmosphere",
  },
  {
    eyebrow: "Open Lawns",
    title: "Large grounds for games, mingling, and event setups",
    description:
      "Wide lawns support group games, picnic pacing, celebration corners, and informal social movement without losing visual openness.",
    image: "sports1.avif",
    alt: "Large lawn area for events and group activities",
  },
  {
    eyebrow: "Kids Zone",
    title: "Play areas that keep younger guests engaged",
    description:
      "Dedicated play-friendly spaces help the full outing work better for families by giving children their own moments of excitement and freedom.",
    image: "https://bookonelocal.in/cdn/kids3.JPG",
    alt: "Kids activity area at the resort",
  },
  {
    eyebrow: "Group Dining",
    title: "Meal breaks that complete the one-day event rhythm",
    description:
      "Food and rest moments give the outing a fuller pace, making the resort feel like a complete day destination rather than a single activity stop.",
    image: "din2.avif",
    alt: "Dining and picnic gathering setup for groups",
  },
  {
    eyebrow: "Corporate Energy",
    title: "Offsite areas that mix planning with fun",
    description:
      "Corporate groups can shift between event moments, team activities, and open-air downtime, giving the page a stronger business-events dimension.",
    image: "https://bookonelocal.in/cdn/conference3-1.jpg",
    alt: "Corporate outing and event area at the resort",
  },
  {
    eyebrow: "Indoor Games",
    title: "Indoor activity corners for all-weather fun",
    description:
      "Table games and indoor leisure zones help complete the experience for guests who want more than just outdoor movement in the day plan.",
    image: "sports2.avif",
    alt: "Indoor leisure and activity space at the resort",
  },
] as const;
