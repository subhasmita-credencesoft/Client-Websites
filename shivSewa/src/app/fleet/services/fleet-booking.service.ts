import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FleetBookingService {

  // -------------------------------------------------------
  // STATIC DRIVERS
  // -------------------------------------------------------
  drivers = [
    { id: 1, name: 'Driver Ram', email: 'ram@fleet.com', password: '123456' },
    { id: 2, name: 'Driver Shyam', email: 'shyam@fleet.com', password: '123456' },
    { id: 3, name: 'Driver Mohan', email: 'mohan@fleet.com', password: '123456' }
  ];

  // -------------------------------------------------------
  // STATIC TRIPS — SAME STRUCTURE AS CUSTOMER BOOKING DATA
  // -------------------------------------------------------
  trips = [
    // ---------------------------------------------------
    // TRIP 1 — PENDING
    // ---------------------------------------------------
    {
      id: 501,
      bookingRef: 'REF2025001',

      pickup: 'City Center',
      dropoff: 'Airport T1',
      date: '2025-01-18',
      time: '16:00',
      tripType: 'one-way',

      passengers: {
        adults: 2,
        children: 0,
        luggage: 2
      },

      vehicle: {
        name: 'Sedan',
        seats: 4,
        bags: 2,
        price: 2200,
        carNumber: 'RJ14 CC 7788',
        image: 'assets/cars/sedan.png'
      },

      traveller: {
        firstName: 'Shakti',
        lastName: 'Swarupa',
        mobile: '9998887777',
        email: 'shakti@test.com',
        notes: 'Please call on arrival'
      },

      status: 'Pending',
      driverId: 1,
      driverNotes: ''
    },

    // ---------------------------------------------------
    // TRIP 2 — PENDING
    // ---------------------------------------------------
    {
      id: 502,
      bookingRef: 'REF2025002',

      pickup: 'Railway Station',
      dropoff: 'Hotel BlueCity',
      date: '2025-01-19',
      time: '11:30',
      tripType: 'one-way',

      passengers: {
        adults: 1,
        children: 1,
        luggage: 1
      },

      vehicle: {
        name: 'SUV',
        seats: 6,
        bags: 4,
        price: 3500,
        carNumber: 'RJ14 AA 4421',
        image: 'assets/cars/suv.png'
      },

      traveller: {
        firstName: 'Aman',
        lastName: 'Kumar',
        mobile: '9876543210',
        email: 'aman@test.com',
        notes: ''
      },

      status: 'Pending',
      driverId: 2,
      driverNotes: ''
    },

    // ---------------------------------------------------
    // TRIP 3 — ACCEPTED
    // ---------------------------------------------------
    {
      id: 503,
      bookingRef: 'REF2025003',

      pickup: 'Malviya Nagar',
      dropoff: 'Pink Square Mall',
      date: '2025-01-20',
      time: '14:15',
      tripType: 'round-trip',

      passengers: {
        adults: 3,
        children: 0,
        luggage: 1
      },

      vehicle: {
        name: 'Innova Crysta',
        seats: 6,
        bags: 3,
        price: 4200,
        carNumber: 'RJ20 BB 2211',
        image: 'assets/cars/innova.png'
      },

      traveller: {
        firstName: 'Neha',
        lastName: 'Mehta',
        mobile: '9012345678',
        email: 'neha@test.com',
        notes: 'Elderly person travelling'
      },

      status: 'Accepted',
      driverId: 3,
      driverNotes: 'Will reach 10 mins early'
    },

    // ---------------------------------------------------
    // TRIP 4 — ACCEPTED
    // ---------------------------------------------------
    {
      id: 504,
      bookingRef: 'REF2025004',

      pickup: 'Ajmer Road',
      dropoff: 'Airport T2',
      date: '2025-01-21',
      time: '05:45',
      tripType: 'one-way',

      passengers: {
        adults: 1,
        children: 0,
        luggage: 2
      },

      vehicle: {
        name: 'Sedan',
        seats: 4,
        bags: 2,
        price: 1800,
        carNumber: 'RJ14 DD 5522',
        image: 'assets/cars/sedan.png'
      },

      traveller: {
        firstName: 'Rohit',
        lastName: 'Jain',
        mobile: '9898989898',
        email: 'rohit@test.com',
        notes: 'Car with good trunk space'
      },

      status: 'Accepted',
      driverId: 1,
      driverNotes: ''
    },

    // ---------------------------------------------------
    // TRIP 5 — ON TRIP
    // ---------------------------------------------------
    {
      id: 505,
      bookingRef: 'REF2025005',

      pickup: 'Mansarovar',
      dropoff: 'Tonk Road',
      date: '2025-01-21',
      time: '12:00',
      tripType: 'one-way',

      passengers: {
        adults: 2,
        children: 1,
        luggage: 0
      },

      vehicle: {
        name: 'SUV',
        seats: 6,
        bags: 3,
        price: 3100,
        carNumber: 'RJ14 FF 9966',
        image: 'assets/cars/suv.png'
      },

      traveller: {
        firstName: 'Divya',
        lastName: 'Sharma',
        mobile: '9009090909',
        email: 'divya@test.com',
        notes: 'Travelling with kid'
      },

      status: 'On Trip',
      driverId: 2,
      driverNotes: 'Picked up passenger'
    },

    // ---------------------------------------------------
    // TRIP 6 — ON TRIP
    // ---------------------------------------------------
    {
      id: 506,
      bookingRef: 'REF2025006',

      pickup: 'Civil Lines',
      dropoff: 'Airport T1',
      date: '2025-01-22',
      time: '10:30',
      tripType: 'one-way',

      passengers: {
        adults: 1,
        children: 0,
        luggage: 1
      },

      vehicle: {
        name: 'Sedan',
        seats: 4,
        bags: 2,
        price: 1900,
        carNumber: 'RJ45 CC 6732',
        image: 'assets/cars/sedan.png'
      },

      traveller: {
        firstName: 'Ankit',
        lastName: 'Verma',
        mobile: '9823456712',
        email: 'ankit@test.com',
        notes: ''
      },

      status: 'On Trip',
      driverId: 3,
      driverNotes: 'Reached pickup location'
    },

    // ---------------------------------------------------
    // TRIP 7 — COMPLETED
    // ---------------------------------------------------
    {
      id: 507,
      bookingRef: 'REF2025007',

      pickup: 'Airport T2',
      dropoff: 'Vaishali Nagar',
      date: '2025-01-16',
      time: '20:00',
      tripType: 'one-way',

      passengers: {
        adults: 2,
        children: 0,
        luggage: 2
      },

      vehicle: {
        name: 'Crysta',
        seats: 7,
        bags: 4,
        price: 4500,
        carNumber: 'RJ14 GG 1111',
        image: 'assets/cars/innova.png'
      },

      traveller: {
        firstName: 'Mahesh',
        lastName: 'Patel',
        mobile: '9001112233',
        email: 'mahesh@test.com',
        notes: ''
      },

      status: 'Completed',
      driverId: 1,
      driverNotes: 'Trip done successfully'
    },

    // ---------------------------------------------------
    // TRIP 8 — COMPLETED
    // ---------------------------------------------------
    {
      id: 508,
      bookingRef: 'REF2025008',

      pickup: 'Tonk Phatak',
      dropoff: 'Malviya Nagar',
      date: '2025-01-15',
      time: '09:00',
      tripType: 'one-way',

      passengers: {
        adults: 1,
        children: 0,
        luggage: 0
      },

      vehicle: {
        name: 'Sedan',
        seats: 4,
        bags: 2,
        price: 1600,
        carNumber: 'RJ12 AA 2212',
        image: 'assets/cars/sedan.png'
      },

      traveller: {
        firstName: 'Karan',
        lastName: 'Singh',
        mobile: '9876541112',
        email: 'karan@test.com',
        notes: ''
      },

      status: 'Completed',
      driverId: 2,
      driverNotes: 'Good passenger'
    }
  ];

  currentDriver: any = null;

 constructor() {
    // Load driver from localStorage on service init
    const savedDriver = localStorage.getItem('fleetDriver');
    if (savedDriver) {
      this.currentDriver = JSON.parse(savedDriver);
    }
  }

  // -------------------------------------------------------
  // DRIVER LOGIN
  // -------------------------------------------------------
  signIn(email: string, password: string) {
    const driver = this.drivers.find(
      d => d.email === email && d.password === password
    );

    this.currentDriver = driver || null;

    if (driver) {
      localStorage.setItem('fleetDriver', JSON.stringify(driver));
    }

    return driver;
  }

  // -------------------------------------------------------
  // DRIVER LOGOUT
  // -------------------------------------------------------
  signOut() {
    this.currentDriver = null;
    localStorage.removeItem('fleetDriver');
  }

  // -------------------------------------------------------
  // GET CURRENT DRIVER
  // -------------------------------------------------------
  getCurrentDriver() {
    return this.currentDriver;
  }

  // -------------------------------------------------------
  // GET TRIPS FOR A DRIVER
  // -------------------------------------------------------
  getTrips(driverId: number) {
    return this.trips.filter(t => t.driverId === driverId);
  }

  // -------------------------------------------------------
  // GET TRIP DETAILS
  // -------------------------------------------------------
  getTrip(id: number) {
    return this.trips.find(t => t.id == id);
  }

  // -------------------------------------------------------
  // UPDATE TRIP (STATUS / NOTES)
  // -------------------------------------------------------
  updateTrip(id: number, patch: any) {
    const index = this.trips.findIndex(t => t.id == id);
    if (index >= 0) {
      this.trips[index] = { ...this.trips[index], ...patch };
    }
  }

  // -------------------------------------------------------
  // UPDATE TRIP STATUS (Single Click Workflow)
  // -------------------------------------------------------
  updateTripStatus(id: number) {
    const index = this.trips.findIndex(t => t.id === id);

    if (index >= 0) {
      const current = this.trips[index].status;
      let next = current;

      if (current === 'Pending') next = 'Accepted';
      else if (current === 'Accepted') next = 'On Trip';
      else if (current === 'On Trip') next = 'Completed';
      else next = 'Completed';

      this.trips[index].status = next;
    }
  }
}
