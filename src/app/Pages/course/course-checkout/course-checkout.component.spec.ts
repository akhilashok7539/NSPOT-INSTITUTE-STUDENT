import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCheckoutComponent } from './course-checkout.component';

describe('CourseCheckoutComponent', () => {
  let component: CourseCheckoutComponent;
  let fixture: ComponentFixture<CourseCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
