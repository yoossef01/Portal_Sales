import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBox3Component } from './dialog-box3.component';

describe('DialogBox3Component', () => {
  let component: DialogBox3Component;
  let fixture: ComponentFixture<DialogBox3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBox3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBox3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
