import Link from "next/link";
import Container from "../ui/Container";
const socials = [
  { label: "Facebook", href: "https://www.facebook.com" },
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "Tripadvisor", href: "https://www.tripadvisor.com" },
  { label: "Tiktok", href: "https://www.tiktok.com" },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#143b47] text-white">
      <Container>
        <div className="grid gap-12 border-b border-white/15 py-16 lg:grid-cols-[1.1fr_1.4fr]">
          <div className="space-y-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-sm">
              A
            </div>
            <h3 className="font-serif text-4xl leading-tight">
              Award-winning
              <br />
              resort in the
              <br />
              paradise island
            </h3>
          </div>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h4 className="font-serif text-2xl">Subscribe to the Newsletter</h4>
              <p className="mt-2 text-sm text-white/70">
                Stay Updated with Resort News
              </p>
              <form className="mt-6 flex items-center gap-4 border-b border-white/30 pb-3 text-sm">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder="your email"
                  className="w-full bg-transparent text-white/90 placeholder:text-white/60 focus:outline-none border-0 shadow-none ring-0 focus:ring-0"
                />
                <button
                  type="submit"
                  className="ml-auto text-xs font-semibold uppercase tracking-[0.3em] text-white hover:text-white/80"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h5 className="font-serif text-lg">Contact Info</h5>
                <p className="mt-4 text-sm text-white/70">54 Longbranch Ave.</p>
                <p className="text-sm text-white/70">Brandon, FL 33510</p>
              </div>
              <div>
                <h5 className="font-serif text-lg">Reservations</h5>
                <p className="mt-4 text-sm text-white/70">1-800-123-4567</p>
                <p className="text-sm text-white/70">reservations@example.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 text-xs text-white/60">
          <p>Copyright (c) 2024 Amoja. All rights reserved</p>
          <div className="flex items-center gap-6">
            {socials.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
