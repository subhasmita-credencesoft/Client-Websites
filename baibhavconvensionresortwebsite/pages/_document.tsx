import { Html, Head, Main, NextScript } from 'next/document';
import { SITE } from '@/data/site';

export default function Document() {
  const ogImageUrl = `${SITE.domain}${SITE.ogImage}`;
  return (
    <Html lang="en-IN">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content={SITE.themeColor} />
        <meta name="format-detection" content="telephone=yes" />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:alt" content={`${SITE.name} — Bhubaneswar, Odisha`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/avif" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:image:alt" content={`${SITE.name} — Bhubaneswar, Odisha`} />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="icon" href="/images/baibhablogo-sm.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/images/baibhablogo.webp" />
        <meta name="application-name" content={SITE.shortName} />
        <script
          src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"
          defer
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
