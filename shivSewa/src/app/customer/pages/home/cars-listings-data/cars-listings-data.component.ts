import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationService } from '../../../services/location/location.service';

interface Car {
  id: number;
  name: string;
  seats: number;
  carNumber: string;
  bags: number;
  fuel: string;
  price: string;
  description: string;
  image: string;
}

interface Tab {
  id: string;
  label: string;
}
@Component({
  selector: 'app-cars-listings-data',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cars-listings-data.component.html',
  styleUrl: './cars-listings-data.component.scss',
 animations: [
    trigger('fadeCards', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':increment', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('350ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':decrement', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('350ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class CarsListingsDataComponent {
activeTab: string = 'sedan';
  currentIndex: number = 0;
  isAnimating: boolean = false;
  visibleCards: number = 4;
  tabChangeAnimation: number = 0;

  tabs: Tab[] = [
    { id: 'sedan', label: 'SEDAN CLASS' },
    { id: 'suv', label: 'SUV' },
    { id: 'suvPlus', label: 'SUV+' }
  ];

carData: { [key: string]: Car[] } = {
  sedan: [
    {
      id: 1,
      name: 'Hyundai Aura',
      seats: 4,
      bags: 2,
      fuel: 'Petrol',
      price: '',
      description: '',
      carNumber: 'MH 01 AU 1234',
      image: 'assets/Hyundai-Aura.png'
    },
    {
      id: 2,
      name: 'Maruti Dzire',
      seats: 4,
      bags: 2,
      fuel: 'Petrol',
      price: '',
      description: '',
      carNumber: 'MH 02 DZ 5678',
      image: 'assets/Maruti-Dzire.png'
    }
  ],
  suv: [
    {
      id: 3,
      name: 'Maruti XL6',
      seats: 6,
      bags: 3,
      fuel: 'Petrol',
      price: '',
      description: '',
      carNumber: 'MH 03 XL 1122',
      image: 'assets/Maruti-XL6.png'
    },
    {
      id: 4,
      name: 'Toyota Rumion',
      seats: 6,
      bags: 3,
      fuel: 'Petrol',
      price: '',
      description: '',
      carNumber: 'MH 04 RU 3344',
      image: 'assets/Toyota-Rumion.png'
    },
    {
      id: 5,
      name: 'Maruti Ertiga',
      seats: 6,
      bags: 3,
      fuel: 'Petrol',
      price: '',
      description: '',
      carNumber: 'MH 05 ER 5566',
      image: 'assets/Maruti- Ertiga.png'
    }
  ],
  suvPlus: [
    {
      id: 6,
      name: 'Toyota Innova Crysta',
      seats: 6,
      bags: 4,
      fuel: 'Diesel',
      price: '',
      description: '',
      carNumber: 'MH 06 IC 7788',
      image: 'assets/Toyota-Innova-Crysta.png'
    }
  ],
};

constructor(private bookingService: BookingService,
  private router: Router,
  private locationService: LocationService
){

}

  ngOnInit(): void {
    this.updateVisibleCards();
    const date = new Date().toISOString().split('T')[0];
      this.locationService.getAvailableCarsByDate(date).subscribe(res => {
    // this.filterCarsBySlots(res);
  });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateVisibleCards();
    this.currentIndex = 0;
  }

  updateVisibleCards(): void {
    const width = window.innerWidth;
    if (width >= 1280) {
      this.visibleCards = 4;
    } else if (width >= 1024) {
      this.visibleCards = 3;
    } else if (width >= 640) {
      this.visibleCards = 2;
    } else {
      this.visibleCards = 1;
    }
  }

  get maxIndex(): number {
    return Math.max(0, this.getCurrentCars().length - this.visibleCards);
  }

  get progressDots(): number[] {
    return Array(this.maxIndex + 1).fill(0);
  }

  getCurrentCars(): Car[] {
    return this.carData[this.activeTab];
  }

  selectVehicle(v: any) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // this.bookingService.patchDeep({
  //   vehicle: {
  //     id: v.id,
  //     carNumber: v.carNumber,
  //     name: v.name,
  //     seats: v.seats,
  //     bags: v.bags,
  //     price: v.price,
  //     image: v.image
  //   }
  // });
  //  this.router.navigate(['/booking']);
}
  getTransform(): string {
    const percentage = this.currentIndex * (100 / this.visibleCards);
    const gap = this.currentIndex * 1.5;
    return `translateX(calc(-${percentage}% - ${gap}rem))`;
  }

  isCardVisible(index: number): boolean {
    return index >= this.currentIndex && index < this.currentIndex + this.visibleCards;
  }
filterCarsBySlots(slotResponse: any) {
  const availableCarNames = slotResponse.resourceList
    .filter((r: any) =>
      r.availableTimings?.some(
        (t: any) => t.slotAvailabilityDto?.noOfAvailable > 0
      )
    )
    .map((r: any) => this.normalizeName(r.name));

  // Filter category-wise
  Object.keys(this.carData).forEach(category => {
    this.carData[category] = this.carData[category].filter(car =>
      availableCarNames.includes(this.normalizeName(car.name))
    );
  });
}
normalizeName(name: string): string {
  return name.trim().toLowerCase();
}
  getCardTransform(index: number): string {
    const isVisible = this.isCardVisible(index);
    const distanceFromCenter = Math.abs(index - (this.currentIndex + this.visibleCards / 2));
    const scale = isVisible ? 1 : 0.9;
    const rotateY = isVisible ? 0 : distanceFromCenter * 5;
    return `scale(${scale}) rotateY(${rotateY}deg)`;
  }

  handlePrev(): void {
    if (this.isAnimating || this.currentIndex === 0) return;
    this.isAnimating = true;
    this.currentIndex = Math.max(0, this.currentIndex - 1);
    setTimeout(() => this.isAnimating = false, 600);
  }

  handleNext(): void {
    if (this.isAnimating || this.currentIndex >= this.maxIndex) return;
    this.isAnimating = true;
    this.currentIndex = Math.min(this.maxIndex, this.currentIndex + 1);
    setTimeout(() => this.isAnimating = false, 600);
  }

  handleTabChange(tabId: string): void {
    if (tabId !== this.activeTab && !this.isAnimating) {
      this.isAnimating = true;
      this.activeTab = tabId;
      this.currentIndex = 0;
      this.tabChangeAnimation++;
      setTimeout(() => this.isAnimating = false, 600);
    }
  }

  goToSlide(index: number): void {
    if (!this.isAnimating && index !== this.currentIndex) {
      this.isAnimating = true;
      this.currentIndex = index;
      setTimeout(() => this.isAnimating = false, 600);
    }
  }
}
