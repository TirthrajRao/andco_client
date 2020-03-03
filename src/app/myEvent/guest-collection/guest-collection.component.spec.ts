import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestCollectionComponent } from './guest-collection.component';

describe('GuestCollectionComponent', () => {
  let component: GuestCollectionComponent;
  let fixture: ComponentFixture<GuestCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
