"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type GalleryImage = {
  src: string;
  category: string;
  title: string;
};

export function GalleryFilter({ images }: { images: GalleryImage[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(images.map((item) => item.category)))],
    [images],
  );
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") {
      return images;
    }

    return images.filter((item) => item.category === active);
  }, [active, images]);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-[0.18em] transition ${
              active === category
                ? "border-[var(--primary-700)] bg-[var(--primary-700)] text-white"
                : "border-[var(--neutral-300)] bg-white text-[var(--text-secondary)] hover:border-[var(--accent-gold)] hover:text-[var(--text-primary)]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="columns-1 gap-6 md:columns-2 xl:columns-4">
        {filtered.map((image) => (
          <figure
            key={`${image.src}-${image.title}`}
            className="group mb-6 break-inside-avoid overflow-hidden rounded-[28px] border border-[var(--neutral-200)] bg-white shadow-[0_2px_10px_rgba(15,24,25,0.08)]"
          >
            <div className="relative min-h-[280px]">
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <figcaption className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-gold)]">
                {image.category}
              </p>
              <p className="mt-2 text-base font-medium text-[var(--text-primary)]">{image.title}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
