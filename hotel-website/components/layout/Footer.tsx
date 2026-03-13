import Link from "next/link";
import Image from "next/image";
import Container from "../ui/Container";

const quickLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Terms & Condition", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Feedback", href: "#" },
];

export default function Footer() {
  const tripadvisorUrl =
    "https://www.tripadvisor.in/Hotel_Review-g1568568-d4609539-Reviews-UK_s_Resort_Khopoli-Khopoli_Raigad_District_Maharashtra.html";

  return (
    <footer className="mt-20 bg-[#143b47] text-white">
      <Container>
        <div className="grid gap-12 border-b border-white/15 py-16 lg:grid-cols-[1.1fr_1.4fr]">
          <div className="space-y-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-sm">
              U
            </div>
            <h3 className="font-serif text-4xl leading-tight">
              Award-winning
              <br />
              resort in the
              <br />
              heart of Khopoli
            </h3>

            <Link
              href={tripadvisorUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Tripadvisor certificate and reviews"
              className="inline-block"
            >
              <div className="relative h-[142px] w-[185px] overflow-hidden border-2 border-[#90f6ba] bg-[#ebebeb] text-center">
                <p className="pt-2 text-[11px] leading-[1.15] text-black">
                  Certificate of Excellence 2016
                </p>
                <p className="text-[10px] leading-[1.15] text-black">Read Reviews</p>

                <div className="absolute -bottom-[74px] left-1/2 h-[150px] w-[150px] -translate-x-1/2 rounded-full bg-[#43eeb8]">
                  <div className="absolute left-1/2 top-5 -translate-x-1/2 text-center text-black">
                    <Image
                      src="/images/triplogo.png"
                      alt="Tripadvisor logo"
                      width={54}
                      height={28}
                      className="mx-auto h-auto w-[54px]"
                    />
                    <p className="mt-1 text-[13px] font-semibold leading-none">Tripadvisor</p>
                  </div>
                </div>
              </div>
            </Link>
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
                <h5 className="font-serif text-lg">Address</h5>
                <p className="mt-4 text-sm text-white/70">Ashtavinayak Mahad Phata,</p>
                <p className="text-sm text-white/70">Old Mumbai - Pune Highway (NH-4),</p>
                <p className="text-sm text-white/70">Khopoli, Dist. Raigad - 410203,</p>
                <p className="text-sm text-white/70">Maharashtra, India.</p>
              </div>
              <div>
                <h5 className="font-serif text-lg">Contact</h5>
                <p className="mt-4 text-sm text-white/70">+91 98220 12343</p>
                <p className="text-sm text-white/70">+91 87798 14559</p>
                <p className="text-sm text-white/70">+91 74004 51254</p>
                <Link
                  href="mailto:info@uksresort.com"
                  className="text-sm text-white/70 hover:text-white"
                >
                  info@uksresort.com
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 text-xs text-white/60">
          <p>Copyright &copy; {new Date().getFullYear()} UK&apos;S Resort. All rights reserved Designed and Developed By CredenceSoft, Powered By BookOne.</p>
          <div className="flex flex-wrap items-center gap-6">
            {quickLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-white"
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
