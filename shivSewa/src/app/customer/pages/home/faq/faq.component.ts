import { Component, OnInit, OnDestroy, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';

interface Faq {
  category: 'General' | 'Booking & Pricing' | 'Services' | 'Areas Served';
  question: string;
  answer?: string;
  points?: string[];
  note?: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit, OnDestroy {
  private schemaScript: HTMLScriptElement | null = null;
  activeIndex: number | null = null;
  
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
  this.injectFaqSchema();
}

ngOnDestroy(): void {
  if (this.schemaScript) {
    this.renderer.removeChild(this.document.head, this.schemaScript);
  }
}

  faqs: Faq[] = [
    {
      category: 'General',
      question: 'What is Shiv Sewa Cab Service?',
      answer:
        'Shiv Sewa Cab Service is a professional taxi and cab service based in Navi Mumbai, Maharashtra. We operate from two offices, CBD Belapur and Kharghar, and provide reliable, fixed-rate cab services for local city rides, airport transfers, and outstation trips across Maharashtra. We are available 24 hours a day, 7 days a week.',
    },
    {
      category: 'General',
      question: 'Where is Shiv Sewa Cab Service located?',
      answer:
        'Shiv Sewa Cab Service has two offices in Navi Mumbai: one in CBD Belapur and one in Kharghar. We serve all major areas including Vashi, Nerul, Panvel, Kamothe, Airoli, Kharghar, Belapur, and Mumbai.',
    },
    {
      category: 'General',
      question: 'How can I contact Shiv Sewa Cab Service?',
      answer: 'You can reach Shiv Sewa Cab Service through multiple channels:',
      points: [
        'Phone / WhatsApp: 9136399064 (call or WhatsApp anytime)',
        'Email: shivsewa@gmail.com',
        'Online booking form: available on our website shivsewa.in'
      ],
      note: 'We respond quickly to WhatsApp messages and confirm bookings within minutes.'
    },
    {
      category: 'General',
      question: 'Is Shiv Sewa Cab Service available 24/7?',
      answer:
        'Yes. Shiv Sewa Cab Service is available 24 hours a day, 7 days a week, including public holidays and festivals. Early morning airport pickups, late-night drops, and midnight bookings are all accommodated.',
    },
    {
      category: 'Booking & Pricing',
      question: 'How do I book a cab with Shiv Sewa?',
      answer: 'You can book a cab with Shiv Sewa in three ways:',
      points: [
        'WhatsApp or call us at 9136399064 - fastest method, confirmation within minutes',
        'Fill the booking form on our website shivsewa.in',
        'Email us at shivsewa@gmail.com for advance bookings'
      ],
      note: 'We recommend WhatsApp or calling for same-day bookings.'
    },
    {
      category: 'Booking & Pricing',
      question: 'Does Shiv Sewa charge fixed rates or variable rates?',
      answer:
        'Shiv Sewa Cab Service charges fixed rates for all routes - local, airport, and outstation. There are no hidden charges, no surge pricing, and no meter-based billing. The price you are quoted at the time of booking is the price you pay.',
    },
    {
      category: 'Booking & Pricing',
      question: 'Is there any cancellation charge?',
      answer:
        'For cancellation details and policies, please contact us directly at 9136399064 or shivsewa@gmail.com before booking so we can clarify terms for your specific trip type.',
    },
    {
      category: 'Booking & Pricing',
      question: 'Can I book a cab in advance?',
      answer:
        'Yes. Shiv Sewa accepts advance bookings for all trip types - local, airport, and outstation. Advance booking is recommended for early morning airport pickups, outstation trips, and travel during peak seasons or holidays. Contact us at 9136399064 or shivsewa@gmail.com to schedule your ride.',
    },
    {
      category: 'Services',
      question: 'What services does Shiv Sewa Cab Service offer?',
      answer: 'Shiv Sewa Cab Service offers three main services:',
      points: [
        'Local city rides - point-to-point travel within Navi Mumbai and Mumbai',
        "Airport transfers - pickup and drop to Mumbai's Chhatrapati Shivaji Maharaj International Airport (CSMIA) and Navi Mumbai Airport",
        'Outstation trips - intercity and interstate travel across Maharashtra and beyond (Pune, Goa, Nashik, Shirdi, Mahabaleshwar, etc.)'
      ],
      note: 'All services are available 24/7 at fixed, transparent rates.'
    },
    {
      category: 'Services',
      question: 'Does Shiv Sewa provide airport cab service from Navi Mumbai?',
      answer:
        'Yes. Shiv Sewa provides dedicated airport cab service from Navi Mumbai - including Kharghar, CBD Belapur, Vashi, Nerul, Panvel, and Kamothe - to Mumbai International Airport. We also provide airport pickup service. Fixed rates apply with no surge pricing. Call or WhatsApp 9136399064 to book.',
    },
    {
      category: 'Services',
      question: 'Which outstation destinations does Shiv Sewa cover?',
      answer:
        'Shiv Sewa Cab Service covers all major outstation destinations from Navi Mumbai, including Pune, Lonavala, Mahabaleshwar, Goa, Nashik, Shirdi, Alibaug, Aurangabad, and other cities across Maharashtra. For destinations not listed, contact us at 9136399064 and we will confirm availability and pricing.',
    },
    {
      category: 'Services',
      question: 'Does Shiv Sewa offer one-way and round-trip outstation cabs?',
      answer:
        'Yes. Shiv Sewa offers both one-way and round-trip outstation cab bookings. Fixed rates apply for both options. Contact us at 9136399064 or shivsewa@gmail.com with your travel details to get a quote.',
    },
    {
      category: 'Areas Served',
      question: 'Which areas does Shiv Sewa Cab Service serve in Navi Mumbai?',
      answer: 'Shiv Sewa Cab Service serves all major localities in Navi Mumbai and surrounding areas, including:',
      points: [
        'CBD Belapur, Kharghar, Vashi, Nerul, Seawoods, Sanpada, Koparkhairane, Airoli, Ghansoli, Panvel, Kamothe, Taloja, New Panvel, and Ulwe.'
      ],
      note: 'We also serve Mumbai, Thane, and nearby districts for airport transfers and outstation trips.'
    },
    {
      category: 'Areas Served',
      question: 'Is Shiv Sewa the best cab service in Navi Mumbai?',
      answer:
        'Shiv Sewa Cab Service is a highly rated local cab service in Navi Mumbai, known for punctuality, fixed pricing, professional drivers, and 24/7 availability. With offices in both CBD Belapur and Kharghar, we offer strong local coverage across Navi Mumbai. You can check our Google reviews or contact us at 9136399064 to experience the service firsthand.',
    },
  ];

  toggle(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  isCategoryStart(index: number): boolean {
    if (index === 0) return true;
    return this.faqs[index].category !== this.faqs[index - 1].category;
  }

  private injectFaqSchema(): void {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": this.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": [
          faq.answer,
          ...(faq.points ?? []),
          faq.note ?? ''
        ].filter(Boolean).join(' ')
      }
    }))
  };

  this.schemaScript = this.renderer.createElement('script');
  this.renderer.setAttribute(this.schemaScript, 'type', 'application/ld+json');
  this.schemaScript!.textContent = JSON.stringify(schema);
  this.renderer.appendChild(this.document.head, this.schemaScript);
}
}
