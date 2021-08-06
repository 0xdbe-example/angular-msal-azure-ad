import { TestBed } from '@angular/core/testing';

import { ProductInterceptor } from './product.interceptor';

describe('ProductInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ProductInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ProductInterceptor = TestBed.inject(ProductInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
