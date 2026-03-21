import type { Metadata } from "next";

export const SITE_NAME = "UK's Resort, Khopoli";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.uksresort.com";
export const DEFAULT_DESCRIPTION =
  "Experience refined stays, dining, weddings, facilities, and getaways at UK's Resort in Khopoli.";
export const DEFAULT_OG_IMAGE = "https://bookonelocal.in/cdn/3.png";

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

function toAbsoluteUrl(value: string) {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return new URL(value, SITE_URL).toString();
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
}: PageMetadataInput): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const imageUrl = toAbsoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [
        {
          url: imageUrl,
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
      images: [imageUrl],
    },
  };
}
