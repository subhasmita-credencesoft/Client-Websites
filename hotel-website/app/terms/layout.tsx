import type { Metadata } from "next";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Terms & Conditions — UK's Resort Khopoli | Booking Policies & Rules",
  description:
    "Read the terms and conditions, booking policies, cancellation rules, and stay guidelines at UK's Resort Khopoli.",
  path: "/terms",
  image: "https://bookonelocal.in/cdn/3.png",
});

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
