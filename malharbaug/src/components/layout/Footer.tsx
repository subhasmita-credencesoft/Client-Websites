import Image from 'next/image';
import Link from 'next/link';
import { footerNav } from '@/data/navigation';
import { siteConfig } from '@/lib/site';

const socialLinks = [
  { label: 'Instagram', icon: 'mdi:instagram', href: 'https://www.instagram.com/malhar_baug_resort/' },
  { label: 'Facebook', icon: 'mdi:facebook', href: 'https://www.facebook.com/p/Malharbaug-Resort-61584448151255/' },
];

const policyLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-conditions' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Cancellation Policy', href: '/cancellation-policy' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-900">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="flex flex-col items-start sm:col-span-2 lg:col-span-4">
            <Image
              src="/malharlogo.jpeg"
              alt="Malhar Baug Resort logo – family resort in Alibaug near Nagaon Beach"
              width={72}
              height={72}
              className="rounded-full"
            />
            <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-brand-200">
              A peaceful nature retreat near Nagaon Beach, Alibaug — luxury rooms, private villas, swimming pool and authentic Konkan cuisine.
            </p>
            <ul className="mt-5 space-y-2.5">
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center gap-2 font-sans text-sm text-brand-200 transition-colors hover:text-white"
                >
                  <iconify-icon icon="solar:phone-bold" width="16" height="16" aria-hidden="true"></iconify-icon>
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 font-sans text-sm text-brand-200 transition-colors hover:text-white"
                >
                  <iconify-icon icon="solar:letter-bold" width="16" height="16" aria-hidden="true"></iconify-icon>
                  {siteConfig.email}
                </a>
              </li>
            </ul>
            <address className="mt-4 max-w-sm font-sans text-sm not-italic leading-relaxed text-brand-200">
              H.No. 3116, Palhe, Nagaon,<br />
              Alibag, Raigad, Maharashtra 402204
            </address>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={`${siteConfig.name} on ${social.label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-brand-200 transition-colors duration-200 ease-out hover:bg-white/20 hover:text-white"
                >
                  <iconify-icon icon={social.icon} width="18" height="18" aria-hidden="true"></iconify-icon>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={`Footer – ${group.heading}`} className="lg:col-span-2">
              <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-white">
                {group.heading}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="block whitespace-nowrap font-sans text-sm text-brand-200 transition-colors duration-200 ease-out hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 md:flex-row">
          <p className="font-sans text-xs text-brand-300">
            &copy; 2026 Malhar Baug Resort, Alibaug. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {policyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="whitespace-nowrap font-sans text-xs text-brand-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
