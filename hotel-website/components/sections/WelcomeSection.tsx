"use client";

import Container from "../ui/Container";
import { usePropertyData } from "../providers/PropertyDataProvider";
import { htmlToText } from "../../lib/sanitizeHtml";

export default function WelcomeSection() {
  const { property, isLoading, error } = usePropertyData();
  const name = property?.name || "UK's Resort";
  const description =
    htmlToText(property?.businessDescription).slice(0, 360) ||
    "UK's Resort - Just a few kilometers away from the hustle bustle of Mumbai and set amidst abundant scenic beauty and rich history.";
  const typeLine = [property?.businessType, property?.businessSubtype].filter(Boolean).join(" - ");

  return (
    <section className="bg-[#f6f2ec] py-12 text-[#1f3c44] sm:py-14 lg:py-16">
      <Container className="text-center">
        <h2 className="font-serif text-[2rem] leading-tight sm:text-[2.4rem] lg:text-[2.8rem]">
          Welcome to {name}!
        </h2>
        {isLoading && <p className="mt-3 text-sm text-[#1f3c44]/55">Loading property details...</p>}
        {!isLoading && error && <p className="mt-3 text-sm text-[#1f3c44]/55">{error}</p>}
        {!isLoading && !error && typeLine && (
          <p className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-[#1f3c44]/65">{typeLine}</p>
        )}
        <p className="mx-auto mt-5 max-w-4xl text-[0.98rem] leading-relaxed text-[#1f3c44]/80 sm:text-[1.05rem]">
          {description}
        </p>
      </Container>
    </section>
  );
}
