import type { Metadata } from "next";

export const SITE_NAME = "UK's Resort, Khopoli";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.uksresort.com";
export const DEFAULT_DESCRIPTION =
  "Experience refined stays, dining, weddings, facilities, and getaways at UK's Resort in Khopoli.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const OG_IMAGE_BLOCKLIST = new Set([
  "https://bookonelocal.in/cdn/3.png",
  "https://bookonelocal.in/cdn/4.png",
]);

const UNSUPPORTED_OG_FORMATS = [".avif", ".gif"];

function isSupportedOgImage(value: string): boolean {
  if (!value || OG_IMAGE_BLOCKLIST.has(value)) {
    return false;
  }

  const clean = value.split("?")[0].replace(/\/+$/, "");
  const ext = clean.slice(clean.lastIndexOf(".")).toLowerCase();

  return !UNSUPPORTED_OG_FORMATS.includes(ext);
}

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
  const imageUrl = toAbsoluteUrl(isSupportedOgImage(image) ? image : DEFAULT_OG_IMAGE);

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
