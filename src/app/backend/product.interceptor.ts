import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

type product = {
  name: string;
  price: number;
}

@Injectable()
export class ProductInterceptor implements HttpInterceptor {

  productData: product[] = [
    {
      "name": "apple",
      "price": 1
    },
    {
      "name": "banana",
      "price": 2
    }
  ]

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   Observable<HttpEvent<any>> {
  //     return of(new HttpResponse({ status: 200, body: productData }));
  //   
     return next.handle(request);
  }
}
