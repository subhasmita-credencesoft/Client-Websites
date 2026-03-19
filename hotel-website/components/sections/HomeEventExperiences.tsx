"use client";

import Image from "next/image";
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
    id: "wedding",
    title: "UK RESORT WEDDINGS",
    subtitle: "Destination Wedding Experiences",
    copy: "Say 'I do' amidst breathtaking mountain vistas with curated mehndi, sangeet, wedding ceremonies, and grand receptions crafted to perfection.",
    image: "https://bookonelocal.in/cdn/wedding4-1.jpg",
    href: "/weddings",
    mapHref:
      "https://www.google.co.in/maps/place/UK'S+RESORT/@18.817145,73.3046891,3a,90y,82.75h,75.21t/data=!3m7!1e1!3m5!1sEqXPpiFcSuYAAAQvxYn65A!2e0!3e2!7i13312!8i6656!4m5!3m4!1s0x3be7fd68dbb32757:0x45a268bbfa521ef0!8m2!3d18.8171404!4d73.3046807!6m1!1e1?shorturl=1",
    cta: "Discover Weddings",
    accentColor: "#c9a96e",
  },
  {
    id: "corporate",
    title: "UK RESORT CORPORATE",
    subtitle: "Conferences, Offsites & Team Retreats",
    copy: "From strategy summits to annual offsites, we deliver AV-ready spaces, banquet planning, curated menus, and seamless event operations.",
    image: "https://bookonelocal.in/cdn/Copy of IMG_4025.JPG",
    href: "/experiences",
    mapHref:
      "https://www.google.co.in/maps/@18.8172029,73.3043333,3a,90y,29.8h,79.33t/data=!3m6!1e1!3m4!1skETcL7QTVdIAAAQvxYhZaw!2e0!7i13312!8i6656!6m1!1e1?shorturl=1",
    cta: "Discover Corporate",
    accentColor: "#8eb8c2",
  },
  {
    id: "picnic",
    title: "UK RESORT PICNICS",
    subtitle: "Family & Group Experiences",
    copy: "Enjoy one-day and overnight picnics with poolside fun, lawn games, music, and buffet experiences designed for all age groups.",
    image: "https://bookonelocal.in/cdn/Copy of IMG_3980.avif",
    href: "/experiences",
    mapHref:
      "https://www.google.co.in/maps/@18.8171679,73.3047501,3a,75y,251.92h,87.85t/data=!3m6!1e1!3m4!1spkBtZmeTSZ4AAAQvxYuH3Q!2e0!7i13312!8i6656!6m1!1e1?shorturl=1",
    cta: "Discover Picnic",
    accentColor: "#a8c08a",
  },
  {
    id: "kids",
    title: "UK RESORT KIDS AREA",
    subtitle: "Play, Learn & Explore",
    copy: "Dedicated kid-friendly zones and activity-led experiences keep little guests engaged while families relax and celebrate.",
    image: "https://bookonelocal.in/cdn/kids3.JPG",
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

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {

        gsap.utils.toArray<HTMLElement>(".hee-panel").forEach((panel, i) => {
          const bgImg      = panel.querySelector<HTMLElement>(".hee-bg-img");
          const lines      = panel.querySelectorAll<HTMLElement>(".hee-line");
          const ctas       = panel.querySelectorAll<HTMLElement>(".hee-cta");
          const counter    = panel.querySelector<HTMLElement>(".hee-counter");
          const divider    = panel.querySelector<HTMLElement>(".hee-divider");
          const accentLine = panel.querySelector<HTMLElement>(".hee-accent-line");
          const overlay    = panel.querySelector<HTMLElement>(".hee-overlay");

          // ── 1. Parallax background (scrub, no gap) ───────────────────────
          // bg-wrap is 130% tall (top:-15%, height:130%) giving ±15% travel room.
          // yPercent -10 → +10 moves image ~20% total — smooth, never exposes edge.
          if (bgImg) {
            gsap.fromTo(bgImg,
              { yPercent: -10 },
              {
                yPercent: 10,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.2,
                  invalidateOnRefresh: true,
                },
              }
            );
          }

          // ── 2. Overlay darkens slightly as panel enters (atmospheric) ────
          if (overlay) {
            gsap.fromTo(overlay,
              { opacity: 0.55 },
              {
                opacity: 0.42,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  start: "top 80%",
                  end: "top 20%",
                  scrub: 1,
                },
              }
            );
          }

          // ── 3. Counter number (01, 02…) drops in first ──────────────────
          if (counter) {
            gsap.fromTo(counter,
              { yPercent: -60, autoAlpha: 0 },
              {
                yPercent: 0,
                autoAlpha: 1,
                duration: 0.9,
                ease: "expo.out",
                scrollTrigger: { trigger: panel, start: "top 80%", once: true },
              }
            );
          }

          // ── 4. Accent line (horizontal rule) expands left→right ──────────
          if (accentLine) {
            gsap.fromTo(accentLine,
              { scaleX: 0, transformOrigin: "left center" },
              {
                scaleX: 1,
                duration: 1.1,
                ease: "expo.out",
                scrollTrigger: { trigger: panel, start: "top 76%", once: true },
              }
            );
          }

          // ── 5. Text lines: staggered reveal with blur + clip ─────────────
          if (lines.length) {
            gsap.fromTo(lines,
              { y: 28, autoAlpha: 0, filter: "blur(10px)", clipPath: "inset(0 0 100% 0)" },
              {
                y: 0,
                autoAlpha: 1,
                filter: "blur(0px)",
                clipPath: "inset(0 0 0% 0)",
                duration: 0.85,
                stagger: 0.1,
                ease: "power4.out",
                scrollTrigger: { trigger: panel, start: "top 74%", once: true },
              }
            );
          }

          // ── 6. Divider line grows in ──────────────────────────────────────
          if (divider) {
            gsap.fromTo(divider,
              { scaleX: 0, transformOrigin: "left center" },
              {
                scaleX: 1,
                duration: 1.4,
                ease: "expo.out",
                delay: 0.15,
                scrollTrigger: { trigger: panel, start: "top 70%", once: true },
              }
            );
          }

          // ── 7. CTAs float up after text ──────────────────────────────────
          if (ctas.length) {
            gsap.fromTo(ctas,
              { y: 20, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.6,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: { trigger: panel, start: "top 68%", once: true },
              }
            );
          }
        });

      }, rootRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} data-no-global-gsap className="hee-root">

      {panels.map((panel, i) => (
        <article key={panel.id} className="hee-panel">

          {/*
            ── Background image ──────────────────────────────────────────────
            Outer wrap: 130% tall, top:-15% — gives GSAP yPercent ±10 full
            room to travel without ever showing a gap at top or bottom.
            overflow:hidden on .hee-panel clips it cleanly.
          */}
          <div
            className="hee-bg-wrap absolute left-0 right-0"
            style={{ top: "-15%", height: "130%", pointerEvents: "none" }}
          >
            <div className="hee-bg-img absolute inset-0" style={{ willChange: "transform" }}>
              <Image
                src={panel.image}
                alt={panel.title}
                fill
                sizes="100vw"
                className="object-cover object-center"
                unoptimized={panel.image.startsWith("http")}
                priority={panel.id === "wedding"}
              />
            </div>
          </div>

          {/* Layered gradients — rich cinematic look */}
          <div className="hee-overlay absolute inset-0 bg-gradient-to-r from-black/82 via-black/60 to-black/18" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          {/* Subtle vignette */}
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse at 30% 50%, transparent 40%, rgba(0,0,0,0.35) 100%)"
          }} />

          {/* Content */}
          <div className="relative z-10 flex min-h-[78vh] items-center sm:min-h-[82vh] lg:min-h-[88vh]">
            <Container>
              <div className="hee-content-grid">

                {/* Left: index counter */}
                <div className="hee-left-col">
                  <span
                    className="hee-counter block font-mono text-[0.65rem] tracking-[0.4em] uppercase"
                    style={{ color: panel.accentColor }}
                  >
                    {String(i + 1).padStart(2, "0")} / {String(panels.length).padStart(2, "0")}
                  </span>
                  {/* Vertical accent line on desktop */}
                  <div
                    className="hee-accent-line hidden lg:block"
                    style={{ backgroundColor: panel.accentColor }}
                  />
                </div>

                {/* Right: main content */}
                <div className="hee-right-col max-w-[50rem]">
                  <p
                    className="hee-line text-[0.7rem] font-semibold uppercase tracking-[0.38em] sm:text-[0.76rem]"
                    style={{ color: panel.accentColor }}
                  >
                    {panel.subtitle}
                  </p>

                  <h2 className="hee-line mt-5 font-serif text-[2.1rem] leading-[0.9] text-white sm:text-[3rem] md:text-[3.8rem] lg:text-[4.6rem] xl:text-[5rem]">
                    {panel.title}
                  </h2>

                  {/* Animated divider */}
                  <div
                    className="hee-divider mt-6 h-px w-24 origin-left sm:w-32"
                    style={{ backgroundColor: `${panel.accentColor}66` }}
                  />

                  <p className="hee-line mt-6 max-w-xl text-[0.95rem] leading-[1.85] text-white/78 sm:text-[1.05rem]">
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
                        <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                        <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <circle cx="12" cy="12" r="9"/>
                          <path d="M12 2a14.5 14.5 0 0 1 4 10 14.5 14.5 0 0 1-4 10 14.5 14.5 0 0 1-4-10A14.5 14.5 0 0 1 12 2z"/>
                          <path d="M2 12h20"/>
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
        /* ─── Full-bleed escape ──────────────────────────────────────────── */
        .hee-root {
          position: relative;
          width: 100%;
          max-width: 100dvw;
          margin-left: calc(50% - 50dvw);
          margin-right: calc(50% - 50dvw);
          margin-top: 0;
          margin-bottom: 0;
          padding: 0;
          overflow-x: clip;
          background: #0c0c0c;
        }

        /* ─── Panel: zero-gap stack ──────────────────────────────────────── */
        .hee-panel {
          position: relative;
          display: block;
          overflow: hidden;
          margin: 0;
          padding: 0;
          border: 0;
          /* GPU layer per panel — prevents subpixel hairlines */
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        /* Collapse subpixel gap between adjacent panels */
        .hee-panel + .hee-panel {
          margin-top: -1px;
        }

        /* ─── Content grid ────────────────────────────────────────────────── */
        .hee-content-grid {
          display: flex;
          align-items: flex-start;
          gap: 2rem;
          padding: 4.5rem 0;
        }
        @media (min-width: 1024px) {
          .hee-content-grid {
            gap: 3.5rem;
            padding: 6rem 0;
          }
        }

        /* ─── Left column: counter + vertical line ───────────────────────── */
        .hee-left-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          padding-top: 0.25rem;
          min-width: 2.5rem;
        }
        @media (max-width: 767px) {
          .hee-left-col {
            min-width: 2rem;
          }
        }
        .hee-accent-line {
          width: 1px;
          height: 5rem;
          opacity: 0.5;
        }

        /* ─── Primary CTA button ─────────────────────────────────────────── */
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

        /* ─── Ghost CTA button ───────────────────────────────────────────── */
        .hee-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.88rem 1.5rem;
          font-size: 0.76rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.85);
          border: 1px solid rgba(255,255,255,0.28);
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          cursor: pointer;
          transition:
            background 0.3s ease,
            border-color 0.3s ease,
            color 0.3s ease;
        }
        .hee-btn-ghost:hover {
          background: rgba(255,255,255,0.14);
          border-color: var(--accent);
          color: #fff;
        }

        /* ─── Responsive: hide left col on small screens ─────────────────── */
        @media (max-width: 639px) {
          .hee-left-col {
            display: none;
          }
          .hee-content-grid {
            padding: 3.5rem 0;
          }
        }
      `}</style>
    </section>
  );
}
