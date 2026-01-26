import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPage3Component } from './blog-page3.component';

describe('BlogPage3Component', () => {
  let component: BlogPage3Component;
  let fixture: ComponentFixture<BlogPage3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPage3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
