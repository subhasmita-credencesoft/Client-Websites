import type { Metadata } from "next";
import { BookingRedirectClient } from "./BookingRedirectClient";

export const metadata: Metadata = {
  title:
    "Book a Room | Redwings Studio Goa — Studio Apartments in Arpora",
  description:
    "Book your stay at Redwings Studio, Arpora, Goa — studio apartments from ₹1,950/night at Abalone Resort. Near Baga Beach, Calangute, and Anjuna. Free cancellation, instant confirmation. Direct booking support.",
  keywords: [
    "Book Hotel Goa",
    "Book Studio Apartment Goa",
    "Hotel Booking Arpora",
    "Online Hotel Booking Goa",
    "Instant Booking Goa",
    "Redwings Studio Booking",
    "Budget Hotel Booking Arpora",
    "Reserve Room Goa",
  ],
  robots: {
    index: false,
    follow: true,
  },
  alternates: { canonical: "https://redwingsstudio.com/booking" },
  openGraph: {
    title: "Book a Room — Redwings Studio Goa | Studio Apartments Arpora",
    description:
      "Book studio apartments from ₹1,950/night at Redwings Studio, Arpora, Goa. Direct booking with instant confirmation.",
    images: [
      {
        url: "/mountain-studio/hero-main.jpeg",
        width: 1200,
        height: 630,
        alt: "Book a Room at Redwings Studio Goa — Arpora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Room — Redwings Studio Goa",
    description: "Studio apartments from ₹1,950/night. Direct booking.",
    images: ["/mountain-studio/hero-main.jpeg"],
  },
};

export default function BookingPage() {
  return <BookingRedirectClient />;
}
