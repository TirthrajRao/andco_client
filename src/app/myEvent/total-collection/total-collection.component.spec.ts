import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCollectionComponent } from './total-collection.component';

describe('TotalCollectionComponent', () => {
  let component: TotalCollectionComponent;
  let fixture: ComponentFixture<TotalCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
