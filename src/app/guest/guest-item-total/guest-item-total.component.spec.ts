import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestItemTotalComponent } from './guest-item-total.component';

describe('GuestItemTotalComponent', () => {
  let component: GuestItemTotalComponent;
  let fixture: ComponentFixture<GuestItemTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestItemTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestItemTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
