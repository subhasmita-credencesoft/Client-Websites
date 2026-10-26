import { site } from "@/data/site";
import type { EnquiryInput } from "@/lib/validation/schemas";

const subjects: Record<EnquiryInput["type"], string> = {
  general: "Website enquiry",
  event: "Event enquiry",
  meeting: "Corporate / meeting enquiry",
  "booking-request": "Booking request",
};

/** Plain-text body for the email the guest sends from their own mail app. */
export function buildEnquiryBody(d: EnquiryInput): string {
  const lines: string[] = [`Name: ${d.name}`, `Email: ${d.email}`, `Phone: ${d.phone}`];
  if (d.type === "booking-request") {
    if (d.roomName) lines.push(`Room: ${d.roomName}`);
    lines.push(`Check-in: ${d.checkIn}`, `Check-out: ${d.checkOut}`, `Adults: ${d.adults ?? 1}`, `Children: ${d.children ?? 0}`);
  }
  if (d.type === "event" || d.type === "meeting") {
    if (d.eventType) lines.push(`Event type: ${d.eventType}`);
    lines.push(`Event date: ${d.eventDate}`);
    if (d.guestCount) lines.push(`Approx. guests: ${d.guestCount}`);
  }
  if (d.message) lines.push("", d.message);
  return lines.join("\n");
}

export function buildMailto(d: EnquiryInput): string {
  const subject = `${subjects[d.type]} — ${d.name}`;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildEnquiryBody(d))}`;
}
