export type WeddingsImmersiveMoment = {
  title: string;
  description: string;
  image: string;
  alt: string;
  eyebrow: string;
};

export const WEDDINGS_IMMERSIVE_INTRO = {
  kicker: "Crafted Experiences",
  titleLineOne: "Moments with",
  titleLineTwo: "cinematic presence",
  description:
    "From grand entrances and floral walkways to poolside after-parties and family brunches, every celebration zone is designed to feel layered, lively, and memorable.",
};

export const WEDDINGS_IMMERSIVE_STATS = [
  { value: "6+", label: "Venue moods" },
  { value: "24/7", label: "Event coordination" },
  { value: "100%", label: "Custom celebration flow" },
] as const;

export const WEDDINGS_IMMERSIVE_MOMENTS: WeddingsImmersiveMoment[] = [
  {
    eyebrow: "Grand Arrival",
    title: "Statement entrances that build anticipation",
    description:
      "Design welcome paths with lighting, florals, music, and elegant transitions that create a dramatic first impression for your guests.",
    image: "https://bookonelocal.in/cdn/wedding4-1.jpg",
    alt: "Wedding entrance walkway illuminated for an evening event",
  },
  {
    eyebrow: "Celebration Energy",
    title: "Layered spaces for every ritual and gathering",
    description:
      "Move from ceremonies to cocktails, brunches, and joyful family moments across coordinated lawns, poolside settings, and intimate corners.",
    image: "https://bookonelocal.in/cdn/4.avif",
    alt: "Resort celebration space with water and landscaped surroundings",
  },
  {
    eyebrow: "Photo Moments",
    title: "Visual backdrops that feel premium all day",
    description:
      "Create a polished wedding story with scenic viewpoints, lush grounds, and thoughtfully styled zones that work beautifully from daylight to evening.",
    image: "https://bookonelocal.in/cdn/wedding-image.jpg",
    alt: "Wedding couple portrait moment in a styled setting",
  },
] as const;
