import type { Metadata } from "next";
import { site } from "@/data/site";
import { img } from "@/data/images";
import type { PageMeta } from "@/data/pages";

interface Options {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
}

/** Builds per-page metadata with canonical URL, Open Graph and Twitter cards. */
export function buildMetadata({ title, description, path, image = img("hero-home"), noindex }: Options): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path === "/" ? "/" : `${path.replace(/\/$/, "")}/` },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      url: path,
      locale: "en_IN",
      images: [{ url: image, width: 1600, height: 1000, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: [image] },
  };
}

/** Metadata straight from a data/pages.ts entry. */
export function metaFor(p: PageMeta, opts: { noindex?: boolean } = {}): Metadata {
  return buildMetadata({ title: p.title, description: p.description, path: p.path, image: img(p.heroImage), noindex: opts.noindex });
}
