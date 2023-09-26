import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductsVendeur3Component } from './list-products-vendeur3.component';

describe('ListProductsVendeur3Component', () => {
  let component: ListProductsVendeur3Component;
  let fixture: ComponentFixture<ListProductsVendeur3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductsVendeur3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductsVendeur3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
