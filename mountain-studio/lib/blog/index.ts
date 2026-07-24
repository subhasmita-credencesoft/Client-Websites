import type { BlogPost } from "@/types";
import { northGoaTravelGuide } from "./north-goa-travel-guide";
import { bestBeachesNorthGoa } from "./best-beaches-north-goa";
import { budgetTripToGoa } from "./budget-trip-to-goa";
import { whereToStayNorthGoa } from "./where-to-stay-north-goa";
import { romanticPlacesGoa } from "./romantic-places-goa";
import { thingsToDoBagaBeach } from "./things-to-do-baga-beach";

export const blogs: BlogPost[] = [
  northGoaTravelGuide,
  bestBeachesNorthGoa,
  budgetTripToGoa,
  whereToStayNorthGoa,
  romanticPlacesGoa,
  thingsToDoBagaBeach,
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find((b) => b.slug === slug);
}

export function getBlogSlugs(): string[] {
  return blogs.map((b) => b.slug);
}

export function getRelatedBlogs(slug: string): BlogPost[] {
  const post = getBlogBySlug(slug);
  if (!post) return [];
  return post.relatedSlugs
    .map((s) => getBlogBySlug(s))
    .filter((b): b is BlogPost => b !== undefined);
}

export function getBlogsByCategory(category: string): BlogPost[] {
  return blogs.filter(
    (b) => b.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllCategories(): string[] {
  return Array.from(new Set(blogs.map((b) => b.category)));
}
