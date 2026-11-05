import type { Metadata } from 'next';
import Script from 'next/script';
import '../src/styles/site.scss';
import SiteFooter from '@/components/layout/SiteFooter';
import MotionEffects from '@/components/layout/MotionEffects';
import CookieConsent from '@/components/layout/CookieConsent';
import JsonLd from '@/components/seo/JsonLd';
import { getHotelSchema, getWebsiteSchema } from '@/lib/schema';
import { DEFAULT_OG_IMAGE, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Hotel Krishna Palace, Hospet | Stay Near Hampi', template: '%s | Hotel Krishna Palace' },
  description: 'Hotel Krishna Palace in Hosapete, Karnataka, offers comfortable accommodation, dining and banquet facilities for business and leisure travellers visiting the Hampi region.',
  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Hotel Krishna Palace',
    url: SITE_URL,
    title: 'Hotel Krishna Palace, Hospet | Stay Near Hampi',
    description: 'Hotel Krishna Palace in Hosapete, Karnataka, offers comfortable accommodation, dining and banquet facilities for business and leisure travellers visiting the Hampi region.',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Hotel Krishna Palace - Hosapete, Karnataka',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hotel Krishna Palace, Hospet | Stay Near Hampi',
    description: 'Hotel Krishna Palace in Hosapete, Karnataka, offers comfortable accommodation, dining and banquet facilities for business and leisure travellers visiting the Hampi region.',
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TN6NJZF7"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!=='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TN6NJZF7');`}
        </Script>
        <link rel="preload" as="font" type="font/woff2" href="/fonts/bodoni-moda-aFTQ7PxzY382XsXX63LUYJSKSKg.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/inter-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2" crossOrigin="anonymous" />
        <JsonLd schema={[getHotelSchema(), getWebsiteSchema()]} />
        <MotionEffects />
        {children}
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
