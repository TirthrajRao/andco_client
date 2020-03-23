import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedEventMessageComponent } from './created-event-message.component';

describe('CreatedEventMessageComponent', () => {
  let component: CreatedEventMessageComponent;
  let fixture: ComponentFixture<CreatedEventMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedEventMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedEventMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
