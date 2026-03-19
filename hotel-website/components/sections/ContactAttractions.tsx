"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";

const ATTRACTIONS = [
  {
    title: "ADLABS Imagica",
    description:
      "Adlabs Imagica is just 8 kms from UK's Resort. Adlabs Imagica is a theme park near the city of Khopoli on Mumbai-Pune expressway.",
    image: "https://bookonelocal.in/cdn/adlabs-imagica.jpg",
    alt: "Adlabs Imagica amusement park rides",
  },
  {
    title: "Ashtavinayak Mahad Temple",
    description:
      "Ashtavinayak Mahad Temple. One of the Eight (Ashta) Ganapati (Vinayak) Temples of Maharashtra. The name of this Vinayak (Ganesha) is Varad Vinayak meaning the one who blesses all the wishes. The temple is 10 mins walking distance from UK's Resort.",
    image: "https://bookonelocal.in/cdn/ashtavinayak.jpg",
    alt: "Ashtavinayak Mahad Temple exterior view",
  },
  {
    title: "Lonavala and Khandala Hill Station",
    description:
      "Lonavala or Lonavla and the adjacent Khandala are beautiful, charming and twin hill stations, 622 m. above sea level and 5 Kms apart from each other are situated in the Sahyadri ranges. They are located around 64 km away from the city of Pune and 96 km away from the city Mumbai, popular getaway from Mumbai and Pune.",
    image: "https://bookonelocal.in/cdn/lonavala.jpg",
    alt: "Lonavala and Khandala Hill Station landscape",
  },
  {
    title: "Zenith Waterfall",
    description:
      "This is close next to Lonavala's waterfalls in popularity. So expect to see many picnickers here. The waterfall's known to be heavy, so if you expect to just wet yourself with trickles, then this isn't the spot for you. Zenith Waterfall is 5 kms from UK's Resort on the Old Bombay-Pune Highway.",
    image: "https://bookonelocal.in/cdn/Zenith Waterfall.png",
    alt: "Zenith Waterfall landscape",
  },
  {
    title: "Palasdari",
    description:
      "Palasdhari aka Palasdari Waterfall can be reached both by road and rail. Palasdari Waterfall is 5 kms from UK's resort. To reach Palasdhari by rail, one has to alight at Palasdhari railway station and walk it out to the waterfall and dam.",
    image: "https://bookonelocal.in/cdn/Zenith Waterfall.png",
    alt: "Palasdari Waterfall landscape",
  },
  {
    title: "Shri Gagangiri Maharaj Ashram",
    description:
      "Maharaj took samadhi on 4 February 2008 at his Khopoli Ashram. Gagangiri Ashram is 5 kms from UK's Resort.",
    image: "https://bookonelocal.in/cdn/Shri Vireshwar Temple.png",
    alt: "Shri Gagangiri Maharaj Ashram exterior",
  },
  {
    title: "ND Studio",
    description:
      "It is famous for shooting of many Historical & Mythological serials.",
    image: "https://bookonelocal.in/cdn/nithin.jpg",
    alt: "ND Studio set",
  },
];

gsap.registerPlugin(ScrollTrigger);

function AttractionItem({
  item,
  reverse,
}: {
  item: (typeof ATTRACTIONS)[0];
  reverse: boolean;
}) {
  return (
    <article
      className={`ca-card grid items-center gap-8 rounded-[1.4rem] border border-[#d6d1c5] bg-white/70 p-5 shadow-[0_18px_34px_rgba(23,38,46,0.05)] lg:grid-cols-2 lg:gap-12 lg:p-8 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="ca-copy">
        <h2 className="ca-text-line font-serif text-3xl md:text-4xl">{item.title}</h2>
        <p className="ca-text-line mt-5 text-sm leading-7 text-[#1f3c44]/75 md:text-base">
          {item.description}
        </p>
      </div>

      <div className="ca-image-wrap relative h-[240px] overflow-hidden rounded-2xl sm:h-[300px] md:h-[360px]">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="ca-image object-cover"
        />
      </div>
    </article>
  );
}

export default function ContactAttractions() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".ca-card").forEach((card, index) => {
          const fromX = index % 2 === 0 ? -36 : 36;
          const lines = card.querySelectorAll<HTMLElement>(".ca-text-line");
          const image = card.querySelector<HTMLElement>(".ca-image");

          gsap.set(card, {
            y: 34,
            x: fromX,
            autoAlpha: 0,
            rotateX: 8,
            transformPerspective: 1200,
            transformOrigin: "50% 100%",
          });

          if (lines.length > 0) {
            gsap.set(lines, { y: 18, autoAlpha: 0, filter: "blur(7px)" });
          }

          const revealTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });

          revealTl.to(card, {
            y: 0,
            x: 0,
            autoAlpha: 1,
            rotateX: 0,
            duration: 0.9,
            ease: "power3.out",
          });

          if (lines.length > 0) {
            revealTl.to(
              lines,
              {
                y: 0,
                autoAlpha: 1,
                filter: "blur(0px)",
                duration: 0.6,
                stagger: 0.08,
                ease: "power3.out",
              },
              "-=0.6",
            );
          }

          if (image) {
            gsap.fromTo(
              image,
              { scale: 1.12, yPercent: 8 },
              {
                scale: 1.03,
                yPercent: -6,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            );
          }
        });

        ScrollTrigger.refresh();
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <style>{`
        .ca-card {
          transform-style: preserve-3d;
          will-change: transform, opacity;
          transition: transform 550ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 550ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ca-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 26px 56px rgba(23, 38, 46, 0.14);
        }
      `}</style>

      <section ref={sectionRef} data-no-global-gsap className="bg-[#f6f3ed] py-20 text-[#1f3c44]">
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
