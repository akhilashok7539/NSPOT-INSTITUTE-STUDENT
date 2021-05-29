import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyCourseComponent } from './apply-course.component';

describe('ApplyCourseComponent', () => {
  let component: ApplyCourseComponent;
  let fixture: ComponentFixture<ApplyCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
