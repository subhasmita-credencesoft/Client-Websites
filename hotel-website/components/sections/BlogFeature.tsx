"use client";

import { useEffect, useRef } from "react";
import Container from "../ui/Container";

const blogFeatures = [
  {
    title: "Off The Beaten Track For Your Corporate Events: UKs Resort, Khopoli",
    description:
      "The dramatic shift in the way we travel has seen many changes, innovations and creativity. And so is it with the corporate world and their business tours. To develop a work-life balance, to hold meetings and launch their new services and products, the companies are inclined towards having an official getaway which is rewarding.",
    image: "/images/7-9-25/Copy of IMG_3980.avif",
    alt: "Corporate event at resort",
  },
  {
    title: "From Making Memories to Discovering: A treasure trove of experience",
    description:
      "No wonder there are endless famous and popular places in India to offer you a special vacation. But this is also true that there are ample places which are largely untouched. There are hidden gems which need to be dug and are unquestionably wonderful and splendid when it comes to celebrating your individuality, freedom as well as togetherness",
    image: "/images/7-9-25/Copy of IMG_3968.avif",
    alt: "Executive retreat",
  },
  {
    title: "A PLEASANT STAY TODAY",
    description:
      "Evolution has become an important aspect for the current generation. It brings new changes for good. Everybody tries to fit into the evolving changes and hence the expectation in every field is to come up with something new and surprise us and here it is. The most emerging and dynamic resort near Mumbai at Khopoli which meets all the emerging needs and expectations in today's world making your stay pleasant, a perfect one indeed.",
    image: "/images/uks-exterior1-1.jpg",
    alt: "Product launch event",
  },
  {
    title: "UKsResort Plan One Day Trip near Mumbai for Family or Colleagues without any Hassles",
    description:
      "Places near Mumbai for team outing whether for family or office colleagues, should be affordable with many activities. UKsResort is priced competitively and has a myriad of activities to pick from. The staff too is courteous and your colleagues or family is sure not to be disappointed.",
    image: "/images/7-9-25/Copy of IMG_1458.avif",
    alt: "Corporate leisure getaway",
  },
  {
    title: "UK's Resort, Khopoli - Best Destination for Arranging Kitty Party in Mumbai",
    description:
      "Do you want to stay away from the hustle-bustle life? Are you searching for the best destination for celebrating party? If so, then you will choose UK's Resort. Khopoli. It is a perfect place for organizing a party, virtual tour, and other events based on your requirements and demands.",
    image: "/images/7-9-25/Copy of IMG_1442.avif",
    alt: "Corporate leisure getaway",
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
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function BlogItem({
  item,
  index,
}: {
  item: (typeof blogFeatures)[0];
  index: number;
}) {
  const textLeft = index % 2 === 0;
  const imageRef = useScrollReveal();
  const textRef = useScrollReveal();

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
      <div
        ref={textRef}
        className={`reveal-item space-y-6 ${
          textLeft ? "reveal-from-left lg:order-1" : "reveal-from-right lg:order-2"
        }`}
      >
        <h2 className="font-serif text-4xl leading-tight md:text-5xl">{item.title}</h2>
        <p className="max-w-xl text-sm leading-7 text-[#1f3c44]/70">{item.description}</p>
      </div>

      <div
        ref={imageRef}
        className={`reveal-item overflow-hidden rounded-3xl bg-[#e2dacd] shadow-[0_24px_60px_rgba(0,0,0,0.15)] ${
          textLeft ? "reveal-from-right lg:order-2" : "reveal-from-left lg:order-1"
        }`}
      >
        <img src={item.image} alt={item.alt} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

export default function BlogFeature() {
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
        <Container>
          <div className="space-y-20">
            {blogFeatures.map((item, index) => (
              <BlogItem key={index} item={item} index={index} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
