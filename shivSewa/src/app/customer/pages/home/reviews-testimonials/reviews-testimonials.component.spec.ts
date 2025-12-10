import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsTestimonialsComponent } from './reviews-testimonials.component';

describe('ReviewsTestimonialsComponent', () => {
  let component: ReviewsTestimonialsComponent;
  let fixture: ComponentFixture<ReviewsTestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsTestimonialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
