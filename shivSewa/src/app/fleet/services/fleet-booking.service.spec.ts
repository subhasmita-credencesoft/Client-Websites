import { TestBed } from '@angular/core/testing';

import { FleetBookingService } from './fleet-booking.service';

describe('FleetBookingService', () => {
  let service: FleetBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FleetBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
