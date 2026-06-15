"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Container from "../ui/Container";

const blogFeatures = [
  {
    title: "Paintball",
    description:
      "Team vs team. High-energy, strategy-driven, and one of the most popular activity add-ons for corporate groups and friend trips. Extra charge applies.",
    image: "event--corp.avif",
    alt: "Paintball activity at UK's Resort",
  },
  {
    title: "Archery",
    description:
      "Beginner-friendly archery sessions with equipment and guidance provided. A great add-on for families, schools, and mixed-age groups. Extra charge applies.",
    image: "sports4.avif",
    alt: "Archery activity",
  },
  {
    title: "Rifle Shooting",
    description:
      "Air rifle range with supervised sessions and no prior experience needed. A quick, engaging challenge for guests who want something different. Extra charge applies.",
    image: "rifleshoot.avif",
    alt: "Rifle shooting activity",
  },
  // {
  //   title: "Body Zorbing",
  //   description:
  //     "Get inside an inflatable ball and roll. Exactly as chaotic and fun as it sounds for group outings and energetic day trips. Extra charge applies.",
  //   image: "din3.avif",
  //   alt: "Body zorbing activity",
  // },
  // {
  //   title: "Water Zorbing",
  //   description:
  //     "Walk on water in an inflatable zorb ball on the pool surface. A favorite with kids, teens, and anyone curious enough to try it. Extra charge applies.",
  //   image: "uk1.avif",
  //   alt: "Water zorbing activity",
  // },
  {
    title: "Cricket Challenge",
    description:
      "Test your skills in a fun and competitive cricket match. Perfect for teams and individuals looking for a challenge. Extra charge applies.",
    image: "sports5.avif",
    alt: "Cricket challenge activity",
  },
  {
    title: "Team Building",
    description:
      "Structured team activity packages are available for corporate groups. Ask the team about formats, timing, and custom combinations. Charges depend on the setup.",
    image: "conference.avif",
    alt: "Team building activity setup",
  },
];

export default function BlogFeature() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [primary, secondary, ...rest] = blogFeatures;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>(".reveal-up"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="bg-[#f6f3ed] py-16 text-[#1f3c44] sm:py-20 lg:py-24">
      <Container>
        <div className="space-y-16 lg:space-y-20">
          <div className="grid gap-7 lg:grid-cols-2 lg:gap-14">
            <div className="space-y-7 lg:pt-2">
              <p className="text-[0.72rem] uppercase tracking-[0.4em] text-[#1f3c44]/70">Adventure Activities</p>
              <h2 className="font-serif text-[2rem] leading-[1] sm:text-[2.6rem] lg:text-[3.8rem]">
                Adventure activities
              </h2>
              <p className="max-w-xl text-[1rem] leading-8 text-[#1f3c44]/88">
                Available at an extra charge. Book at reception or WhatsApp us before your visit to check availability, timing, and current pricing for each activity.
              </p>
            </div>

            <div className="reveal-up relative h-[23rem] overflow-hidden rounded-[16px] bg-[#d8d3c8] sm:h-[33rem] lg:h-[41rem]">
              <Image
                src={primary.image}
                alt={primary.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 48vw"
                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
                priority
              />
            </div>
          </div>

          <div className="-mt-6 grid gap-7 lg:-mt-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            <div className="reveal-up relative h-[20rem] overflow-hidden rounded-[14px] bg-[#d8d3c8] sm:h-[29rem] lg:h-[26rem]">
              <Image
                src={secondary.image}
                alt={secondary.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 44vw"
                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
              />
            </div>
            <div className="reveal-up flex items-end">
              <div>
                <h3 className="font-serif text-[2rem] leading-[0.95] sm:text-[2.6rem]">{secondary.title}</h3>
                <p className="mt-5 max-w-2xl text-[0.98rem] leading-8 text-[#1f3c44]/82">{secondary.description}</p>
              </div>
            </div>
          </div>

          <div className="space-y-12 lg:space-y-14">
            {rest.map((item, index) => {
              const imageFirst = index % 2 === 1;
              return (
                <article key={item.title} className="grid gap-7 lg:grid-cols-2 lg:items-center lg:gap-14">
                  <div className={`reveal-up ${imageFirst ? "lg:order-2" : "lg:order-1"}`}>
                    <h3 className="font-serif text-[2rem] leading-[0.95] sm:text-[2.55rem]">{item.title}</h3>
                    <p className="mt-5 max-w-xl text-[0.98rem] leading-8 text-[#1f3c44]/82">{item.description}</p>
                  </div>
                  <div
                    className={`reveal-up group relative h-[21rem] overflow-hidden rounded-[14px] bg-[#d8d3c8] sm:h-[27rem] lg:h-[31rem] ${
                      imageFirst ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 46vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>

      <style>{`
        .reveal-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 720ms ease, transform 720ms ease;
        }
        .reveal-up.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-up {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
