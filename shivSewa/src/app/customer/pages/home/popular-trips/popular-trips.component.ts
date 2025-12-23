import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../../services/booking.service';

interface Location {
  place_id: string;
  name: string;
  latitude: number;
  longitude: number;
  service_address: {
    city?: string;
    state?: string;
    country?: string;
  };
}

interface Trip {
  id: number;
  image: string;
  pickup: Location;
  dropoff: Location;
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
    image: 'https://images.unsplash.com/photo-1585159812596-fac104f2f069?w=800&q=80',
    pickup: {
      place_id: 'ChIJwe1EZjDG5zsRaYxkjY_tpF0',
      name: 'Mumbai',
      latitude: 19.0760,
      longitude: 72.8777,
      service_address: {
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India'
      }
    },
    dropoff: {
      place_id: 'ChIJn0nfs1yJ5zsR1Tq3iF1B0Uo',
      name: 'Shirdi',
      latitude: 19.7645,
      longitude: 74.4762,
      service_address: {
        city: 'Shirdi',
        state: 'Maharashtra',
        country: 'India'
      }
    },
    distance: '286 km',
    duration: '5 hrs 30 mins',
    tripType: 'One-way & Round Trip Available',
    price: '₹ 15,399',
    vehicles:
      'Sedan (Maruti Dzire, Toyota Etios, Honda Amaze) Comfort SUV (Maruti Ertiga, Honda BR-V, Renault Triber)',
  },

  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80',
    pickup: {
      place_id: 'ChIJwe1EZjDG5zsRaYxkjY_tpF0',
      name: 'Mumbai',
      latitude: 19.0760,
      longitude: 72.8777,
      service_address: {
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India'
      }
    },
    dropoff: {
      place_id: 'ChIJFfZ6m9Kx5zsR8L5sJ8J9J0o',
      name: 'Mahabaleshwar',
      latitude: 17.9307,
      longitude: 73.6477,
      service_address: {
        city: 'Mahabaleshwar',
        state: 'Maharashtra',
        country: 'India'
      }
    },
    distance: '266 km',
    duration: '5 hrs 30 mins',
    tripType: 'One-way & Round Trip Available',
    price: '₹ 15,399',
    vehicles:
      'Sedan (Maruti Dzire, Toyota Etios, Honda Amaze) Comfort SUV (Maruti Ertiga, Honda BR-V, Renault Triber)',
  },

  {
    id: 3,
    image: 'https://www.savaari.com/blog/wp-content/uploads/2019/09/mumbai-lonavala-road-e1568965532217.jpg',
    pickup: {
      place_id: 'ChIJwe1EZjDG5zsRaYxkjY_tpF0',
      name: 'Mumbai',
      latitude: 19.0760,
      longitude: 72.8777,
      service_address: {
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India'
      }
    },
    dropoff: {
      place_id: 'ChIJY5cNqQ2w5zsR3v4tFQ0xQbU',
      name: 'Lonavala',
      latitude: 18.7557,
      longitude: 73.4091,
      service_address: {
        city: 'Lonavala',
        state: 'Maharashtra',
        country: 'India'
      }
    },
    distance: '286 km',
    duration: '5 hrs 30 mins',
    tripType: 'One-way & Round Trip Available',
    price: '₹ 15,399',
    vehicles:
      'Sedan (Maruti Dzire, Toyota Etios, Honda Amaze) Comfort SUV (Maruti Ertiga, Honda BR-V, Renault Triber)',
  },

  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80',
    pickup: {
      place_id: 'ChIJwe1EZjDG5zsRaYxkjY_tpF0',
      name: 'Mumbai',
      latitude: 19.0760,
      longitude: 72.8777,
      service_address: {
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India'
      }
    },
    dropoff: {
      place_id: 'ChIJAR3sZ9ZB5zsR0mX6bR3kZ_0',
      name: 'Pune',
      latitude: 18.5204,
      longitude: 73.8567,
      service_address: {
        city: 'Pune',
        state: 'Maharashtra',
        country: 'India'
      }
    },
    distance: '286 km',
    duration: '5 hrs 30 mins',
    tripType: 'One-way & Round Trip Available',
    price: '₹ 15,399',
    vehicles:
      'Sedan (Maruti Dzire, Toyota Etios, Honda Amaze) Comfort SUV (Maruti Ertiga, Honda BR-V, Renault Triber)',
  },

  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1568849676085-51415703900f?w=800&q=80',
    pickup: {
      place_id: 'ChIJwe1EZjDG5zsRaYxkjY_tpF0',
      name: 'Mumbai',
      latitude: 19.0760,
      longitude: 72.8777,
      service_address: {
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India'
      }
    },
    dropoff: {
      place_id: 'ChIJ8zFjzT2x5zsR7JjE7vLkL0M',
      name: 'Alibaug',
      latitude: 18.6414,
      longitude: 72.8722,
      service_address: {
        city: 'Alibaug',
        state: 'Maharashtra',
        country: 'India'
      }
    },
    distance: '186 km',
    duration: '3 hrs 30 mins',
    tripType: 'One-way & Round Trip Available',
    price: '₹ 12,399',
    vehicles:
      'Sedan (Maruti Dzire, Toyota Etios, Honda Amaze) Comfort SUV (Maruti Ertiga, Honda BR-V, Renault Triber)',
  }
];

  constructor(private router: Router,
    private bookingService: BookingService
  ) {}

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
  bookNow(trip: Trip) {
  this.bookingService.reset();

  this.bookingService.setCurrent({
    pickup: trip.pickup,
    dropoff: trip.dropoff,
    tripType: 'one-way'
  });

  this.router.navigate(['/booking']);
}
}
