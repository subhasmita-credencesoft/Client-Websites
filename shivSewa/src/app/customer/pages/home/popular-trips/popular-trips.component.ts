import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../../services/booking.service';
import { GeoLocation } from '../../../models/geo-location';

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
@Output() tripSelected = new EventEmitter<any>();
  isScrolling = false;
  trips: Trip[] = [
  {
    id: 1,
    image: '/assets/mumbai-shirdi.avif',
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
    price: '',
    vehicles:
      'Sedan (Maruti Dzire, Toyota Etios, Honda Amaze) Comfort SUV (Maruti Ertiga, Honda BR-V, Renault Triber)',
  },

  {
    id: 2,
    image: '/assets/mumbai-mahabaleswar.avif',
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
    price: '',
    vehicles:
      'Sedan (Maruti Dzire, Toyota Etios, Honda Amaze) Comfort SUV (Maruti Ertiga, Honda BR-V, Renault Triber)',
  },

  {
    id: 3,
    image: '/assets/mumbai-lonavala.avif',
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
    price: '',
    vehicles:
      'Sedan (Maruti Dzire, Toyota Etios, Honda Amaze) Comfort SUV (Maruti Ertiga, Honda BR-V, Renault Triber)',
  },

  {
    id: 4,
    image: '/assets/mumbai-pune.avif',
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
    price: '',
    vehicles:
      'Sedan (Maruti Dzire, Toyota Etios, Honda Amaze) Comfort SUV (Maruti Ertiga, Honda BR-V, Renault Triber)',
  },

  {
    id: 5,
    image: '/assets/mumbai-alibaug.avif',
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
    price: '',
    vehicles:
      'Sedan (Maruti Dzire, Toyota Etios, Honda Amaze) Comfort SUV (Maruti Ertiga, Honda BR-V, Renault Triber)',
  }
];

  constructor(private router: Router,
    private bookingService: BookingService
  ) {}

ngOnInit(): void {
  const service = new google.maps.DistanceMatrixService();

  this.trips.forEach((trip) => {

    service.getDistanceMatrix(
      {
        origins: [{ lat: trip.pickup.latitude, lng: trip.pickup.longitude }],
        destinations: [{ lat: trip.dropoff.latitude, lng: trip.dropoff.longitude }],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      (response: any, status: any) => {

        if (
          status === google.maps.DistanceMatrixStatus.OK &&
          response?.rows?.[0]?.elements?.[0]?.status === 'OK'
        ) {
          const element = response.rows[0].elements[0];

          trip.distance = element.distance.text;   // 98 km
          trip.duration = element.duration.text;   // 2 hours 30 mins
        }
      }
    );

  });
}


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
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = this.deg2rad(lat2 - lat1);
  const dLon = this.deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.deg2rad(lat1)) *
    Math.cos(this.deg2rad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}
 bookNow(trip: Trip) {

  const pickup: GeoLocation = {
    place_id: trip.pickup.place_id,
    name: trip.pickup.name,
    latitude: trip.pickup.latitude,
    longitude: trip.pickup.longitude,
    service_address: trip.pickup.service_address
  };

  const dropoff: GeoLocation = {
    place_id: trip.dropoff.place_id,
    name: trip.dropoff.name,
    latitude: trip.dropoff.latitude,
    longitude: trip.dropoff.longitude,
    service_address: trip.dropoff.service_address
  };

  // Set booking base data first
  this.bookingService.patchDeep({
    tripTypeValue: 'outstation',
    tripServiceType: 'outstation',
    pickup,
    dropoff,
    distanceKm: 0,
    durationMinutes: 0,
    vehicleCategory: '',
    fareQuote: undefined
  });

  const service = new google.maps.DistanceMatrixService();

  service.getDistanceMatrix(
    {
      origins: [{ lat: pickup.latitude, lng: pickup.longitude }],
      destinations: [{ lat: dropoff.latitude, lng: dropoff.longitude }],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
    },
    (response, status) => {

      if (
        status !== google.maps.DistanceMatrixStatus.OK ||
        !response?.rows?.[0]?.elements?.[0] ||
        response.rows[0].elements[0].status !== 'OK'
      ) {
        return;
      }

      const element = response.rows[0].elements[0];

      const distanceKm = +(element.distance.value / 1000).toFixed(2);
      const durationMinutes = Math.ceil(element.duration.value / 60);

      this.bookingService.patchDeep({
        distanceKm,
        durationMinutes
      });
    }
  );
const formattedTrip = {
  pickup,
  dropoff,
  tripTypeValue: 'outstation'
};

this.tripSelected.emit({ ...formattedTrip });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

}
