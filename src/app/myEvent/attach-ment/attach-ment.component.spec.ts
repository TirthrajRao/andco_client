import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachMentComponent } from './attach-ment.component';

describe('AttachMentComponent', () => {
  let component: AttachMentComponent;
  let fixture: ComponentFixture<AttachMentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachMentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachMentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
