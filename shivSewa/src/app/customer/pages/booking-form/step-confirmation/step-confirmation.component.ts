import { Component } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as L from 'leaflet';

@Component({
  selector: 'app-step-confirmation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './step-confirmation.component.html',
  styleUrl: './step-confirmation.component.scss'
})
export class StepConfirmationComponent {
  booking: any = {};
  private map: any;
  estimated: any;
  constructor(private bookingService: BookingService) {
     this.bookingService.booking$.subscribe(b => {
      this.booking = b;
      this.estimated = b.vehicle?.price || 0;
      console.log(this.booking, "this.booking")
    });
     window.scrollTo({ top: 0, behavior: 'smooth' });
     console.log(this.booking, "this.booking in confirmation")
  }

  ngAfterViewInit(): void {
    // Initialize map after view is ready
    setTimeout(() => {
    if (this.booking?.pickup && this.booking?.dropoff) {
      this.initMap();
    }
  }, 100);
  }
  async initMap(): Promise<void> {
  try {
    const pickupCoords = {
      lat: this.booking.pickup.latitude,
      lng: this.booking.pickup.longitude
    };

    const dropoffCoords = {
      lat: this.booking.dropoff.latitude,
      lng: this.booking.dropoff.longitude
    };

    // Hide loader
    const loader = document.getElementById('mapLoader');
    if (loader) loader.style.display = 'none';

    this.map = L.map('routeMap', {
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: false,
      doubleClickZoom: false,
      attributionControl: false,
      touchZoom: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);

    const bounds = L.latLngBounds(
      [pickupCoords.lat, pickupCoords.lng],
      [dropoffCoords.lat, dropoffCoords.lng]
    );
    this.map.fitBounds(bounds, { padding: [80, 80] });

    // Icons
    const pickupIcon = L.divIcon({
      html: `<div style="width:24px;height:24px;background:#1a1a1a;border:3px solid white;border-radius:50%"></div>`,
      className: '',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const dropoffIcon = L.divIcon({
      html: `<div style="width:32px;height:32px;background:#FF6B35;border:4px solid white;border-radius:50%"></div>`,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const pickupMarker = L.marker(
      [pickupCoords.lat, pickupCoords.lng],
      { icon: pickupIcon }
    ).addTo(this.map);

    const dropoffMarker = L.marker(
      [dropoffCoords.lat, dropoffCoords.lng],
      { icon: dropoffIcon }
    ).addTo(this.map);

    // Route
    const routeCoords = await this.getRoute(pickupCoords, dropoffCoords);

    L.polyline(routeCoords.length ? routeCoords : [
      [pickupCoords.lat, pickupCoords.lng],
      [dropoffCoords.lat, dropoffCoords.lng]
    ], {
      color: '#FF6B35',
      weight: 4,
      opacity: 0.9
    }).addTo(this.map);

    // ✅ Correct tooltip text
    pickupMarker.bindTooltip(
      this.booking.pickup.name,
      { permanent: true, direction: 'right', offset: [15, 0] }
    );

    dropoffMarker.bindTooltip(
      this.booking.dropoff.name,
      { permanent: true, direction: 'right', offset: [20, 0] }
    );

  } catch (error) {
    console.error('Map error:', error);
  }
}

 // Geocode place name to coordinates using Nominatim
  async getCoordinates(placeName: string): Promise<{lat: number, lng: number} | null> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
      }
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  }

  // Get route from OSRM routing service
  async getRoute(start: {lat: number, lng: number}, end: {lat: number, lng: number}): Promise<[number, number][]> {
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
      );
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        // Convert coordinates from [lng, lat] to [lat, lng] for Leaflet
        return data.routes[0].geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]]);
      }
      return [];
    } catch (error) {
      console.error('Routing error:', error);
      return [];
    }
  }

  goBack(): void {
    console.log('Going back...');
    // Add your navigation logic
  }

  confirm(): void {
    console.log('Booking confirmed:', this.booking);
    // Add your confirmation logic
  }
}
