"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Download, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { imageSet, studioGallery } from "@/lib/data";
import { cn } from "@/lib/utils";

const items = studioGallery;
const categories = ["All", "Exterior", "Studios", "Interiors", "Amenities", "Events"] as const;

/**
 * GalleryPageClient — filterable masonry gallery with lightbox (client component).
 * Extracted from app/gallery/page.tsx for SEO metadata support.
 */
export function GalleryPageClient() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const filtered = useMemo(
    () => (filter === "All" ? items : items.filter((item) => item.category === filter)),
    [filter]
  );

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (openIndex === null) return;
      if (event.key === "Escape") setOpenIndex(null);
      if (event.key === "ArrowRight")
        setOpenIndex((value) => (value === null ? 0 : (value + 1) % filtered.length));
      if (event.key === "ArrowLeft")
        setOpenIndex((value) => (value === null ? 0 : (value - 1 + filtered.length) % filtered.length));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openIndex, filtered.length]);

  return (
    <>
      <PageHero
        image={imageSet.lobby}
        eyebrow="Gallery"
        title="A visual story of Redwings Studio"
        description="Explore studio apartments, shared spaces, exterior views, and the overall feel of the property in Goa."
        priority
      />

      <section className="section-space">
        <div className="container-shell">
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            {[
              ["20+", "Redwings Studio images"],
              ["6", "Visual categories"],
              ["1", "Shared destination story"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[28px] border border-gold/16 bg-dark-2 p-6">
                <div className="font-display text-4xl text-gold-light">{value}</div>
                <p className="mt-3 text-sm uppercase tracking-[0.28em] text-ivory/58">{label}</p>
              </div>
            ))}
          </div>

          <div className="mb-10 flex flex-wrap gap-3" role="group" aria-label="Filter gallery by category">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                aria-pressed={item === filter}
                className={cn(
                  "rounded-full border px-4 py-3 text-xs uppercase tracking-[0.28em] transition",
                  filter === item ? "border-gold bg-gold text-dark" : "border-gold/18 text-ivory/55 hover:border-gold hover:text-gold"
                )}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
            {filtered.map((item, index) => (
              <button
                key={`${item.image}-${index}`}
                className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-[24px]"
                onClick={() => setOpenIndex(index)}
                aria-label={`Open image: ${item.title}`}
              >
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={index % 3 === 0 ? 1100 : 720}
                    className="h-auto w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
                    <div>
                      <div className="rounded-full border border-gold/30 bg-dark/55 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-gold-light">
                        {item.category}
                      </div>
                      <p className="mt-3 max-w-[18rem] text-left text-sm leading-6 text-ivory/84">{item.title}</p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {openIndex !== null ? (
          <motion.div
            className="fixed inset-0 z-[110] bg-black/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Image viewer: ${filtered[openIndex]?.title}`}
          >
            <div className="flex h-full flex-col">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm uppercase tracking-[0.3em] text-ivory/65">
                  {openIndex + 1} / {filtered.length}
                </div>
                <div className="flex gap-3">
                  <a
                    href={filtered[openIndex].image}
                    download
                    className="rounded-full border border-gold/25 p-3 text-ivory transition hover:border-gold"
                    aria-label="Download image"
                  >
                    <Download size={18} />
                  </a>
                  <button
                    onClick={() => setOpenIndex(null)}
                    className="rounded-full border border-gold/25 p-3 text-ivory transition hover:border-gold"
                    aria-label="Close image viewer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div className="relative flex-1">
                <motion.div
                  key={filtered[openIndex].image}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative h-full overflow-hidden rounded-[28px]"
                >
                  <Image
                    src={filtered[openIndex].image}
                    alt={filtered[openIndex].title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </motion.div>
                <button
                  aria-label="Previous image"
                  onClick={() =>
                    setOpenIndex((value) => (value === null ? 0 : (value - 1 + filtered.length) % filtered.length))
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-gold/25 bg-dark/55 p-3 text-ivory transition hover:border-gold"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  aria-label="Next image"
                  onClick={() =>
                    setOpenIndex((value) => (value === null ? 0 : (value + 1) % filtered.length))
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-gold/25 bg-dark/55 p-3 text-ivory transition hover:border-gold"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
