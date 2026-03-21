"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import { usePropertyData } from "../providers/PropertyDataProvider";

const offerSlides = [
  {
    id: "offer-1",
    image: "/images/special_offers1.jpg",
    label: "Early Booking",
    title: "15% Off Advance Reservations",
    description: "Plan ahead and enjoy exclusive savings when you book your stay in advance.",
  },
  {
    id: "offer-2",
    image: "/images/special_offers2.jpg",
    label: "Summer Escape",
    title: "Complimentary Breakfast",
    description: "Start your mornings with a freshly prepared breakfast included in your stay.",
  },
];

gsap.registerPlugin(ScrollTrigger);

// ── Click-to-activate map wrapper ──────────────────────────────────────────
// Sits a transparent overlay on top of the iframe.
// • Mouse hover   → shows a subtle "Click to interact" hint (no scroll capture).
// • Click         → removes overlay, iframe becomes fully interactive.
// • Mouse leave   → overlay returns, scroll is free again.
function MapEmbed() {
  const [active, setActive] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onLeave = () => setActive(false);
    el.addEventListener("mouseleave", onLeave);
    return () => el.removeEventListener("mouseleave", onLeave);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="lo-map mt-7 overflow-hidden rounded-2xl border border-[#1f3c44]/10 shadow-sm sm:rounded-3xl"
      style={{ position: "relative" }}
    >
      <iframe
        title="UK Resort location map"
        className="lo-map-iframe block"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15558.123456789!2d73.318836!3d18.826129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7fd68dbb32757%3A0x45a268bbfa521ef0!2sUK's%20RESORT%2C%20Khopoli!5e0!3m2!1sen!2sin!4v1730970000000!5m2!1sen!2sin"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        style={{ pointerEvents: active ? "auto" : "none" }}
      />

      {/* Overlay — visible only when NOT active */}
      {!active && (
        <div
          onClick={() => setActive(true)}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
          }}
          className="lo-map-overlay"
          aria-label="Click to interact with map"
        >
          {/* Hint pill — only appears on hover via CSS */}
          <span className="lo-map-hint">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            Click to interact
          </span>
        </div>
      )}
    </div>
  );
}

export default function LocationOffers() {
  const { property } = usePropertyData();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef  = useRef<HTMLElement | null>(null);
  const offerBgRef  = useRef<HTMLDivElement | null>(null);
  const offerTxtRef = useRef<HTMLDivElement | null>(null);
  const timerRef    = useRef<ReturnType<typeof setInterval> | null>(null);

  const address = [
    property?.address?.streetName,
    property?.address?.suburb,
    property?.address?.city,
    property?.address?.state,
    property?.address?.postcode,
    property?.address?.country,
  ].filter(Boolean).join(", ");

  const addressText =
    address ||
    "Ashtvinayak Mahad Phata, Old Mumbai - Pune Highway (NH4), Khopoli, Dist. Raigad - 410203, Maharashtra, India";

  const goTo = useCallback((indexOrFn: number | ((prev: number) => number)) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const bg  = offerBgRef.current;
    const txt = offerTxtRef.current;

    gsap.to([bg, txt], {
      autoAlpha: 0,
      y: bg ? 0 : -10,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        setActiveIndex((prev) => {
          const next = typeof indexOrFn === "function" ? indexOrFn(prev) : indexOrFn;
          return next;
        });
        requestAnimationFrame(() => {
          gsap.fromTo(
            bg,
            { autoAlpha: 0, scale: 1.04 },
            { autoAlpha: 1, scale: 1, duration: 0.62, ease: "power2.out" },
          );
          gsap.fromTo(
            txt,
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.48, ease: "power3.out" },
          );
          setIsTransitioning(false);
        });
      },
    });
  }, [isTransitioning]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      goTo((prev: number) => (prev + 1) % offerSlides.length);
    }, 5000);
  }, [goTo]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const handleDotClick = (i: number) => {
    startTimer();
    goTo(i);
  };

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".lo-heading",
          { yPercent: 110, autoAlpha: 0 },
          {
            yPercent: 0, autoAlpha: 1,
            duration: 0.9, stagger: 0.1, ease: "power4.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
          },
        );
        gsap.fromTo(
          ".lo-map",
          { y: 28, autoAlpha: 0 },
          {
            y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: ".lo-map", start: "top 84%", once: true },
          },
        );
        gsap.fromTo(
          ".lo-info-item",
          { y: 18, autoAlpha: 0 },
          {
            y: 0, autoAlpha: 1, duration: 0.65, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: ".lo-info-grid", start: "top 86%", once: true },
          },
        );
        gsap.fromTo(
          ".lo-offer-card",
          { y: 30, autoAlpha: 0 },
          {
            y: 0, autoAlpha: 1, duration: 0.95, ease: "power3.out",
            scrollTrigger: { trigger: ".lo-offer-card", start: "top 86%", once: true },
          },
        );
        gsap.fromTo(
          ".lo-dot",
          { y: 8, autoAlpha: 0 },
          {
            y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.06, ease: "power3.out",
            scrollTrigger: { trigger: ".lo-dots", start: "top 90%", once: true },
          },
        );
        gsap.fromTo(
          ".lo-divider",
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: ".lo-info-grid", start: "top 84%", once: true },
          },
        );
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-no-global-gsap
      className="lo-section bg-[#f8f6f1] py-14 text-[#1f3c44] sm:py-18 lg:py-24"
    >
      <div className="hidden" aria-hidden="true">
        {offerSlides.map((slide, index) => (
          <img
            key={`${slide.id}-preload`}
            src={slide.image}
            alt=""
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
          />
        ))}
      </div>
      <Container>
        <div className="lo-outer-grid">

          {/* ══ LEFT — Location ══════════════════════════════════════════ */}
          <div className="lo-col flex flex-col">
            <div className="lo-label-row">
              <span className="lo-chip">Our Location</span>
            </div>
            <div className="mt-4 overflow-hidden">
              <h2 className="lo-heading lo-title-serif">Location &amp; Info</h2>
            </div>

            {/* ✅ Click-to-activate map — no more "use ctrl+scroll" hijack */}
            <MapEmbed />

            <div className="lo-info-grid mt-7 sm:mt-9">
              <div className="lo-info-item">
                <p className="lo-info-label">Address</p>
                <p className="lo-info-text mt-2">{addressText}</p>
              </div>
              <div className="lo-divider" aria-hidden="true" />
              <div className="lo-info-item">
                <p className="lo-info-label">Check in / out</p>
                <p className="lo-info-text mt-2">Check-in from 2 PM</p>
                <p className="lo-info-text">Check-out by 10 AM</p>
              </div>
              <div className="lo-divider" aria-hidden="true" />
              <div className="lo-info-item">
                <p className="lo-info-label">Reservations</p>
                <a href="tel:+912192268333" className="lo-info-link mt-2 block">+91 2192 268333</a>
                <a href="tel:+919822012343" className="lo-info-link block">+91 98220 12343</a>
                <a href="mailto:info@uksresort.com" className="lo-info-link mt-0.5 block">info@uksresort.com</a>
              </div>
            </div>
          </div>

          {/* ══ RIGHT — Special Offers ════════════════════════════════════ */}
          <div className="lo-col flex flex-col">
            <div className="lo-label-row">
              <span className="lo-chip lo-chip--gold">Exclusive Offers</span>
            </div>
            <div className="mt-4 overflow-hidden">
              <h2 className="lo-heading lo-title-serif">Special Offers</h2>
            </div>

            <div className="lo-offer-card mt-7 relative overflow-hidden rounded-2xl text-white sm:rounded-3xl">
              <div
                ref={offerBgRef}
                className="lo-offer-bg absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${offerSlides[activeIndex].image})` }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-transparent" />
              <div
                ref={offerTxtRef}
                className="lo-offer-content relative z-10 flex flex-col items-center justify-end p-6 text-center sm:p-8 lg:p-10"
              >
                <span className="lo-offer-label">{offerSlides[activeIndex].label}</span>
                <h3 className="lo-offer-title mt-3">{offerSlides[activeIndex].title}</h3>
                <p className="lo-offer-desc mt-2.5">{offerSlides[activeIndex].description}</p>
                <button type="button" className="lo-offer-btn mt-6">
                  Explore Offer
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="lo-offer-btn-icon">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="lo-dots mt-5 flex items-center gap-2.5">
              {offerSlides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => handleDotClick(i)}
                  aria-label={`Show ${slide.label}`}
                  className={`lo-dot rounded-full transition-all duration-400 ${
                    i === activeIndex ? "lo-dot--active" : "lo-dot--inactive"
                  }`}
                />
              ))}
              <div className="lo-progress-track ml-auto">
                <div key={activeIndex} className="lo-progress-bar" />
              </div>
            </div>

            <div className="lo-arrow-row mt-5 flex items-center gap-3">
              <button
                type="button"
                onClick={() => { startTimer(); goTo((prev: number) => (prev - 1 + offerSlides.length) % offerSlides.length); }}
                className="lo-arrow-btn"
                aria-label="Previous offer"
              >
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => { startTimer(); goTo((prev: number) => (prev + 1) % offerSlides.length); }}
                className="lo-arrow-btn"
                aria-label="Next offer"
              >
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="lo-slide-counter">
                {String(activeIndex + 1).padStart(2, "0")}&ensp;/&ensp;{String(offerSlides.length).padStart(2, "0")}
              </span>
            </div>
          </div>

        </div>
      </Container>

      <style>{`
        .lo-section { overflow: hidden; }

        .lo-outer-grid {
          display: grid;
          gap: 2.5rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .lo-outer-grid { grid-template-columns: 1fr 1fr; gap: 2.75rem; }
        }
        @media (min-width: 1024px) {
          .lo-outer-grid { grid-template-columns: 1.25fr 0.75fr; gap: 3.5rem; }
        }
        @media (min-width: 1280px) {
          .lo-outer-grid { grid-template-columns: 1.3fr 0.7fr; gap: 4rem; }
        }

        .lo-label-row { display: flex; align-items: center; }
        .lo-chip {
          display: inline-flex; align-items: center;
          padding: 0.3rem 0.85rem; border-radius: 999px;
          border: 1px solid rgba(31,60,68,0.18);
          font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(31,60,68,0.7); background: rgba(31,60,68,0.05);
        }
        .lo-chip--gold {
          border-color: rgba(201,169,110,0.4);
          color: #a07838; background: rgba(201,169,110,0.08);
        }

        .lo-title-serif {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 400; color: #1f3c44;
          font-size: clamp(1.55rem, 4vw, 2.2rem);
          line-height: 1.05; letter-spacing: -0.01em;
        }

        /* ── Map iframe heights ───────────────────────────────────────── */
        .lo-map-iframe {
          width: 100%; border: none; display: block; height: 240px;
        }
        @media (min-width: 480px)  { .lo-map-iframe { height: 280px; } }
        @media (min-width: 640px)  { .lo-map-iframe { height: 320px; } }
        @media (min-width: 1024px) { .lo-map-iframe { height: 360px; } }
        @media (min-width: 1280px) { .lo-map-iframe { height: 400px; } }

        /* ── Click-to-interact overlay hint ──────────────────────────── */
        .lo-map-overlay { user-select: none; }

        .lo-map-hint {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 1rem;
          border-radius: 999px;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border: 1px solid rgba(31,60,68,0.12);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: #1f3c44;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
          /* Hidden by default — only shows on hover */
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.2s ease, transform 0.2s ease;
          pointer-events: none;
        }
        .lo-map-overlay:hover .lo-map-hint {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Info grid ───────────────────────────────────────────────── */
        .lo-info-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 480px) {
          .lo-info-grid {
            grid-template-columns: 1fr auto 1fr auto 1fr;
            gap: 0; align-items: start;
          }
        }
        .lo-divider { display: none; }
        @media (min-width: 480px) {
          .lo-divider {
            display: block; width: 1px;
            background: rgba(31,60,68,0.12);
            margin: 0 1.25rem; min-height: 5rem; align-self: stretch;
          }
        }
        @media (min-width: 1024px) { .lo-divider { margin: 0 1.5rem; } }

        .lo-info-label {
          font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(31,60,68,0.5);
        }
        @media (min-width: 640px) { .lo-info-label { font-size: 0.66rem; letter-spacing: 0.28em; } }
        .lo-info-text { font-size: 0.85rem; line-height: 1.7; color: rgba(31,60,68,0.78); }
        @media (min-width: 640px) { .lo-info-text { font-size: 0.9rem; } }
        .lo-info-link {
          font-size: 0.85rem; line-height: 1.7; color: rgba(31,60,68,0.78);
          text-decoration: underline; text-underline-offset: 3px;
          transition: color 0.2s ease;
        }
        .lo-info-link:hover { color: #1f3c44; }
        @media (min-width: 640px) { .lo-info-link { font-size: 0.9rem; } }

        /* ── Offer card ──────────────────────────────────────────────── */
        .lo-offer-card { flex: 1; min-height: 280px; }
        .lo-offer-bg { transition: opacity 0.1s; }
        .lo-offer-content { min-height: 280px; padding-top: 4rem; }
        @media (min-width: 480px)  { .lo-offer-card { min-height: 320px; } .lo-offer-content { min-height: 320px; } }
        @media (min-width: 640px)  { .lo-offer-card { min-height: 360px; } .lo-offer-content { min-height: 360px; } }
        @media (min-width: 768px)  { .lo-offer-card { min-height: 300px; } .lo-offer-content { min-height: 300px; } }
        @media (min-width: 1024px) { .lo-offer-card { min-height: 400px; } .lo-offer-content { min-height: 400px; } }
        @media (min-width: 1280px) { .lo-offer-card { min-height: 440px; } .lo-offer-content { min-height: 440px; } }

        .lo-offer-label {
          font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.32em; text-transform: uppercase;
          color: rgba(255,255,255,0.7);
        }
        @media (min-width: 640px) { .lo-offer-label { font-size: 0.68rem; } }
        .lo-offer-title {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(1.2rem, 3.5vw, 1.75rem);
          font-weight: 400; line-height: 1.15; color: #fff;
        }
        .lo-offer-desc {
          font-size: 0.84rem; line-height: 1.7;
          color: rgba(255,255,255,0.78); max-width: 28rem;
        }
        @media (min-width: 640px) { .lo-offer-desc { font-size: 0.9rem; } }

        .lo-offer-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.65rem 1.4rem;
          border: 1px solid rgba(255,255,255,0.38);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #fff; border-radius: 999px; cursor: pointer;
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .lo-offer-btn:hover { background: rgba(255,255,255,0.18); border-color: rgba(255,255,255,0.6); }
        .lo-offer-btn-icon { width: 0.8rem; height: 0.8rem; transition: transform 0.25s ease; }
        .lo-offer-btn:hover .lo-offer-btn-icon { transform: translateX(3px); }

        .lo-dot { height: 6px; cursor: pointer; flex-shrink: 0; }
        .lo-dot--active { width: 24px; background: #1f3c44; }
        .lo-dot--inactive { width: 6px; background: rgba(31,60,68,0.22); }
        .lo-dot--inactive:hover { background: rgba(31,60,68,0.45); }

        .lo-progress-track {
          height: 2px; width: 5rem;
          background: rgba(31,60,68,0.1);
          border-radius: 2px; overflow: hidden;
        }
        .lo-progress-bar {
          height: 100%; width: 0%; background: #1f3c44;
          border-radius: 2px;
          animation: lo-progress 5s linear forwards;
        }
        @keyframes lo-progress { from { width: 0%; } to { width: 100%; } }

        .lo-arrow-btn {
          display: inline-flex; align-items: center; justify-content: center;
          width: 2.2rem; height: 2.2rem;
          border: 1px solid rgba(31,60,68,0.2); border-radius: 50%;
          background: transparent; color: #1f3c44; cursor: pointer;
          transition: background 0.25s ease, border-color 0.25s ease; flex-shrink: 0;
        }
        .lo-arrow-btn:hover { background: rgba(31,60,68,0.07); border-color: rgba(31,60,68,0.4); }
        .lo-arrow-btn svg { width: 0.9rem; height: 0.9rem; }

        .lo-slide-counter {
          font-size: 0.65rem; font-weight: 500;
          letter-spacing: 0.18em; color: rgba(31,60,68,0.45);
          font-variant-numeric: tabular-nums;
          font-family: "DM Mono", ui-monospace, monospace;
        }
      `}</style>
    </section>
  );
}
