"use client";

import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { bookingEngineUrl } from "@/lib/data";

const WHATSAPP_URL =
  "https://wa.me/919167680996?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20a%20stay%20at%20Redwings%20Studio%2C%20Goa.";
const PHONE_URL = "tel:+919167680996";

/**
 * FloatingCTA — sticky booking bar visible on all pages.
 * Mobile: full-width bar fixed to bottom with WhatsApp + Book Now.
 * Desktop: floating corner pill buttons.
 */
export function FloatingCTA() {
  return (
    <>
      {/* ── Mobile sticky bottom bar ─────────────────────────────────── */}
      <div
        className="fixed bottom-0 inset-x-0 z-[90] flex h-16 items-center gap-3 border-t border-gold/20 bg-dark/95 px-4 backdrop-blur-xl lg:hidden"
        role="complementary"
        aria-label="Quick booking actions"
      >
        <Link
          href={PHONE_URL}
          aria-label="Call Redwings Studio"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold transition hover:bg-gold hover:text-dark"
        >
          <Phone size={18} />
        </Link>
        <Link
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Redwings Studio"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#25D366]/40 text-[#25D366] transition hover:bg-[#25D366] hover:text-dark"
        >
          <MessageCircle size={18} />
        </Link>
        <Link
          href={bookingEngineUrl}
          className="flex h-11 flex-1 items-center justify-center rounded-full bg-gold text-xs font-medium uppercase tracking-[0.28em] text-dark transition hover:bg-gold-light"
        >
          Check Availability
        </Link>
      </div>

      {/* ── Desktop floating corner buttons ──────────────────────────── */}
      <div
        className="fixed bottom-8 right-6 z-[90] hidden flex-col items-end gap-3 lg:flex"
        role="complementary"
        aria-label="Quick booking actions"
      >
        <Link
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Redwings Studio"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#25D366]/50 bg-dark/80 text-[#25D366] shadow-lg backdrop-blur-xl transition hover:scale-110 hover:bg-[#25D366] hover:text-dark"
        >
          <MessageCircle size={20} />
        </Link>
        <Link
          href={PHONE_URL}
          aria-label="Call Redwings Studio"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-dark/80 text-gold shadow-lg backdrop-blur-xl transition hover:scale-110 hover:bg-gold hover:text-dark"
        >
          <Phone size={20} />
        </Link>
      </div>
    </>
  );
}
