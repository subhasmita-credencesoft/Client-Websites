"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";

type EventPanel = {
  id: string;
  title: string;
  subtitle: string;
  copy: string;
  image: string;
  href: string;
  mapHref?: string;
  cta: string;
  accentColor: string;
};

const panels: EventPanel[] = [
  {
    id: "one-day-event",
    title: "UK's ONE DAY EVENTS",
    subtitle: "Day Celebrations & Special Gatherings",
    copy: "Plan memorable one-day events with scenic views, curated dining, entertainment, and personalized arrangements for birthdays, anniversaries, and private celebrations.",
    image: "https://bookonelocal.in/cdn/wedding4-1.jpg",
    href: "/events",
    mapHref:
      "https://www.google.co.in/maps/place/UK'S+RESORT/@18.817145,73.3046891,3a,90y,82.75h,75.21t/data=!3m7!1e1!3m5!1sEqXPpiFcSuYAAAQvxYn65A!2e0!3e2!7i13312!8i6656!4m5!3m4!1s0x3be7fd68dbb32757:0x45a268bbfa521ef0!8m2!3d18.8171404!4d73.3046807!6m1!1e1?shorturl=1",
    cta: "Discover One Day Events",
    accentColor: "#c9a96e",
  },
  {
    id: "corporate",
    title: "UK's CORPORATE EXPERIENCES",
    subtitle: "Conferences, Offsites & Team Retreats",
    copy: "From strategy summits to annual offsites, we provide AV-ready spaces, banquet planning, curated menus, and seamless event operations.",
    image: "/corporate2.avif",
    href: "/experiences",
    mapHref:
      "https://www.google.co.in/maps/@18.8172029,73.3043333,3a,90y,29.8h,79.33t/data=!3m6!1e1!3m4!1skETcL7QTVdIAAAQvxYhZaw!2e0!7i13312!8i6656!6m1!1e1?shorturl=1",
    cta: "Discover Corporate",
    accentColor: "#8eb8c2",
  },
  {
    id: "picnic",
    title: "UK's PICNIC EXPERIENCES",
    subtitle: "Family & Group Experiences",
    copy: "Enjoy one-day and overnight picnic experiences with poolside fun, lawn games, music, and buffet dining designed for all age groups.",
    image: "/picnic.avif",
    href: "/experiences",
    mapHref:
      "https://www.google.co.in/maps/@18.8171679,73.3047501,3a,75y,251.92h,87.85t/data=!3m6!1e1!3m4!1spkBtZmeTSZ4AAAQvxYuH3Q!2e0!7i13312!8i6656!6m1!1e1?shorturl=1",
    cta: "Discover Picnics",
    accentColor: "#a8c08a",
  },
  {
    id: "kids",
    title: "UK's KIDS ZONE",
    subtitle: "Play, Learn & Explore",
    copy: "Dedicated kid-friendly zones and activity-based experiences keep little guests engaged while families relax and celebrate.",
    image: "/kidszone.avif",
    href: "/experiences",
    mapHref:
      "https://www.google.co.in/maps/@18.8171575,73.3046448,3a,90y,119.21h,85.89t/data=!3m7!1e1!3m5!1s2c65xsf3YxUAAAQvxYn66g!2e0!3e2!7i13312!8i6656!6m1!1e1?shorturl=1",
    cta: "Discover Kids Area",
    accentColor: "#e8b87a",
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function HomeEventExperiences() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".hee-panel").forEach((panel) => {
          const lines = panel.querySelectorAll<HTMLElement>(".hee-line");
          const ctas = panel.querySelectorAll<HTMLElement>(".hee-cta");
          const counter = panel.querySelector<HTMLElement>(".hee-counter");
          const divider = panel.querySelector<HTMLElement>(".hee-divider");

          if (counter) {
            gsap.fromTo(
              counter,
              { yPercent: -40, autoAlpha: 0 },
              {
                yPercent: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: { trigger: panel, start: "top 96%", once: true, fastScrollEnd: true },
              },
            );
          }

          if (lines.length) {
            gsap.fromTo(
              lines,
              { y: 20, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.65,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: { trigger: panel, start: "top 94%", once: true, fastScrollEnd: true },
              },
            );
          }

          if (divider) {
            gsap.fromTo(
              divider,
              { scaleX: 0, transformOrigin: "left center" },
              {
                scaleX: 1,
                duration: 0.9,
                ease: "expo.out",
                scrollTrigger: { trigger: panel, start: "top 92%", once: true, fastScrollEnd: true },
              },
            );
          }

          if (ctas.length) {
            gsap.fromTo(
              ctas,
              { y: 16, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: { trigger: panel, start: "top 90%", once: true, fastScrollEnd: true },
              },
            );
          }
        });
      }, rootRef);

      const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        window.cancelAnimationFrame(refreshId);
        ctx.revert();
      };
    });

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".hee-panel").forEach((panel) => {
          const bgImg = panel.querySelector<HTMLElement>(".hee-bg-img");
          const lines = panel.querySelectorAll<HTMLElement>(".hee-line");
          const ctas = panel.querySelectorAll<HTMLElement>(".hee-cta");
          const counter = panel.querySelector<HTMLElement>(".hee-counter");
          const divider = panel.querySelector<HTMLElement>(".hee-divider");
          const accentLine = panel.querySelector<HTMLElement>(".hee-accent-line");

          if (bgImg) {
            gsap.fromTo(
              bgImg,
              { yPercent: -6, scale: 1.04 },
              {
                yPercent: 6,
                scale: 1.08,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.4,
                  invalidateOnRefresh: true,
                },
              },
            );
          }

          if (counter) {
            gsap.fromTo(
              counter,
              { yPercent: -50, autoAlpha: 0 },
              {
                yPercent: 0,
                autoAlpha: 1,
                duration: 0.9,
                ease: "expo.out",
                scrollTrigger: { trigger: panel, start: "top 92%", once: true, fastScrollEnd: true },
              },
            );
          }

          if (accentLine) {
            gsap.fromTo(
              accentLine,
              { scaleY: 0, transformOrigin: "top center" },
              {
                scaleY: 1,
                duration: 1,
                ease: "expo.out",
                scrollTrigger: { trigger: panel, start: "top 88%", once: true, fastScrollEnd: true },
              },
            );
          }

          if (lines.length) {
            gsap.fromTo(
              lines,
              { y: 24, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.72,
                stagger: 0.08,
                ease: "power4.out",
                scrollTrigger: { trigger: panel, start: "top 90%", once: true, fastScrollEnd: true },
              },
            );
          }

          if (divider) {
            gsap.fromTo(
              divider,
              { scaleX: 0, transformOrigin: "left center" },
              {
                scaleX: 1,
                duration: 1.1,
                ease: "expo.out",
                scrollTrigger: { trigger: panel, start: "top 86%", once: true, fastScrollEnd: true },
              },
            );
          }

          if (ctas.length) {
            gsap.fromTo(
              ctas,
              { y: 18, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.55,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: { trigger: panel, start: "top 84%", once: true, fastScrollEnd: true },
              },
            );
          }
        });
      }, rootRef);

      const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        window.cancelAnimationFrame(refreshId);
        ctx.revert();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} data-no-global-gsap className="hee-root">
      <div className="hidden" aria-hidden="true">
        {panels.map((panel, index) => (
          <img
            key={`${panel.id}-preload`}
            src={panel.image}
            alt=""
            loading={index < 2 ? "eager" : "lazy"}
            fetchPriority={index < 2 ? "high" : "auto"}
            decoding="async"
          />
        ))}
      </div>
      {panels.map((panel, i) => (
        <article key={panel.id} className="hee-panel">
          <div
            className="hee-bg-wrap"
            aria-hidden="true"
          >
            <div
              className="hee-bg-img"
              style={{ backgroundImage: `url("${panel.image}")` }}
            />
          </div>

          <div className="hee-overlay absolute inset-0" />

          <div className="hee-panel-inner relative z-10 flex items-center">
            <Container>
              <div className="hee-content-grid">
                <div className="hee-left-col">
                  <span
                    className="hee-counter block font-mono text-[0.65rem] tracking-[0.4em] uppercase"
                    style={{ color: panel.accentColor }}
                  >
                    {String(i + 1).padStart(2, "0")} / {String(panels.length).padStart(2, "0")}
                  </span>
                  <div
                    className="hee-accent-line hidden lg:block"
                    style={{ backgroundColor: `${panel.accentColor}99` }}
                  />
                </div>

                <div className="hee-right-col max-w-[50rem]">
                  <p
                    className="hee-line text-[0.7rem] font-semibold uppercase tracking-[0.38em] sm:text-[0.76rem]"
                    style={{ color: panel.accentColor }}
                  >
                    {panel.subtitle}
                  </p>

                  <h2 className="hee-line mt-5 font-serif text-[2rem] leading-[0.92] text-white sm:text-[3rem] md:text-[3.8rem] lg:text-[4.6rem] xl:text-[5rem]">
                    {panel.title}
                  </h2>

                  <div
                    className="hee-divider mt-6 h-px w-24 origin-left sm:w-32"
                    style={{ backgroundColor: `${panel.accentColor}80` }}
                  />

                  <p className="hee-line mt-6 max-w-xl text-[0.95rem] leading-[1.8] text-white/90 sm:text-[1.05rem]">
                    {panel.copy}
                  </p>

                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Link
                      href={panel.href}
                      className="hee-cta hee-btn-primary group relative overflow-hidden"
                      style={{ "--accent": panel.accentColor } as React.CSSProperties}
                    >
                      <span className="hee-btn-fill" />
                      <span className="relative z-10 flex items-center gap-2.5">
                        {panel.cta}
                        <svg
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M3 8h10M9 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </Link>

                    {panel.mapHref && (
                      <a
                        href={panel.mapHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hee-cta hee-btn-ghost group"
                        style={{ "--accent": panel.accentColor } as React.CSSProperties}
                        aria-label={`Take a virtual tour of ${panel.title}`}
                      >
                        <svg
                          className="h-4 w-4 flex-shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 2a14.5 14.5 0 0 1 4 10 14.5 14.5 0 0 1-4 10 14.5 14.5 0 0 1-4-10A14.5 14.5 0 0 1 12 2z" />
                          <path d="M2 12h20" />
                        </svg>
                        <span>Virtual Tour</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </article>
      ))}

      <style>{`
        .hee-root {
          position: relative;
          width: 100%;
          max-width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          overflow-x: clip;
          background: #6d4a33;
        }

        .hee-panel {
          position: relative;
          overflow: hidden;
          min-height: max(31rem, 78svh);
          background: #6d4a33;
          isolation: isolate;
        }

        .hee-panel + .hee-panel {
          margin-top: -1px;
        }

        .hee-panel-inner {
          min-height: inherit;
        }

        .hee-bg-wrap {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .hee-bg-img {
          position: absolute;
          inset: -6%;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          transform: translate3d(0, 0, 0);
          will-change: transform;
          transition: transform 320ms ease-out;
        }

        .hee-overlay {
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.18) 100%),
            linear-gradient(90deg, rgba(0, 0, 0, 0.22) 0%, rgba(0, 0, 0, 0.08) 50%, rgba(0, 0, 0, 0.04) 100%);
        }

        .hee-content-grid {
          display: flex;
          align-items: flex-start;
          gap: 2rem;
          padding: 4.5rem 0;
        }

        .hee-right-col {
          width: 100%;
          min-width: 0;
        }

        .hee-left-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          padding-top: 0.25rem;
          min-width: 2.5rem;
        }

        .hee-accent-line {
          width: 1px;
          height: 5rem;
          opacity: 0.75;
        }

        .hee-btn-primary {
          display: inline-flex;
          align-items: center;
          padding: 0.9rem 2rem;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #0c0c0c;
          background: var(--accent);
          border: none;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .hee-btn-primary .hee-btn-fill {
          position: absolute;
          inset: 0;
          background: #fff;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.42s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hee-btn-primary:hover .hee-btn-fill {
          transform: scaleX(1);
        }

        .hee-btn-primary:hover {
          color: #0c0c0c;
        }

        .hee-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.88rem 1.5rem;
          font-size: 0.76rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.92);
          border: 1px solid rgba(255,255,255,0.38);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          cursor: pointer;
          transition:
            background 0.3s ease,
            border-color 0.3s ease,
            color 0.3s ease;
        }

        .hee-btn-ghost:hover {
          background: rgba(255,255,255,0.16);
          border-color: var(--accent);
          color: #fff;
        }

        @media (min-width: 1024px) {
          .hee-panel {
            min-height: max(40rem, 88svh);
          }

          .hee-content-grid {
            gap: 3.5rem;
            padding: 6rem 0;
          }
        }

        @media (max-width: 639px) {
          .hee-panel {
            min-height: max(29rem, 72svh);
          }

          .hee-bg-img {
            inset: 0;
          }

          .hee-left-col {
            display: none;
          }

          .hee-content-grid {
            gap: 1rem;
            padding: 3.25rem 0;
            align-items: flex-end;
          }

          .hee-right-col {
            max-width: 100%;
          }

          .hee-btn-primary,
          .hee-btn-ghost {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
