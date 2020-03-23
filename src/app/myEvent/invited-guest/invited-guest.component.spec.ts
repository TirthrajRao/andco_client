import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedGuestComponent } from './invited-guest.component';

describe('InvitedGuestComponent', () => {
  let component: InvitedGuestComponent;
  let fixture: ComponentFixture<InvitedGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitedGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitedGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
