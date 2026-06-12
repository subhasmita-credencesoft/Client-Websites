"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import Container from "../ui/Container";
import { Shield, Sparkles, MapPin, HeartHandshake } from "lucide-react";

export default function ValueProposition() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".vp-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const items = [
    {
      icon: <MapPin className="h-6 w-6 text-[#b68b5b]" />,
      title: "Prime Location",
      desc: "Nestled in the lush valleys of Khopoli, perfectly distanced from the city yet easily accessible.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-[#b68b5b]" />,
      title: "Premium Amenities",
      desc: "Water Fun & Plays, rain dances, and state-of-the-art conference halls tailored for your absolute comfort.",
    },
    {
      icon: <Shield className="h-6 w-6 text-[#b68b5b]" />,
      title: "Safe & Secure",
      desc: "Round-the-clock security and pristine hygiene standards to ensure peace of mind.",
    },
    {
      icon: <HeartHandshake className="h-6 w-6 text-[#b68b5b]" />,
      title: "Warm Hospitality",
      desc: "Our passionate staff are dedicated to delivering moments of joy with every interaction.",
    },
  ];

  return (
    <section ref={containerRef} className="bg-[#f7f3ee] py-20">
      <Container>
        <div className="mb-12 text-center text-[#1f3c44]">
          <h2 className="font-serif text-3xl md:text-5xl">Our Promise to You</h2>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-[#b68b5b]" />
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div key={i} className="vp-card flex flex-col items-center border border-[#1f3c44]/10 bg-white p-8 text-center transition-colors hover:border-[#b68b5b]/40 shadow-sm">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f7f3ee] border border-[#b68b5b]/30">
                {item.icon}
              </div>
              <h3 className="mb-3 font-serif text-xl text-[#1f3c44]">{item.title}</h3>
              <p className="text-sm text-[#4f656d]">{item.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
