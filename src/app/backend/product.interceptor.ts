import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@environments/environment';

// type product = {
//   name: string;
//   price: number;
// }

import { Product } from '../class/product'

@Injectable()
export class ProductInterceptor implements HttpInterceptor {

  productData: Product[] = [
    {
      name: "apple",
      price: 1
    },
    {
      name: "banana",
      price: 2
    }
  ]

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   Observable<HttpEvent<any>> {
  //     return of(new HttpResponse({ status: 200, body: productData }));

    const { url, method, headers, body } = request;

    let accessToken = headers.get('Authorization')?.replace('Bearer','')
    console.log(`Access Token for Product API: ${accessToken}`);

    if (url.endsWith('/products') && environment.fakeBackend) {
      console.log(`Disable fakebackend to see HTTP request in DevTools`);
      return of(new HttpResponse(
        { status: 200, body: this.productData}
      ))
    } else {
      return next.handle(request);
    }

  }
}
