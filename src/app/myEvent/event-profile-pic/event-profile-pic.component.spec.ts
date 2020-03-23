import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventProfilePicComponent } from './event-profile-pic.component';

describe('EventProfilePicComponent', () => {
  let component: EventProfilePicComponent;
  let fixture: ComponentFixture<EventProfilePicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventProfilePicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventProfilePicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
