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
      name: 'Rithika M.',
      rating: 5,
      location: 'Family Traveller, Pune',
      review: 'Booked a trip to Mahabaleshwar. The car (Comfort Plus) was spotless, and the driver navigated the ghats perfectly. Definitely the most comfortable highway trip we\'ve had.'
    },
    {
      name: 'Rithika M.',
      rating: 5,
      location: 'Family Traveller, Pune',
      review: 'Booked a trip to Mahabaleshwar. The car (Comfort Plus) was spotless, and the driver navigated the ghats perfectly. Definitely the most comfortable highway trip we\'ve had.'
    },
    {
      name: 'Rithika M.',
      rating: 5,
      location: 'Family Traveller, Pune',
      review: 'Booked a trip to Mahabaleshwar. The car (Comfort Plus) was spotless, and the driver navigated the ghats perfectly. Definitely the most comfortable highway trip we\'ve had.'
    }
  ];

  constructor() {}
  ngOnInit(): void {}
  getStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
