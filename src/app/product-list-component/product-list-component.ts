import { Component } from '@angular/core';
import { Product } from '../classes/IProduct';

@Component({
  selector: 'app-product-list-component',
  standalone: false,
  styleUrl: './product-list-component.css',
  templateUrl: './product-list-component.html',
})
export class ProductListComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Iphone 14',
      price: 1000,
      image:
        'https://i5.walmartimages.com/asr/cb8f75e5-1b8e-4c06-9776-0d995a314ada.88ab53492f6fe7e653033585616419b1.jpeg',
    },
    {
      id: 2,
      name: 'Iphone 15 Pro',
      price: -1200,
      image:
        'https://th.bing.com/th/id/OIP.dFIPiFqregh_WMZpwaZgygHaFA?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      id: 3,
      name: 'Iphone 16 Pro Max',
      price: 1500,
      image:
        'https://tse2.mm.bing.net/th/id/OIF.BogoXdSMT4mICigsf2eVvw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      id: 4,
      name: 'Iphone 17 Pro Max',
      price: 2000,
      image:
        'https://i5.walmartimages.com/asr/cb8f75e5-1b8e-4c06-9776-0d995a314ada.88ab53492f6fe7e653033585616419b1.jpeg',
    },
    {
      id: 5,
      name: 'Iphone 18 Pro Max',
      price: 2500,
      image: 'https://static.digit.in/iPhone-18-Pro-Max-and-iPhone-18-Pro-1.png',
    },
  ];
}
