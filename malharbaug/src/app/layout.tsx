import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import StoreProvider from '@/store/StoreProvider';
import { PropertyProvider } from '@/components/providers/PropertyProvider';
import JsonLd from '@/components/seo/JsonLd';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import MobileDrawer from '@/components/layout/MobileDrawer';
import ScrollAnimationObserver from '@/components/ui/ScrollAnimationObserver';
import { hotelSchema, localBusinessSchema, websiteSchema } from '@/lib/schema';
import { getContact, getRooms } from '@/lib/api';
import { siteConfig } from '@/lib/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Malhar Baug Resort Alibaug | Best Family Resort Near Nagaon Beach',
    template: `%s | ${siteConfig.name}`,
  },
  description:
    'Book Malhar Baug Resort in Nagaon, Alibaug. Rated 4.2/5 with 46+ Google reviews. 3-star farm-style resort featuring swimming pool, AC deluxe rooms, family villas, lush gardens, and home-style Konkan dining starting from ₹4,229/night.',
  keywords: [
    'Malhar Baug Resort',
    'Malhar Baug Resort Alibaug',
    'Malhar Baug Resort Nagaon',
    'Malhar Baug Resort booking',
    'Malhar Baug Resort price',
    'resort in Alibaug',
    'family resort in Alibaug',
    'best resort in Nagaon Alibaug',
    'resort near Nagaon Beach',
    'Nagaon Beach resort',
    'Alibaug resort with swimming pool',
    'cottages in Nagaon Alibaug with pool',
    'villa resort in Alibaug',
    'private villa in Alibaug for family',
    'hotel near Nagaon Beach',
    'budget resort in Nagaon Alibaug',
    'group stay in Alibaug',
    'Alibaug resort with home style Konkan food',
    'weekend resort near Mumbai',
    'weekend resort near Pune',
  ],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  alternates: {
    canonical: '/',
  },
  other: {
    'geo.region': 'IN-MH',
    'geo.placename': 'Nagaon, Alibaug',
    'geo.position': '18.6019;72.9056',
    'ICBM': '18.6019, 72.9056',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'Malhar Baug Resort Alibaug | Best Family Resort Near Nagaon Beach',
    description:
      'Malhar Baug Resort in Nagaon, Alibaug — 3-star resort with swimming pool, luxury rooms, private villas, lush party lawns, and home-style Konkan dining just 2 km from Nagaon Beach.',
    images: [
      {
        url: '/hero1.jpeg',
        width: 1200,
        height: 630,
        alt: 'Malhar Baug Resort - Family resort with garden, rooms and pool near Nagaon Beach Alibaug',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malhar Baug Resort Alibaug | Best Family Resort Near Nagaon Beach',
    description:
      'Malhar Baug Resort in Nagaon, Alibaug — 3-star resort with swimming pool, luxury rooms, private villas, lush party lawns, and home-style Konkan dining.',
    images: ['/hero1.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/malharlogo.jpeg',
    apple: '/malharlogo.jpeg',
  },
};

const themeBootstrapScript = `
(function () {
  try {
    var stored = window.localStorage.getItem('malhar-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [rooms, contact] = await Promise.all([getRooms(), getContact()]);

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
        <Script
          src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <PropertyProvider rooms={rooms} contact={contact}>
          <StoreProvider>
            <JsonLd data={hotelSchema(contact, rooms)} />
            <JsonLd data={localBusinessSchema(contact)} />
            <JsonLd data={websiteSchema()} />
            <ScrollAnimationObserver />
            {children}
            <MobileDrawer />
            <WhatsAppFloat />
          </StoreProvider>
        </PropertyProvider>
      </body>
    </html>
  );
}
