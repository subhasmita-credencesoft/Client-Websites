"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/ui/Container";
import PageHero from "@/components/sections/PageHero";
import { AWARDS_HERO_CONFIG } from "@/data/sections/pageHeroes";
import ImmersiveGallery from "@/components/sections/ImmersiveGallery";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type AwardItem = {
  title: string;
  image: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "tall";
};

type TestimonialItem = {
  title: string;
  image: string;
  alt: string;
};

const accolades: AwardItem[] = [
  {
    title: "Golden Star Award 2012 – Resort of the Year",
    image: "/images/tripadviser.jpg",
    alt: "Golden Star Award 2012 Resort of the Year",
    size: "lg",
  },
  {
    title: "Goibibo Excellence Recognition",
    image: "/images/triplogo.png",
    alt: "Goibibo excellence certificate",
    size: "sm",
  },
  {
    title: "Business Leader Summit & Awards",
    image: "/images/review-background.jpg",
    alt: "Business Leader Summit and Awards certificate",
    size: "sm",
  },
  {
    title: "Maharashtracha Lokpriya Brand",
    image: "/uk1.avif",
    alt: "Maharashtracha Lokpriya Brand trophy",
    size: "tall",
  },
  {
    title: "Certificate of Recognition",
    image: "/images/special_offers1.jpg",
    alt: "Recognition certificate",
    size: "sm",
  },
  {
    title: "HolidayIQ India Says Yes",
    image: "/images/special_offers2.jpg",
    alt: "HolidayIQ India says yes badge",
    size: "sm",
  },
  {
    title: "Worldwide Achievers Recognition",
    image: "/uk2.avif",
    alt: "Worldwide achievers award presentation",
    size: "md",
  },
];

const testimonials: TestimonialItem[] = [
  {
    title: "Letter of Gratitude",
    image: "/images/making-memories.jpg",
    alt: "Letter of gratitude testimonial",
  },
  {
    title: "Aarya Testimonial Letter",
    image: "/images/review-background.jpg",
    alt: "Aarya testimonial letter",
  },
  {
    title: "DGS Consulting Testimonial",
    image: "/uk-conf.avif",
    alt: "DGS consulting testimonial",
  },
  {
    title: "Drama Review",
    image: "/images/web-img3.jpg",
    alt: "Drama review testimonial",
  },
];

function getAccoladeClass(size: AwardItem["size"]) {
  switch (size) {
    case "lg":
      return "sm:col-span-2 sm:row-span-2";
    case "md":
      return "sm:col-span-2";
    case "tall":
      return "sm:row-span-2";
    case "sm":
    default:
      return "";
  }
}

export default function AwardsPage() {
  const heroRef = useRef<HTMLElement>(null);
  const accoladesRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let mm: gsap.MatchMedia | null = null;

    const raf = requestAnimationFrame(() => {
      mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ctx = gsap.context(() => {
          gsap.fromTo(
            ".awards-hero-badge",
            { y: 18, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top 88%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            ".awards-hero-title",
            { y: 30, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top 84%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            ".awards-hero-copy",
            { y: 22, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.85,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top 78%",
                once: true,
              },
            }
          );

          gsap.to(".awards-orb-1", {
            yPercent: -18,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          gsap.to(".awards-orb-2", {
            yPercent: 18,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          gsap.fromTo(
            ".accolade-card",
            { y: 40, autoAlpha: 0, rotateX: -8, scale: 0.96 },
            {
              y: 0,
              autoAlpha: 1,
              rotateX: 0,
              scale: 1,
              duration: 0.9,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: accoladesRef.current,
                start: "top 82%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            ".accolade-heading",
            { y: 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: accoladesRef.current,
                start: "top 88%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            ".testimonial-heading",
            { y: 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: testimonialsRef.current,
                start: "top 88%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            ".testimonial-image-card",
            { y: 34, autoAlpha: 0, rotateY: 8, scale: 0.97 },
            {
              y: 0,
              autoAlpha: 1,
              rotateY: 0,
              scale: 1,
              duration: 0.85,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: testimonialsRef.current,
                start: "top 82%",
                once: true,
              },
            }
          );

          const awardCards = gsap.utils.toArray<HTMLElement>(".accolade-card");
          awardCards.forEach((card) => {
            const media = card.querySelector<HTMLElement>(".accolade-media");
            const glow = card.querySelector<HTMLElement>(".accolade-glow");

            const onMove = (e: MouseEvent) => {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const rotateY = ((x / rect.width) - 0.5) * 10;
              const rotateX = (0.5 - y / rect.height) * 10;

              gsap.to(card, {
                rotateX,
                rotateY,
                transformPerspective: 1200,
                transformOrigin: "center",
                duration: 0.35,
                ease: "power2.out",
              });

              if (media) {
                gsap.to(media, {
                  x: rotateY * 1.8,
                  y: -rotateX * 1.8,
                  scale: 1.05,
                  duration: 0.4,
                  ease: "power2.out",
                });
              }

              if (glow) {
                gsap.to(glow, {
                  x: (x - rect.width / 2) * 0.12,
                  y: (y - rect.height / 2) * 0.12,
                  opacity: 0.9,
                  duration: 0.35,
                  ease: "power2.out",
                });
              }
            };

            const onLeave = () => {
              gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: "power3.out",
              });

              if (media) {
                gsap.to(media, {
                  x: 0,
                  y: 0,
                  scale: 1,
                  duration: 0.5,
                  ease: "power3.out",
                });
              }

              if (glow) {
                gsap.to(glow, {
                  x: 0,
                  y: 0,
                  opacity: 0.45,
                  duration: 0.45,
                  ease: "power3.out",
                });
              }
            };

            card.addEventListener("mousemove", onMove);
            card.addEventListener("mouseleave", onLeave);

            return () => {
              card.removeEventListener("mousemove", onMove);
              card.removeEventListener("mouseleave", onLeave);
            };
          });

          const testimonialCards =
            gsap.utils.toArray<HTMLElement>(".testimonial-image-card");
          testimonialCards.forEach((card) => {
            const media = card.querySelector<HTMLElement>(".testimonial-media");

            const onMove = (e: MouseEvent) => {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const rotateY = ((x / rect.width) - 0.5) * 8;
              const rotateX = (0.5 - y / rect.height) * 8;

              gsap.to(card, {
                rotateX,
                rotateY,
                transformPerspective: 1000,
                duration: 0.35,
                ease: "power2.out",
              });

              if (media) {
                gsap.to(media, {
                  x: rotateY * 1.4,
                  y: -rotateX * 1.4,
                  scale: 1.04,
                  duration: 0.35,
                  ease: "power2.out",
                });
              }
            };

            const onLeave = () => {
              gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.45,
                ease: "power3.out",
              });

              if (media) {
                gsap.to(media, {
                  x: 0,
                  y: 0,
                  scale: 1,
                  duration: 0.45,
                  ease: "power3.out",
                });
              }
            };

            card.addEventListener("mousemove", onMove);
            card.addEventListener("mouseleave", onLeave);

            return () => {
              card.removeEventListener("mousemove", onMove);
              card.removeEventListener("mouseleave", onLeave);
            };
          });
        });

        return () => ctx.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".awards-hero-badge",
            ".awards-hero-title",
            ".awards-hero-copy",
            ".accolade-heading",
            ".accolade-card",
            ".testimonial-heading",
            ".testimonial-image-card",
          ],
          { clearProps: "all" }
        );
        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      mm?.revert();
    };
  }, []);

  return (
    <div className="site-page">
      <PageHero {...AWARDS_HERO_CONFIG} />

      <section
        ref={heroRef}
        data-no-global-gsap
        className="relative overflow-hidden bg-[#f6f2ec] py-20 sm:py-24 lg:py-32"
      >
        <div className="awards-orb-1 absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#d89a55]/20 blur-3xl" />
        <div className="awards-orb-2 absolute -right-16 top-24 h-80 w-80 rounded-full bg-[#1f3c44]/12 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),transparent_45%)]" />

        <Container size="content">
          <div className="relative mx-auto max-w-5xl text-center">
            <span className="awards-hero-badge inline-flex rounded-full border border-[#1f3c44]/10 bg-white/70 px-4 py-2 text-[0.68rem] uppercase tracking-[0.3em] text-[#55676f] shadow-[0_6px_30px_rgba(31,60,68,0.06)] backdrop-blur">
              Awards & Achievements
            </span>

            <h1 className="awards-hero-title mt-6 font-serif text-4xl leading-tight text-[#1f3c44] sm:text-6xl lg:text-7xl">
              Recognition
              <span className="block bg-gradient-to-r from-[#d89a55] via-[#c67d33] to-[#1f3c44] bg-clip-text text-transparent">
                That Feels Earned
              </span>
            </h1>

            <p className="awards-hero-copy mx-auto mt-7 max-w-3xl text-[1rem] leading-[1.9] text-[#55676f] sm:text-lg">
              A legacy of hospitality is best measured by the trust, praise, and
              recognition it receives over time. Our accolades reflect years of
              memorable stays, strong guest experiences, and consistent service.
            </p>

            <p className="awards-hero-copy mx-auto mt-4 max-w-3xl text-[1rem] leading-[1.9] text-[#55676f] sm:text-lg">
              From travel platform recognitions to industry honours and written
              appreciation, each milestone represents a story of dedication and
              guest delight.
            </p>
          </div>
        </Container>
      </section>

      <section
        ref={accoladesRef}
        data-no-global-gsap
        className="relative overflow-hidden border-y border-[#1f3c44]/10 bg-[linear-gradient(180deg,#f3efe8_0%,#f7f3ed_100%)] py-20 sm:py-24 lg:py-32"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(216,154,85,0.12),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(31,60,68,0.08),transparent_30%)]" />

        <Container>
          <div className="accolade-heading mb-14 text-center sm:mb-20">
            <span className="mb-3 block text-[0.68rem] uppercase tracking-[0.32em] text-[#55676f]">
              Accolades
            </span>
            <h2 className="font-serif text-3xl text-[#1f3c44] sm:text-4xl lg:text-5xl">
              Awards & Recognition
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[0.97rem] leading-[1.85] text-[#55676f]">
              A premium gallery of the honours and recognitions that define our
              journey.
            </p>
          </div>

          <div className="grid auto-rows-[230px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {accolades.map((item, index) => (
              <article
                key={index}
                className={`accolade-card group relative overflow-hidden rounded-[1.9rem] border border-white/60 bg-white/70 shadow-[0_12px_45px_rgba(31,60,68,0.08)] backdrop-blur-sm [transform-style:preserve-3d] ${getAccoladeClass(
                  item.size
                )}`}
              >
                <div className="accolade-glow pointer-events-none absolute inset-0 z-[1] opacity-40">
                  <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 blur-3xl" />
                </div>

                <div className="accolade-media relative h-full w-full">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.06]"
                  />
                </div>

                <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#102126]/90 via-[#1f3c44]/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 z-[3] p-5 sm:p-6">
                  <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-white/80 backdrop-blur">
                    Achievement
                  </div>
                  <p className="mt-3 font-serif text-base leading-snug text-white sm:text-lg">
                    {item.title}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section
        ref={testimonialsRef}
        data-no-global-gsap
        className="relative overflow-hidden bg-[#f6f2ec] py-20 sm:py-24 lg:py-32"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(216,154,85,0.1),transparent_25%),radial-gradient(circle_at_10%_80%,rgba(31,60,68,0.08),transparent_28%)]" />

        <Container>
          <div className="testimonial-heading mb-14 text-center sm:mb-20">
            <span className="mb-3 block text-[0.68rem] uppercase tracking-[0.32em] text-[#55676f]">
              Testimonials
            </span>
            <h2 className="font-serif text-3xl text-[#1f3c44] sm:text-4xl lg:text-5xl">
              Words of Appreciation
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[0.97rem] leading-[1.85] text-[#55676f]">
              Messages and acknowledgements that capture the experience guests
              and partners have shared with us.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {testimonials.map((item, index) => (
              <article
                key={index}
                className="testimonial-image-card group relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/75 p-3 shadow-[0_10px_40px_rgba(31,60,68,0.07)] backdrop-blur-sm [transform-style:preserve-3d]"
              >
                <div className="absolute inset-x-6 top-0 h-20 rounded-b-[2rem] bg-gradient-to-b from-[#d89a55]/18 to-transparent blur-2xl" />

                <div className="testimonial-media relative aspect-[4/5] overflow-hidden rounded-[1.15rem] border border-[#1f3c44]/8 bg-[#efe8dc]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f3c44]/18 via-transparent to-white/10" />
                </div>

                <div className="relative px-2 pb-2 pt-4 text-center">
                  <h3 className="font-serif text-lg text-[#1f3c44] sm:text-[1.15rem]">
                    {item.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* <ImmersiveGallery title="A Visual Legacy" /> */}
    </div>
  );
}
