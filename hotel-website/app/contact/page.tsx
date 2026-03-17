"use client";

import Container from "../../components/ui/Container";
import { usePropertyData } from "../../components/providers/PropertyDataProvider";
import PageHero from "../../components/sections/PageHero";

const DEFAULT_EMAIL = "info@uksresort.com";
const DEFAULT_PHONE_1 = "+91 98220 12343";
const DEFAULT_PHONE_2 = "+91 87798 14559";
const DEFAULT_ADDRESS_1 = "Old Mumbai - Pune Hwy";
const DEFAULT_ADDRESS_2 = "Khopoli, Maharashtra, India";

function formatPhone(value: string | null | undefined) {
  if (!value) return "";
  const digitsOnly = value.replace(/\D/g, "");
  if (digitsOnly.length === 10) return `+91 ${digitsOnly.slice(0, 5)} ${digitsOnly.slice(5)}`;
  return value;
}

function compactAddress(parts: Array<string | null | undefined>) {
  return parts.filter(Boolean).join(", ");
}

export default function ContactPage() {
  const { property } = usePropertyData();

  const email = property?.email || DEFAULT_EMAIL;
  const phone1 = formatPhone(property?.mobile) || DEFAULT_PHONE_1;
  const phone2 = formatPhone(property?.whatsApp) || DEFAULT_PHONE_2;
  const address = compactAddress([
    property?.address?.streetName,
    property?.address?.suburb,
    property?.address?.city,
    property?.address?.state,
    property?.address?.country,
  ]);
  const addressLine1 = address || DEFAULT_ADDRESS_1;
  const addressLine2 = property?.address?.city && property?.address?.state
    ? `${property.address.city}, ${property.address.state}, ${property?.address?.country || "India"}`
    : DEFAULT_ADDRESS_2;

  const contactInfo = [
    {
      title: "Address",
      lines: [addressLine1, addressLine2],
    },
    {
      title: "Write us",
      lines: [email, "reservations@uksresort.com"],
    },
    {
      title: "Phone",
      lines: [phone1, phone2],
    },
  ];

  return (
    <>
      <PageHero
        title="Contact"
        backgroundImage="https://bookonelocal.in/cdn/4.png"
        breadcrumb="Home / Contact"
      />

      <section className="bg-[#efeee9]">
        <Container className="grid gap-8 py-14 md:grid-cols-3 md:gap-0 md:py-16">
          {contactInfo.map((item, index) => (
            <div
              key={item.title}
              className={`text-center ${index < contactInfo.length - 1 ? "md:border-r md:border-[#d8d4ca]" : ""}`}
            >
              <h2 className="font-serif text-[2.6rem] leading-none text-[#123645]">{item.title}</h2>
              <div className="mt-6 space-y-2 text-[1.15rem] leading-relaxed text-[#123645]/70">
                {item.lines.map((line, lineIndex) => (
                  <p key={`${item.title}-${lineIndex}`}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-[#f3f2ee] py-20 md:py-24">
        <Container className="max-w-4xl">
          <div className="text-center">
            <p className="text-[0.82rem] font-semibold uppercase tracking-[0.38em] text-[#123645]">
              We Here To Help.
            </p>
            <h2 className="mx-auto mt-8 max-w-[10ch] font-serif text-[3.7rem] leading-[0.95] text-[#123645] sm:text-[4.2rem] md:text-[5rem]">
              Do you have any question
            </h2>
            <p className="mx-auto mt-8 max-w-3xl text-[1.2rem] leading-relaxed text-[#123645]/65">
              Please contact our reservations office for queries about room reservations or for more
              information about our experiences.
            </p>
          </div>

          <form className="mx-auto mt-16 max-w-4xl">
            <div>
              <label htmlFor="message" className="text-[2rem] font-medium text-[#123645]">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                className="mt-4 w-full resize-none border-0 border-b border-[#d6d0c4] bg-transparent px-0 py-3 text-[1.12rem] text-[#123645] placeholder:text-[#123645]/35 focus:outline-none focus:ring-0"
                placeholder="Write your message..."
              />
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-[2rem] font-medium text-[#123645]">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="mt-4 w-full border-0 border-b border-[#d6d0c4] bg-transparent px-0 py-3 text-[1.12rem] text-[#123645] placeholder:text-[#123645]/35 focus:outline-none focus:ring-0"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-[2rem] font-medium text-[#123645]">
                  Your E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="mt-4 w-full border-0 border-b border-[#d6d0c4] bg-transparent px-0 py-3 text-[1.12rem] text-[#123645] placeholder:text-[#123645]/35 focus:outline-none focus:ring-0"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-10 inline-flex items-center rounded-full bg-[#df984e] px-9 py-3.5 text-[0.9rem] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#d58b3f]"
            >
              Submit
              <span className="ml-2 text-[1rem] leading-none" aria-hidden="true">
                &rsaquo;
              </span>
            </button>
          </form>
        </Container>
      </section>
    </>
  );
}
