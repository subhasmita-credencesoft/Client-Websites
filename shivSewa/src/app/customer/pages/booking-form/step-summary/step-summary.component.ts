import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationService } from '../../../services/location/location.service';

@Component({
  selector: 'app-step-summary',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './step-summary.component.html',
  styleUrl: './step-summary.component.scss'
})
export class StepSummaryComponent {
  booking: any = {};
  estimated = 0;
  vehicle: { id?: any; name?: string; seats?: number; carNumber?: string; bags?: number; price?: number; image?: string; } | undefined;
  vehicleOne: { id?: any; name?: string; seats?: number; carNumber?: string; bags?: number; price?: number; image?: string; } | undefined;
  slots: any[] = [];
  slotPricingDto: any;
  transportServiceType: any;
  matchedSlot: any;
  propertyDetails: any;
  customerId: any;
emailOtp = {
  sent: false,
  loading: false,
  verifying: false,
  verified: false,
  sid: null as string | null
};
@ViewChildren('otpInput') inputs!: QueryList<ElementRef>;
otpValues: string[] = ['', '', '', '', '', ''];
resendSeconds = 600;
timerRef: any;
otpMessage = '';
otpError = '';
  customerData: any;

  constructor(private bookingService: BookingService,
              private locationService: LocationService
  ) {
    this.bookingService.booking$.subscribe(b => {
      this.booking = b;
      this.estimated = b.vehicle?.price || 0;
      this.vehicleOne = b.vehicle;
      console.log("booking data", this.booking);
    });
     window.scrollTo({ top: 0, behavior: 'smooth' });
    this.fetchPropertyDetails();
  }
  padZero(num: number): string {
    return num.toString().padStart(2, '0');
  }
  @HostListener('paste', ['$event'])
handlePaste(event: ClipboardEvent) {
  const pasted = event.clipboardData?.getData('text')?.replace(/\D/g, '') || '';

  pasted.split('').slice(0, this.otpValues.length).forEach((digit, i) => {
    const input = document.getElementById(`otp-${i}`) as HTMLInputElement | null;
    if (input) {
      input.value = digit;
      this.otpValues[i] = digit;
    }
  });

  const last = document.getElementById(`otp-${this.otpValues.length - 1}`) as HTMLInputElement | null;
  last?.focus();
}
getOtp(): string {
  return this.otpValues.join('');
}
  fetchPropertyDetails() {
 this.locationService.getPropertyDetails(2302).subscribe(res => {
      console.log("property details", res);
      this.propertyDetails = res;
      this.transportServiceType = res?.businessServiceDtoList
    ?.flatMap((bs: any) => bs.businessServiceTypes || [])
    ?.find((bst: any) => bst.name === 'Transport');
  // 2. Get pricing
  this.slotPricingDto = this.transportServiceType?.slotPricingDto || null;
  console.log("slot pricing dto", this.slotPricingDto);

  // 3. Find matching slot by vehicle name
  this.matchedSlot = this.transportServiceType?.slots?.find(
    (slot: any) =>
      slot?.resource?.resourceName === this.booking?.vehicle?.name
  );

  // 4. Assign result
  this.slots = this.matchedSlot ? [this.matchedSlot] : [];
console.log("matched slot", this.slots);

  });
      }
mapSavePaymentPayload(
  bookingData: any,
  slotPricingDto: any,
  property: any
): any {
  return {
    paymentMode: 'Cash',
    status: 'NotPaid',

    firstName: bookingData.traveller.firstName,
    lastName: bookingData.traveller.lastName,

    netReceivableAmount: slotPricingDto.beforeTaxAmount,
    transactionAmount: slotPricingDto.afterTaxAmount,
    amount: slotPricingDto.afterTaxAmount,

    propertyId: property.id,
    email: bookingData.traveller.email,
    businessEmail: property.email,

    transactionChargeAmount: slotPricingDto.afterTaxAmount,
    currency: property.localCurrency || 'INR',
    taxAmount: slotPricingDto.taxAmount,
    deliveryChargeAmount: 0,

    businessServiceName: property.businessType,
    counterNumber: String(property.id),

    operatorName: `${bookingData.traveller.firstName || ''} ${bookingData.traveller.lastName || ''}`.trim(),
    date: bookingData.date
  };
}
mapBookingPayload(
  bookingData: any,
  transportServiceType: any,
  matchedSlot: any,
  slotPricingDto: any,
  property: any,
  paymentId: number,
  modeOfPayment: string
): any {

  return {
    mobile: bookingData.traveller.mobile,
    businessTermLocation: "Location Detail",
    businessTermResource: "Staff Detail",
    businessTypeId: transportServiceType.businessTypeId || 81,

    propertyId: property.id,

    businessLocationName: property.businessLocationName || 'Pickup',
    customerLocationName: property.customerLocationName || 'Drop Off',
    canChangeBusinessAddress: true,
    businessProductName: property.businessProductName || 'Packages',
    businessServiceName: property.businessServiceName || 'Service',
    provideBusinessAndCustomerAddress: true,

    date: bookingData.date,

    businessServiceTypes: [
      {
        id: transportServiceType.id,
        name: transportServiceType.name,
        businessTermLocation: "Location Detail",
        businessTermResource: "Staff Detail",
        capacityPerSlot: transportServiceType.capacityPerSlot,
        description: transportServiceType.description,
        slotPricingDto,
        businessServiceId: transportServiceType.businessServiceId,
        durationInMinutes: transportServiceType.durationInMinutes,

        slots: [
          {
            date: bookingData.date,
            duration: transportServiceType.durationInMinutes,
            available: matchedSlot.available,
            beforeTax: slotPricingDto.beforeTaxAmount,
            tax: slotPricingDto.afterTaxAmount,
            price: slotPricingDto.afterTaxAmount,
            count: matchedSlot.count,
            day: new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'long' }),

            resourceList: [
              {
                name: bookingData.vehicle.name,
                desc: `${bookingData.vehicle.seats} Seater`,
                bookedTimings: [
                  {
                    startTime: matchedSlot.resource?.workingHours?.[0]?.startTime || '07:00',
                    finishTime: matchedSlot.resource?.workingHours?.[0]?.finishTime || '19:00',
                    duration: transportServiceType.durationInMinutes,
                    slotAvailabilityDto: {
                      id: null,
                      noOfBooked: 0,
                      noOfAvailable: 1,
                      noOfCancellation: null
                    }
                  }
                ],
                locationList: [
                  { name: matchedSlot?.location?.locationName }
                ]
              }
            ]
          }
        ]
      }
    ],

    resourceName: bookingData.vehicle.name,
    locationName: matchedSlot.location?.locationName,
    bookingStatus: 'NEW',
    businessTypeName: property.businessType,

    currency: property.localCurrency || 'INR',
    totalAmount: slotPricingDto.afterTaxAmount,
    beforeTaxAmount: slotPricingDto.beforeTaxAmount,
    taxAmount: slotPricingDto.taxAmount,
    afterTaxAmount: slotPricingDto.afterTaxAmount,

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
        username: this.customerData.username
      }
    ],

    firstName: bookingData.traveller.firstName,
    lastName: bookingData.traveller.lastName,
    email: bookingData.traveller.email,

    paymentId,
    modeOfPayment,

    noOfPerson: bookingData.passengers.adults,
    serviceAddress: bookingData.dropoff.service_address
  };
}




  goBack() { this.bookingService.prevStep(); }
  validateTravellerForm(
  firstName: any,
  lastName: any,
  mobile: any,
  email: any
): string | null {

  // Touch all fields before checking
  firstName.control.markAsTouched();
  lastName.control.markAsTouched();
  mobile.control.markAsTouched();
  email.control.markAsTouched();

  const t = this.booking.traveller;

  if (!t.firstName || !/^[A-Za-z]+$/.test(t.firstName)) {
    return "firstNameField";
  }

  if (!t.lastName || !/^[A-Za-z]+$/.test(t.lastName)) {
    return "lastNameField";
  }

  if (!t.mobile || !/^[6-9][0-9]{9}$/.test(t.mobile)) {
    return "mobileField";
  }

  if (!t.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.email)) {
    return "emailField";
  }

  return null;
}

scrollToField(fieldId: string) {
  const el = document.getElementById(fieldId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("shake-error");

    // Remove effect after animation
    setTimeout(() => el.classList.remove("shake-error"), 800);
  }
}
formatBookingDate(date: string | Date): string {
  if (!date) return '';

  const d = new Date(date);
  const day = d.getDate();

  const suffix =
    day % 10 === 1 && day !== 11 ? 'st' :
    day % 10 === 2 && day !== 12 ? 'nd' :
    day % 10 === 3 && day !== 13 ? 'rd' : 'th';

  const month = d.toLocaleString('en-US', { month: 'long' });
  const year = d.getFullYear();

  return `${month} ${day}${suffix} ${year}`;
}
sendEmailOtp() {
  this.otpError = '';
  this.otpMessage = '';
  this.emailOtp.loading = true;

  const payload = {
    email: this.booking.traveller.email,
    toNumber: null
  };

  this.locationService.sendOtp(payload).subscribe({
    next: (res: any) => {
      this.emailOtp.sid = res.sid;
      this.emailOtp.sent = true;
      this.otpMessage = 'OTP sent to your email';
      this.startResendTimer();
    },
    error: () => {
      this.otpError = 'Failed to send OTP. Try again.';
    },
    complete: () => {
      this.emailOtp.loading = false;
    }
  });
}


/* ================= OTP INPUT AUTO MOVE ================= */
moveOtp(index: number, event: any) {
  if (event.target.value && index < 5) {
    event.target.nextElementSibling?.focus();
  }
}
handleOtpInput(event: Event, index: number): void {
  const input = event.target as HTMLInputElement;
  const digit = input.value.replace(/\D/g, '').slice(-1);

  if (digit) {
    this.otpValues[index] = digit;
    input.value = digit;

    if (index < this.otpValues.length - 1) {
      // Move focus to next input
      setTimeout(() => {
        const nextInput = this.inputs.toArray()[index + 1].nativeElement;
        nextInput.focus();
        // Clear the next input to prevent duplicate entry
        nextInput.value = '';
        this.otpValues[index + 1] = '';
      }, 0);
    }
  } else {
    this.otpValues[index] = '';
    input.value = '';
  }
}

handleKeyDown(event: KeyboardEvent, index: number): void {
  const input = event.target as HTMLInputElement;

  if (event.key === 'Backspace') {
    // Clear current box first
    this.otpValues[index] = '';
    input.value = '';

    // Move to previous box if current was already empty
    if (index > 0) {
      setTimeout(() => {
        this.inputs.toArray()[index - 1].nativeElement.focus();
      }, 0);
    }
    event.preventDefault();
  } else if (event.key === 'ArrowLeft' && index > 0) {
    this.inputs.toArray()[index - 1].nativeElement.focus();
    event.preventDefault();
  } else if (event.key === 'ArrowRight' && index < this.otpValues.length - 1) {
    this.inputs.toArray()[index + 1].nativeElement.focus();
    event.preventDefault();
  } else if (!/^\d$/.test(event.key) && event.key.length === 1) {
    // Prevent non-digit characters
    event.preventDefault();
  }
}


/* ================= VERIFY OTP ================= */
verifyEmailOtp() {
  this.otpError = '';
  this.otpMessage = '';

  if (this.otpValues.join('').length !== 6) {
    this.otpError = 'Please enter 6 digit OTP';
    return;
  }

  this.emailOtp.verifying = true;

  const payload = {
    email: this.booking.traveller.email,
    toNumber: null,
    verificationStatus: 'pending',
    sid: this.emailOtp.sid,
    notificationStatus: false,
    verificationCode: this.otpValues.join('')
  };

  this.locationService.verifyOtp(payload).subscribe({
    next: (res: any) => {
      if (res.verificationStatus === 'approved') {
        this.emailOtp.verified = true;
        this.otpMessage = 'Email verified successfully';
        this.checkCustomerExists();
      } else {
        this.otpError = 'Invalid OTP. Please try again.';
      }
    },
    error: () => {
      this.otpError = 'OTP verification failed. Please retry.';
    },
    complete: () => {
      this.emailOtp.verifying = false;
    }
  });
}


/* ================= RESEND TIMER ================= */
startResendTimer() {
  this.resendSeconds = 600;

  this.timerRef = setInterval(() => {
    this.resendSeconds--;
    if (this.resendSeconds <= 0) {
      clearInterval(this.timerRef);
      this.emailOtp.sent = false;
    }
  }, 1000);
}

/* ================= CHANGE EMAIL ================= */
changeEmail() {
  clearInterval(this.timerRef);
  this.emailOtp = { sent: false, loading: false, verifying: false, verified: false, sid: null };
  this.otpValues = ['', '', '', '', '', ''];
    this.otpMessage = '';
  this.otpError = '';
}

/* ================= CHECK CUSTOMER ================= */
checkCustomerExists() {
    this.locationService.checkEmail(this.booking.traveller.email).subscribe({
    next: (res: any) => {
      console.log('Email check response:', res);
        this.customerData = res; // store for later
    },
    error: (err) => {
      console.error('Email check failed:', err);
    }
  });
  // this.locationService.checkMobile(this.booking.traveller.mobile).subscribe();
}
  confirm(firstName: any, lastName: any, mobile: any, email: any) {
       const invalidField = this.validateTravellerForm(
    firstName,
    lastName,
    mobile,
    email
  );

  if (invalidField && !this.customerData.id) {
    this.scrollToField(invalidField);
    return;
  }
      this.bookingService.nextStep();
    this.bookingService.generateRef();
    const paymentPayload = this.mapSavePaymentPayload(
    this.booking,
    this.slotPricingDto,
    this.propertyDetails
  );

  this.locationService.savePayment(paymentPayload).subscribe({
    next: (paymentRes) => {

      const paymentId = paymentRes?.id;
      const modeOfPayment = paymentRes?.status;

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
        modeOfPayment
      );

      this.locationService.bookService(bookingPayload).subscribe({
        next: (res) => {
          console.log('✅ Booking Successful', res);
        },
        error: (err) => {
          console.error('❌ Booking Failed', err);
        }
      });
    },
    error: (err) => {
      console.error('❌ Save Payment Failed', err);
    }
  });
//     const customerPayload = {
//     isCustomerUpdate: false,
//     id: this.customerData.id || null,
//     firstName: this.booking.traveller.firstName,
//     lastName: this.booking.traveller.lastName,
//     email: this.booking.traveller.email,
//     mobile: this.booking.traveller.mobile,
//     propertyId: this.propertyDetails.id
//   };

//   this.locationService.createCustomer(customerPayload).subscribe({
//     next: (customerRes) => {

//       this.customerId = customerRes?.id;
//       if (!this.customerId) {
//         return;
//       }
//   }

// });
}
}
