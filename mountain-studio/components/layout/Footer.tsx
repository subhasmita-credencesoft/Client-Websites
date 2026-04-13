"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { bookingEngineUrl, navLinks } from "@/lib/data";

const socials = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "Twitter", href: "#", icon: Twitter }
];

export function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-dark pb-8 pt-16">
      <div className="container-shell grid gap-12 lg:grid-cols-[1.35fr_repeat(4,1fr)]">
        <div className="space-y-5">
          <div className="font-display text-3xl tracking-[0.18em] text-ivory">REDWINGS STUDIO</div>
          <p className="max-w-sm text-sm leading-7 text-ivory/65">
            Redwings Studio operates selected studio apartments at  Goa, offering comfortable stays under the Redwings banner.
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
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block transition hover:text-gold">
                {link.label}
              </Link>
            ))}
            <Link href={bookingEngineUrl} className="block transition hover:text-gold">Check Availability</Link>
            <Link href="/contact" className="block transition hover:text-gold">Contact The Team</Link>
          </div>
        </div>

        {/* <div>
          <h3 className="mb-5 font-display text-2xl">Highlights</h3>
          <div className="space-y-3 text-sm text-ivory/65">
            <p>10 Rooms Available</p>
            <p>Studio Apartments</p>
            <p>Check-In 1:00 PM</p>
            <p>Check-Out 11:00 AM</p>
            <p>20 Couples + 10 Extra Beds</p>
          </div>
        </div> */}

        <div>
          <h3 className="mb-5 font-display text-2xl">Contact</h3>
          <div className="space-y-3 text-sm leading-7 text-ivory/65">
            <p>Redwings Studio</p>
            <p>+91 9167680996</p>
            <p>+91 9763988999</p>
            <p>+91 9833335933</p>
            <p>psomvanshi9@gmail.com</p>
            <p>House No. 275/1, F30, Abalone Resort, Gorbhat, Goa - 403516</p>
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-display text-2xl">Stay Snapshot</h3>
          <div className="space-y-3 text-sm leading-7 text-ivory/65">
            <p>Property: Redwings Studio</p>
            {/* <p>At: Abalone Resort, Arpora, Goa</p> */}
            <p>Owner-managed inventory</p>
            {/* <p>Direct phone and email support</p>
            <p>Designed for short Goa stays and group bookings</p> */}
          </div>
        </div>
      </div>

      <div className="container-shell mt-14 flex flex-col gap-4 border-t border-gold/10 pt-6 text-xs uppercase tracking-[0.24em] text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
        {/* <p>© 2026 Redwings Studio. All rights reserved.</p> */}
        <div className="flex gap-6">
          <Link
            href="https://credencesoft.in/"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-gold"
          >
            Designed and Developed by CredenceSoft
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
