import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface JourneyCard {
  id: number;
  title: string;
  subtitle: string;
  price?: string;
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
      price: '₹ 1,599',
      description: 'Guaranteed On-Time Pickup',
      additionalInfo: '',
      image: 'https://www.airport-technology.com/wp-content/uploads/sites/14/2020/09/Mumbai-1stSept.jpg',
      buttonText: 'Request Ride'
    },
    {
      id: 2,
      title: 'Group Travel Bookings',
      subtitle: 'Events, Corporate & more',
      price: '',
      description: 'Optimized Volume Pricing',
      additionalInfo: 'Large Fleet Availability (Various Extras)',
      image: 'https://www.mrrentacar.com/wp-content/uploads/2025/06/istockphoto-982882130-612x612-1.jpg',
      buttonText: 'Request Quote'
    }
  ];
  constructor(){}
  ngOnInit(): void {}
   handleCardAction(card: JourneyCard): void {
  }
}
