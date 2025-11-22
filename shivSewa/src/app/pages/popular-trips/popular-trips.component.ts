import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

interface Trip {
  id: number;
  image: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  tripType: string;
  price: string;
  vehicles: string;
}
@Component({
  selector: 'app-popular-trips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popular-trips.component.html',
  styleUrl: './popular-trips.component.scss',
})
export class PopularTripsComponent {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  isScrolling = false;
  trips: Trip[] = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1585159812596-fac104f2f069?w=800&q=80',
      from: 'Mumbai',
      to: 'Shirdi',
      distance: '286 km',
      duration: '5 hrs 30 mins',
      tripType: 'One-way & Round Trip Available',
      price: '₹ 15,399',
      vehicles:
        'Sedan (Maruti Dzire, Toyota Etios, Honda Amaze) Comfort SUV (Maruti Ertiga, Honda BR-V, Renault Triber)',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80',
      from: 'Mumbai',
      to: 'Mahabaleshwar',
      distance: '266 km',
      duration: '5 hrs 30 mins',
      tripType: 'One-way & Round Trip Available',
      price: '₹ 15,399',
      vehicles:
        'Sedan (Maruti Dzire, Toyota Etios, Honda Amaze) Comfort SUV (Maruti Ertiga, Honda BR-V, Renault Triber)',
    },
    {
      id: 3,
      image:
        'https://www.savaari.com/blog/wp-content/uploads/2019/09/mumbai-lonavala-road-e1568965532217.jpg',
      from: 'Mumbai',
      to: 'Lonavala',
      distance: '286 km',
      duration: '5 hrs 30 mins',
      tripType: 'One-way & Round Trip Available',
      price: '₹ 15,399',
      vehicles:
        'Sedan (Maruti Dzire, Toyota Etios, Honda Amaze) Comfort SUV (Maruti Ertiga, Honda BR-V, Renault Triber)',
    },
    {
      id: 4,
      image:
        'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80',
      from: 'Mumbai',
      to: 'Pune',
      distance: '286 km',
      duration: '5 hrs 30 mins',
      tripType: 'One-way & Round Trip Available',
      price: '₹ 15,399',
      vehicles:
        'Sedan (Maruti Dzire, Toyota Etios, Honda Amaze) Comfort SUV (Maruti Ertiga, Honda BR-V, Renault Triber)',
    },
    {
      id: 5,
      image:
        'https://images.unsplash.com/photo-1568849676085-51415703900f?w=800&q=80',
      from: 'Mumbai',
      to: 'Alibaug',
      distance: '186 km',
      duration: '3 hrs 30 mins',
      tripType: 'One-way & Round Trip Available',
      price: '₹ 12,399',
      vehicles:
        'Sedan (Maruti Dzire, Toyota Etios, Honda Amaze) Comfort SUV (Maruti Ertiga, Honda BR-V, Renault Triber)',
    },
  ];
  constructor() {}

  ngOnInit(): void {}

  scroll(direction: 'left' | 'right'): void {
    if (this.scrollContainer && !this.isScrolling) {
      this.isScrolling = true;
      const scrollAmount = direction === 'left' ? -400 : 400;

      this.scrollContainer.nativeElement.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });

      setTimeout(() => {
        this.isScrolling = false;
      }, 500);
    }
  }
}
