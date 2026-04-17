"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import { WEDDINGS_MEETING_CARDS } from "@/data/sections/eventsActivitiesShowcase";

export default function EventsActivitiesShowcase() {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 3D Header Reveal
      gsap.fromTo(
        ".events-support-header",
        { y: 80, autoAlpha: 0, rotationX: -20, filter: "blur(15px)" },
        {
          y: 0,
          autoAlpha: 1,
          rotationX: 0,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // Pinned Panels Sequence
      const panels = gsap.utils.toArray<HTMLElement>(".showcase-panel");
      
      panels.forEach((panel, i) => {
        const bgImg = panel.querySelector(".showcase-bg");
        const contentBox = panel.querySelector(".showcase-content-box");

        // The panel itself pins and stacks
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          end: "bottom top", // pin until the next panel completely covers it or it scrolls naturally
          pin: true,
          pinSpacing: false, 
        });

        // Background Parallax & Dimming
        if (bgImg) {
          gsap.fromTo(bgImg, 
            { scale: 1.1, transformOrigin: 'center center' }, 
            {
              scale: 1,
              opacity: i === panels.length - 1 ? 1 : 0.4, // Dim previous panels
              scrollTrigger: {
                trigger: panel,
                start: "top top",
                end: "+=100%",
                scrub: true,
              }
            }
          );
        }

        // Inner Content 3D Reveal
        if (contentBox) {
          gsap.fromTo(contentBox,
            { yPercent: 50, rotationX: 15, scale: 0.9, opacity: 0 },
            {
              yPercent: 0,
              rotationX: 0,
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "expo.out",
              scrollTrigger: {
                trigger: panel,
                start: "top center",
                toggleActions: "play reverse play reverse",
              }
            }
          );
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#0f1216] text-[#f1ece3] perspective-1000">
      
      {/* Intro Header aligned with previous section's dark bg */}
      <div className="relative pt-32 pb-40 z-10 w-full bg-gradient-to-b from-[#0f1216] to-[#1f3c44]">
        <Container>
          <div className="mx-auto max-w-5xl text-center transform-style-3d">
            <span className="events-support-header mb-6 inline-block rounded-full border border-[#d89a55]/30 bg-[#1f3c44]/50 px-8 py-3 text-xs font-bold uppercase tracking-[0.4em] text-[#d89a55] backdrop-blur-xl shadow-2xl">
              Event Support
            </span>
            <h2 className="events-support-header font-serif text-5xl leading-tight text-white md:text-[5.5rem] lg:text-[7rem]">
              Every detail, <br />
              <span className="italic text-[#d89a55]">made effortless.</span>
            </h2>
            <p className="events-support-header mx-auto mt-8 max-w-2xl text-xl text-[#f1ece3]/70 font-light">
              From sophisticated dining options to expansive indoor leisure tracks, we ensure layers of comfort for all event attendees.
            </p>
          </div>
        </Container>
      </div>

      {/* Massive Stacking Parallax Panels */}
      <div className="relative w-full">
        {WEDDINGS_MEETING_CARDS.map((card, index) => (
          <div 
            key={card.title}
            className="showcase-panel relative h-screen w-full overflow-hidden flex items-center justify-center transform-style-3d bg-[#143b47]"
            style={{ zIndex: index }}
          >
            {/* Massive Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="showcase-bg object-cover object-center will-change-transform mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,59,71,0.4)_0%,rgba(15,18,22,0.95)_100%)] mix-blend-multiply" />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* 3D Floating Glass Content Box */}
            <div className="showcase-content-box relative z-10 w-[90%] max-w-5xl rounded-[3rem] border border-[#d89a55]/10 bg-[#1f3c44]/40 p-10 md:p-20 text-center backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] transform-style-3d">
              <div className="mb-6 inline-flex rounded-full bg-[#d89a55]/10 px-6 py-2 border border-[#d89a55]/20">
                <span className="text-xs font-bold uppercase tracking-widest text-[#d89a55]">
                  Experience Track {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              
              <h3 className="mb-8 font-serif text-5xl text-white md:text-7xl lg:text-[6rem] leading-[0.9] drop-shadow-2xl">
                {card.title}
              </h3>
              
              <div className="mx-auto mb-8 h-[2px] w-32 bg-gradient-to-r from-transparent via-[#d89a55] to-transparent" />
              
              <p className="mx-auto max-w-3xl text-xl leading-relaxed text-[#f1ece3] drop-shadow-lg font-light md:text-2xl">
                {card.description}
              </p>
            </div>
            
            {/* Scroll Indicator (Only on first few) */}
            {index < WEDDINGS_MEETING_CARDS.length - 1 && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce">
                <div className="h-16 w-[1px] bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
                <span className="mt-4 text-[0.6rem] uppercase tracking-widest text-white/70">Scroll</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
