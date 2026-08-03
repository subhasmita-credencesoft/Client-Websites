'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const heroImages = ['/heroimg1.jpeg', '/heroimg2.jpeg', '/heroimg3.jpeg'];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div key={current} className="absolute inset-0 z-0 animate-fade-in">
        <Image
          src={heroImages[current]}
          alt={`Malhar Baug Resort ${current + 1}`}
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="hero-overlay absolute inset-0 z-10" />

      <div className="relative z-20 mx-auto w-full max-w-4xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
          <span className="font-sans text-xs font-semibold uppercase tracking-wide text-white">
            Where Nature Meets Comfort in Alibaug
          </span>
        </div>

        <h1 className="font-serif text-5xl font-bold leading-[1.1] text-white sm:text-6xl lg:text-7xl">
          Escape to Nature at Malhar Baug Resort
        </h1>

        <p className="mt-6 font-sans text-base leading-relaxed text-neutral-100 sm:text-lg">
          Luxury Rooms • Private Villas • Swimming Pool • Garden Resort • Family-Friendly Stay Near Nagaon Beach
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="#contact" className="btn-primary">
            Book Your Stay
          </a>
          <a href="#explore" className="btn-secondary border-white text-white hover:bg-white hover:text-brand-700">
            Explore Resort
          </a>
        </div>
      </div>
    </section>
  );
}
