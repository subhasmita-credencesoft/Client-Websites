"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Tranquil Natural Environment",
  "Luxurious Modern Accommodations",
  "Tailored Multicuisine Dining",
  "Comprehensive Event Spaces",
  "Family-Friendly Water Park",
  "Exemplary Hospitality",
];

export default function WhyUksResort() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".benefit-item",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".benefit-icon",
        { scale: 0, rotation: -45 },
        {
          scale: 1,
          rotation: 0,
          stagger: 0.15,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-white py-24 text-[#31464f]">
      <Container>
        <div className="flex flex-col items-center text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#a9552b]">
            Why UK's Resort
          </p>
          <h2 className="mt-4 font-serif text-4xl text-[#1f3c44] md:text-5xl">
            The Ultimate Getaway Experience
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-gray-500">
            A sanctuary crafted to elevate your senses. Find out why our guests return time and time again.
          </p>

          <div className="mt-16 grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 md:gap-10">
            {benefits.map((benefit, i) => (
              <div key={i} className="benefit-item flex items-center rounded-xl bg-[#f7f3ee] p-6 shadow-sm transition-shadow hover:shadow-md">
                <CheckCircle2 className="benefit-icon mr-4 h-8 w-8 text-[#a9552b]" />
                <span className="text-lg font-medium text-[#1f3c44]">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
