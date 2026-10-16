import type { Metadata } from 'next';

export const SITE_URL = 'https://krishnapalacehotel.com';
export const SITE_NAME = 'Hotel Krishna Palace';
export const DEFAULT_OG_IMAGE = '/images/13-kp-hosapete-suit-room-1.jpg';

const BRAND = 'Hotel Krishna Palace';

type SeoInput = {
  title?: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
};

function absolute(url: string): string {
  return new URL(url, SITE_URL).toString();
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
  const url = absolute(path);
  const imageUrl = absolute(image);
  const socialTitle = title
    ? title.includes(BRAND)
      ? title
      : `${title} | ${BRAND}`
    : `${BRAND} | Hosapete, Karnataka`;

  const metadata: Metadata = {
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: socialTitle,
      description,
      siteName: SITE_NAME,
      locale: 'en_IN',
      images: [
        {
          url: imageUrl,
          width: 900,
          height: 500,
          alt: imageAlt ?? `${BRAND} - Hosapete, Karnataka`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [imageUrl],
    },
  };

  if (title) metadata.title = title.includes(BRAND) ? { absolute: title } : title;
  if (noIndex) metadata.robots = { index: false, follow: true };

  return metadata;
}
