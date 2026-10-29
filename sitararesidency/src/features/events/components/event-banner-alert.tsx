'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, Phone, MessageSquare, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { business } from '@/core/config/business';
import { useEscapeKey } from '@/shared/hooks';

export function EventBannerAlert() {
  const [isOpen, setIsOpen] = useState(false);

  // Automatically show the alert banner 1.2 seconds after the page loads
  useEffect(() => {
    // Check session storage to avoid spamming on every navigation in the same session
    const dismissed = sessionStorage.getItem('group_stay_alert_dismissed');
    if (dismissed === 'true') {
      return;
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    sessionStorage.setItem('group_stay_alert_dismissed', 'true');
  }, []);

  useEscapeKey(handleClose, isOpen);

  const handleQuoteClick = () => {
    handleClose();
    // Smooth scroll to inquiry form
    const formEl = document.getElementById('event-inquiry');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappMessage = encodeURIComponent(
    'Hello Hotel Sitara Residency Team,\n\nI saw your Group Stay announcement and would like to request a Group Quote for an upcoming function:\n- Occasion: Weddings / Corporate Team / Family Function\n- Location: Kalamboli, Navi Mumbai\n\nPlease share group room tariffs, banquet hall availability, and package rates. Thank you!',
  );

  return (
    <>
      {/* ─── 1. POPUP BANNER ALERT MODAL ─── */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Plan Your Group Stay - Hotel Sitara Residency"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md transition-all duration-300 overflow-y-auto"
        >
          {/* Backdrop Click */}
          <div className="fixed inset-0" onClick={handleClose} />

          {/* Modal Card */}
          <div className="relative w-full max-w-[880px] my-auto bg-[#091b33] border border-amber-400/35 shadow-2xl overflow-hidden transition-all duration-500 animate-fadeIn z-10 flex flex-col max-h-[94vh]">
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close group stay announcement"
              className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-30 grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full bg-black/75 text-white hover:bg-[#d31b26] border border-white/20 transition-all shadow-lg hover:scale-105"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Banner Graphic Viewport */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-forest flex-shrink-0 min-h-[180px] sm:min-h-[300px]">
              <Image
                src="/group-stay-banner.jpg"
                alt="Plan Your Group Stay at Hotel Sitara Residency Kalamboli - Weddings, Corporate Teams, Family Functions"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 880px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071529]/90 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Quick Action Dock Bar at bottom */}
            <div className="bg-[#071529] px-4 py-3.5 sm:px-6 sm:py-4 border-t border-amber-400/25 flex flex-col sm:flex-row items-center justify-between gap-3 overflow-y-auto">
              <div className="text-center sm:text-left w-full sm:w-auto">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-amber-300 font-mono-label text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" /> Special Group Stay Tariffs
                </div>
                <p className="text-white/85 text-[11px] sm:text-xs mt-0.5 leading-snug">
                  Room blocks + banquets for Weddings, Corporate Offsites &amp; Family Functions
                </p>
              </div>

              {/* Action Buttons: 2-column grid on mobile, row on desktop */}
              <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={handleQuoteClick}
                  className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-2 bg-[#d31b26] hover:bg-[#b0141e] text-white px-4 py-2.5 font-mono-label text-[11px] uppercase tracking-wider font-bold transition-all shadow-md active:scale-98"
                >
                  <span>Request a Group Quote</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <a
                  href={`https://wa.me/917400432396?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-1 inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-3 py-2 font-mono-label text-[10px] sm:text-xs uppercase tracking-wider font-bold transition-all shadow-sm text-center"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`tel:${business.phones.primary}`}
                  className="col-span-1 inline-flex items-center justify-center gap-1.5 border border-white/30 hover:border-white text-white px-3 py-2 font-mono-label text-[10px] sm:text-xs transition-colors text-center"
                  aria-label={`Call ${business.phones.primaryDisplay}`}
                >
                  <Phone className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                  <span className="truncate">Call Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── 2. FLOATING ALERT PILL (Available after dismissal or while browsing) ─── */}
      {!isOpen && (
        <aside
          aria-label="Group stay offers"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 max-w-[calc(100vw-2rem)] animate-fadeIn"
        >
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2 sm:gap-2.5 bg-[#091b33] border border-amber-400/40 text-cream px-3 sm:px-4 py-2 sm:py-2.5 rounded-none shadow-2xl hover:border-amber-300 hover:bg-[#0c2444] transition-all hover:scale-102 active:scale-98"
          >
            <div className="grid h-6 w-6 sm:h-7 sm:w-7 place-items-center rounded-full bg-[#d31b26] text-white shadow-sm shrink-0">
              <Building2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </div>
            <div className="text-left min-w-0">
              <div className="font-mono-label text-[8px] sm:text-[9px] uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1">
                <span>Group Stay Alert</span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
              </div>
              <div className="font-serif text-[11px] sm:text-xs font-semibold text-white truncate max-w-[180px] sm:max-w-none">
                Plan Your Group Stay &amp; Banquets
              </div>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-amber-300 transition-transform group-hover:translate-x-1 shrink-0 ml-0.5" />
          </button>
        </aside>
      )}
    </>
  );
}
