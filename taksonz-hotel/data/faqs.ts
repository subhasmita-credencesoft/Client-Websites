export interface Faq {
  q: string;
  a: string;
  topic: "booking" | "rooms" | "dining" | "events" | "general";
}

export const faqs: Faq[] = [
  {
    topic: "booking",
    q: "How do I book a stay?",
    a: "Choose your dates and guests on the booking panel, pick a room and send a booking request. The hotel's reservations team confirms availability, the final rate and payment details with you.",
  },
  {
    topic: "booking",
    q: "What are the check-in and check-out times?",
    a: "Check-in and check-out times are confirmed by the hotel when you book. Please contact the hotel if you need an early arrival or late departure.",
  },
  {
    topic: "booking",
    q: "Can I cancel or change my booking?",
    a: "Cancellation and change terms depend on the rate you book. Please read our cancellation policy and ask the hotel to confirm the terms for your stay.",
  },
  {
    topic: "rooms",
    q: "What is included in the room?",
    a: "Rooms include air conditioning, free Wi-Fi, a flat-screen TV, a work desk, a tea and coffee maker and room service. Exact inclusions per room type are listed on each room page.",
  },
  {
    topic: "dining",
    q: "Is dining available at the hotel?",
    a: "Yes. The Taksonz Restaurant serves local and international cuisine. Contact the hotel for current opening hours and table reservations.",
  },
  {
    topic: "events",
    q: "How do I plan a wedding or corporate event?",
    a: "Send us an enquiry with your date, event type and approximate guest count. Our events team will respond with availability and options.",
  },
  {
    topic: "general",
    q: "Where is the hotel located?",
    a: "The Taksonz is on Ferozepur Road in Ludhiana, Punjab. See the location page for the address and map.",
  },
];

export const faqsByTopic = (...topics: Faq["topic"][]) => faqs.filter((f) => topics.includes(f.topic));
