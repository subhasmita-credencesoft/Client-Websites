import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPage5Component } from './blog-page5.component';

describe('BlogPage5Component', () => {
  let component: BlogPage5Component;
  let fixture: ComponentFixture<BlogPage5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPage5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPage5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
