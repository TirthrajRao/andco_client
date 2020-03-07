import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestAddressComponent } from './guest-address.component';

describe('GuestAddressComponent', () => {
  let component: GuestAddressComponent;
  let fixture: ComponentFixture<GuestAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
