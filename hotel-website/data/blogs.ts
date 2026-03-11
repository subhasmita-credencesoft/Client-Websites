import type { BlogPost } from "../types/blog";

const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "Sunrise rituals for a restorative getaway",
    slug: "sunrise-rituals-restorative-getaway",
    excerpt: "Start your day with slow rituals and a seaside breakfast.",
    content:
      "Begin with a sunrise walk along the shore, followed by a light breakfast on the terrace and a gentle stretch session in the garden pavilion.",
    date: "2026-02-10",
    author: "Amoja Journal",
    tags: ["Wellness", "Morning"],
    image: "/images/blog-placeholder.svg",
  },
  {
    id: "blog-2",
    title: "A culinary guide to coastal dining",
    slug: "culinary-guide-coastal-dining",
    excerpt: "Seasonal flavors inspired by the coast and local markets.",
    content:
      "Our chefs curate a rotating menu of coastal flavors, blending seasonal produce with traditional techniques and modern plating.",
    date: "2026-01-22",
    author: "Chef Mira",
    tags: ["Dining", "Seasonal"],
    image: "/images/blog-placeholder.svg",
  },
  {
    id: "blog-3",
    title: "Designing a slow travel itinerary",
    slug: "slow-travel-itinerary",
    excerpt: "Plan a three-day stay that balances exploration and rest.",
    content:
      "Balance morning excursions with afternoon spa rituals, and leave evenings open for live music at the lounge.",
    date: "2025-12-18",
    author: "Amoja Concierge",
    tags: ["Itinerary", "Travel"],
    image: "/images/blog-placeholder.svg",
  },
];

export default blogPosts;
