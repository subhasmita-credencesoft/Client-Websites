"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CalendarRange, Clock3, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { hotelInfo } from "@/data/hotel";
import { SECTION_IDS } from "@/lib/constants";

gsap.registerPlugin(useGSAP);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const loaderTopRef = useRef<HTMLDivElement | null>(null);
  const loaderBottomRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLParagraphElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const bookingCardRef = useRef<HTMLDivElement | null>(null);

  const today = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const tomorrow = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const [bookingBar, setBookingBar] = useState({
    checkIn: today,
    checkOut: tomorrow,
    guests: "1",
  });
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    if (showLoader) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [showLoader]);

  useGSAP(
    () => {
      const progress = { value: 0 };
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => setShowLoader(false),
      });

      gsap.set([badgeRef.current, headlineRef.current, bookingCardRef.current], {
        opacity: 0,
        y: 36,
      });

      timeline.to(progress, {
        value: 100,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 0.2,
        onUpdate: () => {
          const value = Math.round(progress.value);

          if (counterRef.current) {
            counterRef.current.textContent = `${value}%`;
          }

          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${value}%`;
          }
        },
      });

      timeline.to(
        loaderTopRef.current,
        {
          yPercent: -100,
          duration: 1.2,
          ease: "expo.inOut",
        },
        "+=0.25",
      );

      timeline.to(
        loaderBottomRef.current,
        {
          yPercent: 100,
          duration: 1.2,
          ease: "expo.inOut",
        },
        "<",
      );

      timeline.to(
        overlayRef.current,
        {
          autoAlpha: 0,
          duration: 0.2,
          pointerEvents: "none",
        },
        "-=0.05",
      );

      timeline.to(
        badgeRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
        },
        "<0.05",
      );

      timeline.to(
        headlineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
        },
        "<0.08",
      );

      timeline.to(
        bookingCardRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "<0.1",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative -mt-24 overflow-hidden pt-24 sm:-mt-28 sm:pt-32"
      id={SECTION_IDS.home}
      style={{ perspective: "1600px" }}
    >
      <div
        ref={mediaRef}
        className="absolute inset-0 overflow-hidden bg-[url('/images/hero.jpg')] bg-cover bg-center"
      >
        <video
          autoPlay
          className="absolute inset-0 h-full w-full object-cover object-[center_72%] brightness-[1.03] contrast-[1.02] saturate-[1.02]"
          loop
          muted
          playsInline
          poster="/images/hero.jpg"
          preload="metadata"
        >
          <source src="/images/homepage-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(12,10,8,0.44),rgba(24,20,18,0.22),rgba(88,28,28,0.08))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),rgba(10,8,7,0.10)_62%,rgba(10,8,7,0.22)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-stone-950/12 via-stone-950/4 to-transparent" />
      </div>

      <Container className="relative z-10 flex min-h-[calc(100svh-7rem)] flex-col justify-between pb-3 sm:min-h-[calc(100svh-7.5rem)] sm:pb-4 lg:min-h-[calc(100svh-8rem)] lg:pb-5">
        <div
          ref={badgeRef}
          className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center text-center"
        >
          <div
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[11px] text-white/90 backdrop-blur-md sm:px-4 sm:text-sm"
          >
            <Sparkles className="h-4 w-4 shrink-0 text-amber-300" />
            <span className="truncate">Premium Jaipur hospitality with elegant comfort</span>
          </div>

          <h1
            ref={headlineRef}
            className="mt-4 max-w-5xl text-4xl font-semibold leading-[0.95] text-white sm:mt-5 sm:text-5xl lg:mt-6 lg:text-[4rem] xl:text-[4.5rem]"
          >
            {hotelInfo.heroHeadline}
          </h1>
        </div>

        <div
          ref={bookingCardRef}
          className="relative z-20 w-full"
        >
          <div className="mx-auto max-w-6xl ornament-border rounded-[1.1rem] border border-white/55 bg-white/95 px-3 py-2.5 shadow-glow backdrop-blur-xl sm:rounded-[1.5rem] sm:px-5 sm:py-3.5">
            <div className="flex flex-col gap-2.5 xl:flex-row xl:items-end xl:gap-4">
              <div className="min-w-0 xl:w-[210px]">
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-primary/75 sm:text-[11px]">
                  Quick Booking
                </p>
                <h2 className="mt-1 text-sm font-semibold text-stone-900 sm:text-lg lg:text-[1.65rem]">
                  Reserve your stay
                </h2>
              </div>

              <div className="grid flex-1 gap-2 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_0.78fr_auto] xl:items-end">
                <label className="block">
                  <span className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-medium text-stone-700 sm:gap-2 sm:text-xs">
                    <CalendarRange className="h-4 w-4 text-primary" />
                    Check-in
                  </span>
                  <input
                    className="h-9 w-full rounded-full border border-border bg-white px-3 text-sm text-stone-900 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:h-10 sm:px-3.5"
                    min={today}
                    type="date"
                    value={bookingBar.checkIn}
                    onChange={(event) =>
                      setBookingBar((current) => ({
                        ...current,
                        checkIn: event.target.value,
                        checkOut:
                          current.checkOut < event.target.value
                            ? event.target.value
                            : current.checkOut,
                      }))
                    }
                  />
                </label>

                <label className="block">
                  <span className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-medium text-stone-700 sm:gap-2 sm:text-xs">
                    <Clock3 className="h-4 w-4 text-primary" />
                    Check-out
                  </span>
                  <input
                    className="h-9 w-full rounded-full border border-border bg-white px-3 text-sm text-stone-900 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:h-10 sm:px-3.5"
                    min={bookingBar.checkIn || today}
                    type="date"
                    value={bookingBar.checkOut}
                    onChange={(event) =>
                      setBookingBar((current) => ({
                        ...current,
                        checkOut: event.target.value,
                      }))
                    }
                  />
                </label>

                <label className="block sm:col-span-2 xl:col-span-1">
                  <span className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-medium text-stone-700 sm:gap-2 sm:text-xs">
                    <Users className="h-4 w-4 text-primary" />
                    Guests
                  </span>
                  <select
                    className="h-9 w-full rounded-full border border-border bg-white px-3 text-sm text-stone-900 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:h-10 sm:px-3.5"
                    value={bookingBar.guests}
                    onChange={(event) =>
                      setBookingBar((current) => ({
                        ...current,
                        guests: event.target.value,
                      }))
                    }
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5+">5+ Guests</option>
                  </select>
                </label>

                <div className="flex items-end sm:col-span-2 xl:col-span-1">
                  <Button asChild className="h-9 w-full rounded-full px-4 text-sm sm:h-10 sm:px-5 sm:text-base xl:min-w-[210px]" size="lg">
                    <Link href={`${hotelInfo.bookingUrl}?checkIn=${bookingBar.checkIn}&checkOut=${bookingBar.checkOut}&guests=${bookingBar.guests}`}>
                      Check Availability
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {showLoader ? (
        <div ref={overlayRef} className="pointer-events-auto fixed inset-0 z-[120]">
          <div
            ref={loaderTopRef}
            className="relative flex h-1/2 w-full flex-col justify-between overflow-hidden bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.14),transparent_42%),linear-gradient(135deg,#140f0c,#241815,#3b2418)]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.03),transparent)]" />
            <div className="h-1.5 w-full overflow-hidden bg-white/10 sm:h-2">
              <div
                ref={progressBarRef}
                className="h-full w-0 bg-[linear-gradient(90deg,#7c2d12,#b45309,#f6ad24,#fde68a)] shadow-[0_0_24px_rgba(245,158,11,0.45)]"
              />
            </div>
            <div className="relative flex flex-1 items-center justify-center px-6">
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.45em] text-amber-200/70 sm:text-sm">
                  Welcome To
                </p>
                <p className="mt-4 font-display text-3xl font-semibold uppercase tracking-[0.28em] text-white sm:text-5xl">
                  Shravan
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.4em] text-amber-300 sm:text-base">
                  Royal Inn
                </p>
                <div className="mx-auto mt-5 h-px w-28 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent sm:w-40" />
              </div>
            </div>
          </div>

          <div
            ref={loaderBottomRef}
            className="relative flex h-1/2 w-full items-end justify-between overflow-hidden bg-[linear-gradient(135deg,#140f0c,#241815,#3b2418)] px-5 py-6 sm:px-8 sm:py-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.12),transparent_34%)]" />
            <p className="relative text-xs font-semibold uppercase tracking-[0.3em] text-amber-100/75 sm:text-sm">
              Premium Jaipur Hospitality
            </p>
            <p
              ref={counterRef}
              className="relative font-display text-5xl font-semibold leading-none text-white sm:text-7xl"
            >
              0%
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
