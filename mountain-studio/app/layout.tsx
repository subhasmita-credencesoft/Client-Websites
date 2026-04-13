import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Mono, Jost } from "next/font/google";
import "react-day-picker/dist/style.css";
import "@/app/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppProviders } from "@/components/providers/AppProviders";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "600"],
  display: "swap"
});

const body = Jost({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
  display: "swap"
});

const mono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Redwings Studio",
  description: "Redwings Studio at Abalone Resort, Arpora, Goa. Studio apartment stays with 10 rooms under the Redwings banner, check-in at 1 PM and check-out at 11 AM.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/redwings-studio-logo.svg", type: "image/svg+xml" }
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[140] focus:rounded-full focus:bg-gold focus:px-4 focus:py-3 focus:text-xs focus:uppercase focus:tracking-[0.28em] focus:text-dark"
        >
          Skip to main content
        </a>
        <AppProviders>
          <Navbar />
          <main id="main-content" className="overflow-hidden">
            {children}
          </main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}

