import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { breadcrumbSchema, jsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Cancellation Policy | Redwings Studio Goa — Booking Terms",
  description:
    "Read the cancellation policy for Redwings Studio, Arpora, Goa. Understand booking modification, refund, and cancellation terms for your stay.",
  keywords: [
    "Cancellation Policy Redwings Studio",
    "Hotel Cancellation Policy Goa",
    "Booking Terms Arpora",
    "Refund Policy Hotel Goa",
  ],
  alternates: {
    canonical: "https://redwingsstudio.com/cancellation-policy",
  },
  openGraph: {
    title:
      "Cancellation Policy — Redwings Studio Goa | Booking Terms",
    description:
      "Cancellation and refund policy for Redwings Studio, Arpora, Goa.",
    images: [
      {
        url: "/mountain-studio/hero-main.jpeg",
        width: 1200,
        height: 630,
        alt: "Cancellation Policy — Redwings Studio Goa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cancellation Policy — Redwings Studio Goa",
    description: "Cancellation and refund policy for Redwings Studio, Goa.",
    images: ["/mountain-studio/hero-main.jpeg"],
  },
};

export default function CancellationPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Cancellation Policy", url: `${SITE_URL}/cancellation-policy` },
            ])
          ),
        }}
      />
      <PageHero
        image="/mountain-studio/hero-main.jpeg"
        eyebrow="Policy"
        title="Cancellation Policy"
        description="Important information about booking cancellations and modifications at Redwings Studio, Goa."
        priority
      />

      <section className="section-space">
        <div className="container-shell mx-auto max-w-3xl">
          <div className="space-y-8 text-base leading-8 text-ivory/72">
            <div>
              <h2 className="font-display text-3xl text-ivory mb-4">General Cancellation Terms</h2>
              <p>
                Cancellation policies may vary depending on the booking type, season, and rate plan selected at the time of reservation.
                Guests are advised to review the specific cancellation terms provided during booking confirmation.
              </p>
            </div>

            <div>
              <h2 className="font-display text-3xl text-ivory mb-4">How to Cancel or Modify</h2>
              <p>
                To cancel or modify a booking, please contact the Redwings Studio team directly:
              </p>
              <ul className="mt-4 space-y-2 list-disc list-inside">
                <li>Phone: +91 9167680996</li>
                <li>Phone: +91 9763988999</li>
                <li>Phone: +91 9833335933</li>
                <li>Email: psomvanshi9@gmail.com</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-3xl text-ivory mb-4">Refund Process</h2>
              <p>
                Refunds, where applicable, will be processed to the original payment method within 7-14 business days from the date of cancellation confirmation.
                The actual refund timeline may depend on your bank or payment provider.
              </p>
            </div>

            <div>
              <h2 className="font-display text-3xl text-ivory mb-4">No-Show Policy</h2>
              <p>
                Guests who do not check in on the reserved date without prior cancellation will be considered no-shows.
                The full reservation amount may be charged in such cases.
              </p>
            </div>

            <div>
              <h2 className="font-display text-3xl text-ivory mb-4">Contact Us</h2>
              <p>
                For any questions about cancellations, modifications, or refunds, please reach out to our team directly.
                We are available to assist you with your booking needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
