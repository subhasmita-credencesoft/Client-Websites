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

const packageMeta: Record<
  string,
  {
    label: string;
    accent: string;
    weekday: string;
    weekend: string;
    inclusions: string[];
  }
> = {
  "Classic Package": {
    label: "Package 01",
    accent: "from-[#f8ecd8] via-[#e5c393] to-[#bf8f5b]",
    weekday: "Rs. 4,500 / person",
    weekend: "Rs. 5,500 / person",
    inclusions: ["5 meals included", "Stay access", "Venue access"],
  },
  "Signature Package": {
    label: "Package 02",
    accent: "from-[#fff2db] via-[#e0bd88] to-[#b6814d]",
    weekday: "Rs. 5,500 / person",
    weekend: "Rs. 6,500 / person",
    inclusions: ["Classic package base", "2 extra starters", "1 extra gravy"],
  },
  "Premium Luxe Package": {
    label: "Package 03",
    accent: "from-[#fff5e2] via-[#f0cc96] to-[#bf8c50]",
    weekday: "Rs. 6,500 / person",
    weekend: "Rs. 7,500 / person",
    inclusions: ["Signature hospitality", "2 live counters", "Elevated dining service"],
  },
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
        {visibleCards.map((card) => {
          const meta = packageMeta[card.title];

          return (
            <Link
              key={card.title}
              href={cardLinks[card.title] ?? "/offers"}
              data-card
              className="group relative block min-h-[36rem] overflow-hidden rounded-[2rem] border border-white/15 bg-[#08110d] shadow-[0_30px_80px_rgba(0,0,0,0.4)]"
              data-cursor="hover"
            >
              <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="10">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(210,172,111,0.24),transparent_34%),linear-gradient(90deg,rgba(4,9,7,0.9)_0%,rgba(4,9,7,0.74)_34%,rgba(4,9,7,0.36)_62%,rgba(4,9,7,0.7)_100%)] transition-opacity duration-500 group-hover:opacity-95" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.56)_100%)]" />

              <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
                <div className="max-w-[22rem] rounded-[1.75rem] border border-white/12 bg-black/45 p-6 backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[0.72rem] uppercase tracking-[0.42em] text-[#d5b384]">{meta?.label ?? "Package"}</span>
                    <span className="rounded-full border border-[#d8b07a]/35 bg-[#d8b07a]/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.28em] text-[#f4dcc0]">
                      Premium Stay
                    </span>
                  </div>

                  <h4 className={`mt-6 max-w-[10ch] bg-gradient-to-r ${meta?.accent ?? "from-[#f8ecd8] via-[#e5c393] to-[#bf8f5b]"} bg-clip-text text-5xl leading-[0.88] text-transparent md:text-6xl`}>
                    <span className="block">{card.title.replace(" Package", "")}</span>
                    <span className="block">Package</span>
                  </h4>

                  <p className="mt-5 text-lg leading-relaxed text-white/90">{card.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/68 md:text-base">{card.description}</p>

                  <div className="mt-8 grid gap-3 text-sm text-white/90">
                    <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
                      <span className="block text-[0.68rem] uppercase tracking-[0.28em] text-[#d7b483]">Weekday Offer</span>
                      <span className="mt-2 block text-xl text-[#fff4e3]">{meta?.weekday ?? "Available on request"}</span>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
                      <span className="block text-[0.68rem] uppercase tracking-[0.28em] text-[#d7b483]">Weekend Offer</span>
                      <span className="mt-2 block text-xl text-[#fff4e3]">{meta?.weekend ?? "Available on request"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-[28rem]">
                    <div className="flex flex-wrap gap-2">
                      {(meta?.inclusions ?? []).map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/15 bg-white/7 px-3 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-white/88 backdrop-blur-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-3 self-start rounded-full border border-[#d8b07a]/40 bg-[#0c1713]/80 px-5 py-3 text-[0.72rem] uppercase tracking-[0.26em] text-[#f6dfbf] backdrop-blur-md transition-all duration-500 group-hover:border-[#f0cf9d]/70 group-hover:bg-[#101d17]">
                    View Package
                    <span className="text-base transition-transform duration-500 group-hover:translate-x-1">+</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
