"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Plus, X } from "lucide-react";

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
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [mounted, setMounted] = useState(false);

  const filtered = useMemo(() => {
    if (active === "All") {
      return images;
    }

    return images.filter((item) => item.category === active);
  }, [active, images]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!selectedImage) return;

    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  const modal =
    mounted && selectedImage
      ? createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/88 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selectedImage.title}
          >
            <div
              className="relative flex max-h-[92vh] w-full max-w-7xl items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute right-0 top-0 z-20 flex h-11 w-11 -translate-y-14 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-md transition hover:bg-white/20"
                aria-label="Close image preview"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative flex max-h-[92vh] w-full items-center justify-center overflow-hidden rounded-3xl bg-transparent">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="block max-h-[82vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
                />
              </div>

              <div className="pointer-events-none absolute bottom-4 left-1/2 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 rounded-2xl bg-black/35 px-4 py-3 text-center text-white backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-gold)] opacity-95">
                  {selectedImage.category}
                </p>
                <p className="mt-2 text-base font-medium md:text-lg">
                  {selectedImage.title}
                </p>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div className="space-y-12">
        {/* Filter Buttons Section */}
        <div className="relative">
          {/* Animated background gradient */}
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-50 via-transparent to-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

          <div className="relative flex flex-wrap gap-3 p-2">
            {categories.map((category, index) => (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                className={`
                  group relative px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] 
                  transition-all duration-300 ease-out
                  rounded-full border-2
                  overflow-hidden
                  ${
                    active === category
                      ? "border-[var(--primary-700)] bg-[var(--primary-700)] text-white shadow-lg shadow-blue-500/30 scale-105"
                      : "border-[var(--neutral-300)] bg-white/80 backdrop-blur-sm text-[var(--text-secondary)] hover:border-[var(--accent-gold)] hover:text-[var(--text-primary)] hover:shadow-md hover:bg-white"
                  }
                `}
                style={{
                  animation: `slideIn 0.5s ease-out forwards`,
                  animationDelay: `${index * 50}ms`,
                  opacity: 0,
                }}
              >
                {/* Shine effect on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                <span className="relative inline-block">{category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid Section */}
        <div className="relative">
          {/* Animated background elements */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-amber-100/20 to-transparent rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          <div className="relative columns-1 gap-6 md:columns-2 xl:columns-4">
            {filtered.map((image, index) => (
              <figure
                key={`${image.src}-${image.title}`}
                className="group mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-[var(--neutral-200)] bg-white shadow-[0_2px_10px_rgba(15,24,25,0.08)] hover:shadow-[0_20px_40px_rgba(15,24,25,0.15)] transition-all duration-500"
                style={{
                  animation: `fadeInUp 0.6s ease-out forwards`,
                  animationDelay: `${index * 80}ms`,
                  opacity: 0,
                }}
              >
                {/* Image Container */}
                <button
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className="relative block w-full min-h-[280px] overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-50 text-left cursor-pointer"
                  aria-label={`Open full image: ${image.title}`}
                >
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />

                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Plus icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[var(--text-primary)] shadow-lg backdrop-blur-sm transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Plus className="h-7 w-7" />
                    </div>
                  </div>

                  {/* Category badge overlay */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="inline-block px-3 py-1 bg-[var(--accent-gold)] text-[var(--text-primary)] text-xs font-bold rounded-full shadow-lg">
                      {image.category}
                    </span>
                  </div>
                </button>

                {/* Caption Section */}
                <figcaption className="p-5 relative">
                  {/* Background accent line */}
                  <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-[var(--accent-gold)] to-transparent group-hover:w-12 transition-all duration-500" />

                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-gold)] opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    {image.category}
                  </p>

                  <p className="mt-2 text-base font-medium text-[var(--text-primary)] group-hover:text-[var(--primary-700)] transition-colors duration-300 line-clamp-2">
                    {image.title}
                  </p>

                  {/* Hover indicator */}
                  <div className="mt-3 h-0.5 w-0 bg-gradient-to-r from-[var(--primary-700)] to-[var(--accent-gold)] group-hover:w-8 transition-all duration-500" />
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="relative py-20 text-center">
              <p className="text-lg text-[var(--text-secondary)] font-medium">
                No images found in this category
              </p>
            </div>
          )}
        </div>

        {/* Global Animations */}
        <style jsx>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          figure {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
        `}</style>
      </div>

      {modal}
    </>
  );
}