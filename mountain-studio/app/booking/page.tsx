import type { Metadata } from "next";
import { BookingRedirectClient } from "./BookingRedirectClient";

export const metadata: Metadata = {
  title: "Book a Room",
  description:
    "Book your stay at Redwings Studio, Goa — studio apartments from ₹1,950/night at Abalone Resort, Gorbhat, Arpora. Direct booking with instant confirmation.",
  alternates: { canonical: "https://redwingsstudio.com/booking" },
  openGraph: {
    title: "Book a Room — Redwings Studio Goa",
    description:
      "Book studio apartments from ₹1,950/night at Redwings Studio, Goa. Direct booking with instant confirmation.",
    images: [
      {
        url: "/mountain-studio/hero-main.jpeg",
        width: 1200,
        height: 630,
        alt: "Book a Room at Redwings Studio Goa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Room — Redwings Studio Goa",
    description: "Book studio apartments from ₹1,950/night. Direct booking.",
    images: ["/mountain-studio/hero-main.jpeg"],
  },
};

export default function BookingPage() {
  return <BookingRedirectClient />;
}
