"use client";

import Image from "next/image";
import Container from "../ui/Container";
import { usePropertyData } from "../providers/PropertyDataProvider";
import { htmlToText } from "../../lib/sanitizeHtml";
import AnimatedContent from "./AnimatedContent";

export default function WelcomeSection() {
  const { property, isLoading, error } = usePropertyData();
  const name = property?.name || "UK's Resort";
  const description =
    htmlToText(property?.businessDescription).slice(0, 360) ||
    "UK's Resort - Just a few kilometers away from the hustle bustle of Mumbai and set amidst abundant scenic beauty and rich history.";
  const typeLine = [property?.businessType, property?.businessSubtype].filter(Boolean).join(" - ");
  const heroImage =
    property?.imageList?.find((img) => img?.mainImage)?.url ||
    property?.imageList?.[0]?.url ||
    "https://bookonelocal.in/cdn/Copy of IMG_1568.avif";

  return (
    <section className="bg-[#f6f2ec] py-12 text-[#1f3c44] sm:py-14 lg:py-16">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <AnimatedContent
            animateOnView
            distance={36}
            direction="vertical"
            duration={0.7}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            threshold={0.2}
            delay={0}
          >
            <div className="text-center lg:text-left">
              <h2 className="font-serif text-[2rem] leading-tight sm:text-[2.4rem] lg:text-[2.8rem]">
                Welcome to {name}!
              </h2>

              {isLoading && <p className="mt-3 text-sm text-[#1f3c44]/55">Loading property details...</p>}
              {!isLoading && error && <p className="mt-3 text-sm text-[#1f3c44]/55">{error}</p>}

              {!isLoading && !error && typeLine && (
                <p className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-[#1f3c44]/65">{typeLine}</p>
              )}

              <p className="mt-5 text-[0.98rem] leading-relaxed text-[#1f3c44]/80 sm:text-[1.05rem]">
                {description}
              </p>
            </div>
          </AnimatedContent>

          <AnimatedContent
            animateOnView
            distance={28}
            direction="vertical"
            duration={0.75}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            threshold={0.2}
            delay={0.1}
          >
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_38px_rgba(31,60,68,0.12)]">
              <div className="relative h-64 w-full sm:h-72 lg:h-[24rem]">
                <Image
                  src={heroImage}
                  alt={`${name} view`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              </div>
              <div className="border-t border-[#1f3c44]/10 bg-white px-5 py-4">
                <p className="text-[0.8rem] leading-snug text-[#1f3c44]/65">
                  Experience scenic beauty, warm hospitality, and restful comfort at {name}.
                </p>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </Container>
    </section>
  );
}
