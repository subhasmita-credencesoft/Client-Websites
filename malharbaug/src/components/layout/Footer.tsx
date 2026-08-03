import { footerNav } from '@/data/navigation';

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
          <div className="flex flex-col items-start">
            <img
              src="/malharlogo.jpeg"
              alt="Malhar Baug Resort"
              width={80}
              height={80}
              className="rounded-full"
            />
            <p className="mt-4 font-sans text-sm leading-relaxed text-brand-200">
              Malhar Baug Resort is a peaceful nature retreat located near Nagaon Beach, Alibaug, offering luxury accommodation, authentic cuisine, and memorable experiences.
            </p>
            <div className="mt-6 space-y-3">
              <a href="tel:+919876543210" className="flex items-center gap-2 font-sans text-sm text-brand-200 transition-colors hover:text-white">
                <iconify-icon icon="solar:phone-bold" width="16" height="16"></iconify-icon>
                +91 98765 43210
              </a>
              <a href="https://wa.me/919876543210" className="flex items-center gap-2 font-sans text-sm text-brand-200 transition-colors hover:text-white">
                <iconify-icon icon="solar:chat-round-dots-bold" width="16" height="16"></iconify-icon>
                +91 98765 43210
              </a>
              <a href="mailto:info@malharbaug.com" className="flex items-center gap-2 font-sans text-sm text-brand-200 transition-colors hover:text-white">
                <iconify-icon icon="solar:letter-bold" width="16" height="16"></iconify-icon>
                info@malharbaug.com
              </a>
            </div>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
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
            <div key={group.heading}>
              <p className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-300">
                {group.heading}
              </p>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-sans text-sm text-brand-200 transition-colors duration-200 ease-out hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center sm:text-left">
          <p className="font-sans text-xs text-brand-300">
            &copy; 2024 Malhar Baug Resort. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
