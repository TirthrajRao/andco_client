import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftDonationComponent } from './gift-donation.component';

describe('GiftDonationComponent', () => {
  let component: GiftDonationComponent;
  let fixture: ComponentFixture<GiftDonationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftDonationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
