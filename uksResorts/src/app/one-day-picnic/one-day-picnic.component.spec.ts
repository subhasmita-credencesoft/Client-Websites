import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneDayPicnicComponent } from './one-day-picnic.component';

describe('OneDayPicnicComponent', () => {
  let component: OneDayPicnicComponent;
  let fixture: ComponentFixture<OneDayPicnicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneDayPicnicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneDayPicnicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
