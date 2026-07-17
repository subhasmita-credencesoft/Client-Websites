import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { GlobalPageSections } from "@/components/features/shared/global-page-sections";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { createPageMetadata } from "@/lib/metadata";
import { detailPages } from "@/lib/data/pages/detail-pages";

export const metadata: Metadata = createPageMetadata({
  title: "Rooms & Stay Options",
  path: "/rooms",
  description:
    "Explore all room categories at The Mountain Resort in Karjat — Standard, Cliff View, Family, Glass Jacuzzi, and Bungalow stays with packages from Rs. 2,000 to Rs. 20,000 per night.",
});

const roomSlugs = ["standard-room", "cliff-room", "family-room", "glass-cottage", "bungalow"];

export default function RoomsIndexPage() {
  return (
    <main className="relative overflow-hidden bg-[#11100e] text-[#f4ede2]">
      <div className="noise-overlay" />
      <SiteHeader />

      <section className="relative min-h-[42rem] overflow-hidden pt-28 sm:min-h-[46rem] sm:pt-32 md:min-h-[54rem] md:pt-40" data-section-id="rooms-hero">
        <div className="absolute inset-0" data-bg-parallax data-bg-depth="10" data-zoom-scroll>
          <Image src="https://bookonelocal.in/cdn/DSC08801.jpg" alt="Rooms at The Mountain Resort" fill className="object-cover" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,164,110,0.12),transparent_38%),linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.56)_56%,rgba(0,0,0,0.92)_100%)]" />
        <div className="site-container relative z-10 flex min-h-[42rem] items-start pb-8 pt-16 sm:min-h-[46rem] md:min-h-[54rem] md:pb-12 md:pt-24">
          <div className="max-w-5xl" data-panel-content>
            <p className="site-eyebrow" data-panel-line>Accommodation</p>
            <h1 data-section-title data-panel-line className="max-w-5xl">
              Rooms & Stay Options
            </h1>
            <p className="site-copy-lg mt-5 max-w-4xl text-white/90" data-panel-line>
              Five premium room categories designed for couples, families, host groups, and guests who want a comfortable destination stay at The Mountain Resort in Karjat.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4" data-panel-line>
              <Link href="/booking" className="site-button site-button-primary px-8">
                Check Availability
              </Link>
              <Link href="/offers" className="site-button site-button-outline px-8">
                View Stay Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <Breadcrumbs items={[{ label: "Rooms" }]} />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center md:px-8 md:py-20" data-reveal>
        <p className="text-xs font-semibold tracking-[0.2em] text-[#c9a46e]" data-reveal-child>Stay Categories</p>
        <h2 className="mx-auto mt-5 max-w-5xl text-3xl leading-tight md:text-4xl" data-section-title data-reveal-child>
          Choose the room category that fits your stay, your group, and your celebration
        </h2>
        <p className="mx-auto mt-6 max-w-5xl text-lg leading-relaxed md:text-xl" data-reveal-child>
          Every room at The Mountain includes air conditioning, Wi-Fi, flat-screen TV, geyser, room service, and wedding estate access. Stay-and-meals packages begin at Rs. 3,000 per person with five curated meals daily.
        </p>
      </section>

      <section className="mx-auto max-w-[80rem] px-4 py-6 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {roomSlugs.map((slug) => {
            const room = detailPages[slug];
            if (!room) return null;
            return (
              <Link key={slug} href={`/${slug}`} data-card className="group rounded-[1.8rem] border border-white/10 bg-[#111614] shadow-[0_22px_70px_rgba(0,0,0,0.22)] transition-colors duration-500 hover:border-[#c9a46e]/35">
                <div className="relative h-[20rem] overflow-hidden rounded-t-[1.8rem]">
                  <Image src={room.heroImage} alt={room.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  {room.facts?.[0] ? (
                    <div className="absolute bottom-4 left-6 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#c9a46e] backdrop-blur-md">
                      {room.facts[0].label}: {room.facts[0].value}
                    </div>
                  ) : null}
                </div>
                <div className="p-8">
                  <p className="text-xs uppercase tracking-[0.15em] text-[#c9a46e]">{room.subtitle ? "STAY CATEGORY" : "ROOM TYPE"}</p>
                  <h3 className="mt-3 text-3xl md:text-4xl">{room.title}</h3>
                  <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl">{room.subtitle}</p>
                  {room.facts ? (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {room.facts.slice(1).map((fact) => (
                        <span key={fact.label} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs tracking-[0.12em] text-white/75">
                          {fact.label}: {fact.value}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 pt-4 text-center md:px-8" data-reveal>
        <div className="rounded-[2.4rem] border border-white/10 bg-[#182920] px-8 py-12 md:px-16 md:py-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#c9a46e]" data-reveal-child>Need Help Choosing?</p>
          <h3 className="mx-auto mt-5 max-w-4xl text-3xl md:text-4xl" data-section-title data-reveal-child>
            Our team can guide you on the best room category for your stay, group size, and celebration plan
          </h3>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4" data-reveal-child>
            <Link href="/booking" className="inline-flex items-center justify-center border border-[#c8a871] bg-[#c8a871] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black">
              Check Availability
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white/88 transition-colors hover:border-[#c9a46e]/40 hover:text-white">
              Contact The Team
            </Link>
          </div>
        </div>
      </section>

      <GlobalPageSections hideContactAndStay hideReservation />
      <SiteFooter />
    </main>
  );
}
