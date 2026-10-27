import { site } from "./site";

export interface LegalSection {
  heading: string;
  body: string | string[];
  bullets?: string[];
}

export const legalNotice = "Official policy document of Hotel The Taksonz, Ludhiana. In effect from October 2026.";

export const legal: Record<"privacy" | "terms" | "cancellation", LegalSection[]> = {
  privacy: [
    {
      heading: "Introduction & Scope of Policy",
      body: [
        `Hotel The Taksonz ("we", "our", or "the hotel"), located on Grand Trunk Road, Ludhiana, Punjab 141008, is dedicated to protecting the privacy, confidentiality, and security of all personal data shared by our guests and website visitors.`,
        `This Privacy Policy details how we collect, store, handle, and safeguard your personal information when you browse our website (${site.url}), submit enquiries, make reservations, or stay as a resident guest at our property, in accordance with the Information Technology Act, 2000, and the Digital Personal Data Protection Act (DPDP), 2023 of India.`,
      ],
    },
    {
      heading: "Information We Collect",
      body: [
        "To process your reservations, provide personalized hospitality, and meet statutory Indian hotel regulations, we collect the following categories of information:",
      ],
      bullets: [
        "Personal Contact Information: Full name, phone number, email address, permanent residential address, and emergency contact details.",
        "Government-Mandated Photo Identification: Under Indian law and local Punjab Police directives, all resident guests must present an authorized government-issued photo ID upon check-in (Aadhaar Card, Passport, Voter ID, or Driving License). For foreign nationals, Passport and valid Indian Visa / OCI details are recorded in Form C.",
        "Booking & Stay Specifics: Dates of arrival and departure, room type preferences, guest count, flight or train timings, special culinary or accessibility requests, and vehicle registration numbers.",
        "Corporate & Billing Details: Company name, GST identification number (GSTIN), and corporate address for itemized tax invoicing.",
        "Digital & Browsing Data: IP address, device type, browser specifications, and referral URLs gathered automatically through standard server logs to maintain website security.",
      ],
    },
    {
      heading: "How We Collect Your Information",
      body: [
        "We collect personal information directly through transparent, lawful interactions with you:",
      ],
      bullets: [
        "Online enquiry forms submitted through this website for rooms, banquets, and corporate meetings.",
        "Direct communications with our reservations desk via telephone, WhatsApp, or email.",
        "Reservations made through our authorized booking engine partner (BookOne).",
        "Official Guest Registration Cards (GRC) completed at our front desk upon arrival.",
      ],
    },
    {
      heading: "How We Use Your Information",
      body: [
        "Your personal data is used solely for legitimate business, hospitality, and regulatory purposes:",
      ],
      bullets: [
        "Processing, confirming, and managing your room reservations, dining tables, and banquet bookings.",
        "Sending booking confirmations, arrival directions, invoice receipts, and important stay reminders.",
        "Complying with statutory guest registration duties mandated by Indian police and municipal authorities.",
        "Issuing verified GST-compliant invoices for business expense reimbursement.",
        "Improving our overall service quality, website performance, and guest comfort.",
      ],
    },
    {
      heading: "Payment Processing & Financial Security",
      body: [
        "When making room reservations through our website, transactions are handled through our certified, PCI-DSS compliant booking partner (BookOne) and licensed banking payment gateways.",
        "Hotel The Taksonz does not collect, record, or store complete credit/debit card numbers, CVV codes, or net banking passwords on this website. On-site payments at the property are processed through encrypted, bank-grade point-of-sale (POS) terminals or secure UPI transfers.",
      ],
    },
    {
      heading: "Information Sharing & Third-Party Disclosure",
      body: [
        "We maintain a strict policy against selling, renting, trading, or distributing guest personal data to third-party marketing companies.",
        "Information is shared strictly on a need-to-know basis with trusted technology partners who support our hotel operations (such as property management systems and booking engines), or when legally compelled by law enforcement agencies, tax authorities, or court orders under Indian jurisdiction.",
      ],
    },
    {
      heading: "Data Protection & Retention",
      body: [
        "We implement robust electronic, physical, and administrative measures to protect your personal information against unauthorized access, loss, misuse, or alteration.",
        "Guest records and registration cards are retained for the statutory duration mandated by Indian law and hotel regulations, after which they are securely deleted or shredded in accordance with our data disposal protocol.",
      ],
    },
    {
      heading: "Your Rights & Contact Information",
      body: [
        "You have the right to request access to the personal data we hold about you, request corrections to inaccurate records, or seek clarification regarding our privacy practices.",
        `For any questions, corrections, or privacy-related requests, please reach out to our management desk at ${site.email} or call ${site.phone}.`,
      ],
    },
  ],

  terms: [
    {
      heading: "Agreement to Terms & Conditions",
      body: [
        `These Terms and Conditions govern your use of the Hotel The Taksonz website (${site.url}) and apply to all reservations, enquiries, accommodation, dining, and event services provided by Hotel The Taksonz, located on Grand Trunk Road, Ludhiana, Punjab 141008.`,
        "By accessing this website, submitting an enquiry, or making a reservation at our property, you acknowledge that you have read, understood, and agreed to these terms.",
      ],
    },
    {
      heading: "Reservations & Booking Confirmation",
      body: [
        "Submitting an enquiry or booking request on this website does not automatically constitute a confirmed reservation. A reservation is legally confirmed only when you receive an official booking confirmation voucher or written acknowledgement from Hotel The Taksonz or our verified booking partner.",
        "All room rates displayed on the website are indicative and subject to applicable Goods and Services Tax (GST). Confirmed rates, inclusions, and payment schedules will be clearly stated on your booking voucher.",
      ],
    },
    {
      heading: "Check-in, Check-out & Identification Requirements",
      body: [
        "To ensure compliance with local police directives and national hospitality standards, all resident guests must observe the following check-in guidelines:",
      ],
      bullets: [
        "Standard Timings: Check-in begins at 12:00 PM (Noon), and check-out is by 11:00 AM.",
        "Early Check-in / Late Check-out: Subject to room availability on the date of arrival/departure and may attract nominal hourly charges.",
        "Mandatory Government Photo ID: Every adult guest (18 years and above) must present an original valid government-issued photo ID with address proof at check-in.",
        "Accepted IDs for Indian Citizens: Aadhaar Card, Passport, Voter ID Card, or Driving License. (Note: PAN cards are not accepted as valid identity/address proof under Indian hotel regulations).",
        "Accepted IDs for International Guests: Valid Passport along with a current Indian Visa or OCI card. Foreign nationals must complete Form C registration at the front desk.",
      ],
    },
    {
      heading: "Occupancy, Children & Extra Bed Policy",
      body: [
        "Rooms must not be occupied by more guests than stated on the confirmed reservation voucher:",
      ],
      bullets: [
        "Children up to 6 years of age stay complimentary when sharing existing bedding with parents.",
        "Children aged 6 years and above, or extra adult occupants, require an extra bed/mattress and are charged according to the selected meal plan.",
        "Maximum occupancy limits per room category must be strictly respected for safety and comfort.",
      ],
    },
    {
      heading: "Guest Conduct & Visitor Policy",
      body: [
        "Hotel The Taksonz strives to maintain a serene, family-friendly, and secure environment for all patrons:",
      ],
      bullets: [
        "Non-Resident Visitors: In the interest of resident safety, visitors not registered on the guest registration card are not permitted in guest rooms between 10:00 PM and 7:00 AM. Visitors may be entertained in the lobby or restaurant.",
        "Right of Admission: The hotel management reserves the right of admission and may refuse service or request the departure of any guest engaging in unlawful, disruptive, or hazardous behavior without liability for refunds.",
        "Quiet Hours: Guests are requested to respect quiet hours between 10:30 PM and 6:30 AM in room corridors.",
      ],
    },
    {
      heading: "Banquets & Corporate Events",
      body: [
        "For event bookings in our Grand Banquet Hall or Corporate Training & Conferences room, specific terms apply:",
      ],
      bullets: [
        "Event confirmation requires an advance booking deposit agreed upon in the banquet contract.",
        "Event organizers must adhere to local municipal sound and noise regulations (amplified music cutoff at 10:00 PM).",
        "External decorators, photographers, and audio-visual equipment must be pre-approved by the hotel events coordinator.",
      ],
    },
    {
      heading: "Valuables & Property Damage",
      body: [
        "Guests are strongly advised to secure valuable possessions, electronic devices, and jewelry in in-room lockers or front desk safety deposit vaults. The hotel management cannot assume liability for items left unattended in common areas.",
        "Any intentional or negligent damage caused to hotel property, furniture, electronics, or linens by a guest or their invitees will be assessed and added to the guest's folio prior to departure.",
      ],
    },
    {
      heading: "Governing Law & Jurisdiction",
      body: [
        "These Terms and Conditions and any dispute or claim arising out of your booking, stay, or use of this website shall be governed by and construed in accordance with the laws of India.",
        "The courts of Ludhiana, Punjab shall have exclusive jurisdiction over any legal matters arising hereunder.",
      ],
    },
  ],

  cancellation: [
    {
      heading: "Overview & Cancellation Policy Scope",
      body: [
        `At Hotel The Taksonz, we understand that travel itineraries can change unexpectedly. Because rooms and event spaces are held exclusively for confirmed guests, cancellations and refunds are administered in accordance with this policy.`,
        "Different cancellation terms apply to individual room bookings, peak season dates, and banquet events as described below.",
      ],
    },
    {
      heading: "Individual Room Bookings (Standard Rates)",
      body: [
        "For standard flexible individual bookings (FIT) made directly through our website, phone, or email:",
      ],
      bullets: [
        "Free Cancellation Window: You may cancel your reservation free of charge up to 24 hours prior to your scheduled check-in time (before 12:00 PM of the day prior to arrival). A 100% refund of any advance payment will be initiated.",
        "Late Cancellation: If a cancellation notice is received less than 24 hours before the scheduled check-in time, a cancellation charge equivalent to one night's room tariff (plus applicable taxes) will be retained.",
        "No-Show Policy: Guests who fail to arrive on their scheduled arrival date without prior written or telephonic intimation will be marked as a 'No-Show', and the advance amount or first night's room charge will be forfeited.",
      ],
    },
    {
      heading: "Peak Season, Festival & Non-Refundable Rates",
      body: [
        "Reservations made under promotional discounted rates, special corporate event packages, or during peak dates (such as PAU Kisan Mela dates, wedding season dates, or festival holidays) may carry Non-Refundable terms.",
        "Any non-refundable terms will be clearly displayed before booking confirmation. Non-refundable reservations cannot be cancelled, amended, or refunded once confirmed.",
      ],
    },
    {
      heading: "Banquet Halls & Group Event Bookings",
      body: [
        "Due to the specialized preparation, catering arrangements, and exclusive hall blocking involved for functions in our Grand Banquet Hall or Corporate Training Room, the following cancellation schedule applies:",
      ],
      bullets: [
        "30 Days or More Prior to Function: 90% of the advance deposit will be refunded (10% retained towards administrative costs).",
        "15 to 29 Days Prior to Function: 50% of the advance deposit will be retained as cancellation charges.",
        "Less than 15 Days Prior to Function: The full advance deposit is non-refundable.",
        "Date Rescheduling: Requests to reschedule event dates are subject to venue availability and mutual written agreement with the events management desk.",
      ],
    },
    {
      heading: "Early Departure Policy",
      body: [
        "Guests wishing to check out earlier than their confirmed departure date must notify the front desk at least 24 hours in advance. If notification is not provided, the hotel reserves the right to charge one subsequent night's room tariff.",
      ],
    },
    {
      heading: "Refund Processing & Timelines",
      body: [
        "Approved refunds are processed exclusively back to the original source account or payment method (credit/debit card, net banking, or UPI) used to make the booking.",
        "Refund requests are processed by our accounts department within 7 to 10 working days, after which standard bank clearance cycles apply. Cash refunds are strictly not issued for digital transactions.",
      ],
    },
    {
      heading: "How to Request a Cancellation or Amendment",
      body: [
        "To cancel or modify your reservation, please contact our front desk with your Booking ID, Guest Name, and Arrival Date through any of the following channels:",
      ],
      bullets: [
        `By Email: Send your request to ${site.email}`,
        `By Phone: Call our 24/7 reception desk at ${site.phone}`,
        `By WhatsApp: Message our front desk at ${site.whatsapp}`,
        `In Person: Visit the reception desk at Hotel The Taksonz, Grand Trunk Road, Ludhiana, Punjab 141008.`,
      ],
    },
  ],
};
