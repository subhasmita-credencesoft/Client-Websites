import type { Metadata } from "next";
import { FAQPageClient } from "./FAQPageClient";
import { breadcrumbSchema, faqSchema, jsonLd, SITE_URL } from "@/lib/structured-data";

const faqs = [
  {
    question: "Where is Redwings Studio located?",
    answer: "Redwings Studio is located at House No. 275/1, F30, Abalone Resort, Gorbhat, Goa - 403516."
  },
  {
    question: "How many rooms does Redwings Studio have?",
    answer: "Redwings Studio has 10 rooms under the Redwings banner, including Budget Double, Standard, Superior King, Standard Pool Access, and Superior Pool View rooms."
  },
  {
    question: "What are the check-in and check-out times?",
    answer: "Check-in is at 1:00 PM and check-out is at 11:00 AM."
  },
  {
    question: "What is the starting price for rooms?",
    answer: "Room rates start from ₹1,950 per night for the Budget Double Room. Prices vary by room type and season."
  },
  {
    question: "How can I book a room at Redwings Studio?",
    answer: "You can book directly by calling +91 9167680996, emailing psomvanshi9@gmail.com, or using the online booking engine on our website."
  },
  {
    question: "Is Redwings Studio suitable for families?",
    answer: "Yes, Redwings Studio is well-suited for couples, families, and small groups. The property offers 10 rooms with flexible occupancy for 20 couples plus 10 additional beds."
  },
  {
    question: "Does Redwings Studio offer group booking support?",
    answer: "Yes, the team provides direct coordination for group bookings, multi-room stays, and family reservations. Contact us directly for group planning."
  },
  {
    question: "What amenities are available at Redwings Studio?",
    answer: "Redwings Studio offers free Wi-Fi, private bathrooms with hot water geyser, flat-screen TV, room service, and access to common areas including the pool and garden."
  },
  {
    question: "Can I cancel or modify my booking?",
    answer: "Cancellation and modification policies depend on the booking type. Please contact our team directly at +91 9167680996 for cancellation requests."
  },
  {
    question: "Is parking available at Redwings Studio?",
    answer: "Please contact the property directly for parking availability and arrangements at +91 9167680996."
  }
];

export const metadata: Metadata = {
  title:
    "FAQ — Redwings Studio Goa | Rooms, Booking & Stay Questions",
  description:
    "Frequently asked questions about Redwings Studio, Arpora, Goa — room rates, check-in times, booking process, amenities, group stays, and cancellation policies. Budget stay near Baga Beach.",
  keywords: [
    "Redwings Studio FAQ",
    "Hotel FAQ Arpora Goa",
    "Booking Questions Goa",
    "Room Rates FAQ",
    "Check-in Time Goa Hotel",
    "Cancellation Policy Hotel",
    "Group Booking FAQ Goa",
    "Amenities FAQ Arpora",
  ],
  alternates: { canonical: "https://redwingsstudio.com/faq" },
  openGraph: {
    title: "FAQ — Redwings Studio Goa | Rooms, Booking & Stay Questions",
    description:
      "Answers to common questions about rooms, booking, and stays at Redwings Studio, Arpora, Goa.",
    images: [
      {
        url: "/mountain-studio/hero-main.jpeg",
        width: 1200,
        height: 630,
        alt: "FAQ — Redwings Studio Goa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ — Redwings Studio Goa",
    description: "Common questions about Redwings Studio, Arpora, Goa.",
    images: ["/mountain-studio/hero-main.jpeg"],
  },
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(faqSchema(faqs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "FAQ", url: `${SITE_URL}/faq` },
            ])
          ),
        }}
      />
      <FAQPageClient faqs={faqs} />
    </>
  );
}
