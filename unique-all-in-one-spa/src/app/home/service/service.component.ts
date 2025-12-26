import { Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {

  @ViewChild('videoSection') videoSection!: ElementRef;
  @ViewChild('serviceSection') serviceSection!: ElementRef;
  @ViewChildren('videoSection') videoSections!: QueryList<ElementRef>;
  @ViewChildren('videoSection') animatedElements!: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) {}
  //  selectedPrice: string | null = null;
   selectedPrice: { [index: number]: string } = {};

   ngAfterViewInit(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Triggers slightly before the element is fully in view
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'visible');
          this.renderer.addClass(entry.target, 'in-view');
          
          // Once animated, we can stop observing
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    this.animatedElements.forEach(el => observer.observe(el.nativeElement));
  }

  // selectPrice(price: string) {
  //   this.selectedPrice = price;
  //   console.log('Selected:', this.selectedPrice);
  // }

  selectPrice(index: number, price: string) {
  this.selectedPrice[index] = price;
}

  bookService(){}
}
