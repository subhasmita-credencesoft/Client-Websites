import { Html, Head, Main, NextScript } from 'next/document';
import { SITE } from '@/data/site';

export default function Document() {
  return (
    <Html lang="en-IN">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content={SITE.themeColor} />
        <meta name="format-detection" content="telephone=yes" />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/images/baibhablogo-sm.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/images/baibhab-logo.png" />
        <meta name="application-name" content={SITE.shortName} />
        {/* Iconify loaded as a plain script to avoid next/script beforeInteractive build issues. */}
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
