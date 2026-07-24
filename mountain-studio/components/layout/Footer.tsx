"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { bookingEngineUrl } from "@/lib/data";

const socials = [
  { label: "Instagram", href: "https://instagram.com/", icon: Instagram },
  { label: "Facebook", href: "https://facebook.com/", icon: Facebook },
  { label: "Twitter", href: "https://x.com/", icon: Twitter },
];

const exploreLinks = [
  { label: "Studio Apartments in Goa", href: "/rooms" },
  { label: "Room Tariff & Rates", href: "/tariff" },
  { label: "Property Gallery", href: "/gallery" },
  { label: "Amenities & Facilities", href: "/amenities" },
  { label: "Dining & Restaurants", href: "/dining" },
  { label: "Events & Weddings", href: "/events" },
  { label: "Activities & Things to Do", href: "/activities" },
  { label: "Goa Travel Blog", href: "/blog" },
  { label: "Offers & Benefits", href: "/offers" },
];

const nearbyLinks = [
  { label: "Hotel Near Baga Beach", href: "/nearby-attractions" },
  { label: "Places to Visit in Goa", href: "/nearby-attractions" },
  { label: "About Redwings Studio", href: "/about" },
  { label: "Contact & Directions", href: "/contact" },
  { label: "FAQ — Rooms & Booking", href: "/faq" },
];

const policyLinks = [
  { label: "Cancellation Policy", href: "/cancellation-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-dark pb-8 pt-16">
      <div className="container-shell grid gap-12 lg:grid-cols-[1.35fr_repeat(4,1fr)]">
        <div className="space-y-5">
          <Link href="/" className="inline-block">
            <div className="font-display text-3xl tracking-[0.18em] text-ivory">
              REDWINGS STUDIO
            </div>
          </Link>
          <p className="max-w-sm text-sm leading-7 text-ivory/65">
            Redwings Studio offers 10 owner-managed studio apartments at
            Abalone Resort, Gorbhat, Arpora, North Goa. Budget to pool-view
            rooms near Baga Beach, Calangute, and Anjuna. From ₹1,950/night.
          </p>
          <div className="flex gap-4">
            {socials.map(({ href, icon: Icon, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="rounded-full border border-gold/20 p-3 text-ivory/75 transition hover:scale-110 hover:text-gold"
              >
                <Icon size={16} />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-display text-2xl">Explore</h3>
          <div className="space-y-3 text-sm text-ivory/65">
            {exploreLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="block transition hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={bookingEngineUrl}
              className="block font-medium text-gold transition hover:text-gold-light"
            >
              Book Now — From ₹1,950/night
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-display text-2xl">Nearby & Info</h3>
          <div className="space-y-3 text-sm text-ivory/65">
            {nearbyLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="block transition hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-display text-2xl">Contact</h3>
          <div className="space-y-3 text-sm leading-7 text-ivory/65">
            <p>Redwings Studio, Arpora</p>
            <p>
              <Link href="tel:+919167680996" className="transition hover:text-gold">
                +91 9167680996
              </Link>
            </p>
            <p>
              <Link href="tel:+919763988999" className="transition hover:text-gold">
                +91 9763988999
              </Link>
            </p>
            <p>
              <Link href="tel:+919833335933" className="transition hover:text-gold">
                +91 9833335933
              </Link>
            </p>
            <p>
              <Link
                href="mailto:psomvanshi9@gmail.com"
                className="transition hover:text-gold"
              >
                psomvanshi9@gmail.com
              </Link>
            </p>
            <p className="text-xs leading-6">
              House No. 275/1, F30, Abalone Resort, Gorbhat, Arpora, Goa -
              403516
            </p>
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-display text-2xl">Quick Info</h3>
          <div className="space-y-3 text-sm leading-7 text-ivory/65">
            <p>10 Studio Apartments</p>
            <p>Check-In: 1:00 PM</p>
            <p>Check-Out: 11:00 AM</p>
            <p>20 Couples + 10 Extra Beds</p>
            <p>Free Wi-Fi & Pool Access</p>
            <div className="mt-4 space-y-3">
              {policyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block transition hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-shell mt-14 flex flex-col gap-4 border-t border-gold/10 pt-6 text-xs uppercase tracking-[0.24em] text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Redwings Studio. All rights reserved.</p>
        <div className="flex gap-6">
          <Link
            href="https://credencesoft.in/"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-gold"
          >
            Designed by CredenceSoft
          </Link>
          <Link
            href="https://bookonepms.com/"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-gold"
          >
            Powered By BookOne
          </Link>
        </div>
      </div>
    </footer>
  );
}
