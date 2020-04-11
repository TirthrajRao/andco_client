import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardmodalComponent } from './add-cardmodal.component';

describe('AddCardmodalComponent', () => {
  let component: AddCardmodalComponent;
  let fixture: ComponentFixture<AddCardmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCardmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCardmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
