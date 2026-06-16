"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";

gsap.registerPlugin(ScrollTrigger);

export default function DiningCulinaryExperience() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let mm: gsap.MatchMedia | null = null;

    const raf = requestAnimationFrame(() => {
      mm = gsap.matchMedia();

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
            ".dining-exp-float-left",
            { x: -36, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out", stagger: 0.08 },
          )
            .fromTo(
              ".dining-exp-kicker",
              { y: 12, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
              "<+0.05",
            )
            .fromTo(
              ".dining-exp-title-line",
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
              ".dining-exp-contact",
              { y: 16, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out", stagger: 0.06 },
              "<+0.08",
            )
            .fromTo(
              ".dining-exp-media",
              { x: 38, autoAlpha: 0, scale: 0.95 },
              { x: 0, autoAlpha: 1, scale: 1, duration: 0.9, ease: "power3.out" },
              "<-0.65",
            );

          gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 88%",
              end: "bottom top",
              scrub: 1,
            },
          }).to(".dining-exp-media-image", { yPercent: 8, scale: 1.08, ease: "none" }, 0);
        }, sectionRef);

        return () => ctx.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".dining-exp-float-left",
            ".dining-exp-kicker",
            ".dining-exp-title-line",
            ".dining-exp-contact",
            ".dining-exp-media",
            ".dining-exp-media-image",
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

  return (
    <section ref={sectionRef} data-no-global-gsap className="relative overflow-hidden bg-[#f6f3ed] py-20 text-[#1f3c44]">
      <div className="pointer-events-none absolute left-0 top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-full bg-[#f1e6d2] blur-2xl md:block" />
      <Image
        src="/images/dining-img1.png"
        alt=""
        width={128}
        height={128}
        className="dining-exp-float-left pointer-events-none absolute left-10 top-1/2 hidden w-32 -translate-y-28 md:block"
      />
      <Image
        src="/images/dining-img2.png"
        alt=""
        width={96}
        height={96}
        className="dining-exp-float-left pointer-events-none absolute left-36 top-1/2 hidden w-24 translate-y-10 md:block"
      />

      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.35fr_1.3fr_0.35fr] lg:items-center">
          <div className="hidden lg:block" aria-hidden="true" />

          <div className="space-y-10 text-center lg:mx-auto lg:max-w-3xl lg:text-center">
            <div className="space-y-6">
              <span className="dining-exp-kicker text-xs uppercase tracking-[0.45em] text-[#1f3c44]/70">
                Unforgettable culinary experience
              </span>
              <div className="overflow-hidden">
                <h2 className="dining-exp-title-line mx-auto max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
                  From Local Favorites to Classic Indian Flavors.
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="dining-exp-title-line mx-auto max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
                  Delicious Food , Made with Love.
                </h2>
              </div>
            </div>

            <p className="dining-exp-contact mx-auto max-w-2xl text-sm leading-7 text-[#1f3c44]/78 sm:text-base">
              We believe a great holiday starts with a great meal. At UK&apos;s Resort, we serve a variety of fresh, flavorful dishes from authentic Indian and Mughlai to popular Chinese favorites. Whether you&apos;re a fan of spicy non-veg curries or looking for a comforting vegetarian spread, our chefs prepare every meal to make you feel right at home.
            </p>

            <div className="mx-auto max-w-xl">
              <h3 className="dining-exp-contact text-xs uppercase tracking-[0.4em] text-[#1f3c44]/70">Contact</h3>
              <div className="mt-4 divide-y divide-[#1f3c44]/25 border-y border-[#1f3c44]/25 text-sm">
                <div className="dining-exp-contact flex flex-col items-center gap-1 py-4 sm:flex-row sm:justify-between">
                  <span>Phone Number:</span>
                  <span className="font-medium">+91 98220 12343</span>
                </div>
                <div className="dining-exp-contact flex flex-col items-center gap-1 py-4 sm:flex-row sm:justify-between">
                  <span>Email:</span>
                  <span className="font-medium">info@uksresort.com</span>
                </div>
              </div>

            </div>

              <a
                href="https://bookonelocal.in/cdn/ukresortmenu.pdf"
                download
                target="_blank"
                rel="noreferrer"
                style={{ color: "#ffffff" }}
                className="dining-exp-contact mt-6 inline-flex items-center gap-2 rounded-full bg-[#1f3c44] px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] !text-white transition hover:bg-[#2a4f5a]"
              >
                Download Multi-Cuisine Menu
              </a>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="dining-exp-media relative h-[280px] w-[280px] overflow-hidden rounded-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] md:h-[340px] md:w-[340px]">
              <Image
                src="/images/dine-img.jpg"
                alt="Signature plated dish"
                fill
                sizes="(max-width: 768px) 280px, 340px"
                className="dining-exp-media-image object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
