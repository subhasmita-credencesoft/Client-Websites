"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";

const ATTRACTIONS = [
  {
    title: " Imagicaa",
    description:
      "One of India's largest theme parks, sitting right on the Mumbai-Pune Expressway just 8 km from UK's Resort. Many guests combine a full day at Imagicaa with an overnight stay here because the short drive back is far easier than heading home the same day.",
    image: "/Imagica1.png",
    alt: "ADLABS Imagicaa amusement park rides",
    distance: "8 km • ~15 min drive",
    mood: "Theme Park",
  },
  {
    title: "Ashtavinayak - Varad Vinayak Temple",
    description:
      "One of the eight sacred Ashtavinayak Ganesha temples of Maharashtra, this temple is located just 01 KM from UK's Resort. Many guests pair an early darshan with a relaxed day back at the resort.",
    image: "/astavinayak1.png",
    alt: "Ashtavinayak Mahad Temple exterior view",
    distance: "10-min walk",
    mood: "Spiritual",
  },
  {
    title: "Lonavala and Khandala Hill Station",
    description:
      "The Sahyadri's most loved hill stations are close enough for a comfortable half-day or full-day excursion from UK's Resort. Think viewpoints, monsoon drives, chikki stops, and a slower mountain pace.",
    image: "/Hillstation.png",
    alt: "Lonavala and Khandala Hill Station landscape",
    distance: "~40 km • ~1 hr drive",
    mood: "Hill Station",
  },
  {
    title: "Zenith Waterfall",
    description:
      "One of the most dramatic seasonal waterfalls near Khopoli, Zenith runs strong in monsoon and is a popular short drive from the resort for groups looking for a quick nature outing.",
    image: "/Zenhills.png",
    alt: "Zenith Waterfall landscape",
    distance: "5 km • 10-min drive",
    mood: "Waterfall",
  },
  {
    title: "Palasdari Waterfall & Dam",
    description:
      "Accessible by both road and rail, Palasdari offers a quieter outing than some of the busier monsoon spots nearby. Until the correct attraction photo is sourced, this card uses a neutral scenic placeholder.",
    image: "/paladarsiwaterfall.png",
    alt: "Scenic placeholder image for Palasdari Waterfall and Dam",
    distance: "5 km • 10-min drive",
    mood: "Waterfall & Dam",
  },
  {
    title: "Shri Gagangiri Maharaj Ashram",
    description:
      "A place of spiritual significance in the region, the ashram offers a quieter, reflective outing away from the resort's activity zones. Until the correct attraction image is available, this card uses a neutral placeholder.",
    image: "/gagangiri.png",
    alt: "Scenic placeholder image for Gagangiri Maharaj Ashram",
    distance: "5 km • 10-min drive",
    mood: "Ashram & Spiritual",
  },
  {
    title: "ND Studio",
    description: "ND Studio in Karjat is one of India's best-known outdoor film studios, famous for large television and historical productions. A fun short-drive outing for guests interested in film sets and behind-the-scenes spaces.",
    image: "/ndstudio.png",
    alt: "ND Studio set",
    distance: "Short drive from resort",
    mood: "Film & TV Destination",
  },
] as const;

gsap.registerPlugin(ScrollTrigger);

function AttractionItem({
  item,
  reverse,
}: {
  item: (typeof ATTRACTIONS)[number];
  reverse: boolean;
}) {
  return (
    <article
      className={`ca-card group grid items-center gap-8 rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(247,241,233,0.82))] p-5 shadow-[0_24px_48px_rgba(23,38,46,0.08),inset_0_1px_0_rgba(255,255,255,0.92)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:p-7 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="ca-copy min-w-0">
        <div className="ca-text-line flex flex-wrap items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#1f3c44]/52">
          <span className="rounded-full border border-[#d8cfbf] bg-white/75 px-3 py-1.5">{item.mood}</span>
          <span>{item.distance}</span>
        </div>
        <h2 className="ca-text-line mt-5 font-serif text-[2.35rem] leading-[0.94] text-[#183b48] md:text-[3rem]">
          {item.title}
        </h2>
        <p className="ca-text-line mt-5 max-w-2xl text-[0.98rem] leading-8 text-[#1f3c44]/74 md:text-[1.02rem]">
          {item.description}
        </p>
      </div>

      <div className="ca-image-wrap relative h-[260px] overflow-hidden rounded-[1.7rem] border border-white/60 shadow-[0_22px_40px_rgba(20,56,71,0.12)] sm:h-[320px] md:h-[380px]">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="ca-image object-cover transition duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102733]/55 via-[#102733]/12 to-transparent" />
        <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_10px_18px_rgba(0,0,0,0.12)] backdrop-blur-md">
          Around Us
        </div>
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
        const intro = sectionRef.current?.querySelector(".ca-intro");
        const introItems = sectionRef.current?.querySelectorAll<HTMLElement>(".ca-intro-line");

        if (intro && introItems?.length) {
          gsap.fromTo(
            introItems,
            { y: 24, autoAlpha: 0, filter: "blur(8px)" },
            {
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: intro,
                start: "top 84%",
                once: true,
              },
            },
          );
        }

        gsap.utils.toArray<HTMLElement>(".ca-card").forEach((card, index) => {
          const fromX = index % 2 === 0 ? -46 : 46;
          const lines = card.querySelectorAll<HTMLElement>(".ca-text-line");
          const imageWrap = card.querySelector<HTMLElement>(".ca-image-wrap");
          const image = card.querySelector<HTMLElement>(".ca-image");

          gsap.set(card, {
            y: 38,
            x: fromX,
            autoAlpha: 0,
            rotateX: 9,
            transformPerspective: 1400,
            transformOrigin: "50% 100%",
          });

          if (lines.length) {
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
            duration: 0.95,
            ease: "power3.out",
          });

          if (lines.length) {
            revealTl.to(
              lines,
              {
                y: 0,
                autoAlpha: 1,
                filter: "blur(0px)",
                duration: 0.62,
                stagger: 0.08,
                ease: "power3.out",
              },
              "-=0.65",
            );
          }

          if (image) {
            gsap.fromTo(
              image,
              { scale: 1.12, yPercent: 8 },
              {
                scale: 1.02,
                yPercent: -5,
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

          if (imageWrap) {
            gsap.fromTo(
              imageWrap,
              { y: 18, rotate: index % 2 === 0 ? -1.5 : 1.5 },
              {
                y: 0,
                rotate: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 82%",
                  once: true,
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
          transition:
            transform 550ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 550ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 550ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ca-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 32px 68px rgba(23, 38, 46, 0.16);
          border-color: rgba(201, 129, 65, 0.34);
        }
      `}</style>

      <section
        ref={sectionRef}
        data-no-global-gsap
        className="overflow-hidden bg-[radial-gradient(circle_at_top,#f8f4ed_0%,#f2ece2_38%,#ece4d8_100%)] py-20 text-[#1f3c44]"
      >
        <Container>
          <div className="ca-intro mx-auto max-w-4xl text-center">
            <p className="ca-intro-line text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#c98141]">
              Explore Nearby
            </p>
            <h2 className="ca-intro-line mt-5 font-serif text-[2.8rem] leading-[0.94] text-[#183b48] sm:text-[3.8rem]">
              Scenic escapes and local attractions around the resort
            </h2>
            <p className="ca-intro-line mx-auto mt-6 max-w-3xl text-[1.02rem] leading-8 text-[#1f3c44]/72">
              Discover places for day trips, spiritual visits, waterfalls, hill stations, and family outings
              within easy reach of UK&apos;s Resort in Khopoli.
            </p>
          </div>

          <div className="mt-14 space-y-10">
            {ATTRACTIONS.map((item, index) => (
              <AttractionItem key={item.title} item={item} reverse={index % 2 === 1} />
            ))}
          </div>

          <div className="mt-14 rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,241,233,0.84))] p-8 text-center shadow-[0_24px_48px_rgba(23,38,46,0.08)] sm:p-10">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#c98141]">
              Plan Your Visit
            </p>
            <h3 className="mt-4 font-serif text-[2.3rem] leading-[0.94] text-[#183b48] sm:text-[3rem]">
              Make UK&apos;s Resort your base
            </h3>
            <p className="mx-auto mt-5 max-w-3xl text-[1rem] leading-8 text-[#1f3c44]/72">
              Everything above is within easy reach of UK&apos;s Resort. A temple walk in the morning, a waterfall in the afternoon, Imagicaa the next day - and a comfortable room and  Delicious Food  waiting for you each evening.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://bookone.io/UK-s-Resort-Khopoli"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[#c49a3c] px-6 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#143b47] transition hover:bg-[#d1ab58]"
              >
                Check Availability & Book
              </a>
              <a
                href="https://wa.me/919822012343?text=Hi%2C%20please%20help%20me%20plan%20my%20visit%20to%20UK%27s%20Resort."
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full border border-[#1f3c44]/16 px-6 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#1f3c44] transition hover:bg-white"
              >
                WhatsApp to plan your visit
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
