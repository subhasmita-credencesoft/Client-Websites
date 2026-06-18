"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/ui/Container";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PrivacyPage() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let mm: gsap.MatchMedia | null = null;
    const raf = requestAnimationFrame(() => {
      mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ctx = gsap.context(() => {
          gsap.fromTo(
            ".privacy-hero-kicker",
            { y: 18, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: heroRef.current, start: "top 88%", once: true } }
          );
          gsap.fromTo(
            ".privacy-hero-title",
            { y: 30, autoAlpha: 0, filter: "blur(8px)" },
            { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1, ease: "power4.out", scrollTrigger: { trigger: heroRef.current, start: "top 84%", once: true } }
          );
          gsap.fromTo(
            ".privacy-hero-copy",
            { y: 22, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: heroRef.current, start: "top 78%", once: true } }
          );
          gsap.fromTo(
            ".privacy-card",
            { y: 30, autoAlpha: 0, scale: 0.97 },
            { y: 0, autoAlpha: 1, scale: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: contentRef.current, start: "top 82%", once: true } }
          );
        });
        return () => ctx.revert();
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".privacy-hero-kicker", ".privacy-hero-title", ".privacy-hero-copy", ".privacy-card"], { clearProps: "all" });
        ScrollTrigger.refresh();
      });
    });
    return () => { cancelAnimationFrame(raf); mm?.revert(); };
  }, []);

  return (
    <div className="site-page">
      {/* ── HERO ── */}
      <section ref={heroRef} data-no-global-gsap className="relative overflow-hidden bg-[#1f3c44] py-28 sm:py-32 md:py-40">
        <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#c67a3a]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(198,122,58,0.08),transparent_50%)]" />
        <Container size="content">
          <div className="relative mx-auto max-w-4xl text-center">
            <div className="overflow-hidden">
              <p className="privacy-hero-kicker text-[0.68rem] font-bold uppercase tracking-[0.42em] text-[#c67a3a]">
                Privacy
              </p>
            </div>
            <div className="overflow-hidden mt-5">
              <h1 className="privacy-hero-title font-serif text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.93] text-white">
                Privacy Policy
              </h1>
            </div>
            <p className="privacy-hero-copy mx-auto mt-7 max-w-2xl text-[1.02rem] leading-8 text-white/60">
              How we collect, use, and protect your personal information.
            </p>
          </div>
        </Container>
      </section>

      {/* ── CONTENT ── */}
      <section ref={contentRef} data-no-global-gsap className="relative overflow-hidden bg-[#f7f3ec] py-20 sm:py-24 md:py-32">
        <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 -translate-y-1/2 rounded-full bg-[#d89a55]/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-1/4 h-64 w-64 rounded-full bg-[#1f3c44]/5 blur-3xl" />
        <Container size="content">
          <div className="mx-auto max-w-3xl">
            <div className="privacy-card rounded-[2rem] border border-[#e5ddd0] bg-white p-8 shadow-[0_12px_50px_rgba(31,60,68,0.06)] sm:p-10 md:p-14">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f3c44]">
                  <svg className="h-6 w-6 text-[#c67a3a]" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#1f3c44]">Your Privacy Matters</h2>
                  <p className="text-sm text-[#1f3c44]/50">Last updated: June 2026</p>
                </div>
              </div>
              <div className="space-y-6 text-[1rem] leading-8 text-[#1f3c44]/75">
                <p>
                  UK&apos;s Resort<sup>&reg;</sup> respects the privacy of all our guests, and we are
                  committed to protecting it. To best serve you throughout this Web site, you may
                  be asked to provide a variety of information, such as name, mailing address,
                  telephone number, email address, credit card information, etc. This information
                  will allow us to provide a personalized experience for each visitor to our Web
                  site.
                </p>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d89a55]/30 to-transparent" />
                <p>
                  This Web site does not collect, save or store any personal information from
                  visitors that simply browse this Web site, unless you voluntarily and
                  intentionally provide it to us. We do not collect personal information without
                  your knowledge or consent. Any personal information that is requested on our Web
                  site is necessary in order to process your reservation.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
