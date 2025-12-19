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

  // 1️⃣ Map
  this.map = new google.maps.Map(
    document.getElementById('routeMap') as HTMLElement,
    {
      disableDefaultUI: true,
      draggable: false,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      gestureHandling: 'none'
    }
  );

  // 2️⃣ Bounds (less zoomed feel)
  const bounds = new google.maps.LatLngBounds();
  bounds.extend(pickup);
  bounds.extend(drop);

  setTimeout(() => {
    google.maps.event.trigger(this.map, 'resize');

    this.map.fitBounds(bounds, {
      top: 180,
      bottom: 180,
      left: 180,
      right: 180
    });

    const maxZoom = 14;
    const listener = google.maps.event.addListener(this.map, 'idle', () => {
      if ((this.map.getZoom() ?? 0) > maxZoom) {
        this.map.setZoom(maxZoom);
      }
      google.maps.event.removeListener(listener);
    });
  }, 160);

  // 3️⃣ Directions (PATH ONLY)
  this.directionsService = new google.maps.DirectionsService();
  this.directionsRenderer = new google.maps.DirectionsRenderer({
  map: this.map,
  suppressMarkers: true,
  polylineOptions: {
    strokeColor: 'rgba(241, 101, 18, 1)',
    strokeOpacity: 1,
    strokeWeight: 4
  }
});


  // 4️⃣ Pins only
this.addPickupPin(pickup);

// Dropoff
this.addDropPin(drop);

  // 5️⃣ Draw route
  this.calculateRoute(pickup, drop);
}
addPin(position: google.maps.LatLng, color: string): void {
  new google.maps.Marker({
    position,
    map: this.map,
    zIndex: 1000,
    icon: {
      path: `
        M352 348.4C416.1 333.9 464 276.5 464 208
        C464 128.5 399.5 64 320 64
        C240.5 64 176 128.5 176 208
        C176 276.5 223.9 333.9 288 348.4
        L288 544
        C288 561.7 302.3 576 320 576
        C337.7 576 352 561.7 352 544
        L352 348.4z
        M328 160
        C297.1 160 272 185.1 272 216
        C272 229.3 261.3 240 248 240
        C234.7 240 224 229.3 224 216
        C224 158.6 270.6 112 328 112
        C341.3 112 352 122.7 352 136
        C352 149.3 341.3 160 328 160z
      `,
      fillColor: color,
      fillOpacity: 1,
      strokeColor: '#ffffff',
      strokeWeight: 2,
      scale: 0.045,                 // 🔥 scaled from 640 viewBox
      anchor: new google.maps.Point(320, 576) // 🔥 bottom center
    }
  });
}



addLabeledMarker(
  position: google.maps.LatLng,
  locationName: string,
  pinColor: string
): void {

  // Invisible anchor for label
  const anchor = new google.maps.Marker({
    position,
    map: this.map,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 0
    }
  });

  // Small clean name card (NO ICON, NO CLOSE)
  const infoWindow = new google.maps.InfoWindow({
    disableAutoPan: true,
    content: `
       <div style="
    display: flex;
    align-items: center;
    gap: 2px;
    font-family: Inter, sans-serif;
    padding: 4px 4px;
    background: #ffffff;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    font-size: 12px;
    font-weight: 600;
    color: #111;
    white-space: nowrap;
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
  ">
    <i class="fa-solid fa-map-pin" style="color:#e11d48; font-size: 12px;"></i>
    <span>${locationName}</span>
  </div>
    `
  });

  infoWindow.open(this.map, anchor);

  // 🔥 Font-Awesome-like MAP PIN (SVG)
  new google.maps.Marker({
    position,
    map: this.map,
    zIndex: 1000,
    icon: {
      path: `
        M12 2
        C8.13 2 5 5.13 5 9
        c0 5.25 7 13 7 13
        s7-7.75 7-13
        c0-3.87-3.13-7-7-7z
      `,
      fillColor: pinColor,
      fillOpacity: 1,
      strokeColor: '#ffffff',
      strokeWeight: 1,
      scale: 2,
      anchor: new google.maps.Point(12, 24)
    }
  });
}



addCarMarker(position: google.maps.LatLng): void {
  const marker = new google.maps.Marker({
    position,
    map: this.map,
    icon: {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
      scale: 5,
      fillColor: '#f97316',
      fillOpacity: 1,
      strokeColor: '#ffffff',
      strokeWeight: 1,
      rotation: 0
    }
  });
}
addPickupPin(position: google.maps.LatLng): void {
  new google.maps.Marker({
    position,
    map: this.map,
    zIndex: 1000,
    icon: {
      path: `
        M8 0a.5.5 0 0 1 .5.5v.518
        A7 7 0 0 1 14.982 7.5h.518
        a.5.5 0 0 1 0 1h-.518
        A7 7 0 0 1 8.5 14.982v.518
        a.5.5 0 0 1-1 0v-.518
        A7 7 0 0 1 1.018 8.5H.5
        a.5.5 0 0 1 0-1h.518
        A7 7 0 0 1 7.5 1.018V.5
        A.5.5 0 0 1 8 0

        M7.5 2.02A6 6 0 0 0 2.02 7.5h1.005
        A5 5 0 0 1 7.5 3.025z

        M8.5 3.025A5 5 0 0 1 12.975 7.5h1.005
        A6 6 0 0 0 8.5 2.02z

        M12.975 8.5A5 5 0 0 1 8.5 12.975v1.005
        a6 6 0 0 0 5.48-5.48z

        M7.5 12.975A5 5 0 0 1 3.025 8.5H2.02
        a6 6 0 0 0 5.48 5.48z

        M10 8a2 2 0 1 0-4 0
        a2 2 0 0 0 4 0
      `,
      fillColor: '#000000',
      fillOpacity: 1,
      strokeColor: '#ffffff',
      strokeWeight: 1,
      scale: 2,
      anchor: new google.maps.Point(8, 8) // center of 16x16 SVG
    }
  });
}

addDropPin(position: google.maps.LatLng): void {
  new google.maps.Marker({
    position,
    map: this.map,
    zIndex: 1000,
    icon: {
      path: `
        M352 348.4C416.1 333.9 464 276.5 464 208
        C464 128.5 399.5 64 320 64
        C240.5 64 176 128.5 176 208
        C176 276.5 223.9 333.9 288 348.4
        L288 544
        C288 561.7 302.3 576 320 576
        C337.7 576 352 561.7 352 544
        L352 348.4z
      `,
      fillColor: 'rgba(241, 101, 18, 1)',
      fillOpacity: 1,
      strokeColor: '#ffffff',
      strokeWeight: 2,
      scale: 0.045,
      anchor: new google.maps.Point(320, 576)
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
