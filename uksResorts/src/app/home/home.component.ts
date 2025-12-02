import { Component, ElementRef, ViewChild } from '@angular/core';
declare var bootstrap: any;
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
checkInDate: string = '';
  checkOutDate: string = '';
@ViewChild('checkinInput') checkinInput!: ElementRef;
  @ViewChild('checkoutInput') checkoutInput!: ElementRef;
ngAfterViewInit() {
    const navbarCollapse = document.getElementById('nav'); // could be null

    if (!navbarCollapse) return; // safely exit if not found

    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const isClickInside = navbarCollapse.contains(target);
      const isToggler = target.closest('.navbar-toggler');

      // only hide if menu is open and click is outside
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (!isClickInside && !isToggler && bsCollapse && navbarCollapse.classList.contains('show')) {
        bsCollapse.hide();
      }
    });

 const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const format = (d: Date) =>
      d.toISOString().split("T")[0];

    // Set values
    this.checkinInput.nativeElement.value = format(today);
    this.checkoutInput.nativeElement.value = format(tomorrow);

    // Set min values
    this.checkinInput.nativeElement.min = format(today);
    this.checkoutInput.nativeElement.min = format(tomorrow);


  }


}
