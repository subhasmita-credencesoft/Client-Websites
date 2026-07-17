import type { Metadata } from "next";

const SITE_NAME = "The Mountain Resort in Karjat, By Redwings";
const SITE_URL = "https://themountainresorts.com";
const DEFAULT_DESCRIPTION =
  "Private destination wedding and event venue in Karjat with scenic mountain views, guest stays, curated packages, and BookOne-powered booking.";
const DEFAULT_IMAGE = "https://themountainresorts.com/images/og-default.jpg";

type PageMetadataInput = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
};

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_IMAGE,
}: PageMetadataInput): Metadata {
  const canonicalUrl = new URL(path, SITE_URL).toString();

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: DEFAULT_IMAGE,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_IMAGE],
  },
};
