import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEventRadialMenuComponent } from './my-event-radial-menu.component';

describe('MyEventRadialMenuComponent', () => {
  let component: MyEventRadialMenuComponent;
  let fixture: ComponentFixture<MyEventRadialMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyEventRadialMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEventRadialMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
