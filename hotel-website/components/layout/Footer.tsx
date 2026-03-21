"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Container from "../ui/Container";
import { usePropertyData } from "../providers/PropertyDataProvider";
import useClientReady from "../../hooks/useClientReady";
import {
  buildFooterQuickLinks,
  FOOTER_SOCIAL_LINKS,
  TRIPADVISOR_URL,
} from "../../data/layout/footer";

function formatPhone(value: string | null | undefined) {
  if (!value) return "";
  const digitsOnly = value.replace(/\D/g, "");
  if (digitsOnly.length === 10) return `+91 ${digitsOnly.slice(0, 5)} ${digitsOnly.slice(5)}`;
  return value;
}

function buildAddressLines(parts: Array<string | null | undefined>) {
  return parts.filter(Boolean);
}

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const { property } = usePropertyData();
  const footerRef = useRef<HTMLElement | null>(null);
  const clientReady = useClientReady();
  const liveProperty = clientReady ? property : null;
  const quickLinks = buildFooterQuickLinks(liveProperty?.website);
  const socialIconMap = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
  } as const;
  const headingName = liveProperty?.name || "UK's Resort";
  const addressLines = buildAddressLines([
    liveProperty?.address?.streetName,
    liveProperty?.address?.suburb,
    liveProperty?.address?.city && liveProperty?.address?.postcode
      ? `${liveProperty.address.city} - ${liveProperty.address.postcode}`
      : liveProperty?.address?.city,
    liveProperty?.address?.state,
    liveProperty?.address?.country,
  ]);
  const phone1 = formatPhone(liveProperty?.mobile) || "+91 98220 12343";
  const phone2 = formatPhone(liveProperty?.whatsApp) || "+91 87798 14559";
  const email = liveProperty?.email || "info@uksresort.com";

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 86%",
            once: true,
          },
        });

        tl.fromTo(
          ".footer-brand",
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.75, ease: "power3.out" },
        )
          .fromTo(
            ".footer-heading",
            { yPercent: 110, autoAlpha: 0, filter: "blur(8px)" },
            { yPercent: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.9, ease: "power4.out" },
            "<+0.04",
          )
          .fromTo(
            ".footer-content-block",
            { y: 16, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out", stagger: 0.08 },
            "<+0.08",
          )
          .fromTo(
            ".footer-bottom",
            { y: 10, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" },
            "<+0.06",
          );
      }, footerRef);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <footer ref={footerRef} data-no-global-gsap className="mt-auto bg-[#143b47] text-white">
      <Container>
        <div className="grid gap-10 border-b border-white/15 py-12 sm:py-14 lg:grid-cols-[1fr_1.6fr] lg:py-16 xl:gap-16">
          <div className="footer-brand space-y-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-sm">
             <Image
              src="/UK's-Resort-Logo_SVG.webp" 
              alt="Property Logo"
              width={40}
              height={40}
              className="object-cover"
               />
            </div>
              <h3 className="footer-heading font-serif text-3xl leading-tight sm:text-4xl">
                Award-winning
                <br />
                resort in the
                <br />
                heart of {liveProperty?.address?.city || "Khopoli"}
              </h3>

            <Link
              href={TRIPADVISOR_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Tripadvisor certificate and reviews"
              className="inline-block"
            >
              <div className="relative h-[142px] w-[185px] overflow-hidden border-2 border-[#90f6ba] bg-[#ebebeb] text-center">
                <p className="pt-2 text-[11px] leading-[1.15] text-black">
                  Certificate of Excellence 2016
                </p>
                <p className="text-[10px] leading-[1.15] text-black">Read Reviews</p>

                <div className="absolute -bottom-[74px] left-1/2 h-[150px] w-[150px] -translate-x-1/2 rounded-full bg-[#43eeb8]">
                  <div className="absolute left-1/2 top-5 -translate-x-1/2 text-center text-black">
                    <Image
                      src="/images/triplogo.png"
                      alt="Tripadvisor logo"
                      width={54}
                      height={28}
                      className="mx-auto h-auto w-[54px]"
                    />
                    <p className="mt-1 text-[13px] font-semibold leading-none">Tripadvisor</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="grid gap-8 sm:gap-10 xl:grid-cols-[1.1fr_1.2fr] xl:justify-self-end xl:text-left">
            <div className="footer-content-block">
              <h4 className="font-serif text-[1.65rem] leading-tight sm:text-2xl">{headingName}</h4>
              <p className="mt-2 text-[0.95rem] text-white/70 sm:text-sm">
                {liveProperty?.businessType || "Accommodation"} {liveProperty?.businessSubtype ? `- ${liveProperty.businessSubtype}` : ""}
              </p>
              <form className="mt-6 space-y-3 border-b border-white/30 pb-4">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder="your email"
                  className="h-11 w-full rounded-md border border-white/30 bg-white/5 px-3 text-[0.95rem] text-white/90 placeholder:text-white/60 focus:border-white/55 focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-white/40 px-5 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-white/10"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1.3fr)_minmax(170px,1fr)_minmax(150px,1fr)]">
              {addressLines.length > 0 && (
                <div className="footer-content-block">
                  <h5 className="font-serif text-lg">Address</h5>
                  <div className="mt-4 space-y-1.5">
                    {addressLines.map((line) => (
                      <p key={line} className="text-[0.97rem] leading-7 text-white/75 sm:text-sm sm:leading-6">{line}</p>
                    ))}
                  </div>
                </div>
              )}
              <div className="footer-content-block">
                <h5 className="font-serif text-lg">Contact</h5>
                <p className="mt-4 break-words text-[0.97rem] leading-7 text-white/75 sm:text-sm sm:leading-6">{phone1}</p>
                <p className="break-words text-[0.97rem] leading-7 text-white/75 sm:text-sm sm:leading-6">{phone2}</p>
                <Link
                  href={`mailto:${email}`}
                  className="break-all text-[0.97rem] leading-7 text-white/75 hover:text-white sm:text-sm sm:leading-6"
                >
                  {email}
                </Link>
              </div>
              <div className="footer-content-block">
                <h5 className="font-serif text-lg">Social</h5>
                <div className="mt-4 space-y-2">
                  {FOOTER_SOCIAL_LINKS.map((item) => {
                    const Icon = socialIconMap[item.icon];
                    return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-2 text-[0.97rem] leading-7 text-white/75 hover:text-white sm:text-sm sm:leading-6"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {item.label}
                    </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom flex flex-wrap items-center gap-4 py-6 text-[0.86rem] text-white/65 sm:justify-between sm:text-xs">
          <p className="max-w-3xl leading-6">Copyright &copy; {new Date().getFullYear()} {headingName}. All rights reserved Designed and Developed By CredenceSoft, Powered By BookOne.</p>
          <div className="flex w-full flex-wrap items-center justify-start gap-x-6 gap-y-2 border-t border-white/10 pt-3 pr-16 sm:ml-auto sm:w-auto sm:justify-end sm:border-t-0 sm:pt-0 sm:pr-0">
            {quickLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[0.98rem] hover:text-white sm:text-xs"
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
