"use client";

import Image from "next/image";
import { gastronomyCards } from "@/lib/data/mountain-content";
import { homeSectionContent } from "@/lib/data/resort-content";

export function GastronomySection() {
  const content = homeSectionContent.gastronomy;

  return (
    <section data-section-id="gastronomy" className="bg-black px-0 py-20">
      <div data-reveal className="mx-auto max-w-6xl px-5 text-center">
        <h3 data-section-title className="text-4xl text-[#cba977] md:text-5xl">
          {content.title}
        </h3>
        <p className="mt-4 text-2xl text-white md:text-4xl" data-reveal-child>{content.subtitle}</p>
        <p className="mx-auto mt-8 max-w-6xl text-base leading-relaxed text-white/86 md:text-xl" data-reveal-child>
          {content.description}
        </p>
      </div>

      <div className="mt-12 overflow-x-auto px-3 pb-4 md:px-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-5 md:gap-7">
          {gastronomyCards.map((card) => (
            <article
              key={card.title}
              data-card
              className="group relative h-[24rem] w-[18rem] flex-none overflow-hidden bg-black md:h-[26rem] md:w-[24rem] xl:h-[28rem] xl:w-[28rem]"
            >
              <div className="absolute inset-0" data-card-image>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 18rem, (max-width: 1280px) 24rem, 28rem"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/28" />
              <div className="absolute inset-x-0 bottom-10 px-6 text-center">
                <p className="text-2xl font-semibold text-white md:text-[1.85rem]">{card.title}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
