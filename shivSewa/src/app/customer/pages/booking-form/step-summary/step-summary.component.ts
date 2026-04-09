import { Component } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationService } from '../../../services/location/location.service';
import { mapTaxiToSlot } from '../../../services/taxi-to-slot.mapper';
import { PricingService } from '../../../pricing/pricing.service';
import { ChangeDetectorRef } from '@angular/core';
import { ReCaptchaV3Service, RecaptchaV3Module } from 'ng-recaptcha';
@Component({
  selector: 'app-step-summary',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RecaptchaV3Module],
  templateUrl: './step-summary.component.html',
  styleUrl: './step-summary.component.scss',
})
export class StepSummaryComponent {
  booking: any = {};
  estimated = 0;
  isCheckingCustomer = false;
  vehicle:
    | {
        id?: any;
        name?: string;
        seats?: number;
        carNumber?: string;
        bags?: number;
        price?: number;
        image?: string;
      }
    | undefined;
  vehicleOne:
    | {
        id?: any;
        name?: string;
        seats?: number;
        carNumber?: string;
        bags?: number;
        price?: number;
        image?: string;
      }
    | undefined;
  slots: any[] = [];
  slotPricingDto: any;
  transportServiceType: any;
  matchedSlot: any;
  propertyDetails: any;
  customerId: any;
  customerData: any;
  businessTypeId: any;
  isConfirming = false;
  taxDetails: any;
  inclusions: any[] = [];
  constructor(
    private bookingService: BookingService,
    private locationService: LocationService,
    private pricingService: PricingService,
    private cdr: ChangeDetectorRef,
    private recaptcha: ReCaptchaV3Service
  ) {
    this.bookingService.booking$.subscribe((b) => {
      this.booking = b;
      this.estimated = b.vehicle?.price || 0;
      this.vehicleOne = b.vehicle;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.fetchPropertyDetails();
  }
    ngOnInit(): void {
    if (this.pricingService.isReady()) {
      this.buildInclusions();
    }
  }
    private calculateOutstationDays(
    pickupDate: string,
    returnDate?: string
  ): number {
    if (!returnDate) return 1;

    const [sy, sm, sd] = pickupDate.split('-').map(Number);
    const [ey, em, ed] = returnDate.split('-').map(Number);

    const start = new Date(sy, sm - 1, sd);
    const end = new Date(ey, em - 1, ed);

    const ONE_DAY = 24 * 60 * 60 * 1000;
    const diffDays = Math.round((end.getTime() - start.getTime()) / ONE_DAY);

    return diffDays >= 0 ? diffDays + 1 : 1;
  }
  padZero(num: number): string {
    return num.toString().padStart(2, '0');
  }

  fetchPropertyDetails() {
    this.locationService.getPropertyDetails(2302).subscribe((res) => {
      this.propertyDetails = res;
      this.transportServiceType = res?.businessServiceDtoList
        ?.flatMap((bs: any) => bs.businessServiceTypes || [])
        ?.find((bst: any) => bst.name === 'Transport');

      const businessService = res?.businessServiceDtoList?.find((bs: any) =>
        bs.businessServiceTypes?.some((bst: any) => bst.name === 'Transport'),
      );
      this.taxDetails = res?.taxDetails || [];

      const baseAmount = this.booking?.fareQuote?.total || 0;

      this.bookingService.applyTaxAndPricing(
        baseAmount,
        this.taxDetails
      );


      this.businessTypeId = businessService?.businessTypeId;
      // 2. Get pricing
      this.slotPricingDto = this.transportServiceType?.slotPricingDto || null;
      const pricing = this.booking.pricing;
      if(pricing) {
        if (this.transportServiceType?.slotPricingDto) {
        this.slotPricingDto = {
          ...this.transportServiceType.slotPricingDto,
          afterTaxAmount: pricing.totalAmount,
          beforeTaxAmount: pricing.baseAmount
        };
      } else {
        this.slotPricingDto = {
          afterTaxAmount: pricing.totalAmount,
          beforeTaxAmount: pricing.baseAmount
        };
      }
      }


      // 3. Find matching slot by vehicle name
      this.matchedSlot = this.transportServiceType?.slots?.find(
        (slot: any) =>
          slot?.resource?.resourceName === this.booking?.vehicle?.name,
      );

      // 4. Assign result
      this.slots = this.matchedSlot ? [this.matchedSlot] : [];
    });
  }
  buildBookingPayload(booking: any) {
    return {
      referenceId: booking.bookingRef || '',

      trip: {
        tripType: booking.tripType,
        tripTypeValue: booking.tripTypeValue,
        tripServiceType: booking.tripServiceType,
      },

      location: {
        pickup: booking.pickup,
        dropoff: booking.dropoff,
        schedule: {
          date: booking.date,
          time: booking.time,
          returnDate: booking.returnDate || null,
          returnTime: booking.returnTime || null,
        },
        distance: {
          distanceKm: booking.distanceKm,
          durationMinutes: booking.durationMinutes,
        },
        locality: booking.locality || '',
      },

      passengers: booking.passengers,

      vehicle: {
        category: booking.vehicleCategory,
        ...booking.vehicle,
      },

      pricing: {
        fareQuote: booking.fareQuote,
        currency: booking.fareQuote?.currency || 'INR',
      },

      traveller: booking.traveller,

      verification: {
        emailOtp: {
          sent: true,
          verified: true,
          sid: booking.otpSid || '',
        },
        customer: booking.customer || null,
      },

      payment: {
        paymentMode: 'Cash',
        status: 'NotPaid',
        currency: 'INR',
        amount: booking.fareQuote?.total || 0,
      },

      bookingStatus: 'NEW',
    };
  }

  mapSavePaymentPayload(
    bookingData: any,
    slotPricingDto: any,
    property: any,
  ): any {
     const pricing = this.booking.pricing;
    return {
      paymentMode: 'Cash',
      status: 'NotPaid',

      firstName: bookingData.traveller.firstName,
      lastName: bookingData.traveller.lastName,
    netReceivableAmount: pricing.baseAmount,
    transactionAmount: pricing.totalAmount,
    amount: pricing.totalAmount,

    taxAmount: pricing.taxAmount,

      propertyId: property.id,
      email: bookingData.traveller.email,
      businessEmail: property.email,

      transactionChargeAmount: pricing.totalAmount,
      currency: property.localCurrency || 'INR',
      deliveryChargeAmount: 0,

      businessServiceName: property.businessType,
      counterNumber: String(property.id),

      operatorName:
        `${bookingData.traveller.firstName || ''} ${bookingData.traveller.lastName || ''}`.trim(),
      date: bookingData.date,
    };
  }
  mapBookingPayload(
    bookingData: any,
    transportServiceType: any,
    matchedSlot: any,
    slotPricingDto: any,
    property: any,
    paymentId: number,
    modeOfPayment: string,
  ): any {
     const pricing = this.booking.pricing;
     const startDateTime = new Date(`${bookingData.date}T${bookingData.time}:00`);
    const endDateTime   = new Date(`${bookingData.returnDate}T${bookingData.returnTime}:00`);
    const startDate = startDateTime.getTime();
    const endDate   = endDateTime.getTime();
    return {
      mobile: bookingData.traveller.mobile,
      businessTermLocation: 'Location Detail',
      businessTermResource: 'Staff Detail',
      businessTypeId: transportServiceType.businessTypeId || 81,

      propertyId: property.id,

      businessLocationName: property.businessLocationName || 'Pickup',
      customerLocationName: property.customerLocationName || 'Drop Off',
      canChangeBusinessAddress: true,
      businessProductName: property.businessProductName || 'Packages',
      businessServiceName: property.businessServiceName || 'Service',
      provideBusinessAndCustomerAddress: true,
      externalSite: 'WebSite',
      date: bookingData.date,

      businessServiceTypes: [
        {
          id: transportServiceType.id,
          name: transportServiceType.name,
          businessTermLocation: 'Location Detail',
          businessTermResource: 'Staff Detail',
          capacityPerSlot: transportServiceType.capacityPerSlot,
          description: transportServiceType.description,
          slotPricingDto,

          businessServiceId: transportServiceType.businessServiceId,
          durationInMinutes: this.booking.durationInMinutes,

          slots: [
            {
              date: bookingData.date,
              duration: this.booking.durationMinutes,
              available: matchedSlot.available,
              beforeTax: pricing.baseAmount,
              tax: pricing.taxAmount,
              price: pricing.totalAmount,
              count: matchedSlot.count,
              day: new Date(bookingData.date).toLocaleDateString('en-US', {
                weekday: 'long',
              }),

              resourceList: [
                {
                  name: bookingData.vehicle.name,
                  desc: `${bookingData.vehicle.seats} Seater`,
                  bookedTimings: [
                    {
                      startTime:
                        matchedSlot.resource?.workingHours?.[0]?.startTime ||
                        '07:00',
                      finishTime:
                        matchedSlot.resource?.workingHours?.[0]?.finishTime ||
                        '19:00',
                      duration: transportServiceType.durationInMinutes,
                      slotAvailabilityDto: {
                        id: null,
                        noOfBooked: 0,
                        noOfAvailable: 1,
                        noOfCancellation: null,
                      },
                    },
                  ],
                  locationList: [{ name: matchedSlot?.location?.locationName }],
                },
              ],
            },
          ],
        },
      ],
      endDate: endDate,
      startDate:startDate,
      resourceName: bookingData.vehicle.name,
      locationName: matchedSlot.location?.locationName,
      bookingStatus: 'NEW',
      businessTypeName: property.businessType,

      currency: property.localCurrency || 'INR',
      totalAmount: pricing.totalAmount,
      beforeTaxAmount: pricing.baseAmount,
      // taxAmount: slotPricingDto.taxAmount,
      taxAmount: pricing.taxAmount,
      afterTaxAmount: pricing.totalAmount,
      fareLines: bookingData.fareQuote?.lines,
      fareNotes: bookingData.fareQuote?.notes,
      customerDtoList: [
        {
          id: this.customerData.id || null,
          firstName: bookingData.traveller.firstName,
          lastName: bookingData.traveller.lastName,
          email: bookingData.traveller.email,
          mobile: bookingData.traveller.mobile,
          noOfKids: bookingData.passengers.children,
          new: false,
          address: bookingData.pickup.service_address,
          username: this.customerData.username,
        },
      ],

      firstName: bookingData.traveller.firstName,
      lastName: bookingData.traveller.lastName,
      email: bookingData.traveller.email,

      paymentId,
      modeOfPayment,

      noOfPerson: bookingData.passengers.adults,
      noOfChildren: bookingData.passengers.children,
      serviceAddress: bookingData.dropoff.service_address,
      transportType: this.getTripTypeLabel(bookingData.tripTypeValue)
    };
  }

  goBack() {
    this.bookingService.prevStep();
  }
  validateTravellerForm(
    firstName: any,
    lastName: any,
    mobile: any
  ): string | null {
    // Touch all fields before checking
    firstName.control.markAsTouched();
    lastName.control.markAsTouched();
    mobile.control.markAsTouched();

    const t = this.booking.traveller;

    if (!t.firstName) {
      return 'firstNameField';
    }

    if (!t.lastName || !/^[A-Za-z]+$/.test(t.lastName)) {
      return 'lastNameField';
    }

    if (!t.mobile || !/^[6-9][0-9]{9}$/.test(t.mobile)) {
      return 'mobileField';
    }

    return null;
  }

  scrollToField(fieldId: string) {
    const el = document.getElementById(fieldId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('shake-error');

      // Remove effect after animation
      setTimeout(() => el.classList.remove('shake-error'), 800);
    }
  }
  formatBookingDate(date: string | Date): string {
    if (!date) return '';

    const d = new Date(date);
    const day = d.getDate();

    const suffix =
      day % 10 === 1 && day !== 11
        ? 'st'
        : day % 10 === 2 && day !== 12
          ? 'nd'
          : day % 10 === 3 && day !== 13
            ? 'rd'
            : 'th';

    const month = d.toLocaleString('en-US', { month: 'long' });
    const year = d.getFullYear();

    return `${month} ${day}${suffix} ${year}`;
  }

private buildInclusions() {

  const config = this.pricingService.getConfig();

  // ✅ Use tripServiceType (matches pricing config exactly)
  const type = this.booking?.tripServiceType;
  const category = this.booking?.vehicleCategory;

  if (!config?.services || !type || !category) {
    this.inclusions = [];
    return;
  }
// ==============================
// 🚕 PICKUP & DROP
// ==============================
if (type === 'pickup_drop') {

  const cat = config.services.pickup_drop?.categories?.[category];
  if (!cat) {
    this.inclusions = [];
    return;
  }

  this.inclusions = [
    {
      title: `${cat.base_km} km included in your fare`,
      subtitle: `After ${cat.base_km} km, ₹${cat.additional_km_rate} per km will be charged`
    },
    {
      title: '45 minutes free waiting time',
      subtitle: 'After 45 minutes, ₹100 will be charged per 45 minutes'
    },
    {
      title: 'Fuel & driver charges included',
      subtitle: 'No extra fuel cost for this trip'
    }
  ];
}


// ==============================
// 🕒 RENTAL
// ==============================
else if (type === 'rental') {

  const cat = config.services.rental?.categories?.[category];
  if (!cat) {
    this.inclusions = [];
    return;
  }

  this.inclusions = [
    {
      title: `${cat.package.hours} hours & ${cat.package.km} km included`,
      subtitle: `Total base fare: ₹${cat.package.base_fare}`
    },
    {
      title: `Extra usage charges`,
      subtitle: `₹${cat.extra_km_rate}/km for additional distance & ₹${cat.extra_hour_rate}/hour for extra time`
    },
    {
      title: 'Driver & fuel included',
      subtitle: 'Enjoy a hassle-free ride with no hidden fuel costs'
    }
  ];
}


// ==============================
// 🌄 OUTSTATION
// ==============================
else if (type === 'outstation') {

  const cat = config.services.outstation?.categories?.[category];
  if (!cat) {
    this.inclusions = [];
    return;
  }

  const days = this.calculateOutstationDays(
    this.booking.date,
    this.booking.returnDate
  );

  this.inclusions = [
    {
      title: `Minimum ${cat.min_km_per_day} km per day`,
      subtitle: `Calculated for ${days} day${days > 1 ? 's' : ''} of travel`
    },
    {
      title: `Distance charge: ₹${cat.per_km_rate} per km`,
      subtitle: `Distance is calculated as ${cat.distance_calculation.replace(/_/g, ' ')}`
    },
    {
      title: `Driver allowance: ₹${cat.driver_allowance_per_day} per day`,
      subtitle: `Total driver allowance for ${days} day${days > 1 ? 's' : ''}: ₹${cat.driver_allowance_per_day * days}`
    }
  ];
}

else {
  this.inclusions = [];
}

}

onMobileBlur() {
  if (/^[6-9][0-9]{9}$/.test(this.booking.traveller.mobile)) {
    this.isCheckingCustomer = true;
    this.checkCustomerExists();
  }
}
  /* ================= CHECK CUSTOMER ================= */
  checkCustomerExists() {
  this.locationService.checkMobile(this.booking.traveller.mobile).subscribe({
    next: (res: any) => {
      this.customerData = res;
      this.isCheckingCustomer = false;
      this.cdr.detectChanges();
    },
    error: () => {
      const customerPayload = {
        isCustomerUpdate: false,
        firstName: this.booking.traveller.firstName,
        lastName: this.booking.traveller.lastName,
        email: this.booking.traveller.email,
        mobile: this.booking.traveller.mobile,
        propertyId: this.propertyDetails.id
      };

      this.locationService.createCustomer(customerPayload).subscribe({
        next: (customerRes) => {
          this.customerData = customerRes;
          this.isCheckingCustomer = false;
          this.cdr.detectChanges();
        }
      });
    }
  });
}

  private formatDate(date: string | null | undefined): string {
    if (!date) return 'NA';
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }

  private formatTime(time: string | null | undefined): string {
    if (!time) return 'NA';
    const [h, m] = time.split(':');
    const d = new Date();
    d.setHours(+h, +m);
    return d.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }
  private formatDuration(durationMinutes?: number): string {
    if (!durationMinutes || durationMinutes <= 0) return 'NA';
    const hours = Math.round(durationMinutes / 60);
    return `${hours} hrs`;
  }
  private getTripTypeLabel(tripTypeValue: string): string {
    switch (tripTypeValue) {
      case 'pickup-drop':
        return 'Pickup & Drop-off';
      case 'outstation':
        return 'Outstation';
      case 'rental':
        return 'Rental';
      default:
        return 'NA';
    }
  }
  buildPickupWhatsappPayload(booking: any): any {
    const formatDate = (d: string) =>
      new Date(d).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });

    const formatTime = (t: string) => {
      const [h, m] = t.split(':');
      const date = new Date();
      date.setHours(+h, +m);
      return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    };

    return {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: booking.traveller.mobile,
      type: 'template',
      template: {
        name: 'order_management_1',
        language: { code: 'en' },
        components: [
          {
            type: 'header',
            parameters: [],
          },
          {
            type: 'body',
            parameters: [
              { type: 'text', text: booking.traveller.firstName }, // guest name
              { type: 'text', text: booking.bookingRef }, // booking ref
              { type: 'text', text: booking.pickup.name }, // pickup
              { type: 'text', text: booking.dropoff.name }, // drop
              { type: 'text', text: formatDate(booking.date) }, // pickup date
              { type: 'text', text: formatTime(booking.time) }, // pickup time
              { type: 'text', text: String(booking.passengers?.adults || 0) }, // adults
              { type: 'text', text: String(booking.passengers?.children || 0) }, // children
              { type: 'text', text: booking.vehicle?.name || 'Vehicle' }, // vehicle
              { type: 'text', text: String(booking?.pricing?.totalAmount || 0) }, // fare
            ],
          },
        ],
      },
    };
  }
  buildRentalGuestWhatsappPayload(booking: any): any {
    const formatDate = (d: string | null | undefined): string => {
      if (!d) return 'NA';
      return new Date(d).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    };

    const formatDuration = (minutes?: number): string => {
      if (!minutes || minutes <= 0) return 'NA';
      const hrs = Math.round(minutes / 60);
      return `${hrs} hours`;
    };

    return {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: `91${booking.traveller.mobile}`, // ✅ guest number with country code
      type: 'template',
      template: {
        name: 'rental_enquiry_shivsewa',
        language: { code: 'en' },
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: booking.traveller?.firstName || 'Guest' }, // guest name
              { type: 'text', text: booking.bookingRef || 'NA' }, // booking ref
              { type: 'text', text: booking.pickup?.name || 'NA' }, // pickup
              { type: 'text', text: formatDate(booking.date) }, // pickup date
              {
                type: 'text',
                text: formatDate(booking.returnDate || booking.date),
              }, // drop date
              { type: 'text', text: formatDuration(booking.durationMinutes) }, // duration
              { type: 'text', text: String(booking.passengers?.adults || 0) }, // adults
              { type: 'text', text: String(booking.passengers?.children || 0) }, // children
              { type: 'text', text: booking.vehicle?.name || 'NA' }, // car
              { type: 'text', text: String(booking?.pricing?.totalAmount || 0) }, // fare
            ],
          },
        ],
      },
    };
  }

  buildOutstationGuestWhatsappPayload(booking: any): any {

  const formatDate = (d: string | null | undefined): string => {
    if (!d) return 'NA';
    return new Date(d).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: `91${booking.traveller.mobile}`, // ✅ guest number with country code
    type: 'template',
    template: {
      name: 'outstation_enquiry_shivsewa',
      language: { code: 'en' },
      components: [
        {
          type: 'body',
          parameters: [
            { type: 'text', text: booking.traveller?.firstName || 'Guest' },     // guest name
            { type: 'text', text: booking.bookingRef || 'NA' },                 // booking ref
            { type: 'text', text: booking.pickup?.name || 'NA' },               // pickup
            { type: 'text', text: booking.dropoff?.name || 'NA' },              // drop off
            { type: 'text', text: formatDate(booking.date) },                   // pickup date
            { type: 'text', text: formatDate(booking.returnDate) },             // drop off date
            { type: 'text', text: String(booking.passengers?.adults || 0) },    // adults
            { type: 'text', text: String(booking.passengers?.children || 0) },  // children
            { type: 'text', text: booking.vehicle?.name || 'NA' },              // car
            { type: 'text', text: String(booking?.pricing?.totalAmount || 0) }        // fare
          ]
        }
      ]
    }
  };
}


  buildHostWhatsappPayload(booking: any, hostMobile: string): any {
    const tripLabel = this.getTripTypeLabel(booking.tripTypeValue);

    return {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: hostMobile,
      type: 'template',
      template: {
        name: 'enquiry_notification_host_shivsewa',
        language: { code: 'en' },
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: booking.traveller?.firstName || 'Guest' }, // guest name
              { type: 'text', text: booking.vehicle?.name || 'NA' }, // car
              { type: 'text', text: String(booking.passengers?.adults || 0) }, // adults
              { type: 'text', text: String(booking.passengers?.children || 0) }, // children
              { type: 'text', text: tripLabel }, // trip type
              { type: 'text', text: booking.pickup?.name || 'NA' }, // pickup
              { type: 'text', text: booking.dropoff?.name || 'NA' }, // dropoff
              { type: 'text', text: this.formatDate(booking.date) }, // pickup date
              { type: 'text', text: this.formatTime(booking.time) }, // pickup time
              { type: 'text', text: this.formatDate(booking.returnDate) }, // drop date
              { type: 'text', text: this.formatTime(booking.returnTime) }, // drop time
              {
                type: 'text',
                text: this.formatDuration(booking.durationMinutes),
              }, // duration
              { type: 'text', text: String(booking?.pricing?.totalAmount || 0) }, // fare
              { type: 'text', text: booking.bookingRef || 'NA' }, // booking ref
            ],
          },
        ],
      },
    };
  }

  confirm(firstName: any, lastName: any, mobile: any) {
    if (this.isConfirming) return;
    this.isConfirming = true;
    const invalidField = this.validateTravellerForm(
      firstName,
      lastName,
      mobile
    );

    if (invalidField) {
      this.scrollToField(invalidField);
      this.isConfirming = false;
      return;
    }

    if (!this.customerData?.id) {
      this.isConfirming = false;
      alert('Please enter a valid mobile number and wait for verification.');
      return;
    }

     this.recaptcha.execute('confirm_booking').subscribe({
    next: (token) => {
      console.log('reCAPTCHA token:', token);
      this.bookingService.generateRef();
    const paymentPayload = this.mapSavePaymentPayload(
      this.booking,
      this.slotPricingDto,
      this.propertyDetails,
    );

    this.locationService.savePayment(paymentPayload).subscribe({
      next: (paymentRes) => {
        const paymentId = paymentRes?.id;
        const modeOfPayment = paymentRes?.paymentMode;

        if (!paymentId || !modeOfPayment) {
          console.error('Invalid payment response', paymentRes);
          return;
        }

        // Step 2: Book Service
        const bookingPayload = this.mapBookingPayload(
          this.booking,
          this.transportServiceType,
          this.matchedSlot,
          this.slotPricingDto,
          this.propertyDetails,
          paymentId,
          modeOfPayment,
        );

        this.locationService.bookService(bookingPayload).subscribe({
          next: (res) => {
            const backendRef = res?.businessReservationNumber;

            this.bookingService.update({
              bookingRef: backendRef,
            });
            if (this.booking.tripTypeValue === 'pickup-drop') {
              const whatsappPayload = this.buildPickupWhatsappPayload({
                ...this.booking,
                bookingRef: backendRef,
              });
              this.locationService
                .sendWhatsappMessage(whatsappPayload)
                .subscribe({
                  next: () => console.log('WhatsApp sent to guest'),
                  error: (err) => console.error('WhatsApp failed', err),
                });
            }
            if (this.booking.tripTypeValue === 'rental') {
              const rentalWhatsappPayload =
                this.buildRentalGuestWhatsappPayload({
                  ...this.booking,
                  bookingRef: backendRef,
                  durationMinutes: this.transportServiceType?.durationInMinutes,
                });

              this.locationService
                .sendWhatsappMessage(rentalWhatsappPayload)
                .subscribe({
                  next: () => console.log('Rental WhatsApp sent to guest'),
                  error: (err) => console.error('Rental WhatsApp failed', err),
                });
            }
            if (this.booking.tripTypeValue === 'outstation') {
              const outstationWhatsappPayload =
                this.buildOutstationGuestWhatsappPayload({
                  ...this.booking,
                  bookingRef: backendRef
                });

              this.locationService.sendWhatsappMessage(outstationWhatsappPayload).subscribe({
                next: () => console.log('Outstation WhatsApp sent to guest'),
                error: (err) => console.error('Outstation WhatsApp failed', err)
              });
            }
            const hostWhatsappPayload = this.buildHostWhatsappPayload(
              {
                ...this.booking,
                bookingRef: backendRef,
                durationMinutes: this.transportServiceType?.durationInMinutes,
              },
              '9136399064',
            );

            this.locationService
              .sendWhatsappMessage(hostWhatsappPayload)
              .subscribe({
                next: () => console.log('Host WhatsApp sent'),
                error: (err) => console.error('Host WhatsApp failed', err),
              });

            this.bookingService.nextStep();
          },
          error: (err) => {
            this.isConfirming = false;
            console.error(' Booking Failed', err);
          },
        });
        const taxiBooking = {
          referenceId: this.booking.bookingRef,

          trip: {
            tripType: this.booking.tripType,
            tripTypeValue: this.booking.tripTypeValue,
            tripServiceType: this.booking.tripServiceType,
          },

          location: {
            pickup: {
              name: this.booking.pickup.name,
              service_address: this.booking.pickup.service_address,
            },
            dropoff: {
              name: this.booking.dropoff.name,
              service_address: this.booking.dropoff.service_address,
            },
            schedule: {
              date: this.booking.date,
              time: this.booking.time,
              returnDate: this.booking.returnDate || null,
              returnTime: this.booking.returnTime || null,
            },
            distance: {
              distanceKm: this.booking.distanceKm,
              durationMinutes: this.booking.durationMinutes,
            },
          },

          passengers: {
            adults: this.booking.passengers?.adults,
            children: this.booking.passengers?.children,
            luggage: this.booking.passengers?.luggage,
          },

          vehicle: {
            name: this.booking.vehicle?.name,
            seats: this.booking.vehicle?.seats,
            price: this.booking.fareQuote?.total,
            carNumber: this.booking.vehicle?.carNumber,
          },

          pricing: {
            fareQuote: this.booking.fareQuote,
            currency: this.booking.fareQuote?.currency,
          },

          traveller: {
            firstName: this.booking.traveller?.firstName,
            lastName: this.booking.traveller?.lastName,
            mobile: this.booking.traveller?.mobile,
            email: this.booking.traveller?.email,
            notes: this.booking.traveller?.notes,
          },

          verification: {
            customer: {
              id: this.customerData?.id,
              username: this.customerData?.username,
            },
          },

          payment: {
            paymentId: paymentId,
            paymentMode: modeOfPayment,
            currency: this.booking.fareQuote?.currency,
            amount: this.booking.fareQuote?.total,
            beforeTaxAmount: this.booking.fareQuote.total,
            taxAmount: 0,
            afterTaxAmount: this.booking.fareQuote.total,
          },

          bookingStatus: 'NEW',
        };

        const slotConfig = {
          businessType: {
            id: this.businessTypeId,
            name: this.propertyDetails.businessType,
          },

          operatorKey: 'DEFAULT',

          propertyIdByOperator: {
            DEFAULT: this.propertyDetails.id,
          },

          serviceMap: {
            pickup_drop: {
              serviceTypeId: this.transportServiceType.id,
              businessServiceId: this.transportServiceType.businessServiceId,
              serviceTypeName: this.transportServiceType.name,
              defaultDurationMins: this.transportServiceType.durationInMinutes,
              capacityPerSlot: this.transportServiceType.capacityPerSlot,
              description: this.transportServiceType.description,
            },

            rental: {
              serviceTypeId: this.transportServiceType.id,
              businessServiceId: this.transportServiceType.businessServiceId,
              serviceTypeName: this.transportServiceType.name,
              defaultDurationMins: this.transportServiceType.durationInMinutes,
            },

            outstation: {
              serviceTypeId: this.transportServiceType.id,
              businessServiceId: this.transportServiceType.businessServiceId,
              serviceTypeName: this.transportServiceType.name,
              defaultDurationMins: this.transportServiceType.durationInMinutes,
            },
          },

          pricingDefaults: {
            currency: this.propertyDetails.localCurrency || 'INR',
            taxRate: this.slotPricingDto?.beforeTaxAmount
              ? this.slotPricingDto.taxAmount /
                this.slotPricingDto.beforeTaxAmount
              : 0,
          },

          labels: {
            businessProductName: this.propertyDetails.businessProductName,
            businessServiceName: this.propertyDetails.businessServiceName,
            businessTermLocation: 'Location Detail',
            businessTermResource: 'Staff Detail',
          },
        };

        const slotPayload = mapTaxiToSlot(taxiBooking, slotConfig);
      },
      error: (err) => {
        console.error(' Save Payment Failed', err);
        this.isConfirming = false;
      },
    });
    const payload = this.buildBookingPayload(this.booking);
    },
    error: () => {
      console.error('reCAPTCHA failed');
      this.isConfirming = false;
    }
  });
  }
}
