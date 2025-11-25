import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerServicesComponent } from './banner-services.component';

describe('BannerServicesComponent', () => {
  let component: BannerServicesComponent;
  let fixture: ComponentFixture<BannerServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
