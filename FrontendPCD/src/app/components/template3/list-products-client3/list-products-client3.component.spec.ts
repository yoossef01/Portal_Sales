import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductsClient3Component } from './list-products-client3.component';

describe('ListProductsClient3Component', () => {
  let component: ListProductsClient3Component;
  let fixture: ComponentFixture<ListProductsClient3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductsClient3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductsClient3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
