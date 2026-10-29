import type { Metadata } from 'next';

export const SITE_URL = 'https://krishnapalacehotel.com';
export const SITE_NAME = 'Hotel Krishna Palace';
export const DEFAULT_OG_IMAGE = '/facecadeimage.avif';

type SeoInput = {
  title?: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
};

export function absoluteUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return new URL(cleanPath, SITE_URL).toString();
}

export function seo({
  title,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = 'website',
  noIndex = false,
}: SeoInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const pageTitle = title || `${SITE_NAME}, Hospet | Stay Near Hampi`;

  const metadata: Metadata = {
    title: { absolute: pageTitle },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      url,
      title: pageTitle,
      description,
      siteName: SITE_NAME,
      locale: 'en_IN',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt ?? `${SITE_NAME} - Hosapete, Karnataka`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [imageUrl],
    },
  };

  if (noIndex) {
    metadata.robots = { index: false, follow: true };
  }

  return metadata;
}
