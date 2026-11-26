export interface FAQ {
  id: string;
  category: 'Booking & Policies' | 'Facilities & Stay' | 'Dining & Food' | 'Location & Travel';
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQ[] = [
  {
    id: 'faq-1',
    category: 'Booking & Policies',
    question: 'What are the check-in and check-out timings at Tarangan Resort?',
    answer:
      'Standard check-in time is 12:00 PM (Noon), and check-out time is 10:30 AM to 11:00 AM. Early check-in or late check-out is subject to room availability and prior arrangement with the management.',
  },
  {
    id: 'faq-2',
    category: 'Booking & Policies',
    question: 'Is Tarangan Resort pet-friendly?',
    answer:
      'Yes! Tarangan Resort warmly welcomes well-mannered pets. We have open lawns and garden pathways for them to enjoy. Please inform our front desk at the time of reservation so we can prepare suitable ground-floor cottage accommodations.',
  },
  {
    id: 'faq-3',
    category: 'Facilities & Stay',
    question: 'What are the swimming pool timings and safety rules?',
    answer:
      'Our outdoor swimming pool and kids pool are open daily from 07:00 AM to 09:00 PM. Proper nylon/lycra swimwear is mandatory. Children must always be accompanied by an adult in the pool area.',
  },
  {
    id: 'faq-4',
    category: 'Location & Travel',
    question: 'How far is Tarangan Resort from Nagaon Beach and Alibaug city?',
    answer:
      'Tarangan Resort is located on Sahan Bypass Road, Palhe, Nagaon — approximately 4.1 km (around 8 to 10 minutes drive) from Nagaon Beach, 5 km from Akshi Beach, and 8.7 km from Alibaug city center.',
  },
  {
    id: 'faq-5',
    category: 'Location & Travel',
    question: 'How do we reach Tarangan Resort from Mumbai via Ro-Ro ferry?',
    answer:
      'The most convenient way from Mumbai is the Mandwa Ro-Ro car ferry (M2M Ferries) from Bhaucha Dhakka (Ferry Wharf), Mumbai, to Mandwa Jetty (approx. 60 mins). From Mandwa, Tarangan Resort is a scenic 35-40 km drive (approx. 50 minutes) along the Alibag-Revdanda bypass.',
  },
  {
    id: 'faq-6',
    category: 'Dining & Food',
    question: 'Do you serve authentic Maharashtrian seafood and vegetarian food?',
    answer:
      'Yes, absolutely! Our in-house kitchen specializes in authentic coastal Maharashtrian Konkani cuisine, including fresh Surmai, Pomfret, Prawns, Kombdi Vade, and Solkadhi. We also take immense pride in preparing pure vegetarian and Jain thalis upon advance request.',
  },
  {
    id: 'faq-7',
    category: 'Facilities & Stay',
    question: 'Is there power backup and free parking at the resort?',
    answer:
      'Yes, we provide 100% heavy-duty silent generator power backup covering air conditioning, television, lighting, and Wi-Fi. We also offer ample free, secure on-site parking for all guest vehicles.',
  },
  {
    id: 'faq-8',
    category: 'Facilities & Stay',
    question: 'Can you arrange evening bonfires, barbeques, or birthday setups?',
    answer:
      'Yes! We frequently organize evening bonfires with music in our lawn area for families and groups. We can also assist with customized birthday decorations, cakes, and group dinners with prior notice.',
  },
];
