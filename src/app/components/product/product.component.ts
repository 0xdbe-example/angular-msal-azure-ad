import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service'
import { Product } from '../../class/product'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: Product[] | undefined;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts()
    .subscribe((data: Product[]) => {
      console.log(data);
      this.products = data
    });
  }

}
