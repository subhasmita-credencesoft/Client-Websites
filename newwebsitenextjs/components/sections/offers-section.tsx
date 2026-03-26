"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { offersCards } from "@/lib/data/mountain-content";
import { homeSectionContent } from "@/lib/data/resort-content";

type OfferTab = (typeof homeSectionContent.offers.tabs)[number];

const cardLinks: Record<string, string> = {
  "Classic Package": "/classic-package",
  "Signature Package": "/signature-package",
  "Premium Luxe Package": "/premium-luxo-package",
};

export function OffersSection() {
  const content = homeSectionContent.offers;
  const [activeTab, setActiveTab] = useState<OfferTab>(content.tabs[0]);
  const visibleCards = offersCards.filter((card) => (card.tabs as readonly OfferTab[]).includes(activeTab));

  return (
    <section data-section-id="offers" className="bg-black px-5 py-20 md:px-10">
      <div data-reveal className="text-center">
        <h3 data-section-title className="text-4xl text-[#cba977] md:text-5xl">
          {content.title}
        </h3>
        <p className="mt-3 text-2xl text-white md:text-3xl" data-reveal-child>{content.subtitle}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-xl font-semibold text-white/65 md:text-2xl" data-reveal-child>
          {content.tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`border-b pb-2 transition-colors ${
                activeTab === tab ? "border-[#ccab74] text-[#ccab74]" : "border-transparent text-white/65 hover:text-white"
              }`}
              data-cursor="hover"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-[92rem] gap-6 md:grid-cols-3" data-reveal>
        {visibleCards.map((card) => (
          <Link
            key={card.title}
            href={cardLinks[card.title] ?? "/offers"}
            data-card
            className="group relative block h-[33rem] overflow-hidden border border-white/20"
            data-cursor="hover"
          >
            <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="10">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.78)_48%,rgba(0,0,0,0.94)_100%)] px-7 pb-8 pt-20">
              <h4 className="max-w-[16ch] text-3xl leading-tight text-[#ccab74] md:text-4xl">{card.title}</h4>
              <p className="mt-3 text-base text-white/85 md:text-lg">{card.subtitle}</p>
              <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-white/70 md:text-base">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
