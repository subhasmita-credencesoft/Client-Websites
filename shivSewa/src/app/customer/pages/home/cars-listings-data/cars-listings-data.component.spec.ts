import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsListingsDataComponent } from './cars-listings-data.component';

describe('CarsListingsDataComponent', () => {
  let component: CarsListingsDataComponent;
  let fixture: ComponentFixture<CarsListingsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarsListingsDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarsListingsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
