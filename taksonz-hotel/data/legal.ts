import { site } from "./site";

export interface LegalSection {
  heading: string;
  body: string;
}

/** Draft legal copy. Must be reviewed and approved by the hotel and a legal adviser before launch. */
export const legalNotice = "Draft template. This text must be reviewed and approved by the hotel and a qualified legal adviser before launch.";

export const legal: Record<"privacy" | "terms" | "cancellation", LegalSection[]> = {
  privacy: [
    { heading: "What we collect", body: "When you send an enquiry or booking request we use the details you enter: your name, email address, telephone number, stay or event details and any message." },
    { heading: "How we use it", body: "Enquiry forms on this website create an email from your own email app, addressed to the hotel. We use these details only to respond to your enquiry. We do not collect payment card details on this website." },
    { heading: "Cookies and analytics", body: "This website does not set analytics or advertising cookies." },
    { heading: "Sharing and retention", body: "Details you email to the hotel are handled by the hotel's team and systems. Retention periods are to be confirmed by the hotel." },
    { heading: "Your rights and contact", body: `To ask about or request changes to your information, contact ${site.email}.` },
  ],
  terms: [
    { heading: "Use of this website", body: "The information on this website is provided for general guidance. Rates, availability, capacities and services may change and are confirmed by the hotel at the time of booking." },
    { heading: "Enquiries and booking requests", body: "Submitting an enquiry or booking request does not create a confirmed reservation. A reservation exists only when the hotel confirms it in writing." },
    { heading: "Hotel policies", body: "Check-in and check-out times, identification requirements, and child, extra-bed and pet policies are confirmed by the hotel and apply to every stay." },
    { heading: "Images", body: "Photographs and video on this website are stock media and may not show the hotel itself." },
    { heading: "Contact", body: `Questions about these terms: ${site.email}.` },
  ],
  cancellation: [
    { heading: "Room bookings", body: "Cancellation windows, charges and refund timelines depend on the rate you book and are confirmed by the hotel before you pay. [Hotel to supply: standard cancellation window, no-show charge, refund method and timeline.]" },
    { heading: "Banquets and events", body: "Event deposits, cancellation schedules and refund terms are agreed in writing with the events team. [Hotel to supply.]" },
    { heading: "How to cancel or amend", body: `Contact the hotel on ${site.phone} or ${site.email} with your booking details.` },
  ],
};
