"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import Button from "../ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ClientLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
};

const clientLogos: ClientLogo[] = [
  {
    name: "Capgemini",
    src: "/client-logos/capgemini.png",
    width: 160,
    height: 60,
  },
  {
    name: "Reliance Industries",
    src: "/client-logos/reliance-industries.png",
    width: 160,
    height: 60,
  },
  {
    name: "Kalyani",
    src: "/client-logos/kalyani.png",
    width: 120,
    height: 60,
  },
  {
    name: "Mahindra",
    src: "/client-logos/mahindra.png",
    width: 150,
    height: 60,
  },
  {
    name: "Tata Steel",
    src: "/client-logos/tata-steel.png",
    width: 150,
    height: 60,
  },
  {
    name: "Jio",
    src: "/client-logos/jio.png",
    width: 70,
    height: 70,
  },
  {
    name: "Tata Consultancy Services",
    src: "/client-logos/tcs.png",
    width: 150,
    height: 60,
  },
  {
    name: "JSW Steel",
    src: "/client-logos/jsw-steel.png",
    width: 150,
    height: 60,
  },
  {
    name: "Hinduja Healthcare",
    src: "/client-logos/hinduja-healthcare.png",
    width: 150,
    height: 60,
  },
  {
    name: "Axis Bank",
    src: "/client-logos/axis-bank.png",
    width: 140,
    height: 60,
  },
  {
    name: "Reserve Bank",
    src: "/client-logos/reserve-bank.png",
    width: 80,
    height: 80,
  },
  {
    name: "Thermax",
    src: "/client-logos/thermax.png",
    width: 120,
    height: 60,
  },
  {
    name: "CRISIL",
    src: "/client-logos/crisil.png",
    width: 120,
    height: 60,
  },
  {
    name: "Bank of Baroda",
    src: "/client-logos/bank-of-baroda.png",
    width: 150,
    height: 60,
  },
  {
    name: "John Deere",
    src: "/client-logos/john-deere.png",
    width: 140,
    height: 60,
  },
  {
    name: "Wärtsilä",
    src: "/client-logos/wartsila.png",
    width: 140,
    height: 60,
  },
  {
    name: "Sanyo Special Steel",
    src: "/client-logos/sanyo-special-steel.png",
    width: 150,
    height: 60,
  },
  {
    name: "Huhtamaki",
    src: "/client-logos/huhtamaki.png",
    width: 150,
    height: 60,
  },
  {
    name: "Uttam",
    src: "/client-logos/uttam.png",
    width: 120,
    height: 60,
  },
  {
    name: "Namco",
    src: "/client-logos/namco.png",
    width: 130,
    height: 60,
  },
  {
    name: "Bikshun",
    src: "/client-logos/bikshun.png",
    width: 120,
    height: 60,
  },
  {
    name: "Cremica",
    src: "/client-logos/cremica.png",
    width: 130,
    height: 60,
  },
  {
    name: "Parle",
    src: "/client-logos/parle.png",
    width: 120,
    height: 60,
  },
  {
    name: "Supreme",
    src: "/client-logos/supreme.png",
    width: 140,
    height: 60,
  },
  {
    name: "Janta Steel",
    src: "/client-logos/janta-steel.png",
    width: 140,
    height: 60,
  },
  {
    name: "Wesco",
    src: "/client-logos/wesco.png",
    width: 120,
    height: 60,
  },
  {
    name: "Kamani",
    src: "/client-logos/kamani.png",
    width: 120,
    height: 60,
  },
  {
    name: "Oxford",
    src: "/client-logos/oxford.png",
    width: 120,
    height: 60,
  },
  {
    name: "Apna Sahakari Bank",
    src: "/client-logos/apna-sahakari-bank.png",
    width: 150,
    height: 60,
  },
  {
    name: "Best",
    src: "/client-logos/best.png",
    width: 100,
    height: 60,
  },
  {
    name: "DCS Group",
    src: "/client-logos/dcs-group.png",
    width: 140,
    height: 60,
  },
];

const testimonials = [
  {
    name: "Corporate Events Team",
    company: "Reliance Industries",
    quote:
      "The hospitality, event support, and overall coordination were handled with remarkable professionalism. The property atmosphere made the experience feel premium from start to finish.",
  },
  {
    name: "Procurement Division",
    company: "Tata Steel",
    quote:
      "A well-managed destination with dependable service and excellent guest comfort. The team ensured our corporate stay and meetings moved smoothly throughout.",
  },
  {
    name: "Operations Head",
    company: "Mahindra",
    quote:
      "The venue offered the right blend of scenic surroundings and practical hosting support. It worked beautifully for both our visiting team and guest interactions.",
  },
  {
    name: "Admin & Hospitality Desk",
    company: "Axis Bank",
    quote:
      "The experience was seamless. The team was responsive, the spaces felt thoughtfully maintained, and our guests appreciated the warmth of the service.",
  },
  {
    name: "Guest Coordination Team",
    company: "Capgemini",
    quote:
      "From welcome to departure, everything felt organised and guest-friendly. The property created a comfortable setting for both business and informal interactions.",
  },
  {
    name: "Event Management Team",
    company: "Huhtamaki",
    quote:
      "A dependable hospitality partner with a scenic environment and smooth on-ground execution. The experience reflected quality and care in every detail.",
  },
];

const valueItems = [
  {
    title: "Trusted by Leading Brands",
    desc: "A strong portfolio of reputed corporate and institutional clients reflects reliability, consistency, and service quality that inspires confidence.",
  },
  {
    title: "Guest-First Hosting",
    desc: "Every interaction is designed to feel smooth, welcoming, and professionally managed — from enquiry to check-out and event execution.",
  },
  {
    title: "Scenic + Practical",
    desc: "The property combines aesthetic appeal with operational ease, making it suitable for stays, celebrations, meetings, and brand-hosted gatherings.",
  },
  {
    title: "Flexible Experience Design",
    desc: "Whether the requirement is room stays, corporate functions, or social occasions, the spaces support a connected and comfortable experience.",
  },
];

function ClientLogoCard({ client }: { client: ClientLogo }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="client-logo-card flex min-h-[88px] items-center justify-center rounded-2xl border border-[#1f3c44]/10 bg-white px-4 py-5 text-center shadow-[0_2px_14px_rgba(31,60,68,0.04)] transition-transform duration-300 hover:-translate-y-1">
      {!hasError ? (
        <Image
          src={client.src}
          alt={client.name}
          width={client.width}
          height={client.height}
          className="max-h-[52px] w-auto object-contain"
          onError={() => setHasError(true)}
        />
      ) : (
        <span className="text-sm font-semibold leading-snug text-[#1f3c44]">
          {client.name}
        </span>
      )}
    </div>
  );
}

export default function TestimonialContent() {
  const heroRef = useRef<HTMLElement>(null);
  const clientsRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const valueRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let mm: gsap.MatchMedia | null = null;

    const raf = requestAnimationFrame(() => {
      mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ctx = gsap.context(() => {
          gsap.fromTo(
            ".testimonial-hero-eyebrow",
            { y: 20, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            ".testimonial-hero-title",
            { y: 32, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top 82%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            ".testimonial-hero-copy",
            { y: 20, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.75,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top 76%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            ".client-logo-card",
            { y: 26, autoAlpha: 0, scale: 0.96 },
            {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              duration: 0.55,
              stagger: 0.05,
              ease: "power2.out",
              scrollTrigger: {
                trigger: clientsRef.current,
                start: "top 82%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            ".testimonial-card",
            { y: 30, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: testimonialsRef.current,
                start: "top 82%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            ".value-card",
            { y: 26, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.65,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: valueRef.current,
                start: "top 82%",
                once: true,
              },
            }
          );
        });

        return () => ctx.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".testimonial-hero-eyebrow",
            ".testimonial-hero-title",
            ".testimonial-hero-copy",
            ".client-logo-card",
            ".testimonial-card",
            ".value-card",
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
    <>
      {/* Hero / Intro */}
      <section
        ref={heroRef}
        data-no-global-gsap
        className="bg-[#f6f2ec] py-16 sm:py-20 lg:py-28"
      >
        <Container size="content">
          <div className="mx-auto max-w-4xl text-center">
            <span className="testimonial-hero-eyebrow mb-4 block text-[0.7rem] uppercase tracking-[0.32em] text-[#55676f]">
              Testimonials & Clients
            </span>

            <h1 className="testimonial-hero-title font-serif text-3xl text-[#1f3c44] sm:text-5xl lg:text-6xl">
              Trusted by Esteemed Clients
            </h1>

            <p className="testimonial-hero-copy mx-auto mt-6 max-w-3xl text-[0.98rem] leading-[1.85] text-[#55676f] sm:text-lg">
              Our work is best reflected through the trust of the brands,
              institutions, and teams we have served. From corporate stays to
              hosted events and guest experiences, every engagement is built on
              consistency, care, and dependable hospitality.
            </p>

            <p className="testimonial-hero-copy mx-auto mt-4 max-w-3xl text-[0.98rem] leading-[1.85] text-[#55676f] sm:text-lg">
              Below is a curated showcase of clients and testimonial-style
              experience highlights, presented in a clean format inspired by
              your reference layout.
            </p>
          </div>
        </Container>
      </section>

      {/* Clients */}
      <section
        ref={clientsRef}
        data-no-global-gsap
        className="border-y border-[#1f3c44]/10 bg-[#f3efe8] py-20 sm:py-24 lg:py-28"
      >
        <Container>
          <div className="mb-12 text-center sm:mb-16">
            <span className="mb-3 block text-[0.68rem] uppercase tracking-[0.32em] text-[#55676f]">
              Our Esteemed Clients
            </span>
            <h2 className="font-serif text-3xl text-[#1f3c44] lg:text-5xl">
              Brands We’ve Served
            </h2>
          </div>

          <div className="rounded-[2rem] border border-[#1f3c44]/15 bg-white/70 p-5 shadow-[0_4px_30px_rgba(31,60,68,0.05)] sm:p-8 lg:p-10">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {clientLogos.map((client) => (
                <ClientLogoCard key={client.name} client={client} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section
        ref={testimonialsRef}
        data-no-global-gsap
        className="bg-[#f6f2ec] py-20 sm:py-24 lg:py-32"
      >
        <Container>
          <div className="mb-14 text-center sm:mb-20">
            <span className="mb-3 block text-[0.68rem] uppercase tracking-[0.32em] text-[#55676f]">
              Testimonial Highlights
            </span>
            <h2 className="font-serif text-3xl text-[#1f3c44] lg:text-5xl">
              What Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((item, i) => (
              <article
                key={i}
                className="testimonial-card rounded-[1.7rem] border border-[#1f3c44]/10 bg-white p-7 shadow-[0_4px_30px_rgba(31,60,68,0.06)] sm:p-8"
              >
                <div className="mb-5 text-4xl leading-none text-[#d89a55]">
                  &ldquo;
                </div>

                <p className="text-[0.96rem] leading-[1.85] text-[#55676f]">
                  {item.quote}
                </p>

                <div className="mt-8 border-t border-[#1f3c44]/10 pt-5">
                  <h3 className="font-serif text-xl text-[#1f3c44]">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-[0.78rem] uppercase tracking-[0.18em] text-[#d89a55]">
                    {item.company}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Value / What I Can Give */}
      <section
        ref={valueRef}
        data-no-global-gsap
        className="border-t border-[#1f3c44]/10 bg-[#f3efe8] py-20 sm:py-24 lg:py-32"
      >
        <Container>
          <div className="mb-14 text-center sm:mb-20">
            <span className="mb-3 block text-[0.68rem] uppercase tracking-[0.32em] text-[#55676f]">
              What I Can Give
            </span>
            <h2 className="font-serif text-3xl text-[#1f3c44] lg:text-5xl">
              Why Clients Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {valueItems.map((item, i) => (
              <div
                key={i}
                className="value-card rounded-[1.6rem] border border-[#1f3c44]/10 bg-white p-7 shadow-[0_4px_25px_rgba(31,60,68,0.05)]"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#d89a55]/35">
                  <span className="font-serif text-2xl text-[#d89a55]">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-[#1f3c44]">
                  {item.title}
                </h3>

                <p className="mt-4 text-[0.95rem] leading-[1.8] text-[#55676f]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Button
              href="/contact"
              variant="outline"
              size="md"
              className="rounded-full border-[#1f3c44]/35 px-8 text-[0.68rem] uppercase tracking-[0.22em] text-[#1f3c44] hover:border-[#1f3c44]/50 hover:bg-[#f1ece3]"
            >
              Connect With Us
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}