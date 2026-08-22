import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import StoreProvider from '@/store/StoreProvider';
import JsonLd from '@/components/seo/JsonLd';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import ScrollAnimationObserver from '@/components/ui/ScrollAnimationObserver';
import { hotelSchema, localBusinessSchema, websiteSchema } from '@/lib/schema';
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
    default: 'Malhar Baug Resort Alibaug | Family Resort Near Nagaon Beach',
    template: `%s | ${siteConfig.name} Alibaug`,
  },
  description: siteConfig.description,
  keywords: [
    'resort in Alibaug',
    'family resort in Alibaug',
    'resort near Nagaon Beach',
    'Nagaon Beach resort',
    'Alibaug resort with swimming pool',
    'villa resort in Alibaug',
    'hotel near Nagaon Beach',
    'group stay in Alibaug',
  ],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'Malhar Baug Resort Alibaug | Family Resort Near Nagaon Beach',
    description: siteConfig.description,
    images: [{ url: '/heroimg1.jpeg', width: 1200, height: 630, alt: 'Malhar Baug Resort garden and rooms in Nagaon, Alibaug' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malhar Baug Resort Alibaug | Family Resort Near Nagaon Beach',
    description: siteConfig.description,
    images: ['/heroimg1.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <StoreProvider>
          <JsonLd data={hotelSchema()} />
          <JsonLd data={localBusinessSchema()} />
          <JsonLd data={websiteSchema()} />
          <ScrollAnimationObserver />
          {children}
          <WhatsAppFloat />
        </StoreProvider>
      </body>
    </html>
  );
}
