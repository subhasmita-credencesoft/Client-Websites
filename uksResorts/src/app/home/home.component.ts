import { Component } from '@angular/core';
declare var bootstrap: any;
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

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
  }
}
