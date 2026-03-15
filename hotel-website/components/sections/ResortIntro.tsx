"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Waves, Tent, Dumbbell, Gamepad2, UtensilsCrossed, TreePine } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";

const highlights = [
  { title: "Water Park & Swimming Pool with Rain Dance", Icon: Waves },
  { title: "Adventure Activities - Archery, Zorbing, Wall Climbing & more", Icon: Tent },
  { title: "Fully Furnished Gym with Sophisticated Equipment", Icon: Dumbbell },
  { title: "Indoor Games - Table Tennis, Badminton & Carom", Icon: Gamepad2 },
  { title: "Multi-cuisine Restaurant & Dining Experience", Icon: UtensilsCrossed },
  { title: "Outdoor Sports & Exclusively Designed Kid's Park", Icon: TreePine },
];

const values = [
  {
    title: "Vision",
    text: "To serve all our guests with a personal touch, making them feel on top of the world.",
  },
  {
    title: "Mission",
    text: "To be the first choice of our guests.",
  },
];

const introSlides = [
  { src: "/images/7-9-25/Copy of IMG_1568.avif", alt: "Resort aerial view" },
  { src: "/images/7-9-25/Copy of IMG_2912.avif", alt: "Resort leisure area" },
  { src: "/images/7-9-25/Copy of IMG_2911.avif", alt: "Resort landscape" },
];

const AUTO_SLIDE_MS = 3500;

export default function ResortIntro() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % introSlides.length);
    }, AUTO_SLIDE_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#f3efe8] py-14 text-[#1f3c44] sm:py-20 lg:py-24">
      <Container>
        <div className="flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.28em] sm:gap-6 sm:text-xs sm:tracking-[0.38em]">
          <span>About UK&apos;s Resort</span>
          <div className="h-px flex-1 bg-[#1f3c44]/15" />
        </div>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
          <div>
            <h2 className="font-serif text-[1.7rem] leading-[1.12] tracking-[-0.01em] sm:text-[2.1rem] md:text-[2.6rem] lg:text-[3rem]">
              The Name That Redefines Hospitality Par&#8209;Excellence In The Lush Green Landscape At Khopoli.
            </h2>

            <div className="mt-6 max-w-xl space-y-4 text-[0.95rem] leading-[1.75] text-[#1f3c44]/70 sm:mt-7 sm:text-[0.98rem]">
              <p>
                Just a few miles from the outskirts of the hustle-n-bustle of Mumbai&apos;s concrete jungle,
                a complete at-home experience awaits - one that fulfills your heart&apos;s desires and offers
                the break you have always longed for.
              </p>
              <p>
                A signature business hotel showcasing impeccable hospitality amidst scenic beauty and
                rich history that blends harmoniously with today&apos;s lifestyles.
              </p>
              <p>
                Specially manicured landscaped gardens spread across over 85,000 sq. ft., overlooking
                mountains and greenery as far as the eye can see, creating the perfect setting for your
                business and leisure events.
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-0 divide-y divide-[#1f3c44]/12 border-y border-[#1f3c44]/12 sm:mt-10">
              {values.map((item) => (
                <div key={item.title} className="flex items-start gap-5 py-5 sm:gap-6 sm:py-6">
                  <span className="mt-0.5 min-w-[5.5rem] text-[0.64rem] uppercase tracking-[0.22em] text-[#d89a55] sm:text-[0.68rem] sm:tracking-[0.26em]">
                    {item.title}
                  </span>
                  <p className="text-[0.9rem] leading-[1.65] text-[#1f3c44]/75 sm:text-[0.93rem]">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10">
              <Button
                href="/rooms"
                className="h-11 rounded-full border-[#1f3c44]/35 px-7 text-[0.68rem] uppercase tracking-[0.22em] text-[#1f3c44] transition-colors hover:border-[#1f3c44] hover:bg-[#1f3c44] hover:text-white"
              >
                Explore more
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_40px_rgba(31,60,68,0.10)]">
              <div className="relative h-60 w-full sm:h-72 lg:h-[22rem]">
                {introSlides.map((slide, idx) => (
                  <div
                    key={slide.src}
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{ opacity: idx === activeSlide ? 1 : 0 }}
                    aria-hidden={idx !== activeSlide}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className="object-cover"
                      priority={idx === 0}
                    />
                  </div>
                ))}

                <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                  {introSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Go to slide ${idx + 1}`}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === activeSlide ? "w-5 bg-white" : "w-2 bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-[#1f3c44]/8 bg-white px-5 py-4 sm:px-6 sm:py-5">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d89a55]/50 text-[0.62rem] font-semibold text-[#d89a55] sm:h-10 sm:w-10 sm:text-[0.66rem]">
                  UK
                </span>
                <p className="text-[0.8rem] leading-snug text-[#1f3c44]/65 sm:text-[0.83rem]">
                  Award-winning resort in the lush green landscape at Khopoli
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {highlights.map(({ title, Icon }) => (
                <div
                  key={title}
                  className="flex flex-col gap-2.5 rounded-xl border border-[#1f3c44]/10 bg-white/70 p-4 transition-shadow hover:shadow-md sm:p-5"
                >
                  <Icon className="h-5 w-5 text-[#d89a55] sm:h-6 sm:w-6" strokeWidth={1.4} />
                  <p className="text-[0.73rem] leading-[1.45] text-[#1f3c44]/80 sm:text-[0.78rem]">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
