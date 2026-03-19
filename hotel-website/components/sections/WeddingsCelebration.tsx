"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";

gsap.registerPlugin(ScrollTrigger);

const MAP_LINKS = {
  weddings:
    "https://www.google.co.in/maps/place/UK'S+RESORT/@18.817145,73.3046891,3a,90y,82.75h,75.21t/data=!3m7!1e1!3m5!1sEqXPpiFcSuYAAAQvxYn65A!2e0!3e2!7i13312!8i6656!4m5!3m4!1s0x3be7fd68dbb32757:0x45a268bbfa521ef0!8m2!3d18.8171404!4d73.3046807!6m1!1e1?shorturl=1",
  picnic:
    "https://www.google.co.in/maps/@18.8171575,73.3046448,3a,90y,119.21h,85.89t/data=!3m7!1e1!3m5!1s2c65xsf3YxUAAAQvxYn66g!2e0!3e2!7i13312!8i6656!6m1!1e1?shorturl=1",
  sports:
    "https://www.google.co.in/maps/@18.8171712,73.3046889,3a,75y,204.45h,83.59t/data=!3m6!1e1!3m4!1sXJbldbTZ-54AAAQvxYVCgA!2e0!7i13312!8i6656!6m1!1e1?shorturl=1",
};

export default function WeddingsCelebration() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });

        tl.fromTo(
          ".wedding-kicker",
          { y: 12, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
        )
          .fromTo(
            ".wedding-title-line",
            { yPercent: 110, autoAlpha: 0, filter: "blur(8px)" },
            {
              yPercent: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.95,
              stagger: 0.08,
              ease: "power4.out",
            },
            "<+0.06",
          )
          .fromTo(
            ".wedding-intro",
            { y: 18, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
            "<+0.08",
          )
          .fromTo(
            ".wedding-media",
            { x: -26, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", stagger: 0.08 },
            "<+0.12",
          )
          .fromTo(
            ".wedding-card",
            { x: 26, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.85, ease: "power3.out", stagger: 0.08 },
            "<",
          );

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "bottom top",
            scrub: 1,
          },
        }).to(".wedding-media-image", { yPercent: 7, scale: 1.06, ease: "none" }, 0);
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} data-no-global-gsap className="bg-[#f6f3ed] py-20 text-[#1f3c44]">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="wedding-kicker text-xs uppercase tracking-[0.45em] text-[#1f3c44]/70">Enhance your celebration</span>
          <div className="mt-6 overflow-hidden">
            <h2 className="wedding-title-line font-serif text-4xl leading-tight md:text-5xl">We make every</h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="wedding-title-line font-serif text-4xl leading-tight md:text-5xl">occasion sparkle</h2>
          </div>
          <p className="wedding-intro mt-6 text-sm leading-7 text-[#1f3c44]/75">
            Celebrate your special occasions like Birthdays, Get-togethers, Anniversaries, Launch Parties etc with
            live Music, Delicious Cuisines &amp; varied Entertainment to make each event enjoyable &amp; memorable for
            the entire family
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="wedding-media overflow-hidden rounded-3xl bg-[#e2dacd] shadow-[0_24px_60px_rgba(0,0,0,0.15)]">
            <img src="https://bookonelocal.in/cdn/wedding4-1.jpg" alt="Beachfront celebration setup" className="wedding-media-image h-full w-full object-cover" />
          </div>

          <div className="wedding-card rounded-3xl bg-white p-8 shadow-[0_18px_45px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.16)]">
            <div className="overflow-hidden rounded-2xl">
              <img src="https://bookonelocal.in/cdn/wedding-image.jpg" alt="Couple by the sea" className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.06]" />
            </div>
            <h3 className="mt-6 font-serif text-3xl">Weddings &amp; honeymoons</h3>
            <p className="mt-4 text-sm leading-7 text-[#1f3c44]/75">
              Marriage are made in heaven but created on earth and certainly knows how to make them glitter with
              splendor. From the moment you decide to celebrate your big day with us, we leave no stone unturned to
              make the occasion an unforgettable one for years to come. Be it traditional or a modern themed wedding,
              our wedding team understands what you need in a wedding.
              <br />
              <br />
              With warm hospitality and years of experience, our wedding team ensures the wedding arrangement right
              from small ceremonies, mehndi, sangeet program and extravagant reception runs out smoothly as planned.
              <br />
              <br />
              Our modern accommodation and Exquisite lawns, Pool side and water park areas gives the perfect setting
              to make your destination wedding a memorable one.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#" className="group inline-flex items-center gap-3 text-[10.5px] font-medium uppercase tracking-[0.2em] text-[#1f3c44]">
                Enquire now <span className="inline-block h-px w-7 bg-[#1f3c44] transition-all duration-300 group-hover:w-12" />
              </a>
              <a
                href={MAP_LINKS.weddings}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-[#d9b882] bg-[#d1ab73] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-black transition hover:bg-[#e1c08c]"
                aria-label="Take a virtual tour of weddings venue"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4.5 12a7.5 7.5 0 0 1 12.62-5.43" />
                  <path d="M19.5 12a7.5 7.5 0 0 1-12.62 5.43" />
                  <path d="M17 3.5h2.9v2.9" />
                  <path d="M7 20.5H4.1v-2.9" />
                  <path d="M12 7.8 9.6 9.2v2.7l2.4 1.4 2.4-1.4V9.2z" />
                </svg>
                <span>Take a Virtual Tour</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="wedding-card rounded-3xl bg-white p-8 shadow-[0_18px_45px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.16)]">
            <div className="overflow-hidden rounded-2xl">
              <img src="https://bookonelocal.in/cdn/gymnium-image.JPG" alt="Family picnic setup" className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.06]" />
            </div>
            <h3 className="mt-6 font-serif text-3xl">Family &amp; School Picnic</h3>
            <p className="mt-4 text-sm leading-7 text-[#1f3c44]/75">
              Arrive at UK&apos;s Resort, Khopoli after a scenic drive along the green countryside. A sumptuous buffet
              breakfast awaits you. Let down your hair at the Mini water park. Splash around the cool waters and
              swing to the latest music by the pool side. What&apos;s more, we have music, rain &amp; masti all year
              round with Rain Dance. After a frolicking time in the water enjoy the renowned UK&apos;s Resort delicious
              unlimited buffet lunch. Make the most of the 6 acres of open space to play games with your family and
              friends. The little ones can make merry in the children&apos;s play park. Round up an exciting picnic
              with hot beverages and snacks. The unforgettable experience at UK&apos;s Resort Khopoli will have you and
              your family returning for more.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#" className="group inline-flex items-center gap-3 text-[10.5px] font-medium uppercase tracking-[0.2em] text-[#1f3c44]">
                Enquire now <span className="inline-block h-px w-7 bg-[#1f3c44] transition-all duration-300 group-hover:w-12" />
              </a>
              <a
                href={MAP_LINKS.picnic}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-[#d9b882] bg-[#d1ab73] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-black transition hover:bg-[#e1c08c]"
                aria-label="Take a virtual tour of picnic area"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4.5 12a7.5 7.5 0 0 1 12.62-5.43" />
                  <path d="M19.5 12a7.5 7.5 0 0 1-12.62 5.43" />
                  <path d="M17 3.5h2.9v2.9" />
                  <path d="M7 20.5H4.1v-2.9" />
                  <path d="M12 7.8 9.6 9.2v2.7l2.4 1.4 2.4-1.4V9.2z" />
                </svg>
                <span>Take a Virtual Tour</span>
              </a>
            </div>
          </div>

          <div className="wedding-media overflow-hidden rounded-3xl bg-[#e2dacd] shadow-[0_24px_60px_rgba(0,0,0,0.15)]">
            <img src="https://bookonelocal.in/cdn/Copy of IMG_3980.avif" alt="Family picnic grounds" className="wedding-media-image h-full w-full object-cover" />
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="wedding-media overflow-hidden rounded-3xl bg-[#e2dacd] shadow-[0_24px_60px_rgba(0,0,0,0.15)]">
            <img src="https://bookonelocal.in/cdn/kids3.JPG" alt="Sports activities at resort" className="wedding-media-image h-full w-full object-cover" />
          </div>

          <div className="wedding-card rounded-3xl bg-white p-8 shadow-[0_18px_45px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.16)]">
            <div className="overflow-hidden rounded-2xl">
              <img src="https://bookonelocal.in/cdn/outdoor-image.jpg" alt="Sports facilities" className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.06]" />
            </div>
            <h3 className="mt-6 font-serif text-3xl">Sports &amp; Activities</h3>
            <p className="mt-4 text-sm leading-7 text-[#1f3c44]/75">
              Make the most of the sprawling lawns to play games like Cricket, Football, Badminton, Throw ball etc.
              or enjoy an indoor game of Table Tennis / Carrom with your family.
              <br />
              <br />
              The impeccable hospitality and a variety of entertainment gives a midas touch to the event like no
              other.
              <br />
              <br />
              We have a spacious 5 acre open space for corporate and education institutes for orgainizing sports
              events.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#" className="group inline-flex items-center gap-3 text-[10.5px] font-medium uppercase tracking-[0.2em] text-[#1f3c44]">
                Enquire now <span className="inline-block h-px w-7 bg-[#1f3c44] transition-all duration-300 group-hover:w-12" />
              </a>
              <a
                href={MAP_LINKS.sports}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-[#d9b882] bg-[#d1ab73] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-black transition hover:bg-[#e1c08c]"
                aria-label="Take a virtual tour of sports area"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4.5 12a7.5 7.5 0 0 1 12.62-5.43" />
                  <path d="M19.5 12a7.5 7.5 0 0 1-12.62 5.43" />
                  <path d="M17 3.5h2.9v2.9" />
                  <path d="M7 20.5H4.1v-2.9" />
                  <path d="M12 7.8 9.6 9.2v2.7l2.4 1.4 2.4-1.4V9.2z" />
                </svg>
                <span>Take a Virtual Tour</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
