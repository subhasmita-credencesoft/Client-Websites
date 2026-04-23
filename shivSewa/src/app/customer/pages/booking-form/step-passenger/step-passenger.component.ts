import { LocationService } from './../../../services/location/location.service';
import { Component } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FareQuote } from '../../../pricing/pricing.types';
import { QuoteRequest } from '../../../pricing/dto';
import { PricingService } from '../../../pricing/pricing.service';

interface Car {
  id: number;
  name: string;
  seats: number;
  carNumber: string;
  bags: number;
  fuel: string;
  price: number;
  description: string;
  image: string;
  fareQuote?: FareQuote;
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

  selectedCategory: keyof typeof this.carData = "sedan";
  selectedVehicle: any = null;
  showBreakdown = false;

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
        price: 0,
        description: 'All-inclusive: car + driver + fuel',
        carNumber: 'MH 01 AU 1234',
        image: 'assets/Hyundai-Aura.avif'
      },
      {
        id: 2,
        name: 'Maruti Dzire',
        seats: 4,
        bags: 2,
        fuel: 'Petrol',
        price: 0,
        description: 'All-inclusive: car + driver + fuel',
        carNumber: 'MH 02 DZ 5678',
        image: 'assets/Maruti-Dzire.avif'
      }
    ],
    suv: [
      {
        id: 3,
        name: 'Maruti XL6',
        seats: 6,
        bags: 3,
        fuel: 'Petrol',
        price: 0,
        description: 'All-inclusive: car + driver + fuel',
        carNumber: 'MH 03 XL 1122',
        image: 'assets/Maruti-XL6.avif'
      },
      {
        id: 4,
        name: 'Toyota Rumion',
        seats: 6,
        bags: 3,
        fuel: 'Petrol',
        price: 0,
        description: 'All-inclusive: car + driver + fuel',
        carNumber: 'MH 04 RU 3344',
        image: 'assets/Toyota-Rumion.avif'
      },
      {
        id: 5,
        name: 'Maruti Ertiga',
        seats: 6,
        bags: 3,
        fuel: 'Petrol',
        price: 0,
        description: 'All-inclusive: car + driver + fuel',
        carNumber: 'MH 05 ER 5566',
        image: 'assets/Maruti-Ertiga.avif'
      }
    ],
    suvPlus: [
      {
        id: 6,
        name: 'Toyota Innova Crysta',
        seats: 6,
        bags: 4,
        fuel: 'Diesel',
        price: 0,
        description: 'All-inclusive: car + driver + fuel',
        carNumber: 'MH 06 IC 7788',
        image: 'assets/Toyota-Innova-Crysta.avif'
      }
    ]
  };

 travelTypeToCategory: any = {
    personal: 'sedan',
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
  otherCars: Car[] = []; // All cars except the selected one, sorted
  selectedVehicleId: number | null = null;
  selectedDate: string | null;

  constructor(private bookingService: BookingService,
    private locationService: LocationService,
  private pricingService: PricingService) {
    const b = this.bookingService.getCurrent();

    this.passengers = b.passengers || this.passengers;
    this.selectedDate = b.date || null;

    // Get the selected vehicle category from banner
    if (b.vehicleCategory) {
      this.selectedCategory = b.vehicleCategory as keyof typeof this.carData;
    }

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
      // this.filterCarsBySlots(res);
    });
     this.pricingService.load().subscribe(() => {
    this.updateCarLists();
     if (this.selectedVehicleId) {
      const matched = this.allCars.find(c => c.id === this.selectedVehicleId);
      if (matched) {
        this.selectedVehicle = matched;
      }
    }
    this.autoSelectFirstCar();
  });

    if (this.passengers.type) {
      this.chooseType(this.passengers.type);
    } else {
      this.chooseType('personal');
    }
  }

private mapCategoryForPricing(
  category: keyof typeof this.carData
): 'sedan' | 'suv' | 'premium_suv' {
  switch (category) {
    case 'sedan': return 'sedan';
    case 'suv': return 'suv';
    case 'suvPlus': return 'premium_suv';
    default: return 'sedan';
  }
}




  private calculateFareForCategory(
    category: keyof typeof this.carData
  ): FareQuote {
    const b = this.bookingService.getCurrent();

    const req: QuoteRequest = {
      tripType: this.mapTripTypeToPricing(b.tripTypeValue!),
      vehicleCategory: this.mapCategoryForPricing(category),
      pickup: b.pickup!,
      drop: b.dropoff!,
      pickupDate: b.date!,
      pickupTime: b.time!,
      returnDate: b.returnDate,
      returnTime: b.returnTime
    };
    return this.pricingService.calculate(req, b.distanceKm!);
  }

  private getDisplayFare(quote?: FareQuote): number {
    if (!quote) return 0;
    return this.bookingService.getCouponPreviewForFare(
      quote.total,
      this.bookingService.getCurrent().tripTypeValue
    ).finalAmount;
  }
  private mapTripTypeToPricing(
    ui: 'pickup-drop' | 'outstation' | 'rental'
  ): 'pickup_drop' | 'outstation' | 'rental' {
    return ui === 'pickup-drop' ? 'pickup_drop' : ui;
  }
  autoSelectFirstCar() {
    if (!this.selectedVehicle && this.recommendedCars.length > 0) {
      this.selectVehicle(this.recommendedCars[0]);
    }
  }
private canCalculateFare(): boolean {
    const b = this.bookingService.getCurrent();
    return (
      this.pricingService.isReady() &&
      !!b.pickup &&
      !!b.dropoff &&
      !!b.date &&
      !!b.time &&
      typeof b.distanceKm === 'number' &&
      b.distanceKm > 0
    );
  }

  updateCarLists() {
  if (!this.canCalculateFare()) return;

  const trip = this.bookingService.getCurrent().tripTypeValue;

  this.recommendedCars = this.carData[this.selectedCategory].map(car => {
    const quote = this.calculateFareForCategory(this.selectedCategory);
    return { ...car, price: this.getDisplayFare(quote), fareQuote: quote };
  });

  this.allCars = Object.keys(this.carData).flatMap(cat => {
    // 🚫 premium SUV not allowed for pickup-drop
    if (trip === 'pickup-drop' && cat === 'suvPlus') {
      return [];
    }

    return this.carData[cat as keyof typeof this.carData].map(car => {
      const quote = this.calculateFareForCategory(
        cat as keyof typeof this.carData
      );
      return { ...car, price: this.getDisplayFare(quote), fareQuote: quote };
    });
  });

  this.updateOtherCarsList();
}



  updateOtherCarsList() {
    // Get all cars except the currently selected one
    const filteredCars = this.allCars.filter(car => car.id !== this.selectedVehicleId);

    // Sort: Same category cars first, then upgrade cars
    this.otherCars = filteredCars.sort((a, b) => {
      const aIsUpgrade = this.isUpgradeCar(a);
      const bIsUpgrade = this.isUpgradeCar(b);

      // If one is upgrade and other is not, non-upgrade comes first
      if (aIsUpgrade && !bIsUpgrade) return 1;
      if (!aIsUpgrade && bIsUpgrade) return -1;

      // If both are same type (both upgrade or both not), maintain original order
      return 0;
    });
  }

  chooseType(type: string) {
    this.passengers.type = type;
    const booking = this.bookingService.getCurrent();
    if (!booking.vehicleCategory) {
      this.selectedCategory = this.travelTypeToCategory[type];
      this.updateCarLists();
      this.autoSelectFirstCar();
    }
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
    if (this.passengers.adults > 6) this.passengers.adults = 6;
    this.updateRecommendations();
  }

  changeChildren(val: number) {
    this.passengers.children += val;
    if (this.passengers.children < 0) {
      this.passengers.children = 0;
      this.error.children = true;
      setTimeout(() => this.error.children = false, 3000);
    }
    if (this.passengers.children > 3) this.passengers.children = 3;
    this.updateRecommendations();
  }

  changeLuggage(val: number) {
    this.passengers.luggage += val;
    if (this.passengers.luggage < 0) {
      this.passengers.luggage = 0;
      this.error.luggage = true;
      setTimeout(() => this.error.luggage = false, 3000);
    }
    if (this.passengers.luggage > 3) this.passengers.luggage = 3;
    this.updateRecommendations();
  }
 get selectedFare(): FareQuote | null {
    return this.selectedVehicle?.fareQuote || null;
  }

  get breakdownCouponPreview() {
    const fare = this.selectedVehicle?.fareQuote;
    if (!fare) return null;

    return this.bookingService.getCouponPreviewForFare(
      fare.total,
      this.bookingService.getCurrent().tripTypeValue
    );
  }

  get couponBreakdownMessage(): string {
    const preview = this.breakdownCouponPreview;
    return preview?.coupon?.message || '';
  }

  get isCouponAppliedInStep2(): boolean {
    return this.bookingService.getCurrent().coupon?.status === 'applied';
  }

  filterCarsBySlots(slotResponse: any) {
    const available = slotResponse.resourceList
      .filter((r: any) =>
        r.availableTimings?.some((t: any) => t.slotAvailabilityDto?.noOfAvailable > 0)
      )
      .map((r: any) => r.name.toLowerCase());

    Object.keys(this.carData).forEach(cat => {
      this.carData[cat] = this.carData[cat].filter(c =>
        available.includes(c.name.toLowerCase())
      );
    });

    this.updateCarLists();
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
      vehicle: {
        id: v.id,
        name: v.name,
        seats: v.seats,
        bags: v.bags,
        price: this.getDisplayFare(v.fareQuote),
        image: v.image,
        carNumber: v.carNumber
      },
      fareQuote: v.fareQuote

    });
    this.updateOtherCarsList();
  }

  // Helper method to check if a car is from a different category than selected
  private categoryRank: Record<string, number> = {
    sedan: 1,
    suv: 2,
    suvPlus: 3
  };

  isUpgradeCar(car: Car): boolean {
    const carCategory = Object.keys(this.carData).find(category =>
      this.carData[category].some(c => c.id === car.id)
    );
    if (!carCategory) return false;
    return (this.categoryRank[carCategory] ?? 0) > (this.categoryRank[this.selectedCategory] ?? 0);
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
    // this.bookingService.patchDeep({
    //   passengers: this.passengers,
    //   vehicle: this.selectedVehicle
    // });
      this.bookingService.patchDeep({
    passengers: { ...this.passengers },
    vehicle: {
      ...this.selectedVehicle,
      price: this.getDisplayFare(this.selectedVehicle?.fareQuote)
    },
    fareQuote: this.selectedVehicle?.fareQuote
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
