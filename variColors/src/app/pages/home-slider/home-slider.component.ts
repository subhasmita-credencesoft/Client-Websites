import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-slider.component.html',
  styleUrl: './home-slider.component.scss'
})
export class HomeSliderComponent {
 slides = [
    {
      img: 'assets/images/slider.png',
      title: 'VIBRANT COLOURS OF KOLKATA',
      subtitle: 'VARICOLOR',
      button: 'SHOP NOW'
    },
    {
      img: 'assets/images/slider.png',
      title: 'NEW ARRIVALS',
      subtitle: 'FESTIVE COLLECTION',
      button: 'EXPLORE'
    },
    {
      img: 'assets/images/slider.png',
      title: 'ELEGANCE REDEFINED',
      subtitle: 'SAREES',
      button: 'DISCOVER'
    }
  ];

  currentIndex = 0;
  interval: any;

  constructor() {
    this.startAutoSlide();
  }

  startAutoSlide() {
    this.interval = setInterval(() => {
      this.next();
    }, 3000);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}
