import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestJoinComponent } from './guest-join.component';

describe('GuestJoinComponent', () => {
  let component: GuestJoinComponent;
  let fixture: ComponentFixture<GuestJoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestJoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
