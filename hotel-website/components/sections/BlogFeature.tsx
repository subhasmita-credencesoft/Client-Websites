"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Container from "../ui/Container";

const blogFeatures = [
  {
    title: "Off The Beaten Track For Your Corporate Events: UKs Resort, Khopoli",
    description:
      "The dramatic shift in the way we travel has seen many changes, innovations and creativity. And so is it with the corporate world and their business tours. To develop a work-life balance, to hold meetings and launch their new services and products, the companies are inclined towards having an official getaway which is rewarding.",
    image: "https://bookonelocal.in/cdn/Copy+of+IMG_3980.avif",
    alt: "Corporate event at resort",
  },
  {
    title: "From Making Memories to Discovering: A treasure trove of experience",
    description:
      "No wonder there are endless famous and popular places in India to offer you a special vacation. But this is also true that there are ample places which are largely untouched. There are hidden gems which need to be dug and are unquestionably wonderful and splendid when it comes to celebrating your individuality, freedom as well as togetherness",
    image: "https://bookonelocal.in/cdn/Copy+of+IMG_3968.avif",
    alt: "Executive retreat",
  },
  {
    title: "A PLEASANT STAY TODAY",
    description:
      "Evolution has become an important aspect for the current generation. It brings new changes for good. Everybody tries to fit into the evolving changes and hence the expectation in every field is to come up with something new and surprise us and here it is. The most emerging and dynamic resort near Mumbai at Khopoli which meets all the emerging needs and expectations in today's world making your stay pleasant, a perfect one indeed.",
    image: "https://bookonelocal.in/cdn/uks-exterior-1.jpg",
    alt: "Product launch event",
  },
  {
    title: "UKsResort Plan One Day Trip near Mumbai for Family or Colleagues without any Hassles",
    description:
      "Places near Mumbai for team outing whether for family or office colleagues, should be affordable with many activities. UKsResort is priced competitively and has a myriad of activities to pick from. The staff too is courteous and your colleagues or family is sure not to be disappointed.",
    image: "https://bookonelocal.in/cdn/Copy+of+IMG_2906.avif",
    alt: "Corporate leisure getaway",
  },
  {
    title: "UK's Resort, Khopoli - Best Destination for Arranging Kitty Party in Mumbai",
    description:
      "Do you want to stay away from the hustle-bustle life? Are you searching for the best destination for celebrating party? If so, then you will choose UK's Resort. Khopoli. It is a perfect place for organizing a party, virtual tour, and other events based on your requirements and demands.",
    image: "https://bookonelocal.in/cdn/Copy+of+IMG_4035.JPG",
    alt: "Corporate leisure getaway",
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
              <p className="text-[0.72rem] uppercase tracking-[0.4em] text-[#1f3c44]/70">Unforgettable Experiences</p>
              <h2 className="font-serif text-[2.5rem] leading-[0.93] sm:text-[3.2rem] lg:text-[5.1rem]">
                Journey into the
                <br />
                heart and soul of
                <br />
                our magical island
              </h2>
              <p className="max-w-xl text-[1rem] leading-8 text-[#1f3c44]/88">{primary.description}</p>
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
