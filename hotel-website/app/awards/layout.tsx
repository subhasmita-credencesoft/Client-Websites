import type { Metadata } from "next";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Awards & Recognition — UK's Resort Khopoli | Accolades & Testimonials",
  description:
    "View awards, recognition certificates, and guest testimonials earned by UK's Resort Khopoli over years of dedicated hospitality service.",
  path: "/awards",
  image: "https://bookonelocal.in/cdn/3.png",
});

export default function AwardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
