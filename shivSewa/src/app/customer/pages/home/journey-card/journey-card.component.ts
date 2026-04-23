import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface JourneyCard {
  id: number;
  title: string;
  subtitle: string;
  originalPrice?: number;
  discountPercent?: number;
  description?: string;
  additionalInfo: string;
  image: string;
  buttonText: string;
}

@Component({
  selector: 'app-journey-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './journey-card.component.html',
  styleUrl: './journey-card.component.scss'
})
export class JourneyCardComponent {
  journeyCards: JourneyCard[] = [
    {
      id: 1,
      title: 'Mumbai Airport',
      subtitle: 'Arrivals & Departures',
      originalPrice: 1599,
      discountPercent: 20,
      description: 'Guaranteed On-Time Pickup',
      additionalInfo: '',
      image: '/assets/airport.avif',
      buttonText: 'Request Ride'
    },
    {
      id: 2,
      title: 'Group Travel Bookings',
      subtitle: 'Events, Corporate & more',
      description: 'Optimized Volume Pricing',
      additionalInfo: 'Large Fleet Availability (Various Extras)',
      image: '/assets/group-travel.avif',
      buttonText: 'Request Quote'
    }
  ];

  constructor() {}
  ngOnInit(): void {}

  hasDiscount(card: JourneyCard): boolean {
    return !!card.originalPrice && !!card.discountPercent && card.discountPercent > 0;
  }

  getDiscountedPrice(card: JourneyCard): number | null {
    if (!card.originalPrice) return null;
    if (!this.hasDiscount(card)) return card.originalPrice;
    return Math.round(card.originalPrice * (1 - (card.discountPercent as number) / 100));
  }

  formatPrice(amount?: number | null): string {
    if (amount == null) return '';
    return `₹ ${amount.toLocaleString('en-IN')}`;
  }

  handleCardAction(card: JourneyCard) {
    const phoneNumber = '9136399064';
    const discountedPrice = this.getDiscountedPrice(card);

    const message = `
Hello,
I would like to request the following service:

Service: ${card.title}
Type: ${card.subtitle}
${discountedPrice ? 'Price: ' + this.formatPrice(discountedPrice) : ''}
${this.hasDiscount(card) ? `Offer: ${card.discountPercent}% OFF (Original ${this.formatPrice(card.originalPrice)})` : ''}
Details: ${card.description}
${card.additionalInfo ? 'Info: ' + card.additionalInfo : ''}

Please assist further.
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  }
}
