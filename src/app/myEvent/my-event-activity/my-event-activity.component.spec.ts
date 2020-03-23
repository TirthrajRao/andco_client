import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEventActivityComponent } from './my-event-activity.component';

describe('MyEventActivityComponent', () => {
  let component: MyEventActivityComponent;
  let fixture: ComponentFixture<MyEventActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyEventActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEventActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
