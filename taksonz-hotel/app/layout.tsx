import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "./globals.scss";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { JsonLd } from "@/components/seo/JsonLd";
import { hotelSchema } from "@/lib/seo/schema";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
  description: `Contemporary comfort in the heart of ${site.address.city}. Rooms and suites, dining, banquets and meeting spaces at ${site.name}.`,
  applicationName: site.name,
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f3ef",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = hotelSchema();
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <a href="#main" className="skip-link">Skip to content</a>
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {schema && <JsonLd data={schema} />}
      </body>
    </html>
  );
}
