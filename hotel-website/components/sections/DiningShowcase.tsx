"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";

const tourUrl =
  "https://www.google.co.in/maps/@18.8171454,73.3046935,3a,75y,230.79h,90t/data=!3m8!1e1!3m6!1s9axrwQcgs_QAAAQvxYVCdQ!2e0!3e2!6s%2F%2Fgeo1.ggpht.com%2Fcbk%3Fpanoid%3D9axrwQcgs_QAAAQvxYVCdQ%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D64.35467%26pitch%3D0%26thumbfov%3D100!7i13312!8i6656?shorturl=1";

const diningItems = [
  {
    title: "UK's Resort Restaurant",
    label: "Indoor Resort Dining",
    description:
      "Relax in our comfortable indoor restaurant space with neatly arranged seating, ideal for families and couples enjoying fresh meals in a peaceful resort atmosphere.",
    image: "din1.avif",
    position: "center",
  },
  {
    title: "Group Dining Hall",
    label: "School | Picnic | Large Groups",
    description:
      "Spacious dining setup specially arranged for school picnics, educational trips, and large group visits with organized seating and quick service support.",
    image: "din2.avif",
    position: "center 42%",
  },
  {
    title: "Garden View Dining Area",
    label: "Family Outdoor Dining",
    description:
      "Enjoy relaxed meals with family and friends in our garden-facing open dining area surrounded by greenery and fresh resort ambience.",
    image: "https://bookonelocal.in/cdn/Copy of IMG_2910.avif",
    position: "center 40%",
  },
  {
    title: "Covered Garden Restaurant Seating",
    label: "Semi-Outdoor Dining",
    description:
      "Experience comfortable semi-outdoor dining with shaded seating and scenic green views, perfect for peaceful resort-style meals.",
    image: "din3.avif",
    position: "center 32%",
  },
  {
    title: "Corporate & Conference Dining",
    label: "Meetings | Team Events",
    description:
      "Well-arranged dining space designed for corporate meetings, conferences, and team events with structured seating and organized meal service.",
    image: "uk-conf.avif",
    position: "center 36%",
  },
];

// âœ… FIX 2: Removed conflicting `declare module "gsap/ScrollTrigger"` block.
// GSAP v3.11+ ships its own types â€” no manual declaration needed.
gsap.registerPlugin(ScrollTrigger);

export default function DiningShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollWrapRef = useRef<HTMLDivElement | null>(null);

  const scrollCards = useCallback((direction: "left" | "right") => {
    const container = scrollWrapRef.current;
    if (!container) return;

    const firstCard = container.querySelector<HTMLElement>(".dining-card");
    const step = firstCard ? firstCard.offsetWidth + 24 : Math.round(container.clientWidth * 0.85);

    container.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const revealTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });

        revealTl
          .fromTo(
            ".dining-kicker",
            { y: 14, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
          )
          .fromTo(
            ".dining-title-line",
            { yPercent: 110, autoAlpha: 0, filter: "blur(8px)" },
            {
              yPercent: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.95,
              stagger: 0.06,
              ease: "power4.out",
            },
            "<+0.06",
          )
          .fromTo(
            ".dining-copy",
            { y: 18, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
            "<+0.08",
          );
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".dining-card");

        gsap.fromTo(
          cards,
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: cards[0] ?? sectionRef.current,
              start: "top 75%",
              once: true,
            },
          },
        );

        cards.forEach((card) => {
          const lines = card.querySelectorAll<HTMLElement>(".dining-card-line");
          if (!lines.length) return;

          gsap.set(lines, { y: 16, autoAlpha: 0, filter: "blur(4px)" });

          ScrollTrigger.create({
            trigger: card,
            start: "top 84%",
            end: "bottom 40%",
            onToggle: (self) => {
              gsap.to(lines, {
                y: self.isActive ? 0 : 16,
                autoAlpha: self.isActive ? 1 : 0,
                filter: self.isActive ? "blur(0px)" : "blur(4px)",
                duration: self.isActive ? 0.55 : 0.3,
                ease: self.isActive ? "power3.out" : "power2.out",
                stagger: self.isActive ? 0.08 : 0.04,
                overwrite: "auto",
              });
            },
          });
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);
  return (
    <section
      ref={sectionRef}
      data-no-global-gsap
      className="overflow-x-hidden bg-[#f3f2ee] pb-0 pt-12 text-[#1f3c44] sm:pt-16 lg:pt-20"
    >
      <div className="hidden" aria-hidden="true">
        {diningItems.map((item, index) => (
          <img
            key={`${item.title}-preload`}
            src={item.image}
            alt=""
            loading={index < 2 ? "eager" : "lazy"}
            fetchPriority={index < 2 ? "high" : "auto"}
            decoding="async"
          />
        ))}
      </div>
      <Container>
        <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <div className="dining-kicker inline-flex items-center gap-2 rounded-full border border-[#cda374]/60 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#c78946]">
              UK&apos;s Resort Dining
            </div>
            <div className="mt-4 overflow-hidden">
              <h2 className="dining-title-line max-w-[12ch] font-serif text-[2.2rem] leading-[0.95] text-[#1f3c44] sm:text-[2.8rem] md:text-[3.2rem]">
                Delicious local cuisines
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2 className="dining-title-line max-w-[12ch] font-serif text-[2.2rem] leading-[0.95] text-[#1f3c44] sm:text-[2.8rem] md:text-[3.2rem]">
                served with warm hospitality
              </h2>
            </div>
          </div>

          <div className="dining-copy max-w-md text-[0.95rem] leading-7 text-[#1f3c44]/75 sm:text-sm">
            <p>
              No holiday can be complete without building up a ravenous appetite. UK&apos;s Resort offers plenty of
              tongue-tingling cuisines. We pride ourselves on our variety of cuisine that is as innovative as it is
              appetizing. You can opt for Delicious Chinese, Mughlai and Indian Cuisine. The Restaurant caters to the
              tastes of each of its Guests. Our Friendly Professional Staff are always on hand to offer advice and
              assistance with each and every aspect of your meal. Enjoy a hearty lunch and a delectable dinner at
              UK&apos;s Resort. Non-vegetarian or vegetarian - it does not matter as you get sumptuous varieties of
              dishes in both categories.
            </p>
            <Link
              href="/dining"
              className="mt-5 inline-flex text-[0.68rem] font-semibold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.3em]"
            >
              Discover more
            </Link>
          </div>
        </div>
      </Container>

      <div className="relative mt-10 sm:mt-12">
        <button
          type="button"
          aria-label="Previous dining slide"
          onClick={() => scrollCards("left")}
          className="dining-nav-btn dining-nav-btn--left"
        >
          <span aria-hidden="true">&lt;</span>
        </button>

        <button
          type="button"
          aria-label="Next dining slide"
          onClick={() => scrollCards("right")}
          className="dining-nav-btn dining-nav-btn--right"
        >
          <span aria-hidden="true">&gt;</span>
        </button>

        <div ref={scrollWrapRef} className="dining-scroll-wrap w-full overflow-x-auto pb-3 lg:pb-0">
          <div className="dining-card-track flex min-w-max snap-x snap-mandatory gap-4 sm:gap-5 lg:gap-6">
            {diningItems.map((item) => (
              <article
                key={item.title}
                className="dining-card group relative h-[31rem] w-[19.5rem] shrink-0 snap-start overflow-hidden rounded-[14px] bg-black sm:h-[34rem] sm:w-[22rem] lg:h-[80vh] lg:min-h-[620px] lg:w-[min(44vw,42rem)] lg:rounded-none"
              >
                {/*
                  âœ… FIX 1 (CSS side): Extra vertical size (-top-[8%] / -bottom-[8%])
                  gives the background image headroom so it never runs out of
                  pixels at the top when yPercent nudges it upward during scroll.
                */}
                <div
                  className="dining-card-bg absolute -bottom-[8%] -top-[8%] left-0 right-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  style={{
                    backgroundImage: `url('${item.image}')`,
                    backgroundPosition: item.position,
                  }}
                  role="img"
                  aria-label={item.title}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

                <div className="relative z-10 flex h-full flex-col justify-end p-5 text-white sm:p-6 lg:p-10">
                  <span className="dining-card-line text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/80">
                    {item.label}
                  </span>
                  <h3 className="dining-card-line mt-2 font-serif text-[2rem] leading-[0.92] text-white sm:text-[2.2rem] lg:text-[2.9rem]">
                    {item.title}
                  </h3>
                  <p className="dining-card-line mt-3 max-w-[58ch] text-[0.78rem] leading-relaxed text-white/90 sm:text-[0.84rem] lg:text-[0.95rem]">
                    {item.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => window.open(tourUrl, "_blank")}
                    className="dining-card-line mt-5 inline-flex w-fit text-[0.62rem] font-semibold uppercase tracking-[0.2em] underline underline-offset-4 lg:text-[0.72rem]"
                  >
                    Learn more
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .dining-scroll-wrap {
          -ms-overflow-style: none;
          scrollbar-width: none;
          scroll-padding-left: 0;
          scroll-padding-right: 0;
        }
        .dining-scroll-wrap::-webkit-scrollbar {
          display: none;
        }
        .dining-nav-btn {
          position: absolute;
          top: 50%;
          z-index: 20;
          display: flex;
          height: 2.9rem;
          width: 2.9rem;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.34);
          border-radius: 999px;
          background: rgba(17, 24, 28, 0.56);
          color: #fff;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transform: translateY(-50%);
          transition:
            background 0.25s ease,
            border-color 0.25s ease,
            transform 0.25s ease;
        }
        .dining-nav-btn:hover {
          background: rgba(17, 24, 28, 0.8);
          border-color: rgba(255, 255, 255, 0.65);
        }
        .dining-nav-btn span {
          font-size: 1.3rem;
          line-height: 1;
        }
        .dining-nav-btn--left {
          left: 0.85rem;
        }
        .dining-nav-btn--right {
          right: 0.85rem;
        }
        @media (max-width: 639px) {
          .dining-nav-btn {
            height: 2.45rem;
            width: 2.45rem;
          }
          .dining-nav-btn--left {
            left: 0.55rem;
          }
          .dining-nav-btn--right {
            right: 0.55rem;
          }
        }
        @media (min-width: 1024px) {
          .dining-card {
            transition: transform 550ms cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 550ms cubic-bezier(0.22, 1, 0.36, 1);
            transform: translateY(0);
          }
          .dining-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 22px 64px rgba(0, 0, 0, 0.22);
          }
        }
      `}</style>
    </section>
  );
}

