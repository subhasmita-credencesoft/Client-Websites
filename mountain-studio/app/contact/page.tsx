import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Globe, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { bookingEngineUrl, imageSet } from "@/lib/data";
import { breadcrumbSchema, localBusinessSchema, jsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Contact Redwings Studio Goa — Phone, Email & Address",
  description: "Contact Redwings Studio at Abalone Resort, Gorbhat, Goa 403516. Call +91 9167680996 or email psomvanshi9@gmail.com for room availability, group bookings, and stay enquiries.",
  alternates: { canonical: "https://redwingsstudio.com/contact" },
  openGraph: {
    title: "Contact Redwings Studio Goa",
    description: "Call +91 9167680996 or email for room availability and booking support. Located at Abalone Resort, Gorbhat, Goa 403516.",
    images: [{ url: "/mountain-studio/hero-main.jpeg", width: 1200, height: 630, alt: "Contact Redwings Studio Goa" }],
  },
  twitter: { card: "summary_large_image", title: "Contact Redwings Studio Goa", description: "Call +91 9167680996. Abalone Resort, Gorbhat, Goa 403516.", images: ["/mountain-studio/hero-main.jpeg"] },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema([{ name: "Home", url: SITE_URL }, { name: "Contact", url: `${SITE_URL}/contact` }])) }} />
      <PageHero
        image={imageSet.homeHero}
        eyebrow="Direct Property Contact"
        title="Contact Redwings Studio"
        description="Speak directly with our team for room availability, booking support, property details, and owner-managed stay enquiries."
        ctaHref={bookingEngineUrl}
        ctaLabel="Check Availability"
        secondaryHref="tel:+919167680996"
        secondaryLabel="Call The Team"
        priority
      />

      <section className="section-space">
        <div className="container-shell grid gap-10 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-gold/16 bg-dark-2 p-6 sm:p-8">
            <p className="eyebrow">Direct Support</p>
            <h2 className="font-display text-4xl">Everything you need to confirm a Goa stay without filling a form.</h2>
            <p className="mt-6 text-base leading-8 text-ivory/68">
              Redwings Studio is managed with direct owner-side coordination, so guests can call or email for availability,
              group planning, room combinations, and arrival guidance.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                ["Property Name", "Redwings Studio"],
                // ["Current Resort", "Abalone Resort"],
                ["Inventory", "10 rooms under the Redwings banner"],
                ["Occupancy", "20 couples + 10 additional beds"],
                ["Check-In", "1:00 PM"],
                ["Check-Out", "11:00 AM"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-[24px] border border-gold/14 bg-dark p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-gold-light">{label}</p>
                  <p className="mt-3 text-base leading-7 text-ivory/72">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-gold/16 bg-dark-2 p-6 sm:p-8">
              <h2 className="font-display text-4xl">Location</h2>
              <div className="mt-8 space-y-5 text-ivory/68">
                <p className="flex items-start gap-3">
                  <MapPin className="mt-1 text-gold" size={18} />
                  <span>
                    <strong className="block text-ivory">Location</strong>
                    Redwings Studio
                  </span>
                </p>
                <p className="text-sm leading-7 text-ivory/64">
                  Studio apartment stay inventory at Gorbhat, Goa, managed under the Redwings Studio banner.
                </p>
                <p className="flex items-start gap-3">
                  <MapPin className="mt-1 text-gold" size={18} />
                  <span>
                    <strong className="block text-ivory">Official Address</strong>
                    House No. 275/1, F30, Abalone Resort, Gorbhat, Goa - 403516
                  </span>
                </p>
                {/* <p className="text-sm leading-7 text-ivory/64">
                  Owner correspondence address: Payal Complex, Sector No. 17, Raigad, New Panvel - 410206.
                </p> */}
                <p className="text-sm leading-7 text-ivory/64">Owner: Pratibha Avinash Somvanshi</p>
              </div>
            </div>

            <div className="rounded-[32px] border border-gold/16 bg-dark-2 p-6 sm:p-8">
              <h2 className="font-display text-4xl">Direct Contact Details</h2>
              <div className="mt-8 space-y-5 text-ivory/68">
                <p className="flex items-start gap-3">
                  <Phone className="mt-1 text-gold" size={18} />
                  <Link href="tel:+919167680996" className="transition hover:text-gold">
                    +91 9167680996
                  </Link>
                </p>
                <p className="flex items-start gap-3">
                  <Phone className="mt-1 text-gold" size={18} />
                  <Link href="tel:+919763988999" className="transition hover:text-gold">
                    +91 9763988999
                  </Link>
                </p>
                <p className="flex items-start gap-3">
                  <Phone className="mt-1 text-gold" size={18} />
                  <Link href="tel:+919833335933" className="transition hover:text-gold">
                    +91 9833335933
                  </Link>
                </p>
                <p className="flex items-start gap-3">
                  <MessageCircle className="mt-1 text-gold" size={18} />
                  <Link href="mailto:psomvanshi9@gmail.com" className="transition hover:text-gold">
                    psomvanshi9@gmail.com
                  </Link>
                </p>
                {/* <p className="flex items-start gap-3">
                  <Globe className="mt-1 text-gold" size={18} />
                  <span className="text-sm leading-7 text-ivory/64">Check-In: 1:00 PM | Check-Out: 11:00 AM</span>
                </p>
                <p className="text-sm leading-7 text-ivory/64">Total rooms under banner: 10 (5 + 5)</p>
                <p className="text-sm leading-7 text-ivory/64">Occupancy: 20 couples + 10 additional beds</p> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
