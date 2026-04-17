"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import Container from "../ui/Container";

const images = [
  "https://bookonelocal.in/cdn/3.avif",
  "https://bookonelocal.in/cdn/IMG_1531.avif",
  "https://bookonelocal.in/cdn/wedding4-1.jpg",
  "/picnic.avif",
];

export default function ImmersiveGallery({ title = "Capturing The Essence" }: { title?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-item",
        { y: 60, opacity: 0, rotationX: 10 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 75%",
          },
        }
      );
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapperRef} className="bg-[#f7f3ee] py-24 perspective-1000">
      <Container>
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl text-[#1a382d] md:text-5xl">{title}</h2>
          <div className="mx-auto mt-6 h-0.5 w-24 bg-[#b68b5b]" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img, i) => (
            <div 
              key={i} 
              className={`gallery-item group relative w-full overflow-hidden rounded-2xl shadow-xl ${i % 2 !== 0 ? 'mt-0 lg:mt-12' : ''} h-[400px] lg:h-[500px]`}
            >
              <Image 
                src={img} 
                alt="Immersive Gallery Image" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b1a17]/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-6 left-6 translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-xs uppercase tracking-widest text-[#f7c744]">Moments</span>
                <p className="mt-1 font-serif text-xl text-white">UK's Resort</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
