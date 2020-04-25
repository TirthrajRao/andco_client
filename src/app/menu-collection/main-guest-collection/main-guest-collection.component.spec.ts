import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGuestCollectionComponent } from './main-guest-collection.component';

describe('MainGuestCollectionComponent', () => {
  let component: MainGuestCollectionComponent;
  let fixture: ComponentFixture<MainGuestCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainGuestCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainGuestCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
