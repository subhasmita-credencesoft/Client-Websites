import type { Metadata } from "next";

const siteName = "The pune resort";
const defaultDescription =
  "Crafting unforgettable hospitality experiences across curated villas, resorts, and boutique stays.";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:5000";
}

export function absoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).toString();
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function buildPageMetadata({ title, description, path, image = "/opengraph.jpg" }: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const ogImage = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export const siteSeo = {
  siteName,
  defaultTitle: siteName,
  titleTemplate: `%s | ${siteName}`,
  defaultDescription,
};
