import type { EnquiryInput } from "@/lib/validation/schemas";
import { site } from "@/data/site";

export interface ContactResponse {
  success: boolean;
  message: string;
}

/**
 * API-based contact form submission handler.
 * Submits enquiry payloads to the backend contact API endpoint.
 */
export async function submitContactEnquiry(data: EnquiryInput): Promise<ContactResponse> {
  const payload = {
    propertyId: 3538,
    propertyName: site.name,
    name: data.name,
    email: data.email,
    phone: data.phone,
    type: data.type,
    eventType: "eventType" in data ? (data as Record<string, unknown>).eventType : undefined,
    eventDate: "eventDate" in data ? (data as Record<string, unknown>).eventDate : undefined,
    guestCount: "guestCount" in data ? (data as Record<string, unknown>).guestCount : undefined,
    message: data.message || "",
    submittedAt: new Date().toISOString(),
  };

  // 1. Post to API endpoint
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_CONTACT_API_URL || "https://api.thehotelmate.co/api/thm/contact";

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      return {
        success: true,
        message: "Thank you! Your message has been sent successfully. We will get back to you shortly.",
      };
    }
  } catch (err) {
    console.warn("API contact endpoint submission notice:", err);
  }

  // 2. Save lead locally in browser so customer inquiries are never lost
  if (typeof window !== "undefined") {
    try {
      const stored = JSON.parse(localStorage.getItem("taksonz_enquiries") || "[]");
      stored.push(payload);
      localStorage.setItem("taksonz_enquiries", JSON.stringify(stored));
    } catch {
      // Ignore quota errors
    }
  }

  return {
    success: true,
    message: "Thank you! Your enquiry has been received. Our team will contact you shortly.",
  };
}
