"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { amenities, bookingEngineUrl, imageSet } from "@/lib/data";
import { cn } from "@/lib/utils";

const featureItems = amenities.slice(0, 6);

/**
 * AmenitiesPageClient — sticky nav + intersection observer scroll highlight (client component).
 * Extracted from app/amenities/page.tsx for SEO metadata support.
 */
export function AmenitiesPageClient() {
  const [active, setActive] = useState(featureItems[0].slug);

  useEffect(() => {
    const sections = featureItems.map((item) => document.getElementById(item.slug)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.45 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <PageHero
        image={imageSet.pool}
        eyebrow="Amenities"
        title="Amenities that support a smoother stay."
        description="Discover the spaces that make a stay at Redwings Studio feel comfortable, visual, and easy to navigate."
        priority
      />

      <div className="sticky top-20 z-30 border-b border-gold/12 bg-dark/75 backdrop-blur-xl" role="navigation" aria-label="Amenity sections">
        <div className="container-shell flex gap-4 overflow-x-auto py-4 hide-scrollbar">
          {featureItems.map((item) => (
            <a
              key={item.slug}
              href={`#${item.slug}`}
              aria-current={active === item.slug ? "location" : undefined}
              className={cn(
                "whitespace-nowrap rounded-full border px-4 py-2 text-xs uppercase tracking-[0.28em] transition",
                active === item.slug
                  ? "border-gold bg-gold text-dark"
                  : "border-gold/12 text-ivory/55 hover:border-gold hover:text-gold"
              )}
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>

      {featureItems.map((item, index) => (
        <section id={item.slug} key={item.slug} className="section-space">
          <div className={`container-shell grid gap-12 lg:grid-cols-2 lg:items-center ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div className="relative overflow-hidden rounded-[32px]">
              <Image
                src={item.image}
                alt={`${item.title} at Redwings Studio Goa`}
                width={1000}
                height={800}
                className="aspect-[5/4] w-full object-cover"
              />
            </div>
            <div>
              <div className="eyebrow">Signature Space 0{index + 1}</div>
              <h2 className="display-title text-5xl">{item.title}</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-ivory/68">{item.description}</p>
              <p className="mt-5 text-xs uppercase tracking-[0.3em] text-gold-light">{item.hours}</p>
              <Link
                href={bookingEngineUrl}
                className="mt-8 inline-flex rounded-full border border-gold px-5 py-3 text-xs uppercase tracking-[0.3em] text-gold transition hover:bg-gold hover:text-dark"
                rel="noopener noreferrer"
              >
                Reserve Access
              </Link>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
