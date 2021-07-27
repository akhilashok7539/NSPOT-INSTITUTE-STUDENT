import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesCompareComponent } from './courses-compare.component';

describe('CoursesCompareComponent', () => {
  let component: CoursesCompareComponent;
  let fixture: ComponentFixture<CoursesCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
