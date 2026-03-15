"use client";

import { useEffect, useRef } from "react";
import Container from "../ui/Container";

const ATTRACTIONS = [
  {
    title: "ADLABS Imagica",
    description:
      "Adlabs Imagica is just 8 kms from UK's Resort. Adlabs Imagica is a theme park near the city of Khopoli on Mumbai-Pune expressway.",
    image: "/images/adlabs-imagica.jpg",
    alt: "Adlabs Imagica amusement park rides",
  },
  {
    title: "Ashtavinayak Mahad Temple",
    description:
      "Ashtavinayak Mahad Temple. One of the Eight (Ashta) Ganapati (Vinayak) Temples of Maharashtra. The name of this Vinayak (Ganesha) is Varad Vinayak meaning the one who blesses all the wishes. The temple is 10 mins walking distance from UK's Resort.",
    image: "/images/ashtavinayak.jpg",
    alt: "Ashtavinayak Mahad Temple exterior view",
  },
  {
    title: "Lonavala and Khandala Hill Station",
    description:
      "Lonavala or Lonavla and the adjacent Khandala are beautiful, charming and twin hill stations, 622 m. above sea level and 5 Kms apart from each other are situated in the Sahyadri ranges. They are located around 64 km away from the city of Pune and 96 km away from the city Mumbai, popular getaway from Mumbai and Pune.",
    image: "/images/lonavala.jpg",
    alt: "Lonavala and Khandala Hill Station landscape",
  },
  {
    title: "Zenith Waterfall",
    description:
      "This is close next to Lonavala's waterfalls in popularity. So expect to see many picnickers here. The waterfall's known to be heavy, so if you expect to just wet yourself with trickles, then this isn't the spot for you. Zenith Waterfall is 5 kms from UK's Resort on the Old Bombay-Pune Highway.",
    image: "/images/Zenith Waterfall.png",
    alt: "Zenith Waterfall landscape",
  },
  {
    title: "Palasdari",
    description:
      "Palasdhari aka Palasdari Waterfall can be reached both by road and rail. Palasdari Waterfall is 5 kms from UK's resort. To reach Palasdhari by rail, one has to alight at Palasdhari railway station and walk it out to the waterfall and dam.",
    image: "/images/Zenith Waterfall.png",
    alt: "Palasdari Waterfall landscape",
  },
  {
    title: "Shri Gagangiri Maharaj Ashram",
    description:
      "Maharaj took samadhi on 4 February 2008 at his Khopoli Ashram. Gagangiri Ashram is 5 kms from UK's Resort.",
    image: "/images/Shri Vireshwar Temple.png",
    alt: "Shri Gagangiri Maharaj Ashram exterior",
  },
  {
    title: "ND Studio",
    description:
      "It is famous for shooting of many Historical & Mythological serials.",
    image: "/images/nithin.jpg",
    alt: "ND Studio set",
  },
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function AttractionItem({
  item,
  reverse,
}: {
  item: (typeof ATTRACTIONS)[0];
  reverse: boolean;
}) {
  const textRef = useScrollReveal();
  const imageRef = useScrollReveal();

  return (
    <article
      className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Text */}
      <div
        ref={textRef}
        className={`reveal-item ${reverse ? "reveal-from-right" : "reveal-from-left"}`}
      >
        <h2 className="font-serif text-3xl md:text-4xl">{item.title}</h2>
        <p className="mt-5 text-sm leading-7 text-[#1f3c44]/75 md:text-base">
          {item.description}
        </p>
      </div>

      {/* Image */}
      <div
        ref={imageRef}
        className={`reveal-item overflow-hidden rounded-2xl ${
          reverse ? "reveal-from-left" : "reveal-from-right"
        }`}
      >
        <img
          src={item.image}
          alt={item.alt}
          className="h-full max-h-[360px] w-full object-cover"
          loading="lazy"
        />
      </div>
    </article>
  );
}

export default function ContactAttractions() {
  return (
    <>
      <style>{`
        .reveal-item {
          opacity: 0;
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal-from-left {
          transform: translateX(-60px);
        }
        .reveal-from-right {
          transform: translateX(60px);
        }
        .reveal-item.revealed {
          opacity: 1;
          transform: translateX(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-item {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>

      <section className="bg-[#f6f3ed] py-20 text-[#1f3c44]">
        <Container className="space-y-16">
          {ATTRACTIONS.map((item, index) => (
            <AttractionItem
              key={item.title}
              item={item}
              reverse={index % 2 === 1}
            />
          ))}
        </Container>
      </section>
    </>
  );
}