import { CommonModule, ViewportScroller } from '@angular/common';
import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateStruct, NgbCarouselConfig, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { PropertyServiceService } from '../property-service.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare var bootstrap: any;
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDatepickerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  /* ---------------- DATEPICKER ---------------- */
  @Input() propertyServiceList: any[] = [];
  @Input() initialCount = 5;
  isExpanded = false;
isExpandedOne = false;
  fromDate: NgbDateStruct | null = null;
  toDate: NgbDateStruct | null = null;
  hoveredDate: NgbDateStruct | null = null;
  todayDate!: NgbDateStruct;
  formattedFromDate = '';
  formattedToDate = '';
  businessUser: any;
  dynamicText: any;
  dynamicPropertyId: any;
  dynamicCity: any;
  dynamicStreetName: any;
  dynamicStreetNumber: any;
  dynamicLocality: any;
  dynamicCountryName: any;
  propertyusername: string = '';
  property: any;
  roomsArray: any[] = []; 




  showErrors = {
    fromDate: false,
    toDate: false,
    adults: false,
    rooms: false
  };

  /* ---------------- GUESTS ---------------- */

  adults = 1;
  children = 0;
  rooms = 1;
  isGuestSelectorOpen = false;
  selectedProperty: string = '';
  @ViewChild('checkinInput') checkinInput!: ElementRef;
  @ViewChild('checkoutInput') checkoutInput!: ElementRef;
  // propertyServiceList: any[] = [];
  showAll: boolean = false;
  // initialCount: number = 3;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.getElementById('mainHeader');

    if (!header) return;

    if (window.scrollY > 100) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  }
  checkin: string = '';
  checkout: string = '';
  showSuperDeluxeRoom = true;
  guests: number = 1;
  // component.ts
  selectedRoom: string = 'superDeluxe';
  visibleItemsCount: number = 3;

  roomsOne = [
    {
      id: 'superDeluxe',
      title: 'Super Deluxe AC',
      price: 4950,
      extra: 'EXTRA PERSON Above 05 Years ₹ 1400 + 5 % GST with Extra Mattress & Breakfast',
      description: 'Superior rooms can be set-up as either a queen bed or two single beds along with a study / workspace.',
      images: [
        'assets/home-imgs/room1.jpg',
        'assets/home-imgs/room1.jpg',
        'assets/home-imgs/room1.jpg'
      ],
      amenities: [
        { icon: 'assets/home-imgs/mingcute_wifi-line.svg', text: 'WiFi' },
        { icon: 'assets/home-imgs/material-symbols_water-pump-outline-rounded.svg', text: 'Hot Water' },
        { icon: 'assets/home-imgs/Vector (2).png', text: 'Room Service' },
        { icon: 'assets/home-imgs/material-symbols-light_tv-outline-rounded.svg', text: 'TV' }
      ]
    },
    {
      id: 'deluxe',
      title: 'Deluxe AC',
      price: 3950,
      extra: 'EXTRA PERSON Above 05 Years ₹ 1400 + 5 % GST with Extra Mattress & Breakfast',
      description: 'Deluxe room with cozy interiors and modern amenities.',
      images: [
        'assets/home-imgs/deluxe1.jpg',
        'assets/home-imgs/deluxe2.jpg',
        'assets/home-imgs/deluxe3.jpg'
      ],
      amenities: [
        { icon: 'assets/home-imgs/mingcute_wifi-line.svg', text: 'WiFi' },
        { icon: 'assets/home-imgs/material-symbols_water-pump-outline-rounded.svg', text: 'Hot Water' },
        { icon: 'assets/home-imgs/Vector (2).png', text: 'Room Service' },
        { icon: 'assets/home-imgs/material-symbols-light_tv-outline-rounded.svg', text: 'TV' }
      ]
    }
  ];

  mapUrl!: SafeResourceUrl;
  mapUrl1!: SafeResourceUrl;

  constructor(private router: Router, private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    public config: NgbCarouselConfig,
    private calendar: NgbCalendar,
    private cdr: ChangeDetectorRef,
    private apiService: PropertyServiceService,
    private sanitizer: DomSanitizer) { }


  ngOnInit() {

    this.todayDate = this.calendar.getToday();

    // Default check-in = today
    this.fromDate = this.todayDate;
    this.formattedFromDate = this.formatDate(this.fromDate);

    // Default check-out = tomorrow
    const nextDate = this.calendar.getNext(
      new NgbDate(this.fromDate.year, this.fromDate.month, this.fromDate.day),
      'd',
      1
    );
    this.toDate = { year: nextDate.year, month: nextDate.month, day: nextDate.day };
    this.formattedToDate = this.formatDate(this.toDate);
  }
  ngAfterViewInit() {

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.3 });

    const section = document.querySelector('.taste-container');
    if (section) observer.observe(section);

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const format = (d: Date) => d.toISOString().split("T")[0];

    // Prefill Angular variables
    this.checkin = format(today);
    this.checkout = format(tomorrow);

    // Prefill input fields to match variables
    if (this.checkinInput) this.checkinInput.nativeElement.value = this.checkin;
    if (this.checkoutInput) this.checkoutInput.nativeElement.value = this.checkout;

    // Set min dates for the date picker
    if (this.checkinInput) this.checkinInput.nativeElement.min = this.checkin;
    if (this.checkoutInput) this.checkoutInput.nativeElement.min = this.checkout;

    this.getProperty();
    this.loadRooms();

    // Detect changes to avoid NG0100 error
    this.cdr.detectChanges();
  }


  toggleView() {
    this.isExpanded = !this.isExpanded;
  }
  isDisabled(date: NgbDateStruct, type: 'checkIn' | 'checkOut') {
    const today = this.calendar.getToday();
    if (type === 'checkIn') {
      return this.isBefore(date, today);
    } else {
      // check-out can't be before check-in
      const minDate = this.fromDate || today;
      return this.isBefore(date, minDate);
    }
  }

  isBefore(a: NgbDateStruct, b: NgbDateStruct) {
    return new Date(a.year, a.month - 1, a.day) < new Date(b.year, b.month - 1, b.day);
  }

  onDateSelection(date: NgbDateStruct, type: 'checkIn' | 'checkOut') {
    if (type === 'checkIn') {
      this.fromDate = date;
      this.formattedFromDate = this.formatDate(date);

      if (this.toDate && this.isAfter(this.fromDate, this.toDate)) {
        this.toDate = null;
        this.formattedToDate = '';
      }
    } else {
      this.toDate = date;
      this.formattedToDate = this.formatDate(date);
    }
  }

  isRange(date: NgbDateStruct): boolean {
    if (!this.fromDate || !this.toDate) {
      return false; // if either date is null, not in range
    }

    return this.isAfter(date, this.fromDate) && this.isAfter(this.toDate, date);
  }


  isAfter(a: NgbDateStruct, b: NgbDateStruct): boolean {
    return new Date(a.year, a.month - 1, a.day) >
      new Date(b.year, b.month - 1, b.day);
  }

  formatDate(d: NgbDateStruct | null): string {
    if (!d) return '';
    return `${d.day}/${d.month}/${d.year}`;
  }

  /* ================== GUEST DROPDOWN ================== */

  toggleGuestSelector() {
    this.isGuestSelectorOpen = !this.isGuestSelectorOpen;
  }

  closeGuestSelector() {
    this.isGuestSelectorOpen = false;
  }

  incrementAdults() { if (this.adults < 30) this.adults++; }
  decrementAdults() { if (this.adults > 1) this.adults--; }

  incrementChildren() { if (this.children < 30) this.children++; }
  decrementChildren() { if (this.children > 0) this.children--; }

  incrementRooms() { if (this.rooms < 30) this.rooms++; }
  decrementRooms() { if (this.rooms > 1) this.rooms--; }

  getGuestSummary() {
    return `${this.adults} Adults, ${this.children} Children, ${this.rooms} Rooms`;
  }

  /* ================== NAVIGATION ================== */

  navigateToBooking() {
    this.showErrors.fromDate = !this.fromDate;
    this.showErrors.toDate = !this.toDate;
    this.showErrors.adults = this.adults <= 0;
    this.showErrors.rooms = this.rooms <= 0;

    if (this.showErrors.fromDate || this.showErrors.toDate) return;

    const from = new Date(this.fromDate!.year, this.fromDate!.month - 1, this.fromDate!.day);
    const to = new Date(this.toDate!.year, this.toDate!.month - 1, this.toDate!.day);

    const nights = Math.ceil((to.getTime() - from.getTime()) / 86400000);
    const noOfRooms = this.rooms;

    const url =
      `https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true` +
      `&checkinDay=${from.getDate()}` +
      `&checkinMonth=${from.getMonth() + 1}` +
      `&checkinYear=${from.getFullYear()}` +
      `&nights=${nights}` +
      `&numAdults=${this.adults}` +
      `&Children=${this.children}` +
      `&rooms=${noOfRooms}`;

    window.open(url, '_blank');
  }
  get selectedRoomObj() {
    return this.roomsOne.find(room => room.id === this.selectedRoom);
  }
  showSuperDeluxe() {
    this.showSuperDeluxeRoom = true;
  }
  showDeluxe() {
    this.showSuperDeluxeRoom = false;
  }
  // Returns the currently selected room object
  getSelectedRoom() {
    return this.roomsOne.find(room => room.id === this.selectedRoom);
  }

  // Sets the selected room when a card is clicked
  selectRoom(roomId: string) {
    this.selectedRoom = roomId;

    // Reset carousel to first image whenever room changes
    const carousel = document.querySelector('#roomCarousel') as any;
    if (carousel && bootstrap?.Carousel) {
      const bsCarousel = bootstrap.Carousel.getInstance(carousel) || new bootstrap.Carousel(carousel);
      bsCarousel.to(0); // go to first slide
    }
  }


  goToRooms() {
    this.router.navigate(['/rooms']);
  }


  toggleReadMore(extraText: HTMLElement, event: Event) {
    event.preventDefault();

    // Use currentTarget to ensure we get the button even if an icon inside was clicked
    const btn = event.currentTarget as HTMLButtonElement;

    const isHidden = extraText.style.display === 'none' || extraText.style.display === '';

    if (isHidden) {
      extraText.style.display = 'inline';
      btn.textContent = 'View less';
    } else {
      extraText.style.display = 'none';
      btn.textContent = 'View more';
    }
  }

  toggleServices() {
  this.showAll = !this.showAll;
}

toggleItems() {
    this.isExpanded = !this.isExpanded;
  }
toggleItemsOnes() {
    this.isExpandedOne = !this.isExpandedOne;
  }
getVisibleText() {
  const visible = this.propertyServiceList.slice(0, this.visibleItemsCount);
  return visible.map(s => s.name).join(', ');
}

// toggleItems() {
//   if (this.visibleItemsCount < this.propertyServiceList.length) {
//     this.visibleItemsCount = this.propertyServiceList.length;
//   } else {
//     this.visibleItemsCount = this.initialCount;
//   }
// }

  getProperty() {
    this.apiService.getPropertyDetailsByPropertyId(3451).subscribe(
      (response) => {
       this.property = response.body; // Assign response body to `property`
         this.businessUser = this.property;
         console.log('businessuser is',this.businessUser);
        setTimeout(() => {
        this.handledStorageData(this.property);
        console.log('Chatbot data updated after delay');
      }, 300);
          this.setGoogleMapUrl();
        this.businessUser = response.body;
        this.propertyServiceList = this.businessUser.propertyServicesList;
        console.log('propertyServiceList is',this.propertyServiceList);
        this.cdr.detectChanges();
        this.initializeSlideItems(); // Initialize slide items after fetching property details
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error('Error fetching property details:', error.message);
        }
      }
    );
  }

loadRooms(): void {
  this.apiService.getRoomDetailsByPropertyId(3451).subscribe({
    next: (res) => {
      const data = res.body || [];
      console.log('data is',data);
      
      // this.updateChunks();
    },
    error: (err) => console.error('Error fetching rooms:', err)
  });
}

handledStorageData(property: any) {
  try {
    this.businessUser = property;
    const chatbotElement = document.getElementById('chatbot');

    if (chatbotElement) {
      // 1. Set attributes immediately for the next render
      chatbotElement.setAttribute('chat-title', this.businessUser.name);
      chatbotElement.setAttribute('chat-title-icon', this.businessUser.logoUrl);

      chatbotElement.addEventListener('df-messenger-loaded', () => {
        chatbotElement.setAttribute('chat-title', this.businessUser.name);
        chatbotElement.setAttribute('chat-title-icon', this.businessUser.logoUrl);
        
        console.log('Dynamic Title Applied:', this.businessUser.name);
      });

      // 3. Update colors
      this.changeTheme(
        this.businessUser.primaryColor,
        this.businessUser.secondaryColor,
        this.businessUser.tertiaryColor
      );
    }

    // Existing payload logic...
    window.addEventListener('df-request-sent', (event) => {
      const propertyId = this.businessUser.id;
        const propertyName = this.businessUser.name;
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  const currentTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        const dataToSend = {
          propertyId: propertyId,
          propertyName:propertyName,
          currentDate:currentTimeString,
        };
        fetch('https://chatbot.api.thehotelmate.co/api/website/receivePayload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
    });

  } catch (error) {
    console.error("Error in handledStorageData : ", error);
  }
}

  changeTheme(primary: string, secondary: string, tertiary: string) {
    document.documentElement.style.setProperty('--primary', primary);

    document.documentElement.style.setProperty('--secondary', secondary);
    document.documentElement.style.setProperty('--tertiary', tertiary);
    document.documentElement.style.setProperty('--button-primary', tertiary);
    document.documentElement.style.setProperty(
      '--primary-gradient',
      'linear-gradient( 180deg, ' + tertiary + ', ' + secondary + ')'
    );
    document.documentElement.style.setProperty(
      '--secondary-gradient',
      'linear-gradient( 312deg, ' + primary + ', ' + secondary + ')'
    );
    document.documentElement.style.setProperty(
      '--secondary-one-gradient',
      'linear-gradient( 180deg, ' + primary + ', ' + secondary + ')'
    );

    document.documentElement.style.setProperty(
      '--third-gradient',
      'linear-gradient( 180deg, ' + primary + ', ' + secondary + ')'
    );
  }

  getWhatsappShareUrl() {
    const baseUrl = 'https://api.whatsapp.com/send';
    const phoneNumber = this.businessUser?.whatsApp; // Assuming whatsApp is part of businessUser

    // Assign dynamic properties
    this.dynamicText = this.businessUser?.name;
    this.dynamicPropertyId = this.businessUser?.id;
    this.dynamicCity = this.businessUser?.address?.city;
    this.dynamicStreetName = this.businessUser?.address?.streetName;
    this.dynamicStreetNumber = this.businessUser?.address?.streetNumber;
    this.dynamicLocality = this.businessUser?.address?.locality;
    this.dynamicCountryName = this.businessUser?.address?.country;

    // Construct the message for WhatsApp
    const message = `*This is an Enquiry from :*Website: ${this.dynamicText || ''
      }`;

    return `${baseUrl}?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
  }

   initializeSlideItems() {
  }

    scroll_top(){
    document.documentElement.scrollTop = 0;
  }

  setGoogleMapUrl() {
  const lat = this.property.latitude;
  const lng = this.property.longitude;

  this.mapUrl1 = this.sanitizer.bypassSecurityTrustResourceUrl(
    `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`
  );

  console.log("this.mapUrl", this.mapUrl);
}
}
