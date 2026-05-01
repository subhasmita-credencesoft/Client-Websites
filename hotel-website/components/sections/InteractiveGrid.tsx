"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import Container from "../ui/Container";

const activities = [
  { title: "Water Park", image: "/images/main-image.JPG", desc: "Thrilling slides & pools" },
  { title: "Adventure Games", image: "https://bookonelocal.in/cdn/3.png", desc: "Zipline & rope courses" },
  { title: "Rain Dance", image: "/picnic.avif", desc: "Groove under the showers" },
  { title: "Paintball", image: "https://bookonelocal.in/cdn/IMG_1531.avif", desc: "Action-packed group fun" },
];

export default function InteractiveGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".grid-item",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={gridRef} className="bg-[#f7f3ee] py-20">
      <Container>
        <div className="mb-12 text-center">
          <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[#b68b5b]">Activities & Fun</span>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl text-[#1f3c44]">One Day Picnic</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[600px] lg:h-[400px]">
          {activities.map((item, idx) => (
            <div key={idx} className="grid-item group relative overflow-hidden rounded-2xl cursor-pointer">
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f3c44]/90 via-[#1f3c44]/20 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="mb-2 w-10 h-1 bg-[#f7c744] transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                <h3 className="font-serif text-2xl text-white mb-1 group-hover:text-[#f7c744] transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-300 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
