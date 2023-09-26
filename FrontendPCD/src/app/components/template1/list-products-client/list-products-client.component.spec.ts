import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductsClientComponent } from './list-products-client.component';

describe('ListProductsClientComponent', () => {
  let component: ListProductsClientComponent;
  let fixture: ComponentFixture<ListProductsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductsClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
