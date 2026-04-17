"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DestinationWedding() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Blur to clear reveal on image
      gsap.fromTo(
        ".wedding-img",
        { filter: "blur(20px)", scale: 1.1, autoAlpha: 0 },
        {
          filter: "blur(0px)",
          scale: 1,
          autoAlpha: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Stagger texts
      gsap.fromTo(
        ".wedding-text",
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          },
        }
      );

      // Particles effect (simple parallax dots)
      gsap.to(".particle", {
        yPercent: -150,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#1a382d] py-20 text-[#e5d3b3]">
      {/* Particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="particle absolute rounded-full bg-[#f7c744] opacity-20 blur-[2px]"
          style={{
            width: Math.random() * 8 + 4 + "px",
            height: Math.random() * 8 + 4 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
        />
      ))}

      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative h-[60vh] w-full overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="https://bookonelocal.in/cdn/wedding4-1.jpg"
              alt="Destination Wedding"
              fill
              className="wedding-img object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Text */}
          <div ref={textRef} className="flex flex-col justify-center space-y-6">
            <h4 className="wedding-text text-sm font-semibold uppercase tracking-widest text-[#f7c744]">
              Destination Wedding
            </h4>
            <h2 className="wedding-text font-serif text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
              Begin your forever in nature's embrace
            </h2>
            <p className="wedding-text text-lg text-[#e5d3b3]/80">
              Celebrate your milestone moments with bespoke arrangements, grand venues, and immersive natural beauty. With elegant setups and dedicated event planners, we make sure your special day is flawless.
            </p>
            <div className="wedding-text pt-4">
              <button className="rounded-full border border-[#f7c744] bg-transparent px-8 py-3 text-sm tracking-wider text-[#f7c744] transition-colors hover:bg-[#f7c744] hover:text-[#1a382d]">
                Plan Your Wedding
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
