import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { breadcrumbSchema, jsonLd, SITE_URL } from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Privacy Policy | Redwings Studio Goa — Data Protection",
  description:
    "Read the privacy policy for Redwings Studio, Arpora, Goa. Learn how we collect, use, and protect your personal information.",
  keywords: [
    "Privacy Policy Redwings Studio",
    "Data Protection Goa Hotel",
    "Privacy Policy Arpora",
  ],
  alternates: { canonical: "https://redwingsstudio.com/privacy-policy" },
  openGraph: {
    title: "Privacy Policy — Redwings Studio Goa",
    description: "Privacy policy for Redwings Studio, Arpora, Goa.",
    images: [
      {
        url: "/mountain-studio/hero-main.jpeg",
        width: 1200,
        height: 630,
        alt: "Privacy Policy — Redwings Studio Goa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — Redwings Studio Goa",
    description: "Privacy policy for Redwings Studio, Arpora, Goa.",
    images: ["/mountain-studio/hero-main.jpeg"],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Privacy Policy", url: `${SITE_URL}/privacy-policy` },
            ])
          ),
        }}
      />
      <PageHero
        image="/mountain-studio/hero-main.jpeg"
        eyebrow="Policy"
        title="Privacy Policy"
        description="How Redwings Studio collects, uses, and protects your personal information."
        priority
      />

      <section className="section-space">
        <div className="container-shell mx-auto max-w-3xl">
          <div className="space-y-8 text-base leading-8 text-ivory/72">
            <div>
              <h2 className="font-display text-3xl text-ivory mb-4">Information We Collect</h2>
              <p>
                When you contact Redwings Studio via phone, email, or our website booking form, we may collect
                your name, email address, phone number, booking dates, and any other information you provide
                to assist with your stay enquiry or reservation.
              </p>
            </div>

            <div>
              <h2 className="font-display text-3xl text-ivory mb-4">How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="mt-4 space-y-2 list-disc list-inside">
                <li>Process and manage your booking or enquiry</li>
                <li>Communicate with you about your reservation</li>
                <li>Provide customer support and assistance</li>
                <li>Improve our services and guest experience</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-3xl text-ivory mb-4">Information Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties.
                Your information may be shared only with service providers directly involved
                in fulfilling your booking, such as our booking engine provider.
              </p>
            </div>

            <div>
              <h2 className="font-display text-3xl text-ivory mb-4">Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information.
                However, no method of transmission over the internet is 100% secure,
                and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="font-display text-3xl text-ivory mb-4">Contact Us</h2>
              <p>
                If you have any questions about this privacy policy, please contact us:
              </p>
              <ul className="mt-4 space-y-2 list-disc list-inside">
                <li>Phone: +91 9167680996</li>
                <li>Email: psomvanshi9@gmail.com</li>
                <li>Address: House No. 275/1, F30, Abalone Resort, Gorbhat, Goa - 403516</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
