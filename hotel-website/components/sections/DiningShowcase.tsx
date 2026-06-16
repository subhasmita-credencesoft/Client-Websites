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
label: "Multi-Cuisine Restaurant",
description:
"Indulge in a delightful selection of Indian, Chinese, Mughlai, Seafood, and Biryani specialties prepared with quality ingredients and served with warm hospitality in a welcoming resort setting.",
image: "bar1.png",
position: "center",
},
{
title: "Family Dining Experience",
label: "Comfortable Air-Conditioned Dining",
description:
"Enjoy relaxed meals with family and friends in our spacious air-conditioned restaurant, thoughtfully designed to provide comfort, convenience, and a memorable dining experience.",
image: "/dining.png",
position: "center 42%",
},
{
title: "Corporate & Conference Dining",
label: "Business Meetings & Team Events",
description:
"From corporate meetings and conferences to team gatherings, we offer organized dining arrangements, professional service, and customized meal options for every business occasion.",
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
    let mm: gsap.MatchMedia | null = null;

    const raf = requestAnimationFrame(() => {
      mm = gsap.matchMedia();

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

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".dining-kicker",
            ".dining-title-line",
            ".dining-copy",
          ],
          { clearProps: "all" },
        );
        ScrollTrigger.refresh();
      });

      // Force a ScrollTrigger recalculation after layout has painted
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(raf);
      mm?.revert();
    };
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
                A Taste of Home,
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2 className="dining-title-line max-w-[12ch] font-serif text-[2.2rem] leading-[0.95] text-[#1f3c44] sm:text-[2.8rem] md:text-[3.2rem]">
                Away from Home.
              </h2>
            </div>
          </div>

          <div className="dining-copy max-w-md text-[0.95rem] leading-7 text-[#1f3c44]/75 sm:text-sm">
            <p>
              There's something about the mountain air that makes every meal taste better. At UK's Resort, we keep things simple and delicious. From local Maharashtrian spices and slow-cooked Mughlai treats to your favorite Chinese comfort food, our kitchen is always humming. Whether you're craving a spicy chicken curry or a simple, our chefs cook every plate just the way you like it. Pull up a chair, enjoy the view, and eat to your heart's content.
            </p>
            {/* <Link
              href="/dining"
              className="mt-5 inline-flex text-[0.68rem] font-semibold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.3em]"
            >
              Discover more
            </Link> */}
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
                    
                    view map
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

