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
  constructor(private bookingService: BookingService) {
    this.bookingService.booking$.subscribe(b => this.booking = b);
  }

  ngAfterViewInit(): void {
    // Initialize map after view is ready
    setTimeout(() => {
      this.initMap();
    }, 100);
  }
  async initMap(): Promise<void> {
    try {
      // Get coordinates from place names using Nominatim geocoding API
      const pickupCoords = await this.getCoordinates(this.booking.pickup);
      const dropoffCoords = await this.getCoordinates(this.booking.dropoff);

      if (!pickupCoords || !dropoffCoords) {
        console.error('Could not geocode locations');
        return;
      }

      // Hide loader
      const loader = document.getElementById('mapLoader');
      if (loader) loader.style.display = 'none';

      // Initialize the map
      this.map = L.map('routeMap', {
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: false,
        doubleClickZoom: false,
        attributionControl: false,
        touchZoom: false
      });

      // Add tile layer with a nice style
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(this.map);

      // Calculate bounds and fit map
      const bounds = L.latLngBounds(
        [pickupCoords.lat, pickupCoords.lng],
        [dropoffCoords.lat, dropoffCoords.lng]
      );
      this.map.fitBounds(bounds, { padding: [80, 80] });

      // Create custom icons using divIcon
      const pickupIcon = L.divIcon({
        html: `<div style="width: 24px; height: 24px; background-color: #1a1a1a; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
        className: '',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const dropoffIcon = L.divIcon({
        html: `<div style="width: 32px; height: 32px; background-color: #FF6B35; border: 4px solid white; border-radius: 50%; box-shadow: 0 3px 10px rgba(255,107,53,0.4); display: flex; align-items: center; justify-content: center;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>`,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      // Add markers
      const pickupMarker = L.marker([pickupCoords.lat, pickupCoords.lng], {
        icon: pickupIcon
      }).addTo(this.map);

      const dropoffMarker = L.marker([dropoffCoords.lat, dropoffCoords.lng], {
        icon: dropoffIcon
      }).addTo(this.map);

      // Get route from OSRM (Open Source Routing Machine)
      const routeCoords = await this.getRoute(pickupCoords, dropoffCoords);

      if (routeCoords && routeCoords.length > 0) {
        // Draw the route with orange color
        L.polyline(routeCoords, {
          color: '#FF6B35',
          weight: 4,
          opacity: 0.9,
          smoothFactor: 1,
          lineJoin: 'round',
          lineCap: 'round'
        }).addTo(this.map);
      } else {
        // Fallback: draw straight line if routing fails
        L.polyline([
          [pickupCoords.lat, pickupCoords.lng],
          [dropoffCoords.lat, dropoffCoords.lng]
        ], {
          color: '#FF6B35',
          weight: 4,
          opacity: 0.9
        }).addTo(this.map);
      }

      // Add location labels
      pickupMarker.bindTooltip(this.booking.pickup, {
        permanent: true,
        direction: 'right',
        className: 'custom-tooltip',
        offset: [15, 0]
      });

      dropoffMarker.bindTooltip(this.booking.dropoff, {
        permanent: true,
        direction: 'right',
        className: 'custom-tooltip-dropoff',
        offset: [20, 0]
      });

      // Add distance badge
      const mapContainer = document.getElementById('routeMap');
      if (mapContainer) {
        const badge = document.createElement('div');
        badge.className = 'distance-badge';
        badge.innerHTML = `<i class="bi bi-arrow-left-right me-1"></i>${this.booking.distance}`;
        mapContainer.appendChild(badge);
      }

    } catch (error) {
      console.error('Error initializing map:', error);
      const loader = document.getElementById('mapLoader');
      if (loader) {
        loader.innerHTML = '<p class="text-danger small">Could not load map</p>';
      }
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
