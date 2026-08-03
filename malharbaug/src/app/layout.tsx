import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import StoreProvider from '@/store/StoreProvider';
import JsonLd from '@/components/seo/JsonLd';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import ScrollAnimationObserver from '@/components/ui/ScrollAnimationObserver';
import { hotelSchema, localBusinessSchema } from '@/lib/schema';
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
  title: 'Malhar Baug Resort Alibaug | Luxury Resort Near Nagaon Beach',
  description:
    'Experience a peaceful stay at Malhar Baug Resort in Alibaug near Nagaon Beach. Enjoy luxury rooms, villas, swimming pool, gardens, authentic food, family vacations, corporate outings, and direct online booking.',
  metadataBase: new URL('https://malharbaugresort.com'),
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
          <ScrollAnimationObserver />
          {children}
          <WhatsAppFloat />
        </StoreProvider>
      </body>
    </html>
  );
}
