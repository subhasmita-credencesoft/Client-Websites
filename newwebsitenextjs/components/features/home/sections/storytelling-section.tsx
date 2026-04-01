"use client";

import Image from "next/image";
import { homeSectionContent, storytellingBlocks } from "@/lib/data/content/resort-content";
import { SectionHeading } from "@/components/ui/section-heading";

export function StorytellingSection() {
  return (
    <section
      id="story"
      data-section-id="story"
      className="relative z-10 mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32"
    >
      <SectionHeading
        eyebrow="Hotel Redwings Castle"
        title="One Comfortable Hotel For Multiple Stay Needs"
        description={homeSectionContent.about.body}
      />

      <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
        {storytellingBlocks.map((block, index) => (
          <article
            key={block.title}
            data-reveal
            className="grid items-center gap-9 md:grid-cols-2 md:gap-14"
          >
            <div className={index % 2 === 1 ? "md:order-2" : ""}>
              <div className="glass-panel luxury-shadow relative overflow-hidden rounded-[2.2rem] p-2">
                <div className="relative h-[18rem] overflow-hidden rounded-[1.65rem] md:h-[27rem]">
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                  <div className="h-full w-full will-transform" data-parallax data-parallax-depth="15">
                    <Image
                      src={block.image}
                      alt={block.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={index % 2 === 1 ? "md:order-1" : ""}>
              <p
                data-reveal-child
                className="mb-5 text-xs uppercase tracking-[0.34em] text-[#d8be99]"
              >
                0{index + 1}
              </p>
              <h3
                data-reveal-child
                className="text-balance text-4xl leading-tight text-[#f6ead8] md:text-5xl"
              >
                {block.title}
              </h3>
              <p
                data-reveal-child
                className="mt-5 max-w-xl text-balance text-base leading-relaxed text-white/70"
              >
                {block.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
