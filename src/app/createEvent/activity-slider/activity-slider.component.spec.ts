import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySliderComponent } from './activity-slider.component';

describe('ActivitySliderComponent', () => {
  let component: ActivitySliderComponent;
  let fixture: ComponentFixture<ActivitySliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitySliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitySliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
