import { Component, AfterViewInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-confirmation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './step-confirmation.component.html',
  styleUrl: './step-confirmation.component.scss'
})
export class StepConfirmationComponent implements AfterViewInit {

  booking: any = {};
  estimated: any;

  // Map state
  mapLoaded = false;
  distanceText = '';
  durationText = '';

  // Google Maps objects
  private map!: google.maps.Map;
  private directionsService!: google.maps.DirectionsService;
  private directionsRenderer!: google.maps.DirectionsRenderer;

  constructor(private bookingService: BookingService) {
    this.bookingService.booking$.subscribe(b => {
      this.booking = b;
      this.estimated = b.vehicle?.price || 0;
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngAfterViewInit(): void {
    // Map loads ONLY when user clicks button
  }

  // -----------------------------
  // Load Map Button Click
  // -----------------------------
  loadMap(): void {
  this.mapLoaded = true;

  setTimeout(() => {
    if (this.booking?.pickup && this.booking?.dropoff) {
      this.initGoogleMap();
    }
  }, 200); // 👈 slight delay is REQUIRED
}


  // -----------------------------
  // Initialize Google Map
  // -----------------------------
   initGoogleMap(): void {
  const pickup = new google.maps.LatLng(
    this.booking.pickup.latitude,
    this.booking.pickup.longitude
  );

  const drop = new google.maps.LatLng(
    this.booking.dropoff.latitude,
    this.booking.dropoff.longitude
  );

  // 1️⃣ Create map (REMOVE fixed zoom)
  this.map = new google.maps.Map(
    document.getElementById('routeMap') as HTMLElement,
    {
      center: pickup,
      disableDefaultUI: true,
      draggable: false,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      gestureHandling: 'none'
    }
  );

  // 2️⃣ Create bounds to fit pickup & drop
  const bounds = new google.maps.LatLngBounds();
  bounds.extend(pickup);
  bounds.extend(drop);

  // 3️⃣ Force resize & fit bounds (CRITICAL)
  setTimeout(() => {
    google.maps.event.trigger(this.map, 'resize');

    this.map.fitBounds(bounds, {
      top: 80,
      bottom: 80,
      left: 80,
      right: 80
    });
  }, 150);

  // 4️⃣ Directions service
  this.directionsService = new google.maps.DirectionsService();

  this.directionsRenderer = new google.maps.DirectionsRenderer({
    map: this.map,
    suppressMarkers: true,
    polylineOptions: {
      strokeColor: '#FF6B35',
      strokeWeight: 6,
      strokeOpacity: 0.9
    }
  });

  // 5️⃣ Premium Markers with compact labels
 this.addLabeledMarker(
  pickup,
  'Pickup Here',
  this.booking.pickup.name
);

this.addLabeledMarker(
  drop,
  'Drop Here',
  this.booking.dropoff.name
);

  // 6️⃣ Draw route
  this.calculateRoute(pickup, drop);
}


addLabeledMarker(
  position: google.maps.LatLng,
  title: string,
  locationName: string
): void {

  // Marker (invisible anchor)
  const marker = new google.maps.Marker({
    position,
    map: this.map,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 0 // invisible marker
    }
  });

  // InfoWindow with Font Awesome icon
  const infoWindow = new google.maps.InfoWindow({
    disableAutoPan: true, // prevents map movement
    content: `
      <div style="
        font-family: Inter, sans-serif;
        padding: 4px 8px;
        display: flex;
        align-items: center;
        gap: 6px;
        white-space: nowrap;
      ">
        <i class="fa-solid fa-map-pin"
           style="
             color: #f97316;
             font-size: 14px;
           ">
        </i>
        <div>
          <div style="
            font-size: 10px;
            color: #999;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            line-height: 1;
          ">
            ${title}
          </div>
          <div style="
            font-size: 12px;
            font-weight: 600;
            color: #1a1a1a;
            line-height: 1.2;
            max-width: 160px;
            overflow: hidden;
            text-overflow: ellipsis;
          ">
            ${locationName}
          </div>
        </div>
      </div>
    `
  });

  // Open by default
  infoWindow.open(this.map, marker);

  // ❌ Remove close (X) button
  google.maps.event.addListener(infoWindow, 'domready', () => {
    const closeBtn = document.querySelector('.gm-ui-hover-effect');
    if (closeBtn) {
      (closeBtn as HTMLElement).style.display = 'none';
    }
  });
}



get staticMapUrl(): string {
  if (!this.booking?.pickup || !this.booking?.dropoff) return '';

  const origin = `${this.booking.pickup.latitude},${this.booking.pickup.longitude}`;
  const dest = `${this.booking.dropoff.latitude},${this.booking.dropoff.longitude}`;

  return `url(https://maps.googleapis.com/maps/api/staticmap?
    size=800x400
    &markers=color:green|${origin}
    &markers=color:red|${dest}
    &path=color:0xff6b35ff|weight:5|${origin}|${dest}
    &key=YOUR_API_KEY)`;
}
openInGoogleMaps(): void {
    const origin = `${this.booking.pickup.latitude},${this.booking.pickup.longitude}`;
    const dest = `${this.booking.dropoff.latitude},${this.booking.dropoff.longitude}`;

    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}&travelmode=driving`;
    window.open(url, '_blank');
  }


  // -----------------------------
  // Route + Distance + Duration
  // -----------------------------
  calculateRoute(
    start: google.maps.LatLng,
    end: google.maps.LatLng
  ): void {
    this.directionsService.route(
      {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          this.directionsRenderer.setDirections(result);

          const leg = result.routes[0].legs[0];
          this.distanceText = leg.distance?.text || '';
          this.durationText = leg.duration?.text || '';
        }
      }
    );
  }

  // -----------------------------
  // Navigation
  // -----------------------------
  goBack(): void {
    console.log('Going back...');
  }

  confirm(): void {
    console.log('Booking confirmed:', this.booking);
  }
}
