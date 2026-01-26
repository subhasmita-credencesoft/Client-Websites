import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPage2Component } from './blog-page2.component';

describe('BlogPage2Component', () => {
  let component: BlogPage2Component;
  let fixture: ComponentFixture<BlogPage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPage2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
