import type { Metadata } from "next";

const SITE_NAME = "The Mountain Resort in Karjat, By Redwings";
const SITE_URL = "https://themountainresorts.com";
const DEFAULT_DESCRIPTION =
  "Private destination wedding and event venue in Karjat with scenic mountain views, guest stays, curated packages, and BookOne-powered booking.";
const DEFAULT_IMAGE = "https://themountainresorts.com/images/og-default.jpg";

const DEFAULT_OG_WIDTH = 1200;
const DEFAULT_OG_HEIGHT = 630;

type PageMetadataInput = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  keywords?: string[];
  robots?: Metadata["robots"];
};

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_IMAGE,
  imageWidth = DEFAULT_OG_WIDTH,
  imageHeight = DEFAULT_OG_HEIGHT,
  keywords,
  robots,
}: PageMetadataInput): Metadata {
  const canonicalPath = path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
  const canonicalUrl = new URL(canonicalPath, SITE_URL).toString();

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    ...(robots ? { robots } : {}),
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
          width: imageWidth,
          height: imageHeight,
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
  keywords: [
    "luxury resort karjat",
    "destination wedding karjat",
    "resort near mumbai",
    "weekend getaway karjat",
    "mountain resort maharashtra",
    "wedding venue karjat",
    "private event spaces karjat",
    "corporate retreat karjat",
    "family resort karjat",
    "poolside celebrations",
    "redwings resort",
  ],
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
        width: DEFAULT_OG_WIDTH,
        height: DEFAULT_OG_HEIGHT,
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
