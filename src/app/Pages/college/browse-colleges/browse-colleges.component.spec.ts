import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseCollegesComponent } from './browse-colleges.component';

describe('BrowseCollegesComponent', () => {
  let component: BrowseCollegesComponent;
  let fixture: ComponentFixture<BrowseCollegesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseCollegesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseCollegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
