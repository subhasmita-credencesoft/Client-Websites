"use client";

import { useEffect, useState } from "react";
import Container from "../ui/Container";

const storySlides = [
  {
    year: "1983",
    text:
      "Immerse yourself in elegance with top-notch live music performances, expertly crafted cocktails and food, and exceptional service.",
    image: "/images/room_1.jpg",
  },
  {
    year: "1992",
    text:
      "A new chapter of oceanfront escapes and serene mornings began with signature suites.",
    image: "/images/room_2.jpg",
  },
  {
    year: "2001",
    text:
      "Our culinary artisans curated immersive dining experiences and open-kitchen rituals.",
    image: "/images/room_3.jpg",
  },
  {
    year: "2008",
    text:
      "Wellness sanctuaries opened with tailored rituals for body, mind, and soul.",
    image: "/images/room_4.jpg",
  },
  {
    year: "2020",
    text:
      "A refined era of bespoke celebrations and elevated guest journeys took shape.",
    image: "/images/room_5.jpg",
  },
];

export default function ContactStory() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % storySlides.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  const activeSlide = storySlides[activeIndex];
  return (
    <section className="bg-[#f6f3ed] py-20 text-[#1f3c44]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-8">
            <span className="text-xs uppercase tracking-[0.45em] text-[#1f3c44]/70">
              Our story
            </span>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              A place of heart,
              <br />
              your home away
            </h2>
            <p className="max-w-xl text-sm leading-7 text-[#1f3c44]/75">
              Welcome to our oasis of luxury and tranquility, where every
              aspect of your experience is meticulously crafted to exceed your
              expectations. Our resort is a perfect combination of distinctly
              designed rooms in a setting of rare natural beauty.
            </p>

            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-3 border-t border-[#1f3c44]/30 pt-6">
                <p className="font-serif text-4xl">524</p>
                <p className="text-sm text-[#1f3c44]/70">luxury rooms</p>
              </div>
              <div className="space-y-3 border-t border-[#1f3c44]/30 pt-6">
                <p className="font-serif text-4xl">125K</p>
                <p className="text-sm text-[#1f3c44]/70">guests served</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={activeSlide.image}
                alt={`Resort story ${activeSlide.year}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-serif text-2xl">{activeSlide.year}</p>
                <p className="mt-2 max-w-xs text-xs leading-5 text-white/80">
                  {activeSlide.text}
                </p>
              </div>
            </div>
            <div className="flex min-h-[260px] flex-col justify-end rounded-2xl border border-[#1f3c44]/15 bg-white/70 p-6">
              <p className="font-serif text-2xl text-[#1f3c44]/80">
                {storySlides[(activeIndex + 1) % storySlides.length].year}
              </p>
            </div>
          </div>

          <div className="mt-4 flex gap-2 text-[#1f3c44]/40">
            {storySlides.map((slide, index) => (
              <span
                key={slide.year}
                className={`h-1.5 w-1.5 rounded-full ${
                  index === activeIndex ? "bg-[#1f3c44]" : "bg-[#1f3c44]/30"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
