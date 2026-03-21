import type { Metadata } from "next";
import Hero from "../components/sections/Hero";
import HomeLazyStack from "../components/sections/HomeLazyStack";
import { createPageMetadata } from "../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Home",
  description:
    "Discover luxury stays, destination dining, weddings, and memorable experiences at UK's Resort, Khopoli.",
  path: "/",
  image: "https://bookonelocal.in/cdn/3.png",
});

export default function Home() {
  return (
    <div className="site-page">
      <Hero />
      <HomeLazyStack />
    </div>
  );
}

