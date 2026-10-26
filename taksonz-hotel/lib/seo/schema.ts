import { site } from "@/data/site";
import { faqs } from "@/data/faqs";

/**
 * Structured data is emitted only when site.verified is true (data/site.ts), so unconfirmed
 * placeholder details never reach search engines. No ratings, reviews, prices or availability are included.
 */
export function hotelSchema(): Record<string, unknown> | null {
  if (!site.verified) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: site.name,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
  };
}

export function faqSchema(): Record<string, unknown> | null {
  if (!site.verified) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
