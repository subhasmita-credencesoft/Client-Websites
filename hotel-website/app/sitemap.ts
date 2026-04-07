import type { MetadataRoute } from "next";
import blogPosts from "../data/blogs";
import rooms from "../data/rooms";
import { SITE_URL } from "../lib/metadata";

export const dynamic = "force-static";

const staticRoutes = [
  "",
  "/about",
  "/around-us",
  "/blog",
  "/contact",
  "/dining",
  "/experiences",
  "/gallery",
  "/picnic",
  "/corporate",
  "/rooms",
  "/rooms/reservation",
  "/tariffs",
  "/weddings",
  "/wellness",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: now,
      changeFrequency: (route === "" ? "weekly" : "monthly") as
        | "weekly"
        | "monthly",
      priority: route === "" ? 1 : 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...rooms.map((room) => ({
      url: `${SITE_URL}/rooms/${room.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
