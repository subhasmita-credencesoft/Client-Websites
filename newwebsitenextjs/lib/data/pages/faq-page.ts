export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  category: string;
  items: FaqItem[];
};

export const faqData: FaqCategory[] = [
  {
    category: "Booking & Packages",
    items: [
      {
        question: "How do I book a stay or wedding at The Mountain Resort in Karjat?",
        answer:
          "You can check availability through our booking page or call +91 9833866655 directly. A 50% advance secures your preferred dates. The remaining balance is completed before check-in after headcount confirmation.",
      },
      {
        question: "What is included in the wedding packages?",
        answer:
          "All packages include on-site accommodation, five curated daily meals (lunch, hi-tea, starters, dinner, and breakfast), venue access, and hospitality services. Classic, Signature, and Premium Luxe tiers offer progressively richer dining experiences with additional starters, gravies, and live counters.",
      },
      {
        question: "What are the wedding package prices?",
        answer:
          "Weekday pricing: Classic at Rs. 4,500 per person, Signature at Rs. 5,500 per person, and Premium Luxe at Rs. 6,500 per person. Weekend pricing: Classic at Rs. 5,500 per person, Signature at Rs. 6,500 per person, and Premium Luxe at Rs. 7,500 per person. Pricing is per person per day.",
      },
      {
        question: "Can I customise a package?",
        answer:
          "Yes. Additional items and hospitality upgrades can be customised as per preference and are charged separately on a per-person, per-day basis. Contact the team to discuss specific requirements.",
      },
      {
        question: "What is the cancellation and rescheduling policy?",
        answer:
          "Date rescheduling is subject to availability. Please contact the team directly for cancellation and rescheduling terms. We recommend booking early to secure your preferred dates, especially during peak wedding season.",
      },
    ],
  },
  {
    category: "Accommodation & Rooms",
    items: [
      {
        question: "What types of rooms are available?",
        answer:
          "The Mountain offers five room categories: Standard Room (Rs. 5,000), Cliff View Room (Rs. 6,500), Family Room (Rs. 10,000), Glass Jacuzzi Room (Rs. 2,000 add-on), and a private Bungalow (Rs. 20,000). All rooms include air conditioning, Wi-Fi, flat-screen TV, geyser, and room service.",
      },
      {
        question: "What is the check-in and check-out time?",
        answer:
          "Check-in begins at 2:00 PM and check-out is at 11:00 AM. The estate uses this window to prepare rooms and event spaces for incoming guests.",
      },
      {
        question: "Is Wi-Fi available in the rooms?",
        answer:
          "Yes, reliable Wi-Fi access is available across the property, including all room categories, event spaces, and common areas.",
      },
      {
        question: "How many rooms does the property have?",
        answer:
          "The Mountain has 30+ rooms across five categories, providing accommodation for wedding guests, family groups, couples, and individual travellers.",
      },
    ],
  },
  {
    category: "Venue & Events",
    items: [
      {
        question: "Does the venue support multiple wedding functions?",
        answer:
          "Yes. The Mountain has dedicated zones for Haldi, Mehendi, Sangeet, Cocktail Night, wedding ceremonies, and receptions. Each function can have its own space, setup, and atmosphere within the same estate.",
      },
      {
        question: "Is there a sound restriction or music license requirement?",
        answer:
          "No. The Mountain offers unlimited music hours with zero sound license requirement. You can enjoy music across your celebration without additional permits or restricted hours.",
      },
      {
        question: "Is the pool available during events?",
        answer:
          "Yes. The pool offers 24x7 access for wedding groups and stay guests. The poolside area also serves as a celebration zone for cocktail evenings, music nights, and rain-dance moments.",
      },
      {
        question: "Is outside catering allowed?",
        answer:
          "Outside catering is not permitted with package bookings. All dining is managed through the resort's curated meal packages, ensuring consistent quality and seamless service throughout your stay.",
      },
      {
        question: "Can decorators and external vendors be used?",
        answer:
          "Decorators and vendors require prior venue approval. Please coordinate with the event team to discuss vendor arrangements and ensure smooth setup for your celebration.",
      },
    ],
  },
  {
    category: "Location & Travel",
    items: [
      {
        question: "Where is The Mountain Resort located?",
        answer:
          "The Mountain Resort in Karjat, By Redwings is located in Karjat, Maharashtra, India. The resort sits in the Sahyadri foothills with mountain and valley-facing views across a 7-acre private estate.",
      },
      {
        question: "How far is the resort from Mumbai?",
        answer:
          "The resort is approximately 2 to 3 hours from Mumbai by road, depending on traffic and your specific pickup point. Guests from Navi Mumbai and Thane may find travel times slightly shorter.",
      },
      {
        question: "How far is the resort from Pune?",
        answer:
          "The resort is approximately 2 to 2.5 hours from Pune by road, making it convenient for Pune-based guests, wedding parties, and weekend travellers.",
      },
      {
        question: "Is parking available at the resort?",
        answer:
          "Yes, the resort provides on-site parking for guests. Please contact the team before arrival for any specific vehicle arrangements or large group parking requirements.",
      },
    ],
  },
  {
    category: "Dining & Meals",
    items: [
      {
        question: "How many meals are included in the packages?",
        answer:
          "Every package includes five curated meal services: lunch, hi-tea (tea or coffee with two snacks), starters, dinner, and breakfast. Signature and Premium Luxe tiers add extra starters, gravies, and live counters.",
      },
      {
        question: "Can dietary requirements be accommodated?",
        answer:
          "Yes. The resort's kitchen team can accommodate common dietary requirements. Please communicate specific needs during booking so the team can plan accordingly.",
      },
      {
        question: "Is room service available?",
        answer:
          "Yes, responsive housekeeping and on-property guest assistance, including room service, are available throughout your stay.",
      },
    ],
  },
  {
    category: "Policies & Guidelines",
    items: [
      {
        question: "Is a government ID required at check-in?",
        answer:
          "Yes, all staying guests are required to present a valid government-issued ID at check-in as part of standard resort protocols.",
      },
      {
        question: "Are there any property damage policies?",
        answer:
          "Yes, property damage is chargeable. Guests are expected to treat the estate with care. Smoking is permitted only in designated areas, and personal belongings remain the responsibility of the guest.",
      },
      {
        question: "Is the resort suitable for intimate gatherings?",
        answer:
          "Absolutely. The Mountain accommodates both intimate celebrations and larger gatherings. The private-estate booking model works especially well for smaller, more personal events where exclusivity and attention to detail matter most.",
      },
    ],
  },
];
