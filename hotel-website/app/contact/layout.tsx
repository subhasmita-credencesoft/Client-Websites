import type { Metadata } from "next";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Get in touch with UK's Resort, Khopoli for reservations, directions, and stay assistance.",
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
