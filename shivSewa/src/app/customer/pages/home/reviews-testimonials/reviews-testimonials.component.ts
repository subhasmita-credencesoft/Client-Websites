import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
interface Testimonial {
  name: string;
  rating: number;
  location: string;
  review: string;
}

@Component({
  selector: 'app-reviews-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews-testimonials.component.html',
  styleUrl: './reviews-testimonials.component.scss'
})
export class ReviewsTestimonialsComponent {
testimonials: Testimonial[] = [
  {
    name: 'Ananya Deshpande',
    rating: 5,
    location: 'Family Traveller, Pune',
    review:
      'We booked an outstation trip to Mahabaleshwar with our parents. The car was extremely clean, arrived on time, and the driver was polite and patient throughout. Felt very safe and comfortable.'
  },
  {
    name: 'Rohit Kulkarni',
    rating: 4,
    location: 'Business Traveller, Mumbai',
    review:
      'Used the pickup & drop service for an early morning airport transfer. The cab arrived before time and the ride was smooth. Pricing was transparent with no last-minute surprises.'
  },
  {
    name: 'Sneha Patil',
    rating: 5,
    location: 'Solo Traveller, Nashik',
    review:
      'Booked a rental for a full-day city tour. The driver knew all the routes well and even suggested great local food spots. Overall, a very pleasant experience.'
  }
];


  constructor() {}
  ngOnInit(): void {}
  getStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
