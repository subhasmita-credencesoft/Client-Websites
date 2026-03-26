"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { GlobalPageSections } from "@/components/sections/global-page-sections";

const heroImages = ["/images/DSC08831.avif", "/images/DSC08849.avif", "/images/DSC08853.avif"] as const;

const lawnExperienceCards = [
  {
    title: "Grand ceremony venues",
    description: "Wide open event spaces create a strong stage for varmala, pheras, family seating, and large-format destination celebrations.",
    image: "/images/DSC08837.avif",
  },
  {
    title: "Elegant decor backdrops",
    description: "Mountain views, palms, and natural greens give decorators a refined canvas for floral, regal, and modern wedding themes.",
    image: "/images/DSC08846.avif",
  },
  {
    title: "Reception-ready evenings",
    description: "As daylight fades, the venue transitions beautifully into a reception mood with lighting, dining, and entertainment flow.",
    image: "/images/DSC08853.avif",
  },
] as const;

const venueGallery = [
  "/images/DSC08831.avif",
  "/images/DSC08837.avif",
  "/images/DSC08849.avif",
  "/images/DSC08853.avif",
  "/images/DSC08846.avif",
  "/images/DSC08769.avif",
  "/images/DSC08836.avif",
  "/images/DSC08820.avif",
] as const;

const imageGallery = [
  "/images/DSC08831.avif",
  "/images/DSC08837.avif",
  "/images/DSC08849.avif",
  "/images/DSC08853.avif",
] as const;

const videoGallery = [
  "/images/DSC08846.avif",
  "/images/DSC08769.avif",
  "/images/DSC08836.avif",
  "/images/DSC08820.avif",
] as const;

const planningNotes = [
  "Designed for intimate functions as well as large-format wedding celebrations.",
  "Works smoothly for haldi, mehendi, sangeet, wedding ceremony, cocktails, and reception flow.",
  "Strong natural backdrops for bridal entries, couple portraits, and guest photography.",
  "Open layouts make decor planning, seating, dining zones, and movement easier for families and planners.",
] as const;

const awards = [
  {
    badge: "WS",
    badgeClassName: "rounded-full bg-[#f22f84] text-white",
    title: "Wedding-styled destination venue experience",
  },
  {
    badge: "WOW",
    badgeClassName: "rounded-2xl border-4 border-[#cf9f46] text-[#cf9f46]",
    title: "Luxury celebration planning with scenic destination venue settings",
  },
] as const;

export default function WeddingLawnsPage() {
  const [tab, setTab] = useState<"image" | "video">("image");
  const [activeHeroImage, setActiveHeroImage] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroImage((current) => (current + 1) % heroImages.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="relative overflow-hidden bg-[#f3efe7] text-[#111317]">
      <div className="noise-overlay" />
      <SiteHeader />

      <section className="relative min-h-[100svh] overflow-hidden" data-section-id="wedding-lawns-hero">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ${
              index === activeHeroImage ? "opacity-100" : "opacity-0"
            }`}
            data-bg-parallax
            data-bg-depth={String(10 + index)}
          >
            <Image
              src={image}
              alt="Destination wedding and event venue hero"
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,12,0.22)_0%,rgba(8,10,12,0.36)_42%,rgba(8,10,12,0.8)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,rgba(8,10,12,0)_0%,rgba(8,10,12,0.74)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[96rem] items-end px-8 pb-16 pt-36 md:px-10 md:pb-20">
          <div className="max-w-5xl" data-reveal>
            <p data-reveal-child className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
              Destination Wedding &amp; Event Venue
            </p>
            <h1 className="mt-6 max-w-5xl text-balance text-4xl leading-tight text-white md:text-6xl" data-section-title>
              Destination Wedding &amp; Event Venue designed for unforgettable celebrations
            </h1>
            <p data-reveal-child className="mt-6 max-w-4xl text-balance text-xl leading-relaxed text-white/90 md:text-2xl">
              A luxury outdoor wedding experience with scenic backdrops, grand ceremony space, and elegant celebration flow from day to night.
            </p>
            <div data-reveal-child className="mt-8 flex gap-3">
              {heroImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  aria-label={`Show wedding hero image ${index + 1}`}
                  onClick={() => setActiveHeroImage(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === activeHeroImage ? "w-14 bg-[#d7ae71]" : "w-7 bg-white/35"
                  }`}
                  data-cursor="hover"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-8 pb-24 pt-40" data-section-id="wedding-lawns-intro">
        <p className="text-2xl text-black/85 md:text-3xl">
          Home &gt; <span className="font-semibold">Destination Wedding &amp; Event Venue</span>
        </p>

        <div className="mt-12 max-w-[62rem]" data-reveal>
          <h2 className="text-balance text-4xl leading-tight text-[#b2863d] md:text-6xl" data-section-title>
            Finest luxury destination wedding and event venue
          </h2>
          <h3 data-reveal-child className="mt-6 text-balance text-3xl leading-tight text-[#c0924e] md:text-5xl">
            Celebrate love, rituals, and grand moments in a venue setting that feels cinematic from every angle.
          </h3>
          <div className="mt-10 border-l border-black/25 pl-8 text-xl leading-relaxed text-black/95 md:text-2xl">
            <p data-reveal-child>
              Inspired by the structure of premium destination wedding pages, this layout brings together story-led content, venue imagery,
              and motion-driven sections so the venue experience feels complete instead of reading like a basic detail page.
            </p>
            <p data-reveal-child className="mt-6">
              The focus here is on what couples and planners actually need to see: ceremony atmosphere, celebration versatility, gallery depth,
              and a premium presentation that matches the rest of the weddings journey.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-black px-8 py-20 text-white" data-feature-stage data-section-id="wedding-lawns-plan">
        <div className="mx-auto grid max-w-[96rem] items-center gap-10 md:grid-cols-2">
          <div data-feature-content data-reveal>
            <p data-reveal-child className="text-xs uppercase tracking-[0.28em] text-[#d7ae71]">
              Plan Your Dream
            </p>
            <h3 className="mt-4 text-4xl leading-tight text-[#c89a55] md:text-5xl" data-section-title>
              Plan Your Dream
              <br />
              Wedding &amp; Event Celebration
            </h3>
            <p data-reveal-child className="mt-8 max-w-2xl text-xl leading-relaxed text-white/90 md:text-2xl">
              Crafted for ceremonies, guest arrivals, evening receptions, and styled wedding functions with the openness and luxury a destination
              event deserves.
            </p>
            <button
              type="button"
              className="mt-10 border border-white px-10 py-4 text-sm uppercase tracking-[0.18em]"
              data-cursor="hover"
            >
              Enquire Now
            </button>
          </div>

          <div className="relative h-[36rem] overflow-hidden" data-card>
            <div className="absolute inset-0" data-feature-image data-card-image data-bg-parallax data-bg-depth="9">
              <Image src={heroImages[1]} alt="Destination wedding venue planning" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black px-8 py-22 text-white" data-section-id="wedding-lawns-destination">
        <div className="mx-auto max-w-[96rem] text-center" data-reveal>
          <h3 className="text-4xl text-[#c89a55] md:text-5xl" data-section-title>
            The Perfect Wedding Destination
          </h3>
          <div className="mx-auto mt-4 h-[2px] w-20 bg-[#c89a55]" />
          <p className="mx-auto mt-7 max-w-4xl text-xl leading-relaxed text-white/90 md:text-2xl">
            From intimate rituals to lavish destination celebrations, the venue supports breathtaking decor, comfortable guest flow, and premium
            day-to-evening transitions.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {lawnExperienceCards.map((card, index) => (
            <article key={card.title} className="overflow-hidden bg-[#0f0f0f]" data-card>
              <div className="relative h-[26rem] overflow-hidden">
                <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth={String(8 + index)}>
                  <Image src={card.image} alt={card.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
              </div>
              <div className="px-6 py-7 md:px-8 md:py-8">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">0{index + 1}</p>
                <h4 className="mt-3 text-2xl text-[#d7ae71] md:text-3xl">{card.title}</h4>
                <p className="mt-4 text-base leading-relaxed text-white/88 md:text-lg">{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-8 py-18" data-section-id="wedding-lawns-venues">
        <div className="mx-auto max-w-[96rem] text-center" data-reveal>
          <h3 className="text-4xl text-[#c89a55] md:text-5xl" data-section-title>
            Venues Gallery
          </h3>
          <div className="mx-auto mt-4 h-[2px] w-20 bg-[#c89a55]" />
          <p className="mx-auto mt-7 max-w-5xl text-xl leading-relaxed text-black/90 md:text-2xl">
            Explore venue views, arrival zones, scenic corners, and celebration areas that help transform the venue from a daytime ceremony
            setting into a polished evening wedding experience.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {venueGallery.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className={`relative overflow-hidden ${index % 5 === 0 ? "h-[22rem] md:col-span-2" : "h-[22rem]"}`}
              data-card
              data-clip-reveal
            >
              <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth={String(6 + (index % 4))}>
                <Image src={image} alt={`Wedding venue ${index + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            className="bg-black px-12 py-4 text-sm uppercase tracking-[0.18em] text-white"
            data-cursor="hover"
          >
            Explore Venues
          </button>
        </div>
      </section>

      <section className="bg-black px-8 py-8" data-section-id="wedding-lawns-banner">
        <div className="mx-auto flex max-w-[96rem] flex-col gap-6 border border-[#c89a55] px-8 py-6 text-white md:flex-row md:items-center md:justify-between" data-reveal>
          <p data-reveal-child className="max-w-4xl text-xl md:text-2xl">
            We support destination wedding and event celebrations with decor flexibility, guest comfort, premium hospitality flow, and scenic
            ambience.
          </p>
          <button
            type="button"
            className="self-start bg-[#c89a55] px-10 py-4 text-sm uppercase tracking-[0.18em] text-black md:self-auto"
            data-cursor="hover"
          >
            Enquire Now
          </button>
        </div>
      </section>

      <section className="px-8 py-20" data-section-id="wedding-lawns-gallery">
        <div className="mx-auto max-w-[96rem] text-center" data-reveal>
          <h3 className="text-4xl text-[#c89a55] md:text-5xl" data-section-title>
            Wedding Gallery
          </h3>
          <div className="mt-8 flex justify-center gap-8 text-2xl md:text-3xl">
            <button
              type="button"
              onClick={() => setTab("image")}
              className={tab === "image" ? "border-b-2 border-[#c89a55] pb-2 text-[#0b1e48]" : "text-[#8892a6]"}
              data-cursor="hover"
            >
              Image Gallery
            </button>
            <button
              type="button"
              onClick={() => setTab("video")}
              className={tab === "video" ? "border-b-2 border-[#c89a55] pb-2 text-[#0b1e48]" : "text-[#8892a6]"}
              data-cursor="hover"
            >
              Video Gallery
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {(tab === "image" ? imageGallery : videoGallery).map((image, index) => (
            <div key={`${tab}-${image}-${index}`} className="relative h-[28rem] overflow-hidden bg-black" data-card>
              <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth={String(7 + (index % 3))}>
                <Image src={image} alt={`Wedding venue gallery ${index + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              {tab === "video" ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/70 bg-black/30 text-2xl text-white">
                    Play
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f7f2ea] px-8 pb-24 pt-8" data-section-id="wedding-lawns-notes">
        <div className="mx-auto grid max-w-[96rem] gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <article className="border border-[#d9c6a5] bg-white/80 px-8 py-10 backdrop-blur-sm" data-reveal>
            <p className="text-xs uppercase tracking-[0.22em] text-[#b88947]">Planning Notes</p>
            <h3 className="mt-4 text-4xl leading-tight text-[#c89a55] md:text-5xl" data-section-title>
              A destination venue that works beautifully across every function
            </h3>
          </article>

          <div className="space-y-4">
            {planningNotes.map((note, index) => (
              <article key={note} className="border border-[#d9c6a5] bg-white/70 px-6 py-5 text-xl leading-relaxed text-black/88 md:text-2xl" data-card>
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-[#b88947]">Note 0{index + 1}</p>
                {note}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 pb-24 pt-8" data-section-id="wedding-lawns-awards">
        <div className="mx-auto max-w-[96rem] text-center" data-reveal>
          <h3 className="text-4xl text-[#c89a55] md:text-5xl" data-section-title>
            Signature Experience
          </h3>
        </div>
        <div className="mx-auto mt-12 grid max-w-[80rem] gap-10 md:grid-cols-2">
          {awards.map((award, index) => (
            <div key={award.title} className={index === 0 ? "border-r border-black/15 p-6 text-center" : "p-6 text-center"} data-card>
              <div className={`mx-auto flex h-40 w-40 items-center justify-center text-5xl md:h-56 md:w-56 md:text-8xl ${award.badgeClassName}`}>
                {award.badge}
              </div>
              <p className="mt-8 text-xl leading-relaxed text-black md:text-2xl">{award.title}</p>
            </div>
          ))}
        </div>
      </section>

      <GlobalPageSections />
      <SiteFooter />
    </main>
  );
}
