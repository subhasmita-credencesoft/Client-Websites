import { LocationService } from './../../../services/location/location.service';
import { Component } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

@Component({
  selector: 'app-step-passenger',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './step-passenger.component.html',
  styleUrl: './step-passenger.component.scss'
})
export class StepPassengerComponent {

  passengers = {
    type: null,
    adults: 1,
    children: 0,
    luggage: 0
  } as any;

  selectedCategory: keyof typeof this.carData = 'sedan';
  selectedVehicle: any = null;
error = {
  type: false,
  adults: false,
  children: false,
  luggage: false,
  vehicle: false
};
carData: { [key: string]: Car[] } = {
  sedan: [
    {
      id: 1,
      name: 'Hyundai Aura',
      seats: 4,
      bags: 2,
      fuel: 'Petrol',
      price: '₹ 480',
      description: 'All-inclusive: car + driver + fuel',
      carNumber: 'MH 01 AU 1234',
      image: 'assets/Aura-sedan.avif'
    },
    {
      id: 2,
      name: 'Maruti Dzire',
      seats: 4,
      bags: 2,
      fuel: 'Petrol',
      price: '₹ 480',
      description: 'All-inclusive: car + driver + fuel',
      carNumber: 'MH 02 DZ 5678',
      image: 'assets/Dzire-Sedan.jpg'
    }
  ],
  suv: [
    {
      id: 3,
      name: 'Maruti XL6',
      seats: 6,
      bags: 3,
      fuel: 'Petrol',
      price: '₹ 500',
      description: 'All-inclusive: car + driver + fuel',
      carNumber: 'MH 03 XL 1122',
      image: 'assets/XL-suv.avif'
    },
    {
      id: 4,
      name: 'Toyota Rumion',
      seats: 6,
      bags: 3,
      fuel: 'Petrol',
      price: '₹ 500',
      description: 'All-inclusive: car + driver + fuel',
      carNumber: 'MH 04 RU 3344',
      image: 'assets/ROMION-SUV.avif'
    },
    {
      id: 5,
      name: 'Maruti Ertiga',
      seats: 6,
      bags: 3,
      fuel: 'Petrol',
      price: '₹ 500',
      description: 'All-inclusive: car + driver + fuel',
      carNumber: 'MH 05 ER 5566',
      image: 'assets/ERTIGA-Suv.avif'
    }
  ],
  suvPlus: [
    {
      id: 6,
      name: 'Toyota Innova Crysta',
      seats: 6,
      bags: 4,
      fuel: 'Diesel',
      price: '₹ 500',
      description: 'All-inclusive: car + driver + fuel',
      carNumber: 'MH 06 IC 7788',
      image: 'assets/INNOVA-CRYSTA-SUVPLUS.jpg'
    },
    {
      id: 9,
      name: 'Toyota Innova Hycross',
      seats: 6,
      bags: 4,
      fuel: 'Hybrid',
      price: '₹ 500',
      description: 'All-inclusive: car + driver + fuel',
      carNumber: 'MH 09 IH 4455',
      image: 'assets/Innova-Hycross-SUVPLUS.webp'
    }
  ]
};

  travelTypeToCategory: any = {
    personal: 'sedan',
    group: 'suv',
    family: 'minivans',
    corporate: 'suv'
  };

  allCars: Car[] = [];
  carList = this.carData[this.selectedCategory];

  vehicleOptions = [
    { name: 'Premium Sedan - Ciaz/Verna', seats: 4, luggage: 3, price: 21500 },
    { name: 'Premium Sedan - Dzire', seats: 4, luggage: 2, price: 19500 },
    { name: 'SUV - Creta', seats: 6, luggage: 4, price: 28500 }
  ];

  recommendedCars: Car[] = [];
  selectedVehicleId: number | null = null;
  selectedDate: string | null;

  constructor(private bookingService: BookingService, private locationService: LocationService) {
      const b = this.bookingService.getCurrent();

  this.passengers = b.passengers || this.passengers;
  this.selectedDate = b.date || null;
    console.log('Current booking in passenger step:', b);
  if (b.vehicle && b.vehicle.id) {
    this.selectedVehicle = b.vehicle;
    this.selectedVehicleId = b.vehicle.id;
  }
   window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit() {
      const date = (this.selectedDate)?.toString().split('T')[0] || '';

  this.locationService.getAvailableCarsByDate(date).subscribe(res => {
    this.filterCarsBySlots(res);
  });
     if (this.passengers.type) {
    this.chooseType(this.passengers.type);
  } else {
    this.chooseType('personal');
  }

    this.allCars = Object.values(this.carData).flat();
  }

  chooseType(type: string) {
    this.passengers.type = type;
    this.selectedCategory = this.travelTypeToCategory[type];

    this.recommendedCars = this.carData[this.selectedCategory]?.slice(0, 3);
  }
  limitAdults() {
  if (this.passengers.adults < 1) this.passengers.adults = 1;
  if (this.passengers.adults > 7) this.passengers.adults = 7;
}

limitChildren() {
  if (this.passengers.children < 0) this.passengers.children = 0;
  if (this.passengers.children > 5) this.passengers.children = 5;
}

limitLuggage() {
  if (this.passengers.luggage < 0) this.passengers.luggage = 0;
  if (this.passengers.luggage > 5) this.passengers.luggage = 5;
}
normalizeName(name: string): string {
  return name.trim().toLowerCase();
}
changeAdults(val: number) {
  this.passengers.adults += val;
  if (this.passengers.adults < 1) {
    this.passengers.adults = 1;
    this.error.adults = true;
    setTimeout(() => this.error.adults = false, 3000);
  }
  if (this.passengers.adults > 7) this.passengers.adults = 7;
  this.updateRecommendations();
}

changeChildren(val: number) {
  this.passengers.children += val;
  if (this.passengers.children < 0) {
    this.passengers.children = 0;
    this.error.children = true;
    setTimeout(() => this.error.children = false, 3000);
  }
  if (this.passengers.children > 5) this.passengers.children = 5;
  this.updateRecommendations();
}

changeLuggage(val: number) {
  this.passengers.luggage += val;
  if (this.passengers.luggage < 0) {
    this.passengers.luggage = 0;
    this.error.luggage = true;
    setTimeout(() => this.error.luggage = false, 3000);
  }
  if (this.passengers.luggage > 5) this.passengers.luggage = 5;
  this.updateRecommendations();
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

  // Rebuild lists after filtering
  this.allCars = Object.values(this.carData).flat();
  this.recommendedCars = this.carData[this.selectedCategory] || [];
}

  validateForm(): string | null {
  this.error = { type: false, adults: false, children: false, luggage: false, vehicle: false };

  switch (true) {

    case !this.passengers.type:
      this.error.type = true;
      return "travelTypeSection";

    case !this.passengers.adults:
      this.error.adults = true;
      return "adultsField";

    case this.passengers.children === null || this.passengers.children === undefined:
      this.error.children = true;
      return "childrenField";

    case this.passengers.luggage === null || this.passengers.luggage === undefined:
      this.error.luggage = true;
      return "luggageField";

    case !this.selectedVehicle:
      this.error.vehicle = true;
      return "vehicleSection";

    default:
      return null;
  }
}

selectVehicle(v: any) {
  this.selectedVehicle = v;
  this.selectedVehicleId = v.id;

  this.bookingService.patchDeep({
    passengers: this.passengers,
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
}


  goBack() {
    this.bookingService.prevStep();
  }
    validatePassengerCounts() {
    if (this.passengers.adults > 7) this.passengers.adults = 7;
    if (this.passengers.children > 5) this.passengers.children = 5;
    if (this.passengers.luggage > 5) this.passengers.luggage = 5;

    this.updateRecommendations();
  }
    updateRecommendations() {
    const totalPeople = this.passengers.adults + this.passengers.children;
    const bags = this.passengers.luggage;

   if (totalPeople <= 4 && bags <= 3) {
  this.recommendedCars = this.carData['sedan'];
} else if (totalPeople <= 7 && bags <= 5) {
  this.recommendedCars = this.carData['suv'];
} else {
  this.recommendedCars = this.carData['minivans'];
}
  }

next() {
  const invalidId = this.validateForm();

  if (invalidId) {
    const el = document.getElementById(invalidId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  // If all OK → save and continue
  this.bookingService.patchDeep({
    passengers: this.passengers,
    vehicle: this.selectedVehicle
  });

  this.bookingService.nextStep();
}


  isFormValid(): boolean {
  return (
    this.passengers.type !== null &&
    this.passengers.adults >= 1 &&
    this.passengers.adults <= 7 &&
    this.passengers.children >= 0 &&
    this.passengers.children <= 5 &&
    this.passengers.luggage >= 0 &&
    this.passengers.luggage <= 5 &&
    this.selectedVehicle !== null
  );
}

  scrollLeft(slider: HTMLElement) {
    slider.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight(slider: HTMLElement) {
    slider.scrollBy({ left: 200, behavior: 'smooth' });
  }
}
