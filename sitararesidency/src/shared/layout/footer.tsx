import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { business } from '@/core/config/business';

export function Footer() {
  return (
    <footer className="site-footer bg-[#17221b] text-white" role="contentinfo">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
        {/* ── Main Footer 4-Column Grid ── */}
        <div className="footer-row-1 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_0.9fr_1.2fr] border-b border-white/15 pb-14">
          {/* Column 1: Brand & Identity */}
          <div className="flex flex-col items-start">
            <Link href="/" className="inline-flex items-center gap-3.5 mb-5 group">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-apricot/40 bg-white shadow-md transition-transform group-hover:scale-105">
                <Image
                  src={business.logo}
                  alt={business.name}
                  fill
                  sizes="56px"
                  className="object-cover object-center"
                />
              </div>
              <div>
                <span className="font-display text-xl font-normal tracking-wide text-white block">
                  {business.shortName}
                </span>
                <span className="font-mono-label text-[9px] uppercase tracking-widest text-apricot block">
                  Kalamboli · Navi Mumbai
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-white/70 max-w-sm mb-6">
              Comfortable, modern accommodations tailored for business travelers, families, and couples seeking genuine hospitality and effortless connectivity.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs text-emerald-300">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Official Direct Booking Guarantee</span>
            </div>
          </div>

          {/* Column 2: Accommodations */}
          <div>
            <h4 className="font-mono-label text-[11px] font-bold uppercase tracking-widest text-apricot mb-5">
              Accommodations
            </h4>
            <ul className="space-y-3 text-sm text-white/75">
              <li>
                <Link href="/bedrooms/executive-room" className="transition-colors hover:text-white">
                  Executive Room
                </Link>
              </li>
              <li>
                <Link href="/bedrooms/executive-triple-room" className="transition-colors hover:text-white">
                  Executive Triple Room
                </Link>
              </li>
              <li>
                <Link href="/bedrooms/executive-family-suite" className="transition-colors hover:text-white">
                  Executive Family Suite
                </Link>
              </li>
              <li>
                <Link href="/bedrooms" className="inline-flex items-center gap-1 text-apricot transition-colors hover:text-white">
                  View All Rooms <ArrowUpRight size={13} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Explore & Information */}
          <div>
            <h4 className="font-mono-label text-[11px] font-bold uppercase tracking-widest text-apricot mb-5">
              Explore &amp; Stay
            </h4>
            <ul className="space-y-3 text-sm text-white/75">
              <li>
                <Link href="/events" className="transition-colors hover:text-white font-medium text-apricot flex items-center gap-1.5">
                  <span>Events &amp; Banquets</span>
                  <span className="rounded-full bg-apricot/20 px-1.5 py-0.2 text-[8px] font-bold text-apricot border border-apricot/30">75 Pax</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="transition-colors hover:text-white">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/location" className="transition-colors hover:text-white">
                  Location &amp; Directions
                </Link>
              </li>
              <li>
                <Link href="/things-to-do" className="transition-colors hover:text-white">
                  Around Kalamboli
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-white">
                  Travel Guide &amp; Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Location & Contact */}
          <div>
            <h4 className="font-mono-label text-[11px] font-bold uppercase tracking-widest text-apricot mb-5">
              Get in Touch
            </h4>
            <address className="not-italic text-sm text-white/75 space-y-3 mb-5">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-apricot shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {business.address.streetAddress}, {business.address.locality} – {business.address.postalCode}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone size={15} className="text-apricot shrink-0 mt-1" />
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-x-2 text-xs">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-apricot/80">Mobile:</span>
                    <a href={`tel:${business.phones.primary}`} className="transition-colors hover:text-white">
                      {business.phones.primaryDisplay}
                    </a>
                    <span>/</span>
                    <a href={`tel:${business.phones.secondary}`} className="transition-colors hover:text-white">
                      {business.phones.secondaryDisplay}
                    </a>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 text-xs">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-apricot/80">Landline:</span>
                    <a href={`tel:${business.phones.landlinePrimary}`} className="transition-colors hover:text-white">
                      {business.phones.landlinePrimaryDisplay}
                    </a>
                    <span>/</span>
                    <a href={`tel:${business.phones.landlineSecondary}`} className="transition-colors hover:text-white">
                      {business.phones.landlineSecondaryDisplay}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-apricot shrink-0" />
                <a href={`mailto:${business.email}`} className="transition-colors hover:text-white text-xs">
                  {business.email}
                </a>
              </div>
            </address>

            <a
              href={business.bookingUrl}
              className="inline-flex items-center justify-center rounded-xs bg-terracotta px-5 py-2.5 font-mono-label text-[11px] uppercase tracking-wider text-white transition-all hover:bg-white hover:text-forest"
            >
              <span>Book Direct — Best Rate</span>
            </a>
          </div>
        </div>

        {/* ── Sub-Footer Bar ── */}
        <div className="footer-row-2 mt-8 flex flex-col items-center justify-between gap-4 text-xs text-white/70 sm:flex-row">
          <p className="text-center sm:text-left">
            Designed and Developed By{' '}
            <a
              href="https://credencesoft.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-apricot underline underline-offset-4 transition-colors"
            >
              CredenceSoft
            </a>
            , Powered By{' '}
            <a
              href="https://bookonepms.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-apricot underline underline-offset-4 transition-colors"
            >
              BookOne
            </a>
            .
          </p>

          <div className="flex items-center gap-6">
            <Link href="/contact" className="transition-colors hover:text-white">
              Contact
            </Link>
            <Link href="/location" className="transition-colors hover:text-white">
              Map &amp; Directions
            </Link>
            <a
              href={business.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href={business.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
              aria-label="Facebook"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
