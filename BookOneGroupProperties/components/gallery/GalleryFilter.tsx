"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { homePageData } from "@/data/home";

export function GalleryFilter() {
  const { gallery } = homePageData;
  const [activeCategory, setActiveCategory] = useState("all");

  const displayImages = useMemo(() => {
    if (activeCategory === "all") return gallery.images;
    const grouped = (gallery as any).groupedImages || {};
    return grouped[activeCategory] ?? [];
  }, [activeCategory, gallery]);

  return (
    <div className="container mx-auto px-6">
      <div className="mb-12 text-center">
        {(gallery as any).categories && (
          <div className="no-scrollbar flex w-full gap-2 overflow-x-auto pb-4 justify-center">
            {(gallery as any).categories.map((category: any) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`whitespace-nowrap rounded-full px-6 py-2 text-sm font-bold transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-primary text-white shadow-md scale-105"
                    : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 transition-all duration-500">
        {displayImages.map((image: string, index: number) => (
          <div 
            key={`${activeCategory}-${index}`} 
            className="relative group overflow-hidden rounded-lg aspect-[4/3] cursor-pointer animate-in fade-in duration-500"
          >
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
