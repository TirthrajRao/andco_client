import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeGuestComponent } from './welcome-guest.component';

describe('WelcomeGuestComponent', () => {
  let component: WelcomeGuestComponent;
  let fixture: ComponentFixture<WelcomeGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
