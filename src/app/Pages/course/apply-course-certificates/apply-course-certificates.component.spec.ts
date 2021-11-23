import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyCourseCertificatesComponent } from './apply-course-certificates.component';

describe('ApplyCourseCertificatesComponent', () => {
  let component: ApplyCourseCertificatesComponent;
  let fixture: ComponentFixture<ApplyCourseCertificatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyCourseCertificatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyCourseCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
