import type { Metadata } from "next";
import TariffHero from "../../components/sections/TariffHero";
import TariffInfo from "../../components/sections/TariffInfo";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Tariff",
  description:
    "Review room tariff details, transparent pricing, and stay information for UK's Resort, Khopoli.",
  path: "/tariffs",
  image: "https://bookonelocal.in/cdn/conference3-1.jpg",
});

export default function TariffPage() {
  return (
    <>
      <TariffHero />
      {/* <HeroBookingBarDock /> */}
      <TariffInfo />
    </>
  );
}
