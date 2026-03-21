"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";

const meetingCards = [
  {
    title: "Food for thought",
    description:
      "With accomplished chefs on hand, we curate the perfect menu to feed your mind and boost productivity.",
    image: "/images/wedding-img4.jpg",
  },
  {
    title: "A full-service menu",
    description:
      "From expert meeting consultants and events concierge to on-site business support.",
    image: "/images/wedding-img5.jpg",
  },
  {
    title: "Tempting technology",
    description:
      "Help yourself to high-end equipment, full tech support and free Wi-Fi access.",
    image: "/images/wedding-img6.jpg",
  },
  {
    title: "Meet responsibly",
    description:
      "Book a meeting that gives back, with all the ingredients to make it a success.",
    image: "/images/wedding-img7.jpg",
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function WeddingsMeetings() {
  const sectionRef  = useRef<HTMLElement | null>(null);
  const pinRef      = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef    = useRef<HTMLDivElement | null>(null);

  /* ── Section entrance ─────────────────────────────────────────────── */
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          })
          .fromTo(
            ".meeting-kicker",
            { y: 12, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" },
          )
          .fromTo(
            ".meeting-title",
            { yPercent: 110, autoAlpha: 0, filter: "blur(8px)" },
            { yPercent: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.9, ease: "power4.out" },
            "<+0.04",
          )
          .fromTo(
            ".meeting-copy",
            { y: 12, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
            "<+0.06",
          );
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  /* ── Desktop horizontal-scroll pin ───────────────────────────────── */
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const pin      = pinRef.current;
        const viewport = viewportRef.current;
        const track    = trackRef.current;
        if (!pin || !viewport || !track) return;

        let ro: ResizeObserver | null = null;

        const ctx = gsap.context(() => {
          /*
           * overflow() = exact px the track extends past the viewport.
           * Arrow function so GSAP re-evaluates on every invalidateOnRefresh.
           * With gap:0 and padding:0 on desktop this equals:
           *   N × cardWidth − viewportWidth
           * which is perfectly predictable — no overshoot, no last-card resize.
           */
          const overflow = () =>
            Math.max(0, track.scrollWidth - viewport.clientWidth);

          gsap.set(track, { x: 0, clearProps: "willChange" });

          if (overflow() < 24) {
            gsap.fromTo(
              ".meeting-card",
              { y: 20, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" },
            );
            return;
          }

          const hTween = gsap.to(track, {
            x: () => -overflow(),
            ease: "none",
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              /*
               * end = overflow() in px of vertical scroll.
               * Must match exactly so the last card stops at the
               * viewport edge — no extra travel, no size mismatch.
               */
              end: () => `+=${overflow()}`,
              pin: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              snap: {
                snapTo: (v: number) => {
                  const steps = Math.max(1, meetingCards.length - 1);
                  return Math.round(v * steps) / steps;
                },
                duration: { min: 0.08, max: 0.22 },
                ease: "power2.out",
              },
            },
          });

          // Cards fade in on first entry
          gsap.fromTo(
            ".meeting-card",
            { y: 20, autoAlpha: 0 },
            {
              y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08, ease: "power3.out",
              scrollTrigger: { trigger: pin, start: "top 75%", once: true },
            },
          );

          // Per-card text reveal via containerAnimation
          gsap.utils.toArray<HTMLElement>(".meeting-card").forEach((card) => {
            const lines = card.querySelectorAll<HTMLElement>(".meeting-card-line");
            if (!lines.length) return;
            gsap.set(lines, { y: 16, autoAlpha: 0 });

            const anim = (on: boolean) =>
              gsap.to(lines, {
                y: on ? 0 : 16,
                autoAlpha: on ? 1 : 0,
                duration: on ? 0.48 : 0.24,
                ease: on ? "power3.out" : "power2.out",
                stagger: on ? 0.08 : 0.04,
                overwrite: "auto",
              });

            if (hTween.scrollTrigger) {
              ScrollTrigger.create({
                trigger: card,
                containerAnimation: hTween,
                start: "left 72%",
                end: "right 36%",
                onToggle: (s) => anim(s.isActive),
              });
            }
          });

          gsap.set(track, { willChange: "transform" });

          ro = new ResizeObserver(() => ScrollTrigger.refresh());
          ro.observe(viewport);
          ro.observe(track);
        }, sectionRef);

        ScrollTrigger.refresh();
        return () => {
          ro?.disconnect();
          ctx.revert();
        };
      },
    );

    return () => mm.revert();
  }, []);

  /* ── Mobile / tablet vertical reveal ─────────────────────────────── */
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
      () => {
        const ctx = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>(".meeting-card").forEach((card) => {
            const lines = card.querySelectorAll<HTMLElement>(".meeting-card-line");
            if (!lines.length) return;
            gsap.set(lines, { y: 16, autoAlpha: 0 });
            ScrollTrigger.create({
              trigger: card,
              start: "top 84%",
              end: "bottom 40%",
              onToggle: (s) =>
                gsap.to(lines, {
                  y: s.isActive ? 0 : 16,
                  autoAlpha: s.isActive ? 1 : 0,
                  duration: s.isActive ? 0.48 : 0.24,
                  ease: s.isActive ? "power3.out" : "power2.out",
                  stagger: s.isActive ? 0.08 : 0.04,
                  overwrite: "auto",
                }),
            });
          });
        }, sectionRef);
        return () => ctx.revert();
      },
    );
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-no-global-gsap
      className="meeting-section bg-[#f6f3ed] py-20 text-[#1f3c44]"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="meeting-kicker text-xs uppercase tracking-[0.45em] text-[#1f3c44]/70">
            Why us
          </span>
          <h2 className="meeting-title mt-6 font-serif text-4xl leading-tight md:text-6xl">
            Meetings that satisfy
          </h2>
          <p className="meeting-copy mt-4 text-sm leading-7 text-[#1f3c44]/75">
            Our team of experienced consultants are here to help, ensuring your
            needs are met and your event runs smoothly.
          </p>
        </div>
      </Container>

      {/* PIN WRAPPER — no overflow clip; GSAP measures true scrollWidth here */}
      <div ref={pinRef} className="relative mt-12">
        {/*
          VIEWPORT — clips the visible window.
          Mobile: native horizontal scroll.
          Desktop: overflow-hidden, GSAP moves the track.
        */}
        <div
          ref={viewportRef}
          className="meeting-viewport meeting-full-bleed overflow-x-auto lg:overflow-hidden"
        >
          {/*
            TRACK — strip of cards.
            Desktop: gap:0 + padding:0 so scrollWidth = N × cardWidth exactly.
            This is the fix — any gap/padding on desktop inflates scrollWidth,
            causing GSAP to scroll past the last card and making it appear
            stretched or a different size than the rest.
          */}
          <div
            ref={trackRef}
            className="meeting-track flex min-w-max snap-x snap-mandatory"
          >
            {meetingCards.map((card, index) => (
              <article
                key={card.title}
                className="meeting-card group relative shrink-0 snap-start overflow-hidden bg-black"
              >
                {/* Index badge */}
                <div className="absolute left-4 top-4 z-20 rounded-full border border-white/35 bg-black/25 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.16em] text-white/90">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Image */}
                <div className="absolute inset-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 1024px) 86vw, 74vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Content */}
                <div className="relative z-10 flex h-full items-end p-6 sm:p-8 lg:p-10">
                  <div className="max-w-2xl">
                    <h3 className="meeting-card-line font-serif text-[2rem] leading-[0.95] text-white sm:text-[2.4rem] lg:text-[3.1rem]">
                      {card.title}
                    </h3>
                    <p className="meeting-card-line mt-3 text-[0.9rem] leading-7 text-white/85 sm:text-[1rem]">
                      {card.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* ── CSS variable — single source of truth for desktop card width ──
           All cards share this value. No per-card overrides ever.           */
        .meeting-section {
          --meeting-card-w: calc(100vw / 1.42);
        }
        @media (min-width: 1280px) {
          .meeting-section { --meeting-card-w: calc(100vw / 1.55); }
        }
        @media (min-width: 1536px) {
          .meeting-section { --meeting-card-w: calc(100vw / 1.72); }
        }

        .meeting-full-bleed {
          width: 100%;
        }
        @media (max-width: 1023px) {
          .meeting-full-bleed {
            width: 100vw;
            max-width: 100vw;
            margin-left: calc(50% - 50vw);
            margin-right: calc(50% - 50vw);
            padding-left: 2.5rem;
            padding-right: 2.5rem;
          }
        }

        /* ── Track spacing ─────────────────────────────────────────────────
           Mobile: gap + padding for visual breathing room.
           Desktop: ZERO gap, ZERO padding.
           Any non-zero gap/padding on desktop inflates scrollWidth beyond
           N×cardWidth, breaking the overflow calculation and causing the
           last card to appear stretched or oversized.                       */
        .meeting-track {
          gap: 1rem;
          padding: 0 1rem 0.75rem;
        }
        @media (min-width: 640px) {
          .meeting-track {
            gap: 1.5rem;
            padding: 0 1.5rem 1rem;
          }
        }
        @media (min-width: 1024px) {
          .meeting-track {
            gap: 0;
            padding: 0;
          }
        }

        /* ── Card sizes ────────────────────────────────────────────────────
           Every card is identical. No :last-child, no :nth-child overrides. */
        .meeting-card {
          width: 86vw;
          height: 28rem;
          border-radius: 1rem;
        }
        @media (min-width: 640px) {
          .meeting-card {
            width: 76vw;
            height: 32rem;
          }
        }
        @media (min-width: 1024px) {
          .meeting-card {
            width: var(--meeting-card-w);
            height: 72vh;
            min-height: 540px;
            border-radius: 0;
          }
        }

        /* ── Hover lift (desktop) ──────────────────────────────────────── */
        @media (min-width: 1024px) {
          .meeting-card {
            transition:
              transform 550ms cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 550ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .meeting-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 22px 64px rgba(0,0,0,0.22);
            z-index: 2;
          }
        }

        /* ── Hide scrollbar (mobile native scroll) ─────────────────────── */
        .meeting-viewport {
          -ms-overflow-style: none;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .meeting-viewport::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
