import type { Metadata } from "next";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact UK's Resort Khopoli — Phone, WhatsApp, Email & Directions | Near Mumbai",
  description:
    "Contact UK's Resort Khopoli for reservations, WhatsApp enquiries, phone support, email assistance, and directions from Mumbai, Pune, and Navi Mumbai.",
  path: "/contact",
  image: "https://bookonelocal.in/cdn/4.png",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
