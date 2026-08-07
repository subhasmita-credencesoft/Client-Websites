import Head from 'next/head';
import { SITE } from '@/data/site';

export interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article' | 'product';
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
}

function absolutizeUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE.domain}${url.startsWith('/') ? url : `/${url}`}`;
}

export default function Seo({
  title,
  description,
  path,
  image = SITE.ogImage,
  imageAlt,
  type = 'website',
  jsonLd,
  noIndex = false,
}: SeoProps) {
  const url = `${SITE.domain}${path}`;
  const fullTitle = path === '/' ? title : `${title} | ${SITE.name}`;
  const absoluteImage = absolutizeUrl(image);
  const imageAltText =
    imageAlt ?? `Baibhab Resorts & Conventions, Bhubaneswar\u2013Cuttack, Odisha`;
  const jsonLdList = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      <meta name="geo.region" content="IN-OR" />
      <meta name="geo.placename" content="Phulnakhara, Odisha" />
      <meta name="geo.position" content="20.3844;85.8603" />
      <meta name="ICBM" content="20.3844, 85.8603" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:alt" content={imageAltText} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={SITE.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE.twitterHandle} />
      <meta name="twitter:creator" content={SITE.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:image:alt" content={imageAltText} />

      {jsonLdList.map((entry, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </Head>
  );
}
