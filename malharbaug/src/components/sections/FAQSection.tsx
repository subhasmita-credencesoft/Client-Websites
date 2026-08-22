import Link from 'next/link';
import { faqs } from '@/data/faqs';
import JsonLd from '@/components/seo/JsonLd';
import { faqSchema } from '@/lib/schema';

export default function FAQSection() {
  return (
    <section id="faq" className="bg-earth-100 py-20 dark:bg-earth-800/30" aria-label="Frequently asked questions">
      <JsonLd data={faqSchema(faqs)} />
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-center font-sans text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          Good to Know
        </p>
        <h2 className="mt-2 text-center font-serif text-4xl font-bold text-earth-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-center font-sans text-base text-earth-600 dark:text-earth-300">
          Everything guests ask about staying at Malhar Baug Resort, Alibaug — rooms, pool, food, parking and Nagaon Beach.
        </p>

        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-neutral-200 bg-white px-6 py-4 transition-colors open:border-brand-400 dark:border-neutral-700 dark:bg-earth-900"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-sans text-base font-semibold text-earth-900 marker:hidden dark:text-white [&::-webkit-details-marker]:hidden">
                <h3 className="font-serif text-lg">{faq.question}</h3>
                <iconify-icon
                  icon="solar:add-circle-linear"
                  width="22"
                  height="22"
                  className="shrink-0 text-brand-600 transition-transform group-open:rotate-45 dark:text-brand-400"
                ></iconify-icon>
              </summary>
              <p className="mt-3 font-sans text-sm leading-relaxed text-earth-600 dark:text-earth-300">{faq.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-brand-200 bg-white p-8 text-center dark:border-brand-800 dark:bg-earth-900">
          <h3 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">Planning a Trip to Alibaug?</h3>
          <p className="mx-auto mt-2 max-w-xl font-sans text-sm leading-relaxed text-earth-600 dark:text-earth-300">
            Read our guides on the{' '}
            <Link href="/nearby" className="text-brand-600 underline hover:text-brand-700 dark:text-brand-400">
              best places to visit near Nagaon Beach
            </Link>{' '}
            and the{' '}
            <Link href="/travel-guide" className="text-brand-600 underline hover:text-brand-700 dark:text-brand-400">
              Alibaug travel guide
            </Link>
            , or browse our{' '}
            <Link href="/rooms" className="text-brand-600 underline hover:text-brand-700 dark:text-brand-400">
              rooms & villas
            </Link>{' '}
            to find your perfect stay.
          </p>
        </div>
      </div>
    </section>
  );
}
