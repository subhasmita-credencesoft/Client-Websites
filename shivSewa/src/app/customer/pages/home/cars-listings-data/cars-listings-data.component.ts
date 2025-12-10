import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    { id: 'suv', label: 'PREMIUM SUV' },
    { id: 'electric', label: 'ELECTRIC VEHICLES' },
    { id: 'minivans', label: 'MINIVANS' }
  ];

carData: { [key: string]: Car[] } = {
  sedan: [
    {
      id: 1,
      name: 'Honda Accord',
      seats: 5,
      bags: 3,
      fuel: 'Petrol',
      price: '₹ 320/km',
      description: 'Perfect for city rides & business travel',
      carNumber: 'MH 02 AB 4521',
      image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Toyota Camry',
      seats: 5,
      bags: 3,
      fuel: 'Hybrid',
      price: '₹ 380/km',
      description: 'Luxury sedan with premium comfort',
      carNumber: 'MH 01 CB 8890',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Hyundai Elantra',
      seats: 5,
      bags: 2,
      fuel: 'Petrol',
      price: '₹ 290/km',
      description: 'Comfortable & fuel-efficient sedan',
      carNumber: 'MH 03 DE 2234',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Skoda Octavia',
      seats: 5,
      bags: 3,
      fuel: 'Diesel',
      price: '₹ 350/km',
      description: 'Spacious sedan for long journeys',
      carNumber: 'MH 04 FG 7765',
      image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'BMW 3 Series',
      seats: 5,
      bags: 2,
      fuel: 'Petrol',
      price: '₹ 550/km',
      description: 'Premium luxury sedan experience',
      carNumber: 'MH 05 JK 9901',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop'
    }
  ],

  suv: [
    {
      id: 6,
      name: 'Toyota Fortuner',
      seats: 7,
      bags: 4,
      fuel: 'Diesel',
      price: '₹ 520/km',
      description: 'Powerful SUV for all terrains',
      carNumber: 'MH 15 KL 4512',
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop'
    },
    {
      id: 7,
      name: 'Mahindra XUV700',
      seats: 7,
      bags: 3,
      fuel: 'Diesel',
      price: '₹ 450/km',
      description: 'Tech-loaded premium SUV',
      carNumber: 'MH 14 MN 8823',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop'
    },
    {
      id: 8,
      name: 'Hyundai Creta',
      seats: 5,
      bags: 3,
      fuel: 'Petrol',
      price: '₹ 380/km',
      description: 'Compact SUV with modern features',
      carNumber: 'MH 12 PQ 3201',
      image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/creta-exterior-right-front-three-quarter-6.png?isig=0&q=80'
    },
    {
      id: 9,
      name: 'Tata Harrier',
      seats: 5,
      bags: 3,
      fuel: 'Diesel',
      price: '₹ 420/km',
      description: 'Bold design & powerful performance',
      carNumber: 'MH 11 RS 5542',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop'
    },
    {
      id: 10,
      name: 'Kia Seltos',
      seats: 5,
      bags: 2,
      fuel: 'Petrol',
      price: '₹ 390/km',
      description: 'Stylish SUV with premium interiors',
      carNumber: 'MH 10 TU 9981',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop'
    }
  ],

  electric: [
    {
      id: 11,
      name: 'Tesla Model 3',
      seats: 5,
      bags: 2,
      fuel: 'Electric',
      price: '₹ 480/km',
      description: 'Zero emissions, maximum performance',
      carNumber: 'MH 02 EV 1123',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop'
    },
    {
      id: 12,
      name: 'Tata Nexon EV',
      seats: 5,
      bags: 2,
      fuel: 'Electric',
      price: '₹ 320/km',
      description: 'Affordable electric SUV',
      carNumber: 'MH 14 EV 3344',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=300&fit=crop'
    },
    {
      id: 13,
      name: 'MG ZS EV',
      seats: 5,
      bags: 3,
      fuel: 'Electric',
      price: '₹ 380/km',
      description: 'Premium electric SUV experience',
      carNumber: 'MH 01 EV 5567',
      image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&h=300&fit=crop'
    },
    {
      id: 14,
      name: 'Hyundai Ioniq 5',
      seats: 5,
      bags: 2,
      fuel: 'Electric',
      price: '₹ 450/km',
      description: 'Futuristic design & fast charging',
      carNumber: 'MH 03 EV 7788',
      image: 'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=400&h=300&fit=crop'
    },
    {
      id: 15,
      name: 'BYD Atto 3',
      seats: 5,
      bags: 3,
      fuel: 'Electric',
      price: '₹ 400/km',
      description: 'Long range electric mobility',
      carNumber: 'MH 05 EV 9910',
      image: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=400&h=300&fit=crop'
    }
  ],

  minivans: [
    {
      id: 16,
      name: 'Innova Crest',
      seats: 7,
      bags: 2,
      fuel: 'Petrol',
      price: '₹ 432/km',
      description: 'Ideal for long trips & outstation travel',
      carNumber: 'MH 04 MP 2210',
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop'
    },
    {
      id: 17,
      name: 'Kia Carnival',
      seats: 8,
      bags: 4,
      fuel: 'Diesel',
      price: '₹ 580/km',
      description: 'Luxury MPV with captain seats',
      carNumber: 'MH 02 MP 8834',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop'
    },
    {
      id: 18,
      name: 'Maruti Ertiga',
      seats: 7,
      bags: 2,
      fuel: 'Petrol',
      price: '₹ 290/km',
      description: 'Budget-friendly family MPV',
      carNumber: 'MH 01 MP 4422',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop'
    },
    {
      id: 19,
      name: 'Toyota Innova Hycross',
      seats: 7,
      bags: 3,
      fuel: 'Hybrid',
      price: '₹ 480/km',
      description: 'Hybrid efficiency meets space',
      carNumber: 'MH 03 MP 6621',
      image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&h=300&fit=crop'
    },
    {
      id: 20,
      name: 'Mahindra Marazzo',
      seats: 8,
      bags: 3,
      fuel: 'Diesel',
      price: '₹ 350/km',
      description: 'Spacious & comfortable for families',
      carNumber: 'MH 10 MP 9120',
      image: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=400&h=300&fit=crop'
    }
  ]
};

constructor(private bookingService: BookingService,
  private router: Router,
){

}

  ngOnInit(): void {
    this.updateVisibleCards();
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
  this.bookingService.patchDeep({
    vehicle: {
      id: v.id,
      carNumber: v.carNumber,
      name: v.name,
      seats: v.seats,
      bags: v.bags,
      price: v.price,
      image: v.image
    }
  });
   this.router.navigate(['/booking']);
}
  getTransform(): string {
    const percentage = this.currentIndex * (100 / this.visibleCards);
    const gap = this.currentIndex * 1.5;
    return `translateX(calc(-${percentage}% - ${gap}rem))`;
  }

  isCardVisible(index: number): boolean {
    return index >= this.currentIndex && index < this.currentIndex + this.visibleCards;
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
