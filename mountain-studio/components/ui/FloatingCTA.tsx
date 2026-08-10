"use client";

import Link from "next/link";
import { Phone, MessageCircle, Play } from "lucide-react";
import { bookingEngineUrl, whatsAppEnquiryUrl } from "@/lib/data";

const PHONE_URL = "tel:+919167680996";

/**
 * FloatingCTA — sticky contact & booking buttons.
 * Desktop: right-side sticky stack (WhatsApp / Book a Stay / Call).
 * Mobile: bottom bar (Call / WhatsApp / Book a Stay).
 */
export function FloatingCTA() {
  return (
    <>
      {/* ── Desktop: sticky right-side buttons ────────────────────────── */}
      <div
        className="fixed right-5 top-1/2 z-[90] hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
        role="complementary"
        aria-label="Quick contact and booking actions"
      >
        <Link
          href={whatsAppEnquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Redwings Studio"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#25D366]/50 bg-dark/80 text-[#25D366] shadow-lg backdrop-blur-xl transition hover:scale-110 hover:bg-[#25D366] hover:text-dark"
        >
          <MessageCircle size={20} />
        </Link>
        <Link
          href={bookingEngineUrl}
          className="group shimmer-button inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light via-gold to-gold-light px-5 py-3.5 text-xs uppercase tracking-[0.28em] text-dark shadow-lg transition duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(201,168,76,0.4)]"
          style={{ writingMode: "vertical-rl" }}
        >
          <Play size={14} className="rotate-90 transition group-hover:rotate-[75deg]" />
          Book a Stay
        </Link>
        <Link
          href={PHONE_URL}
          aria-label="Call Redwings Studio"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-dark/80 text-gold shadow-lg backdrop-blur-xl transition hover:scale-110 hover:bg-gold hover:text-dark"
        >
          <Phone size={20} />
        </Link>
      </div>

      {/* ── Mobile: bottom bar ────────────────────────────────────────── */}
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
          href={whatsAppEnquiryUrl}
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
          Book a Stay
        </Link>
      </div>
    </>
  );
}
