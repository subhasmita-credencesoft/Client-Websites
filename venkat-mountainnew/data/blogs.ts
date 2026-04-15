import { imageCatalog } from "../lib/site-data";
import type { BlogPost } from "../types/blog";

const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "How to plan a smooth 2-day destination wedding in Karjat",
    slug: "plan-2-day-destination-wedding-karjat",
    excerpt: "A practical approach to balancing check-in, rituals, meals, and the main celebration without rushing the experience.",
    content:
      "A strong 2-day destination wedding plan starts with clear guest arrivals, room allocations, meal timing, and event sequencing. Keep haldi or welcome moments lighter on day one, place the larger performance or sangeet in the evening, and preserve enough breathing room before the main wedding or reception. When the property, rooms, and venue zones are in one estate, the full schedule becomes much easier to manage.",
    date: "2026-04-10",
    author: "The Mountain Team",
    tags: ["Planning", "Destination Wedding"],
    image: imageCatalog.weddingLawn01,
  },
  {
    id: "blog-2",
    title: "What to look for in a wedding venue with stay options",
    slug: "what-to-look-for-in-wedding-venue-with-stay",
    excerpt: "Privacy, room mix, venue access, and meal coordination matter just as much as decor potential.",
    content:
      "A destination wedding venue should do more than look beautiful. It should support guest comfort, multiple event formats, food service timing, and easy movement between rooms and function areas. Private-estate style venues reduce complexity because families do not need to keep shifting between properties. That is especially valuable for haldi, mehendi, sangeet, and reception weekends.",
    date: "2026-03-28",
    author: "The Mountain Team",
    tags: ["Venue Guide", "Wedding Planning"],
    image: imageCatalog.eventSpace,
  },
  {
    id: "blog-3",
    title: "Why couples prefer lawn weddings with full estate privacy",
    slug: "why-couples-prefer-lawn-weddings-with-privacy",
    excerpt: "Privacy changes the tone of a wedding. It gives families more freedom, comfort, and confidence through every event.",
    content:
      "Private-estate wedding venues help the celebration feel more personal. Guests move more comfortably, photography feels less interrupted, and music or ceremony flow can be handled with fewer compromises. Lawn weddings become especially memorable when they sit inside a property that also includes stay options, pool access, meal planning, and support areas for the host family.",
    date: "2026-03-16",
    author: "The Mountain Team",
    tags: ["Wedding Ideas", "Venue Experience"],
    image: imageCatalog.weddingLawn02,
  },
];

export default blogPosts;
