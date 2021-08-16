import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Product } from '../class/product'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getProducts(){
    return this.httpClient.get<Product[]>(`${environment.aad.backends[0].uri}/products`);
}
}
