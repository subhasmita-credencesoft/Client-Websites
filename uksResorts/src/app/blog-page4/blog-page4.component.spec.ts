import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPage4Component } from './blog-page4.component';

describe('BlogPage4Component', () => {
  let component: BlogPage4Component;
  let fixture: ComponentFixture<BlogPage4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPage4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPage4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
