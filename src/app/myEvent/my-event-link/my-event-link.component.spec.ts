import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEventLinkComponent } from './my-event-link.component';

describe('MyEventLinkComponent', () => {
  let component: MyEventLinkComponent;
  let fixture: ComponentFixture<MyEventLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyEventLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEventLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
