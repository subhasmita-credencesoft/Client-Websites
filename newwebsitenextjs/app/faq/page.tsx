import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { GlobalPageSections } from "@/components/features/shared/global-page-sections";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { createPageMetadata } from "@/lib/metadata";
import { faqData } from "@/lib/data/pages/faq-page";

export const metadata: Metadata = createPageMetadata({
  title: "Frequently Asked Questions",
  path: "/faq",
  description:
    "Get answers to common questions about The Mountain Resort in Karjat — wedding packages, room rates, check-in times, dining, venue policies, and travel details for your destination stay.",
});

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.flatMap((category) =>
      category.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    ),
  };

  return (
    <main className="relative overflow-hidden bg-[#11100e] text-white">
      <div className="noise-overlay" />
      <SiteHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative min-h-[32rem] overflow-hidden pt-28 sm:pt-32 md:min-h-[40rem] md:pt-40" data-section-id="faq-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,164,110,0.12),transparent_38%),linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.56)_56%,rgba(0,0,0,0.92)_100%)]" />
        <div className="site-container relative z-10 flex min-h-[32rem] items-start pb-8 pt-16 md:min-h-[40rem] md:pb-12 md:pt-24">
          <div className="max-w-5xl" data-panel-content>
            <p className="site-eyebrow" data-panel-line>Questions & Answers</p>
            <h1 data-section-title data-panel-line className="max-w-5xl">
              Frequently Asked Questions
            </h1>
            <p className="site-copy-lg mt-5 max-w-4xl text-white/90" data-panel-line>
              Find answers to common questions about booking, accommodation, venues, dining, travel, and policies at The Mountain Resort in Karjat.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <Breadcrumbs items={[{ label: "FAQ" }]} />
      </div>

      <section className="mx-auto max-w-5xl px-4 py-16 md:px-8">
        <div className="space-y-16">
          {faqData.map((category) => (
            <div key={category.category} data-reveal>
              <div className="mb-10">
                <p className="text-xs font-semibold tracking-[0.2em] text-[#c9a46e]">{category.category}</p>
                <div className="mt-3 h-px w-16 bg-[#c9a46e]/40" />
              </div>
              <div className="space-y-6">
                {category.items.map((item) => (
                  <article
                    key={item.question}
                    className="rounded-[1.6rem] border border-white/10 bg-[#182920] p-8 transition-colors duration-500 hover:border-[#c9a46e]/25 md:p-10"
                    data-card
                  >
                    <h2 className="text-2xl leading-snug md:text-3xl">{item.question}</h2>
                    <p className="mt-5 text-lg leading-relaxed text-white/85 md:text-xl">{item.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 pt-4 text-center md:px-8" data-reveal>
        <div className="rounded-[2.4rem] border border-white/10 bg-[#182920] px-8 py-12 md:px-16 md:py-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#c9a46e]" data-reveal-child>Still Have Questions?</p>
          <h3 className="mx-auto mt-5 max-w-4xl text-3xl md:text-4xl" data-section-title data-reveal-child>
            Our team is happy to help with booking, packages, availability, and planning support
          </h3>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4" data-reveal-child>
            <Link href="/booking" className="inline-flex items-center justify-center border border-[#c8a871] bg-[#c8a871] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black">
              Check Availability
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white/88 transition-colors hover:border-[#c9a46e]/40 hover:text-white">
              Contact The Team
            </Link>
          </div>
        </div>
      </section>

      <GlobalPageSections hideContactAndStay hideReservation />
      <SiteFooter />
    </main>
  );
}
