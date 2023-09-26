import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductDialog3Component } from './update-product-dialog3.component';

describe('UpdateProductDialog3Component', () => {
  let component: UpdateProductDialog3Component;
  let fixture: ComponentFixture<UpdateProductDialog3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProductDialog3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProductDialog3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
