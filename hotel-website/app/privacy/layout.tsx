import type { Metadata } from "next";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy — UK's Resort Khopoli | Data Protection & Cookies",
  description:
    "Review the privacy policy of UK's Resort Khopoli covering data collection, cookie usage, and guest information protection.",
  path: "/privacy",
  image: "https://bookonelocal.in/cdn/3.png",
});

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
