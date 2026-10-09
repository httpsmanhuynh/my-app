import { Component } from '@angular/core';

import { ProductService } from '../services/product-service';

import { Product } from '../classes/IProduct';

@Component({
  selector: 'app-product-list-call-service-component',
  standalone: false,
  styleUrl: './product-list-call-service-component.css',
  templateUrl: './product-list-call-service-component.html',
})
export class ProductListCallServiceComponent {
  products: Product[] = [];

  minPrice: number = 0;

  maxPrice: number = 500;

  constructor(private ps: ProductService) {
    // this.products = this.ps.getProductsList();
  }

  ngOnInit(): void {
    this.products = this.ps.getProductsList();
  }

  doFilter() {
    this.products = this.ps
      .getProductsList()
      .filter((p) => p.price >= this.minPrice && p.price <= this.maxPrice);
  }
}
