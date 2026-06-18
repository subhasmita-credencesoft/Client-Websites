"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/ui/Container";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const policySections = [
  {
    number: "01",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "Mandatory Requirements",
    children: (
      <div className="space-y-3">
        <div className="flex items-start gap-4 rounded-xl border border-[#1f3c44]/8 bg-[#1f3c44]/5 p-4">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c67a3a]/15 text-xs font-bold text-[#c67a3a]">1</span>
          <p className="text-[0.95rem] leading-7">All foreign nationals need to carry a valid Passport, Visa / work permit and need to present it at the time of arrival which will be checked and verified by the relevant authorities.</p>
        </div>
        <div className="flex items-start gap-4 rounded-xl border border-[#1f3c44]/8 bg-[#1f3c44]/5 p-4">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c67a3a]/15 text-xs font-bold text-[#c67a3a]">2</span>
          <p className="text-[0.95rem] leading-7">All Indian nationals have to present a Photo Identification proof and address details at the time of arrival.</p>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Cancellation & Modification Policy",
    children: (
      <div className="space-y-3">
        {[
          { days: "More than 15 days", charge: "No cancellation charges", color: "text-green-700" },
          { days: "7 to 15 days", charge: "50% cancellation fee", color: "text-amber-700" },
          { days: "0 to 7 days", charge: "100% cancellation fee", color: "text-red-700" },
        ].map((item) => (
          <div key={item.days} className="flex items-center justify-between gap-4 rounded-xl border border-[#1f3c44]/8 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c67a3a]/10 text-sm font-bold text-[#c67a3a]">
                {item.charge.startsWith("No") ? "✓" : item.charge.startsWith("50") ? "!" : "✕"}
              </div>
              <span className="text-[0.95rem] font-medium text-[#1f3c44]">{item.days}</span>
            </div>
            <span className={`shrink-0 text-right text-[0.85rem] font-semibold ${item.color}`}>{item.charge}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: "03",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
    title: "PETS ARE NOT ALLOWED IN THE RESORT",
    highlight: true,
  },
  {
    number: "04",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    title: "Reservation Policies & Guidelines",
    children: (
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          "Specific food request should be made at least 24 hrs prior to the date of arrival",
          "Taxes will be applicable as per Government regulations",
          "All major credit cards are accepted",
          "We do not accept personal cheques",
          "Right of admission reserved with management",
          "50% advance to be paid at time of booking",
          "Balance should be paid before 08 days from arrival date",
          "Swimming Costumes are compulsory to enter the swimming pool & water Park",
          "Outside eatables & beverages are not allowed",
        ].map((item) => (
          <div key={item} className="flex items-start gap-3 rounded-xl border border-[#1f3c44]/8 bg-white p-4 shadow-sm transition hover:border-[#c67a3a]/20 hover:shadow-md">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#c67a3a]" />
            <span className="text-[0.88rem] leading-6 text-[#1f3c44]/80">{item}</span>
          </div>
        ))}
      </div>
    ),
  },
];

export default function TermsPage() {
  const heroRef = useRef<HTMLElement>(null);
  const sectionsRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let mm: gsap.MatchMedia | null = null;
    const raf = requestAnimationFrame(() => {
      mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ctx = gsap.context(() => {
          gsap.fromTo(
            ".terms-hero-kicker",
            { y: 18, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: heroRef.current, start: "top 88%", once: true } }
          );
          gsap.fromTo(
            ".terms-hero-title",
            { y: 30, autoAlpha: 0, filter: "blur(8px)" },
            { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1, ease: "power4.out", scrollTrigger: { trigger: heroRef.current, start: "top 84%", once: true } }
          );
          gsap.fromTo(
            ".terms-hero-copy",
            { y: 22, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: heroRef.current, start: "top 78%", once: true } }
          );
          gsap.utils.toArray<HTMLElement>(".terms-card").forEach((card, i) => {
            gsap.fromTo(
              card,
              { y: 30, autoAlpha: 0, rotateX: -4, transformPerspective: 1200 },
              { y: 0, autoAlpha: 1, rotateX: 0, duration: 0.75, delay: i * 0.1, ease: "power3.out", scrollTrigger: { trigger: sectionsRef.current, start: "top 82%", once: true } }
            );
          });
        });
        return () => ctx.revert();
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".terms-hero-kicker", ".terms-hero-title", ".terms-hero-copy", ".terms-card"], { clearProps: "all" });
        ScrollTrigger.refresh();
      });
    });
    return () => { cancelAnimationFrame(raf); mm?.revert(); };
  }, []);

  return (
    <div className="site-page">
      {/* ── HERO ── */}
      <section ref={heroRef} data-no-global-gsap className="relative overflow-hidden bg-[#1f3c44] py-28 sm:py-32 md:py-40">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#c67a3a]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(198,122,58,0.08),transparent_50%)]" />
        <Container size="content">
          <div className="relative mx-auto max-w-4xl text-center">
            <div className="overflow-hidden">
              <p className="terms-hero-kicker text-[0.68rem] font-bold uppercase tracking-[0.42em] text-[#c67a3a]">
                Policies
              </p>
            </div>
            <div className="overflow-hidden mt-5">
              <h1 className="terms-hero-title font-serif text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.93] text-white">
                Terms &amp; Conditions
              </h1>
            </div>
            <p className="terms-hero-copy mx-auto mt-7 max-w-2xl text-[1.02rem] leading-8 text-white/60">
              Please read these terms carefully before booking your stay.
            </p>
          </div>
        </Container>
      </section>

      {/* ── CONTENT ── */}
      <section ref={sectionsRef} data-no-global-gsap className="relative overflow-hidden bg-[#f7f3ec] py-20 sm:py-24 md:py-32">
        <div className="pointer-events-none absolute left-0 top-1/4 h-72 w-72 -translate-y-1/2 rounded-full bg-[#d89a55]/8 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-1/4 h-64 w-64 rounded-full bg-[#1f3c44]/5 blur-3xl" />
        <Container size="content">
          <div className="mx-auto max-w-3xl space-y-8">
            {policySections.map((section) =>
              section.highlight ? (
                <div key={section.number} className="terms-card rounded-[2rem] border-2 border-[#c67a3a]/25 bg-gradient-to-br from-[#c67a3a]/8 to-[#c67a3a]/3 p-8 text-center shadow-sm sm:p-10">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#c67a3a]/15">
                    <span className="text-2xl">🐾</span>
                  </div>
                  <p className="font-serif text-xl font-bold leading-tight text-[#1f3c44]">
                    {section.title}
                  </p>
                  <p className="mt-3 text-sm text-[#1f3c44]/60">
                    We love animals, but for the safety and comfort of all guests, pets are not permitted anywhere on the resort premises.
                  </p>
                </div>
              ) : (
                <div key={section.number} className="terms-card rounded-[2rem] border border-[#e5ddd0] bg-white p-8 shadow-[0_12px_50px_rgba(31,60,68,0.06)] sm:p-10">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f3c44]">
                      <span className="text-[#c67a3a]">{section.icon}</span>
                    </div>
                    <div>
                      <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#c67a3a]">Section {section.number}</span>
                      <h2 className="font-serif text-xl font-bold text-[#1f3c44]">{section.title}</h2>
                    </div>
                  </div>
                  {section.children}
                </div>
              )
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
