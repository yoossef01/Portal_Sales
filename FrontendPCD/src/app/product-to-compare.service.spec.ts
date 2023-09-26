import { TestBed } from '@angular/core/testing';

import { ProductToCompareService } from './product-to-compare.service';

describe('ProductToCompareService', () => {
  let service: ProductToCompareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductToCompareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
