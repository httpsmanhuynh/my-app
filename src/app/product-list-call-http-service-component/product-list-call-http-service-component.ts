import { Component, signal } from '@angular/core';

import { ProductHttpService } from '../services/product-http-service';

import { Product } from '../classes/IProduct';

@Component({
  selector: 'app-product-list-call-http-service-component',
  standalone: false,
  styleUrl: './product-list-call-http-service-component.css',
  templateUrl: './product-list-call-http-service-component.html',
})
export class ProductListCallHttpServiceComponent {
  products = signal<Product[]>([]);

  constructor(private _service: ProductHttpService) {}

  ngOnInit(): void {
    this._service.getProductList().subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (error) => {
        console.log('Error Occurred', error);
        alert('Error Occurred while calling the service: ' + JSON.stringify(error));
      },
    });
  }
}
