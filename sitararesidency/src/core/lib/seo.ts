import type { Metadata } from 'next';

import { business, siteMetadata } from '@/core/config/business';

/** Canonical production origin, overridable per environment. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? business.website;

/** Default social-share image (1200x630 JPEG — required by Facebook/X/LinkedIn). */
export const OG_IMAGE = {
  url: `${SITE_URL}/og-image.jpg`,
  width: 1200,
  height: 630,
  type: 'image/jpeg',
  alt: `${business.name}, Kalamboli, Navi Mumbai`,
} as const;

type OgImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
  type?: string;
};

type PageMetadataInput = {
  /** Page title (the layout template appends the hotel name). */
  title: string;
  /** 120-160 character description with the primary keyword. */
  description: string;
  /** Route path beginning with "/" — used for the canonical URL. */
  path: string;
  keywords?: string[];
  /** Override the default share image. */
  image?: OgImage;
  /** Set true for utility pages that must not be indexed. */
  noIndex?: boolean;
};

/**
 * Builds a complete, self-consistent metadata object for a page so every route
 * always ships a canonical URL, Open Graph tags and a Twitter card.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  image,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
  const og = image ?? OG_IMAGE;
  const imageUrl = og.url.startsWith('http') ? og.url : `${SITE_URL}${og.url}`;

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: path },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      title,
      description,
      url,
      siteName: business.name,
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: og.width,
          height: og.height,
          type: og.type ?? 'image/jpeg',
          alt: og.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

/** Home-page defaults, re-exported for callers that need the raw copy. */
export const defaultMeta = {
  title: siteMetadata.title,
  description: siteMetadata.description,
} as const;

/* -------------------------------------------------------------------------- */
/*  JSON-LD structured-data builders                                          */
/* -------------------------------------------------------------------------- */

export type JsonLd = Record<string, unknown>;

export function breadcrumbSchema(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { name: 'Home', path: '/' },
      ...items,
    ].map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path === '/' ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  };
}

export function webPageSchema({
  name,
  description,
  path,
  type = 'WebPage',
}: {
  name: string;
  description: string;
  path: string;
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'ItemPage';
}): JsonLd {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { '@id': `${SITE_URL}/#hotel` },
    about: { '@id': `${SITE_URL}/#hotel` },
    inLanguage: 'en-IN',
  };
}

export function roomSchema({
  name,
  description,
  path,
  image,
  occupancy,
  amenities,
}: {
  name: string;
  description: string;
  path: string;
  image?: string;
  occupancy?: number;
  amenities?: string[];
}): JsonLd {
  const url = `${SITE_URL}${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    '@id': `${url}#room`,
    name,
    description,
    url,
    ...(image ? { image: image.startsWith('http') ? image : `${SITE_URL}${image}` } : {}),
    containedInPlace: { '@id': `${SITE_URL}/#hotel` },
    ...(occupancy
      ? {
          occupancy: {
            '@type': 'QuantitativeValue',
            maxValue: occupancy,
            unitText: 'guests',
          },
        }
      : {}),
    ...(amenities?.length
      ? {
          amenityFeature: amenities.map((amenity) => ({
            '@type': 'LocationFeatureSpecification',
            name: amenity,
            value: true,
          })),
        }
      : {}),
  };
}

export function articleSchema({
  headline,
  description,
  path,
  image,
  datePublished,
  category,
}: {
  headline: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  category?: string;
}): JsonLd {
  const url = `${SITE_URL}${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline,
    description,
    url,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    ...(image ? { image: image.startsWith('http') ? image : `${SITE_URL}${image}` } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(category ? { articleSection: category } : {}),
    author: { '@type': 'Organization', name: business.name, url: SITE_URL },
    publisher: { '@id': `${SITE_URL}/#hotel` },
    inLanguage: 'en-IN',
  };
}
