"use client";

import Link from "next/link";
import Container from "../../components/ui/Container";
import { usePropertyData } from "../../components/providers/PropertyDataProvider";
import PageHero from "../../components/sections/PageHero";
import { CONTACT_PAGE_DEFAULTS } from "../../data/pages/contact";
import useClientReady from "../../hooks/useClientReady";

function formatPhone(value: string | null | undefined) {
  if (!value) return "";
  const digitsOnly = value.replace(/\D/g, "");
  if (digitsOnly.length === 10) return `+91 ${digitsOnly.slice(0, 5)} ${digitsOnly.slice(5)}`;
  return value;
}

function compactAddress(parts: Array<string | null | undefined>) {
  return parts.filter(Boolean).join(", ");
}

function toTelHref(value: string) {
  return `tel:${value.replace(/\s+/g, "")}`;
}

function toWhatsAppHref(value: string) {
  const digitsOnly = value.replace(/\D/g, "");
  return `https://wa.me/${digitsOnly}`;
}

function buildMapHref(address: string, latitude?: string | null, longitude?: string | null) {
  if (latitude && longitude) {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

const HELP_POINTS = [
  "Room reservations, availability, and stay planning support",
  "Dining visits, celebrations, and event-related enquiries",
  "Picnic, day outing, and group booking assistance",
  "Directions, arrival guidance, and local travel help",
] as const;

export default function ContactPage() {
  const isClientReady = useClientReady();
  const { property } = usePropertyData();
  const activeProperty = isClientReady ? property : null;

  const hotelName = activeProperty?.name || "UK's Resort";
  const email = activeProperty?.email || CONTACT_PAGE_DEFAULTS.email;
  const phone1 = formatPhone(activeProperty?.mobile) || CONTACT_PAGE_DEFAULTS.phone1;
  const phone2 = formatPhone(activeProperty?.whatsApp) || CONTACT_PAGE_DEFAULTS.phone2;
  const address = compactAddress([
    activeProperty?.address?.streetName,
    activeProperty?.address?.suburb,
    activeProperty?.address?.city,
    activeProperty?.address?.state,
    activeProperty?.address?.country,
  ]);
  const addressLine1 = address || CONTACT_PAGE_DEFAULTS.address1;
  const addressLine2 =
    activeProperty?.address?.city && activeProperty?.address?.state
      ? `${activeProperty.address.city}, ${activeProperty.address.state}, ${activeProperty?.address?.country || "India"}`
      : CONTACT_PAGE_DEFAULTS.address2;
  const fullAddress = `${addressLine1}, ${addressLine2}`;
  const mapHref = buildMapHref(fullAddress, activeProperty?.latitude, activeProperty?.longitude);
  const primaryImage = activeProperty?.imageList?.[0]?.url || "/images/making-memories.jpg";
  const businessDescription =
    activeProperty?.businessDescription ||
    `${hotelName} brings together stays, dining, celebrations, and scenic experiences in Khopoli.`;
  const social = activeProperty?.socialMediaLinks?.[0];

  return (
    <>
      <PageHero
        title="Contact"
        backgroundImage="https://bookonelocal.in/cdn/4.png"
        backgroundVideo="https://bookonelocal.in/cdn/Contact-Us-Page.mp4"
        breadcrumb="Home / Contact"
      />

      <section className="bg-[#efeee9] py-14 text-[#123645] md:py-16">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-[1.8rem] border border-[#d8d4ca] bg-[#f8f5ef] p-7 text-center">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#123645]/55">
                Visit Us
              </p>
              <h2 className="mt-4 font-serif text-[2.2rem] leading-none text-[#123645]">Address</h2>
              <div className="mt-5 space-y-2 text-[1.05rem] leading-relaxed text-[#123645]/70">
                <p>{addressLine1}</p>
                <p>{addressLine2}</p>
              </div>
              <Link
                href={mapHref}
                target="_blank"
                className="mt-6 inline-flex text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-[#c98141]"
              >
                Get Directions
              </Link>
            </article>

            <article className="rounded-[1.8rem] border border-[#d8d4ca] bg-[#f8f5ef] p-7 text-center">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#123645]/55">
                Write To Us
              </p>
              <h2 className="mt-4 font-serif text-[2.2rem] leading-none text-[#123645]">Email</h2>
              <div className="mt-5 space-y-2 text-[1.05rem] leading-relaxed text-[#123645]/70">
                <p>{email}</p>
                <p>{CONTACT_PAGE_DEFAULTS.secondaryEmail}</p>
              </div>
              <Link
                href={`mailto:${email}`}
                className="mt-6 inline-flex text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-[#c98141]"
              >
                Send Email
              </Link>
            </article>

            <article className="rounded-[1.8rem] border border-[#d8d4ca] bg-[#f8f5ef] p-7 text-center">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#123645]/55">
                Call Anytime
              </p>
              <h2 className="mt-4 font-serif text-[2.2rem] leading-none text-[#123645]">Phone</h2>
              <div className="mt-5 space-y-2 text-[1.05rem] leading-relaxed text-[#123645]/70">
                <p>{phone1}</p>
                <p>{phone2}</p>
              </div>
              <Link
                href={toTelHref(phone1)}
                className="mt-6 inline-flex text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-[#c98141]"
              >
                Call Now
              </Link>
            </article>
          </div>
        </Container>
      </section>

      <section className="bg-[#f6f3ed] py-20 text-[#1f3c44] md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="overflow-hidden rounded-[2rem] border border-[#d7d2c5] bg-white/80">
              <div
                className="min-h-[20rem] bg-cover bg-center md:min-h-[25rem]"
                style={{ backgroundImage: `url(${primaryImage})` }}
                role="img"
                aria-label={hotelName}
              />
            </div>

            <div className="space-y-7">
              <div>
                <p className="text-[0.76rem] font-semibold uppercase tracking-[0.36em] text-[#c98141]">
                  Plan Your Stay
                </p>
                <h2 className="mt-4 max-w-[12ch] font-serif text-[2.8rem] leading-[0.94] text-[#1f3c44] sm:text-[3.5rem]">
                  A more personal way to reach us
                </h2>
                <p className="mt-5 max-w-2xl text-[1.05rem] leading-8 text-[#1f3c44]/72">
                  {businessDescription}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {HELP_POINTS.map((point) => (
                  <div
                    key={point}
                    className="rounded-[1.4rem] border border-[#ddd6c9] bg-white/70 px-5 py-4 text-sm leading-7 text-[#1f3c44]/78"
                  >
                    {point}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={mapHref}
                  target="_blank"
                  className="inline-flex items-center rounded-full border border-[#d8d4ca] bg-white px-6 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[#1f3c44] transition hover:border-[#c98141]"
                >
                  View Location
                </Link>
                <Link
                  href={toWhatsAppHref(phone2)}
                  className="inline-flex items-center rounded-full border border-[#d8d4ca] bg-white px-6 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[#1f3c44] transition hover:border-[#c98141]"
                >
                  WhatsApp Us
                </Link>
              </div>

              {(social?.instagram || social?.facebook || social?.youtube) && (
                <div className="flex flex-wrap items-center gap-4 border-t border-[#ddd6c9] pt-6 text-sm text-[#123645]/65">
                  <span className="font-semibold uppercase tracking-[0.22em] text-[#123645]/50">
                    Follow
                  </span>
                  {social.instagram && (
                    <Link href={social.instagram} target="_blank" className="transition hover:text-[#123645]">
                      Instagram
                    </Link>
                  )}
                  {social.facebook && (
                    <Link href={social.facebook} target="_blank" className="transition hover:text-[#123645]">
                      Facebook
                    </Link>
                  )}
                  {social.youtube && (
                    <Link href={social.youtube} target="_blank" className="transition hover:text-[#123645]">
                      YouTube
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
