import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';

type ContactCard = {
  label: string;
  value: string;
  href: string;
};

export function ManageBookingSection({
  eyebrow,
  heading,
  intro,
  contact,
  action,
}: {
  eyebrow: string;
  heading: string;
  intro: string;
  contact: readonly ContactCard[];
  action: string;
}) {
  return (
    <main className="bg-cream px-5 pb-24 pt-36 md:px-10 md:pt-44">
      <section className="mx-auto max-w-[900px]">
        <p className="font-mono-label text-[10px] text-terracotta">{eyebrow}</p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl sm:text-6xl md:text-8xl leading-tight sm:leading-[.9] text-forest">{heading}</h1>
        <p className="mt-5 max-w-xl text-sm sm:text-base leading-7 text-sage-muted">{intro}</p>

        <div className="mt-10 sm:mt-12 grid gap-4 md:grid-cols-2">
          {contact.map(({ label, value, href }, index) => (
            <a key={label} href={href} className="group border border-forest/15 p-5 sm:p-6 transition-colors hover:border-terracotta">
              {index === 0 ? <Phone className="h-5 w-5 text-terracotta" /> : <Mail className="h-5 w-5 text-terracotta" />}
              <p className="mt-4 sm:mt-6 font-mono-label text-[10px] text-terracotta">{label}</p>
              <p className="mt-2 font-display text-xl sm:text-2xl md:text-3xl text-forest break-all">{value}</p>
            </a>
          ))}
        </div>

        <Link href="/contact" className="text-link mt-10 inline-flex">{action} <span aria-hidden>→</span></Link>
      </section>
    </main>
  );
}