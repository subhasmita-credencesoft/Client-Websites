import Link from "next/link";

import Container from "@/components/ui/Container";
import { navigation, siteMeta } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer className="bg-[var(--primary-900)] text-white">
      <Container>
        <div className="grid gap-10 py-16 md:py-18 xl:grid-cols-[1.2fr_0.85fr_0.9fr_0.9fr] xl:gap-12">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--accent-gold)]">
              Booking Intent
            </p>
            <h3 className="mt-4 max-w-xl text-3xl font-bold leading-tight">Seen the setting. Now choose your dates.</h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/72">
              Explore availability for destination weddings, wedding guest stays, and celebration weekends at The Mountain Resort in Karjat, By Redwings.
            </p>
            <div className="mt-6 space-y-2 text-sm leading-7 text-white/78">
              <p className="font-semibold text-white">{siteMeta.name}</p>
              <p>Contact For Wedding And Stay Bookings</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold uppercase tracking-[0.18em] text-[var(--accent-gold)]">
              Quick Links
            </h4>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/72">
              <a href={siteMeta.bookingEngineHref} className="transition hover:text-white">
                Check Availability
              </a>
              <Link href="/contact" className="transition hover:text-white">
                Plan Your Visit
              </Link>
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* <div>
            <h4 className="text-lg font-semibold uppercase tracking-[0.18em] text-[var(--accent-gold)]">
              Venue Highlights
            </h4>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-white/72">
              <li>Destination Wedding Venue</li>
              <li>Packages</li>
              <li>Private Event Spaces</li>
              <li>Venue Highlights</li>
              <li>Stay</li>
              <li>Booking Terms</li>
              <li>Check-In</li>
              <li>Reserve Your Dates</li>
            </ul>
          </div> */}

          <div>
            <h4 className="text-lg font-semibold uppercase tracking-[0.18em] text-[var(--accent-gold)]">
              Contact
            </h4>
            <div className="mt-5 space-y-3 text-sm leading-7 text-white/72">
              <a href={siteMeta.phoneHref} className="block transition hover:text-white">
                {siteMeta.phone}
              </a>
              <a href={siteMeta.altPhoneHref} className="block transition hover:text-white">
                {siteMeta.altPhone}
              </a>
              <a href={siteMeta.instagramHref} target="_blank" rel="noreferrer" className="block transition hover:text-white">
                {siteMeta.instagram}
              </a>
              <a href={siteMeta.websiteHref} target="_blank" rel="noreferrer" className="block transition hover:text-white">
                {siteMeta.website}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/12 py-6 text-sm leading-7 text-white/55">
          Designed and Developed by{" "}
          <a
            href="https://credencesoft.in"
            target="_blank"
            rel="noreferrer"
            className="text-white transition hover:text-[var(--accent-gold)]"
          >
            CredenceSoft
          </a>{" "}
          and Powered by{" "}
          <a
            href="https://bookonelocal.in"
            target="_blank"
            rel="noreferrer"
            className="text-white transition hover:text-[var(--accent-gold)]"
          >
            BookOne
          </a>
        </div>
      </Container>
    </footer>
  );
}
