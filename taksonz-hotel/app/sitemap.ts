import type { MetadataRoute } from "next";
import { rooms } from "@/data/rooms";
import { pages } from "@/data/pages";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Booking steps are intentionally excluded (noindex).
  const indexable = [pages.rooms, pages.dining, pages.banquets, pages.meetings, pages.about, pages.gallery, pages.location, pages.contact, pages.faq, pages.privacy, pages.terms, pages.cancellation].map((p) => p.path);
  const paths = ["/", ...indexable, ...rooms.map((r) => `/rooms/${r.slug}`)];
  return paths.map((p) => ({
    url: p === "/" ? `${site.url}/` : `${site.url}${p}/`,
    changeFrequency: p === "/" ? "weekly" : "monthly",
    priority: p === "/" ? 1 : p.startsWith("/rooms") ? 0.8 : 0.6,
  }));
}
