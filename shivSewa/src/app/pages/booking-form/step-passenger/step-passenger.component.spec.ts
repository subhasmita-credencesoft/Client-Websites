import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepPassengerComponent } from './step-passenger.component';

describe('StepPassengerComponent', () => {
  let component: StepPassengerComponent;
  let fixture: ComponentFixture<StepPassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepPassengerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
