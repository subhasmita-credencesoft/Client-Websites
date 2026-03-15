"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import Container from "../ui/Container";

const SPA_IMAGES = [
  "/images/pic2.jpeg",
  "/images/pic3.jpeg",
  "/images/pic4.jpeg",
  "/images/pic5.jpeg",
  "/images/pic6.jpeg",
  "/images/pic7.jpeg",
  "/images/pic8.jpeg",
  "/images/pic9.jpeg",
  "/images/pic10.jpeg",
  "/images/pic11.jpeg",
  "/images/pic12.jpeg",
];

const SwimmingPoolIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12h20" />
    <path d="M2 17c2-2 4 0 6 0s4-2 6 0 4 0 6 0" />
    <circle cx="12" cy="7" r="2" />
    <path d="M12 9v3" />
    <path d="M9 12l3-3 3 3" />
  </svg>
);

const KidsAreaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2" />
    <path d="M6 20l2-6 4 3 4-3 2 6" />
    <path d="M8 14l-2-4h12l-2 4" />
  </svg>
);

const EntryAreaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 4h7v16h-7" />
    <path d="M9 8l-4 4 4 4" />
    <path d="M5 12h11" />
  </svg>
);

const TOUR_OPTIONS = [
  {
    label: "Swimming Pool",
    url: "https://www.google.co.in/maps/@18.8171609,73.3046823,3a,75y,204.63h,85.09t/data=!3m8!1e1!3m6!1s2KDH2H1qz_8AAAQvxYlBkw!2e0!3e2!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D4.909999999999997%26panoid%3D2KDH2H1qz_8AAAQvxYlBkw%26yaw%3D204.63!7i13312!8i6656?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D",
    Icon: SwimmingPoolIcon,
  },
  {
    label: "Kids Area",
    url: "https://www.google.co.in/maps/@18.8171404,73.3046851,3a,90y,257.14h,79.61t/data=!3m7!1e1!3m5!1sluO7GcaMtf0AAAQvxYhZag!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D10.39%26panoid%3DluO7GcaMtf0AAAQvxYhZag%26yaw%3D257.14!7i13312!8i6656?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D",
    Icon: KidsAreaIcon,
  },
  {
    label: "Entry Area",
    url: "https://www.google.co.in/maps/@18.8170906,73.3046748,3a,75y,33.35h,71.78t/data=!3m8!1e1!3m6!1sYoNiEUaVO9gAAAQvxYhZZw!2e0!3e2!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D18.22%26panoid%3DYoNiEUaVO9gAAAQvxYhZZw%26yaw%3D33.35!7i13312!8i6656?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D",
    Icon: EntryAreaIcon,
  },
];

export default function WellnessSpaIntro() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tourOpen, setTourOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  const markImageLoaded = useCallback((src: string) => {
    setLoadedImages((prev) => (prev[src] ? prev : { ...prev, [src]: true }));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SPA_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setTourOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Preload slider images in the background to avoid delays during transitions.
    SPA_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => markImageLoaded(src);
    });
  }, [markImageLoaded]);

  const insetIndex = (activeIndex + 1) % SPA_IMAGES.length;
  const mainSrc = SPA_IMAGES[activeIndex];
  const insetSrc = SPA_IMAGES[insetIndex];
  const isMainLoaded = !!loadedImages[mainSrc];
  const isInsetLoaded = !!loadedImages[insetSrc];

  return (
    <section className="bg-[#f4f1ea] py-20 text-[#1f3c44]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">

          {/* ── Image panel ── */}
          <div className="relative mx-auto w-full max-w-[520px]">

            {/* Main image */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-[40px] bg-[#d9d2c6]">
              <div
                aria-hidden="true"
                className={`absolute inset-0 bg-[#d9d2c6] transition-opacity duration-500 ${
                  isMainLoaded ? "opacity-0" : "opacity-100"
                }`}
              />
              <Image
                src={mainSrc}
                alt="Resort facility"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                priority={activeIndex === 0}
                loading={activeIndex === 0 ? "eager" : "lazy"}
                onLoad={() => markImageLoaded(mainSrc)}
                className={`h-full w-full object-cover transition-[opacity,transform,filter] duration-700 ease-out ${
                  isMainLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-[1.02] blur-sm"
                }`}
              />
            </div>

            {/* Inset image — always next in sequence */}
            <div className="absolute right-[-4%] top-[22%] w-[52%]">
              <div className="relative aspect-square overflow-hidden rounded-[28px] bg-[#d9d2c6] shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-[#d9d2c6] transition-opacity duration-500 ${
                    isInsetLoaded ? "opacity-0" : "opacity-100"
                  }`}
                />
                <Image
                  src={insetSrc}
                  alt="Resort facility detail"
                  fill
                  sizes="(max-width: 1024px) 52vw, 270px"
                  loading="lazy"
                  onLoad={() => markImageLoaded(insetSrc)}
                  className={`h-full w-full object-cover transition-[opacity,transform,filter] duration-700 ease-out ${
                    isInsetLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-[1.02] blur-sm"
                  }`}
                />
              </div>
            </div>

            {/* Decorative circle */}
            <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-[#f4f1ea]" />

            {/* Dots */}
            <div className="absolute -bottom-14 left-0 flex items-center gap-2">
              {SPA_IMAGES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-6 bg-[#1f3c44]"
                      : "w-2 bg-[#1f3c44]/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ── Text panel ── */}
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.45em] text-[#1f3c44]/60">
              Facilities
            </span>
            <h2 className="mt-6 font-serif text-3xl leading-tight md:text-4xl">
              The Name That Redefines Hospitality
              <br />
              Green Par-Excellence In The Lush
              <br />
              Landscape At Khopoli.
            </h2>
            <p className="mt-6 text-sm leading-7 text-[#1f3c44]/75">
              Discover the euphoria within you with boundless fun under nonstop
              sprinkling water and break into a wild Rain dance. Splash into the
              cool and clear waters of our swimming pools and indulge in a game
              of water polo or leisurely amble on the poolside deck. Slide into
              pure merriment and relentless excitement with a fully customized
              ride through our Water Park. Bounce your afternoon with friends
              and family with a wide range of Indoor Games including table
              tennis, badminton and carom. The Evenings are the perfect time to
              run amok in our lush green environment with a host of Outdoor
              Sports like volleyball, cricket, and football. Sweat it out in our
              fully furnished Gym geared with the most sophisticated equipment.
              Toddlers or Children alike have ample space to swing and breeze
              through our exclusively designed Kid&apos;s Park. 24 Hours Of Hot &
              Cold running water, satellite TV channels and luxurious facilities
              will keep you entranced in your holiday break. Express Laundry
              services to provide you with the last minute dress code change.
              Wi-Fi Internet Facility in rooms for those who just want to peek
              back at their office desk! We also provide adventure activities
              like Paint Ball, Archery, Rifle Shooting, Body Zorbing, Water
              Zorbing, Artificial Wall Climbing and Team Building Activities
              (Extra Charges will be applicable). Pets are not allowed in
              resort.
            </p>

            {/* ── Virtual Tour Dropdown ── */}
            <div className="relative mt-10 inline-block" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setTourOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full border border-[#1f3c44]/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#1f3c44] transition hover:border-[#1f3c44] hover:bg-[#1f3c44]/5"
              >
                Take a Virtual Tour
                <span
                  aria-hidden="true"
                  className={`inline-block transition-transform duration-200 ${
                    tourOpen ? "rotate-90" : ""
                  }`}
                >
                  ›
                </span>
              </button>

              {/* Dropdown menu */}
              {tourOpen && (
                <div className="absolute left-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-[#1f3c44]/10 bg-white shadow-[0_8px_32px_rgba(31,60,68,0.12)]">
                  {TOUR_OPTIONS.map(({ label, url, Icon }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setTourOpen(false)}
                      className="flex items-center gap-3 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#1f3c44] transition-colors hover:bg-[#f4f1ea]"
                    >
                      <span className="text-[#1f3c44]/70"><Icon /></span>
                      {label}
                    </a>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
