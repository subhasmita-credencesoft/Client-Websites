"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type HeroBackgroundRotatorProps = {
  images: string[];
};

export function HeroBackgroundRotator({ images }: HeroBackgroundRotatorProps) {
  const [activeBackgroundIndex, setActiveBackgroundIndex] = useState(0);
  const [slideshowReady, setSlideshowReady] = useState(false);

  useEffect(() => {
    if (images.length === 0) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.innerWidth >= 1024;
    if (reducedMotion || !isDesktop) return;

    let interval = 0;
    const bootTimer = window.setTimeout(() => {
      setSlideshowReady(true);
      interval = window.setInterval(() => {
        setActiveBackgroundIndex((current) => (current + 1) % images.length);
      }, 5600);
    }, 4200);

    return () => {
      window.clearTimeout(bootTimer);
      window.clearInterval(interval);
    };
  }, [images]);

  if (!slideshowReady || images.length === 0) {
    return null;
  }

  return (
    <>
      {images.map((background, index) => {
        const isActive = index === activeBackgroundIndex;

        return (
          <Image
            key={background}
            src={background}
            alt=""
            fill
            loading="lazy"
            sizes="100vw"
            className={`absolute inset-0 object-cover transition-opacity duration-[1400ms] ${isActive ? "opacity-100" : "opacity-0"}`}
          />
        );
      })}
    </>
  );
}
