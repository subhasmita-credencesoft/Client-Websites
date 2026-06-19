"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import { usePropertyData } from "../providers/PropertyDataProvider";
import useClientReady from "../../hooks/useClientReady";
import {
  buildFooterSocialLinks,
  buildFooterQuickLinks,
} from "../../data/layout/footer";

// Social brand icons (removed from lucide-react v0.429+) — inlined as SVG components
function Facebook({ className, "aria-hidden": ariaHidden }: { className?: string; "aria-hidden"?: boolean | "true" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden={ariaHidden}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function Instagram({ className, "aria-hidden": ariaHidden }: { className?: string; "aria-hidden"?: boolean | "true" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden={ariaHidden}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function Twitter({ className, "aria-hidden": ariaHidden }: { className?: string; "aria-hidden"?: boolean | "true" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden={ariaHidden}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
function Youtube({ className, "aria-hidden": ariaHidden }: { className?: string; "aria-hidden"?: boolean | "true" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden={ariaHidden}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}
function LinkedIn({ className, "aria-hidden": ariaHidden }: { className?: string; "aria-hidden"?: boolean | "true" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden={ariaHidden}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function WhatsApp({ className, "aria-hidden": ariaHidden }: { className?: string; "aria-hidden"?: boolean | "true" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden={ariaHidden}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function formatPhone(value: string | null | undefined) {
  if (!value) return "";
  const digitsOnly = value.replace(/\D/g, "");
  if (digitsOnly.length === 10) return `+91 ${digitsOnly.slice(0, 5)} ${digitsOnly.slice(5)}`;
  return value;
}

function formatPhoneHref(value: string | null | undefined) {
  if (!value) return "";
  const digitsOnly = value.replace(/\D/g, "");
  return digitsOnly ? `tel:+${digitsOnly}` : "";
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
  const socialLinks = buildFooterSocialLinks(liveProperty);
  const socialIconMap = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
    linkedin: LinkedIn,
    whatsapp: WhatsApp,
  } as const;
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
  let phone2 = formatPhone(liveProperty?.whatsApp) || "+91 87798 14559";
  
  if (phone1 === phone2) {
    phone2 = "+91 87798 14559";
  }

  const phone1Href = formatPhoneHref(liveProperty?.mobile) || "tel:+919822012343";
  let phone2Href = formatPhoneHref(liveProperty?.whatsApp) || "tel:+918779814559";

  if (phone1 === phone2) {
    phone2Href = "tel:+918779814559";
  }
  const email = liveProperty?.email || "info@uksresort.com";

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // Ensure all footer blocks are visible by default (CSS fallback)
    const blocks = footer.querySelectorAll<HTMLElement>(".footer-content-block");
    blocks.forEach((el) => { el.style.opacity = "1"; el.style.transform = "none"; });

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // Reset for animation
        blocks.forEach((el) => { el.style.opacity = "0"; el.style.transform = "translateY(16px)"; });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: footer,
            start: "top bottom",
            once: true,
            onEnter: () => {
              blocks.forEach((el) => { el.style.opacity = ""; el.style.transform = ""; });
            },
          },
        });

        tl.fromTo(
          ".footer-brand",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
        )
          .fromTo(
            ".footer-heading",
            { yPercent: 110, opacity: 0, filter: "blur(8px)" },
            { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power4.out" },
            "<+0.04",
          )
          .fromTo(
            ".footer-content-block",
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, ease: "power3.out", stagger: 0.08 },
            "<+0.08",
          )
          .fromTo(
            ".footer-bottom",
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
            "<+0.06",
          );
      }, footer);
      return () => {
        ctx.revert();
        // Ensure visibility is restored after revert
        blocks.forEach((el) => { el.style.opacity = "1"; el.style.transform = "none"; });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <footer ref={footerRef} data-no-global-gsap className="mt-auto bg-[#143b47] text-white">
      <Container>
        <div className="grid gap-10 border-b border-white/15 py-12 sm:py-14 lg:grid-cols-[1fr_1.6fr] lg:py-16 xl:gap-16">
          <div className="footer-brand space-y-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40">
             <Image
              src="/UK's-Resort-Logo_SVG.webp" 
              alt="Property Logo"
              width={64}
              height={64}
              className="object-cover"
               />
            </div>
              <h3 className="footer-heading font-serif text-3xl leading-tight sm:text-4xl">
                Loved by Travelers
                <br />
                Near Mumbai & Pune
              </h3>

            {/* <Link
              href="https://www.google.co.in/maps/place/UK'S+RESORT/@18.8171404,73.3046807,17z/data=!4m8!3m7!1s0x3be7fd68dbb32757:0x45a268bbfa521ef0!8m2!3d18.8171404!4d73.3046807!9m1!1b1!16s%2Fg%2F11b6gh8g56"
              target="_blank"
              rel="noreferrer"
              aria-label="Google reviews page"
              className="inline-block group"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black shadow-sm">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-white">Google Rating</h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[#FBBC05] text-xs">★★★★☆</span>
                      <span className="text-[11px] font-bold text-white/90">4.0 / 5</span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-white/60 leading-relaxed">
                  Based on 2,500+ verified customer reviews.
                </p>
                <div className="mt-3.5 flex items-center gap-1 text-[11px] font-semibold text-[#FBBC05] group-hover:text-white transition-colors">
                  <span>Read Google Reviews</span>
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </div>
              </div>
            </Link> */}
          </div>
          <div className="grid gap-8 sm:gap-10 xl:grid-cols-[1.1fr_1.2fr] xl:justify-self-end xl:text-left">

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[minmax(220px,1.3fr)_minmax(180px,1.1fr)_minmax(150px,1fr)_minmax(150px,1fr)_minmax(150px,1fr)]">
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
                <h5 className="font-serif text-lg">Quick Links</h5>
                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
                  {quickLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      style={{ color: "rgba(255,255,255,0.75)" }}
                      className="text-[0.86rem] leading-7 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="footer-content-block">
                <h5 className="font-serif text-lg">Legal</h5>
                <div className="mt-4 space-y-2">
                  <Link
                    href="/terms"
                    style={{ color: "rgba(255,255,255,0.75)" }}
                    className="block text-[0.86rem] leading-7 hover:text-white transition-colors"
                  >
                    Terms &amp; Conditions
                  </Link>
                  <Link
                    href="/privacy"
                    style={{ color: "rgba(255,255,255,0.75)" }}
                    className="block text-[0.86rem] leading-7 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
              <div className="footer-content-block">
                <h5 className="font-serif text-lg">Contact</h5>
                <Link
                  href={phone1Href}
                  className="mt-4 block break-words text-[0.97rem] leading-7 text-white/75 hover:text-white sm:text-sm sm:leading-6"
                >
                  {phone1}
                </Link>
                <Link
                  href={phone2Href}
                  className="block break-words text-[0.97rem] leading-7 text-white/75 hover:text-white sm:text-sm sm:leading-6"
                >
                  {phone2}
                </Link>
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
                  {socialLinks.map((item) => {
                    const Icon = socialIconMap[item.icon];
                    return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-2 text-[0.97rem] leading-7 text-white/75 hover:text-white sm:text-sm sm:leading-6"
                      target="_blank"
                      rel="noreferrer"
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
        <div className="footer-bottom flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-6 text-center text-[0.86rem] text-white/65 sm:text-xs">
          <p className="max-w-3xl leading-6">
            {" "}
            Designed and Developed By{" "}
            <Link href="https://credencesoft.in/" target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
              CredenceSoft
            </Link>
            , Powered By{" "}
            <Link href="https://bookonepms.com/" target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
              BookOne
            </Link>
            .
          </p>
        </div>
      </Container>
    </footer>
  );
}
