import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTotalCollectionComponent } from './main-total-collection.component';

describe('MainTotalCollectionComponent', () => {
  let component: MainTotalCollectionComponent;
  let fixture: ComponentFixture<MainTotalCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainTotalCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTotalCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
