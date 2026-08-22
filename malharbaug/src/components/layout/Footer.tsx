import Image from 'next/image';
import Link from 'next/link';
import { footerNav } from '@/data/navigation';
import { siteConfig } from '@/lib/site';

const socialLinks = [
  { label: 'Facebook', icon: 'solar:facebook-bold', href: 'https://facebook.com' },
  { label: 'Instagram', icon: 'solar:instagram-bold', href: 'https://instagram.com' },
  { label: 'YouTube', icon: 'solar:youtube-bold', href: 'https://youtube.com' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-900">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-start sm:col-span-2 lg:col-span-2">
            <Image
              src="/malharlogo.jpeg"
              alt="Malhar Baug Resort logo – family resort in Alibaug near Nagaon Beach"
              width={80}
              height={80}
              className="rounded-full"
            />
            <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-brand-200">
              Malhar Baug Resort is a peaceful nature retreat located near Nagaon Beach, Alibaug, offering luxury accommodation, authentic cuisine, and memorable experiences.
            </p>
            <address className="mt-6 space-y-3 not-italic">
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 font-sans text-sm text-brand-200 transition-colors hover:text-white">
                <iconify-icon icon="solar:phone-bold" width="16" height="16"></iconify-icon>
                {siteConfig.phoneDisplay}
              </a>
              <a href={`https://wa.me/${siteConfig.whatsapp}`} className="flex items-center gap-2 font-sans text-sm text-brand-200 transition-colors hover:text-white">
                <iconify-icon icon="solar:chat-round-dots-bold" width="16" height="16"></iconify-icon>
                {siteConfig.phoneDisplay}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 font-sans text-sm text-brand-200 transition-colors hover:text-white">
                <iconify-icon icon="solar:letter-bold" width="16" height="16"></iconify-icon>
                {siteConfig.email}
              </a>
              <p className="max-w-xs font-sans text-sm leading-relaxed text-brand-200">
                H.No. 3116, Palhe, Nagaon,
                <br />
                Alibag, Raigad, Maharashtra 402204
              </p>
            </address>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={`${siteConfig.name} on ${social.label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-brand-200 transition-colors duration-200 ease-out hover:bg-white/20 hover:text-white"
                >
                  <iconify-icon icon={social.icon} width="18" height="18"></iconify-icon>
                </a>
              ))}
            </div>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <p className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-300">
                {group.heading}
              </p>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-brand-200 transition-colors duration-200 ease-out hover:text-white"
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

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-center sm:flex-row sm:text-left">
          <p className="font-sans text-xs text-brand-300">
            &copy; 2026 Malhar Baug Resort, Alibaug. All rights reserved.
          </p>
          <Link href="/" className="font-sans text-xs text-brand-300 transition-colors hover:text-white">
            Family Resort in Alibaug Near Nagaon Beach
          </Link>
        </div>
      </div>
    </footer>
  );
}
