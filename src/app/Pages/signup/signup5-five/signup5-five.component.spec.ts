import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Signup5FiveComponent } from './signup5-five.component';

describe('Signup5FiveComponent', () => {
  let component: Signup5FiveComponent;
  let fixture: ComponentFixture<Signup5FiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Signup5FiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Signup5FiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
