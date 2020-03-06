import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestActivitySliderComponent } from './guest-activity-slider.component';

describe('GuestActivitySliderComponent', () => {
  let component: GuestActivitySliderComponent;
  let fixture: ComponentFixture<GuestActivitySliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestActivitySliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestActivitySliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
