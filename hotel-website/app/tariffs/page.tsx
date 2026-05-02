import type { Metadata } from "next";
import TariffInfo from "../../components/sections/TariffInfo";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Room Tariff & Picnic Packages — UK's Resort Khopoli | Prices, Inclusions & Booking",
  description:
    "Review room tariff, overnight group package rates, and picnic pricing at UK's Resort Khopoli with clear inclusions and booking options.",
  path: "/tariffs",
  image: "https://bookonelocal.in/cdn/conference3-1.jpg",
});

export default function TariffPage() {
  return <TariffInfo />;
}
