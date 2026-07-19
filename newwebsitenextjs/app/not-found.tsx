import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { DIRECT_BOOKING_ENGINE_URL } from "@/lib/constants/booking";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Rooms & Stays", href: "/rooms" },
  { label: "Wedding Lawns", href: "/wedding-lawns" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <div className="noise-overlay" />

      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <Image
          src="https://bookonelocal.in/cdn/DSC08769.avif"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,8,6,0.72)_0%,rgba(9,8,6,0.55)_35%,rgba(9,8,6,0.65)_65%,rgba(9,8,6,0.88)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(9,8,6,0.3)_0%,rgba(9,8,6,0.7)_100%)]" />
      </div>

      <SiteHeader />

      <section id="main-content" className="relative z-10 flex min-h-[85svh] items-center justify-center px-4 py-28 sm:px-5">
        <div className="mx-auto max-w-4xl text-center">
          <div className="relative inline-block">
            <span
              className="block text-[clamp(5rem,18vw,12rem)] font-bold leading-none tracking-[-0.04em] text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(180deg,rgba(212,176,122,0.15) 0%,rgba(200,154,85,0.05) 55%,transparent 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              }}
              aria-hidden="true"
            >
              404
            </span>
            <div
              className="absolute inset-0 text-[clamp(5rem,18vw,12rem)] font-bold leading-none tracking-[-0.04em]"
              style={{
                backgroundImage:
                  "linear-gradient(160deg,#fff8e7 0%,#d6b07a 40%,#a07840 70%,#c89a55 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              404
            </div>
          </div>

          <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-[var(--color-primary)]/50 to-transparent" />

          <p className="site-eyebrow mt-8 text-[var(--color-primary-hover)]">
            Page Not Found
          </p>

          <h1 className="mt-5 text-balance text-[clamp(1.5rem,4vw,2.8rem)] font-semibold leading-[1.1] text-[var(--color-text-primary)]">
            This corner of the estate<br className="hidden sm:block" /> hasn&apos;t been explored yet
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg md:text-xl">
            The page you&apos;re looking for may have moved, been renamed, or doesn&apos;t exist. Let us guide you back to something beautiful.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-[var(--color-primary)] bg-[var(--color-primary)] px-8 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-background)] transition-all duration-300 hover:bg-[var(--color-primary-hover)] hover:shadow-[0_12px_32px_rgba(200,154,85,0.2)]"
            >
              Return Home
            </Link>
            <Link
              href={DIRECT_BOOKING_ENGINE_URL}
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-[var(--color-border)] px-8 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)] transition-all duration-300 hover:border-[var(--color-primary)]/40 hover:text-[var(--color-text-primary)]"
            >
              Book Your Stay
            </Link>
          </div>

          <div className="mx-auto mt-16 max-w-2xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
              Or explore these destinations
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-full border border-[var(--color-border)] bg-white/[0.03] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-text-muted)] transition-all duration-300 hover:border-[var(--color-primary)]/30 hover:bg-white/[0.06] hover:text-[var(--color-primary-hover)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
