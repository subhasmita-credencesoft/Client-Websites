import Link from "next/link";
import { Instagram, MapPin, Phone, Send } from "lucide-react";

import { CtaButton } from "@/components/shared/cta-button";
import { Container } from "@/components/shared/container";
import { hotelInfo } from "@/data/hotel";
import { navigationItems } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-stone-950 text-stone-200">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.8fr_0.9fr]">
          <div className="space-y-5">
            <div>
              <p className="font-display text-3xl font-semibold text-white">{hotelInfo.name}</p>
              <p className="mt-3 max-w-xl text-stone-300">{hotelInfo.description}</p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-stone-300">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2">
                <MapPin className="h-4 w-4 text-amber-400" />
                Jaipur, Rajasthan
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2">
                <Phone className="h-4 w-4 text-amber-400" />
                Placeholder contact editable
              </span>
            </div>
            <CtaButton href={hotelInfo.bookingUrl} label="Book Your Stay" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link className="text-stone-300 transition hover:text-white" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Connect</h3>
            <div className="mt-4 space-y-4 text-stone-300">
              <p>{hotelInfo.address}</p>
              <p className="break-all">{hotelInfo.contactEmail}</p>
              <div className="flex gap-3 pt-2">
                <Link
                  aria-label="Instagram placeholder"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 transition hover:border-amber-500 hover:text-white"
                  href="#"
                >
                  <Instagram className="h-4 w-4" />
                </Link>
                <Link
                  aria-label="Email placeholder"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 transition hover:border-amber-500 hover:text-white"
                  href="/contact"
                >
                  <Send className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-stone-400">
          <p>Designed and Developed by CredenceSoft and Powered By BookOne</p>
        </div>
      </Container>
    </footer>
  );
}
