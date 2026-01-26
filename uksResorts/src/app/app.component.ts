import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { ViewportScroller } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbCarouselConfig, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { PropertyServiceService } from './property-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'uksResorts';

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

    constructor(private router: Router, private route: ActivatedRoute,
      private viewportScroller: ViewportScroller,
      public config: NgbCarouselConfig,
      private calendar: NgbCalendar,
      private cdr: ChangeDetectorRef,
      private apiService: PropertyServiceService,
      private sanitizer: DomSanitizer) { }

 ngOnInit() {

 }

    getProperty() {
      this.apiService.getPropertyDetailsByPropertyId(3451).subscribe(
        (response) => {
         this.property = response.body; // Assign response body to `property`
           this.businessUser = this.property;
          this.handledStorageData(this.property);
            // this.setGoogleMapUrl();
          this.businessUser = response.body;
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
  goToInquiry() {
  this.router.navigate(['/events']).then(() => {
    // Wait a tiny bit for DOM to render
    setTimeout(() => {
      const element = document.getElementById('inquiryForm');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100); // 100ms delay
  });
}

    handledStorageData(property: any) {
      try {
        this.businessUser = property;
        this.changeTheme(
          this.businessUser.primaryColor,
          this.businessUser.secondaryColor,
          this.businessUser.tertiaryColor
        );

        window.addEventListener('df-request-sent', (event) => {
          this.propertyusername = this.businessUser.name;

    // 1. Select the host element first
    const messengerHost = document.querySelector('df-messenger');

    // 2. Access the element inside its shadowRoot
    const chatbotElement = messengerHost?.shadowRoot?.getElementById('chatbot');

    // 3. Set attributes safely using optional chaining
    if (chatbotElement) {
      chatbotElement.setAttribute('chat-title', this.propertyusername);
      chatbotElement.setAttribute('chat-title-icon', this.businessUser.logoUrl);
    } else {
      console.warn("Could not find #chatbot inside the Shadow DOM.");
    }

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
            propertyName: propertyName,
            currentDate: currentTimeString,
          };
          fetch('https://chatbot.api.thehotelmate.co/api/website/receivePayload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
          })
            .then((response) => response.json())
            .catch((error) => console.error('Error:', error));
        });
      }
      catch (error) {
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

}
